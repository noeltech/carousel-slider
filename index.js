slide_items = document.querySelectorAll(".slider__imageWrapper");
nextButton = document.querySelector(".navButton__next");
previousButton = document.querySelector(".navButton__previous");
radioButtons = document.querySelectorAll(".slider__indicator");
// rbCount = document.querySelector(".rbCount");

console.log(radioButtons);
console.log(slide_items.length - 1);

let slide = 0;
let animationFinished = true;
// let hasPrevClass = true;
// let hasNextClass = true;
slide_items[slide + 1].classList.toggle("next");
slide_items[slide].classList.toggle("current");
slide_items[5].classList.toggle("previous");

let removePrevClass = () => {
  slide_items.forEach(item => {
    item.classList.remove("previous");
  });
  // hasPrevClass = false;
};

let removeNextClass = () => {
  slide_items.forEach(item => {
    item.classList.remove("next");
  });
  // hasNextClass = false;
};
// slide to next image
const moveNext = () => {
  if (animationFinished == true) {
    animationFinished = false;
    // remove class "previous" on all slide
    removePrevClass();

    console.log(slide + "  before");
    // slide the very first image
    // and reset the counter to 0
    if (slide == 5) {
      slide_items[0].classList.toggle("current");
      // slide to left the current slide
      slide_items[slide].classList.toggle("moveCurrent");
      slide = 0;

      // slide the next image
      // and increment the counter
    } else {
      slide_items[slide + 1].classList.toggle("current");
      // slide to left the current slide
      slide_items[slide].classList.toggle("moveCurrent");
      slide++;
    }
    activateRadioButton(slide);
    //  update the slider after 5 seconds so animation can be seen
    setTimeout(function() {
      // remove class "next" from the current slide
      slide_items[slide].classList.remove("next");

      // remove class "current" and "moveCurrent" from the previous slide
      if (slide == 0) {
        slide_items[5].classList.remove("current");
        slide_items[5].classList.remove("moveCurrent");
      } else {
        slide_items[slide - 1].classList.remove("current");
        slide_items[slide - 1].classList.remove("moveCurrent");
      }
      updateSlide();
    }, 400);
  }
};

//  slide to previous image
const movePrev = () => {
  if (animationFinished == true) {
    animationFinished = false;
    // remove class "next" on any slide to avoid conflict
    removeNextClass();
    // slide the previous and current image to the right
    if (slide == 0) {
      slide_items[5].classList.toggle("current");
      slide_items[slide].classList.toggle("moveCurrent--previous");
      // position the counter on the last image
      slide = 5;
    } else {
      slide_items[slide - 1].classList.add("current");
      slide_items[slide].classList.toggle("moveCurrent--previous");
      // decrement the counter
      slide--;
    }
    activateRadioButton(slide);
    // remove old classes to avoid conflict for the next update
    setTimeout(function() {
      // remove class "previous" on the current slide
      slide_items[slide].classList.remove("previous");
      // remove class "current" and "moveCurrent--previous"
      // on the old current slide to go back to original position
      if (slide == 5) {
        slide_items[0].classList.remove("current");
        slide_items[0].classList.remove("moveCurrent--previous");
      } else {
        slide_items[slide + 1].classList.remove("current");
        slide_items[slide + 1].classList.remove("moveCurrent--previous");
      }
      // update new slides
      updateSlide();
    }, 400);
  }
};

// position new slides to the left and right of the current slides
const updateSlide = () => {
  // position the new "next" slide

  if (slide == 5) {
    slide_items[0].classList.toggle("next");
  } else {
    slide_items[slide + 1].classList.toggle("next");
  }

  //  position the new "previous" slide
  if (slide == 0) {
    slide_items[5].classList.toggle("previous");
  } else {
    slide_items[slide - 1].classList.toggle("previous");
  }
  animationFinished = true;
};

let element_index = 0;
// set click event listener to each radio button
radioButtons.forEach(element => {
  // set an attribute "id" and a value to each radio button
  element.setAttribute("id", `${element_index}`);
  element.addEventListener("click", function(e) {
    // display what radio button was click
    // for debugging purpose
    let count = parseInt(element.getAttribute("id"));
    // rbCount.innerText = count;

    // activate the click button by passing the index
    // as argument
    activateRadioButton(count);
    jumpSlideNext(count);
  });
  element_index++;
});

let activateRadioButton = index => {
  // remove current active radio button
  radioButtons.forEach(element => {
    // element.childNodes[1].classList.add("indicator__dot--active");
    let circularButton = element.childNodes[1];
    if (circularButton.classList.contains("indicator__dot--active")) {
      circularButton.classList.remove("indicator__dot--active");
    }
  });
  // add the grey background to circular div
  radioButtons[index].childNodes[1].classList.add("indicator__dot--active");
};
// initialized the first radio buttons
activateRadioButton(slide);

let jumpSlideNext = clickSlide => {
  if (clickSlide != slide) {
    // remove both sides of the slide first
    if (animationFinished == true) {
      animationFinished = false;
      removeNextClass();
      removePrevClass();

      let class_position = "";
      // && (slide != 0 && clickSlide != 5))
      if (clickSlide > slide || (slide == 5 && clickSlide == 0)) {
        if (clickSlide != 5 && slide != 0) {
          console.log("im here");
        }
        class_position = "next";
        current_direction = "moveCurrent";
      } else if (clickSlide < slide || (slide == 0 && clickSlide == 5)) {
        class_position = "previous";
        current_direction = "moveCurrent--previous";
      } else {
        console.log("either");
      }

      //replace new Next slide depending on the click radio button
      slide_items[clickSlide].setAttribute("style", "transition:left 0s;");
      slide_items[clickSlide].classList.add(class_position);

      // then after a second move the slide to left;
      setTimeout(() => {
        slide_items[clickSlide].setAttribute("style", "transition:left 0.4s;");
        slide_items[slide].classList.add(current_direction);
        slide_items[clickSlide].classList.add("current");
        // slide = clickSlide;
        setTimeout(() => {
          // slide_items[slide].classList.remove("moveCurrent");
          slide_items[clickSlide].classList.remove(class_position);
          slide_items[slide].classList.remove(current_direction);
          slide_items[slide].classList.remove("current");
          slide = clickSlide;
          updateSlide();
        }, 300);
      }, 100);
    }
  } else {
    console.log("double click is not allowed");
  }
};

nextButton.addEventListener("click", moveNext);
previousButton.addEventListener("click", movePrev);
