import { renderMain } from "./main.js";
import { selectedDate } from "./globalVariables.js";
import { loadYear } from "./repository.js";

// import { months } from "./repository.js";

document.addEventListener("DOMContentLoaded", headerMain);

//const date = new Date();

const months = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

function headerMain() {
  addEventListeners();
  renderHeader(selectedDate);
  updateClock();
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function updateClock() {
  var today = new Date();

  document.querySelector(".header-dates p").innerHTML =
    /* "Dagens datum: " +  */ today.toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " - " +
    addZero(today.getHours()) +
    ":" +
    addZero(today.getMinutes()) +
    ":" +
    addZero(today.getSeconds());

  setTimeout(updateClock, 1000);
}

export function renderHeader(selectedDate) {
  document.getElementById("header-month").innerHTML =
    months[selectedDate.getMonth()];

  document.getElementById("header-year").innerHTML = selectedDate.getFullYear();
}

function addEventListeners() {
  document.querySelector(".prev-month").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
  });

  document.querySelector(".prev-year").addEventListener("click", () => {
    selectedDate.setFullYear(selectedDate.getFullYear() - 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
  });

  document.querySelector(".next-year").addEventListener("click", () => {
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
  });
}
