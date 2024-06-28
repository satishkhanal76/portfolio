//different animations styles and their values
const animations = [
  {
    name: "top-down",
    "letter-color": "inherit",
    "letter-background-color": "var(--bg-primary)",
    "letter-gap": "0",
    "letter-animation-time": "0.7s",
    "font-size": "2em",
    "font-weight": "900",
    "letter-width": "0.7em",
    "letter-height": "1.3em",
    "animation-hold-time": "4000",
    "animation-initial-delay": "3000",
  },
  {
    name: "centre-split",
    "letter-color": "black",
    "letter-background-color": "white",
    "letter-gap": "0em",
    "letter-animation-time": "1s",
    "font-size": "1.5rem",
    "animation-hold-time": "4000",
    "animation-initial-delay": "3000",
  },
];

//animation to use for the logo
const CURRENT_ANIMATION_NAME = "top-down";
//animation object currently in use(will be initialised to one of the above animation object) - DO NOT REMOVE
let CURRENT_ANIMATION;

//the data to animate
const data = [
  { foreground: "S", background: "K" },
  { foreground: "A", background: "H" },
  { foreground: "T", background: "A" },
  { foreground: "I", background: "N" },
  { foreground: "S", background: "A" },
  { foreground: "H", background: "L" },
];

//container for the logo
const logoContainer = document.querySelector(".logo-container");

//set the above animation variable
animations.forEach((animation) => {
  if (animation.name === CURRENT_ANIMATION_NAME) {
    logoContainer.classList.add(animation.name);
    CURRENT_ANIMATION = animation;

    for (const [key, value] of Object.entries(animation)) {
      logoContainer.style.setProperty(`--${key}`, value);
    }
  }
});

//create all elements
const createAllElements = (logoContainer) => {
  data.forEach((letter) => {
    const letterElement = document.createElement("div");
    letterElement.classList.add("letter");

    const foreground = document.createElement("div");
    foreground.classList.add("foreground");
    foreground.appendChild(
      createSplitElement(letter.foreground, letter.background)
    );
    const background = document.createElement("div");
    background.classList.add("background");
    background.appendChild(
      createSplitElement(letter.background, letter.foreground)
    );

    const foregroundLeft = foreground.querySelector(".left");
    const foregroundRight = foreground.querySelector(".right");
    const backgroundLeft = background.querySelector(".left");
    const backgroundRight = background.querySelector(".right");

    foregroundLeft.addEventListener("animationend", () => {
      const foregroundNextLetter = foregroundLeft.getAttribute("data-next");
      const backgroundNextLetter = backgroundLeft.getAttribute("data-next");

      foregroundLeft.setAttribute("data-next", foregroundLeft.innerText);
      foregroundRight.setAttribute("data-next", foregroundRight.innerText);
      backgroundLeft.setAttribute("data-next", backgroundLeft.innerText);
      backgroundRight.setAttribute("data-next", backgroundRight.innerText);

      foregroundLeft.innerText = foregroundNextLetter;
      foregroundRight.innerText = foregroundNextLetter;

      if (foregroundNextLetter !== "") {
        backgroundLeft.innerText = backgroundNextLetter;
        backgroundRight.innerText = backgroundNextLetter;
      }

      foreground.classList.remove("split");
      background.classList.remove("split");

      setTimeout(() => {
        if (foregroundNextLetter == "") {
          backgroundLeft.innerText = backgroundNextLetter;
          backgroundRight.innerText = backgroundNextLetter;
        }

        foreground.classList.add("split");
        background.classList.add("split");
      }, CURRENT_ANIMATION["animation-hold-time"]); //animation hold time
    });

    letterElement.appendChild(foreground);
    letterElement.appendChild(background);

    logoContainer.appendChild(letterElement);
  });
};
//helper for the element creation
const createSplitElement = (current, next) => {
  const splitElement = document.createElement("div");
  splitElement.classList.add("split-element");
  const spanLeft = document.createElement("span");
  const spanRight = document.createElement("span");
  spanLeft.classList.add("left");
  spanRight.classList.add("right");
  spanLeft.innerHTML = current;
  spanRight.innerHTML = current;
  spanLeft.setAttribute("data-next", next);
  spanRight.setAttribute("data-next", next);

  splitElement.appendChild(spanLeft);
  splitElement.appendChild(spanRight);
  return splitElement;
};

//start the animation on the document load
document.addEventListener("DOMContentLoaded", function () {
  createAllElements(logoContainer);

  const letters = document.querySelectorAll(".letter");

  letters.forEach((letter) => {
    const foreground = letter.querySelector(".foreground");
    const background = letter.querySelector(".background");

    setTimeout(() => {
      foreground.classList.add("split");
      background.classList.add("split");
    }, CURRENT_ANIMATION["animation-initial-delay"]); // Change every few(x) seconds
  });
});
