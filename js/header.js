import { renderMain } from "./main.js";
import { selectedDate } from "./globalVariables.js";
import { loadYear } from "./repository.js";
import { renderAside } from "./aside.js";

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

export function headerMain() {
  addHeaderEventListeners();
  renderHeader(selectedDate);
  updateClock();
}

export function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function updateClock() {
  var today = new Date();

  document.querySelector(".header-dates p").innerText =
    today.toLocaleDateString("sv-SE", {
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
  document.querySelector(".aside-dates").innerText =
    today.toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    "  " +
    addZero(today.getHours()) +
    ":" +
    addZero(today.getMinutes()) +
    ":" +
    addZero(today.getSeconds());
  setTimeout(updateClock, 1000);
}

export function renderHeader(selectedDate) {
  document.getElementById("header-month").innerText =
    months[selectedDate.getMonth()];

  document.getElementById("header-year").innerText = selectedDate.getFullYear();
}

function addHeaderEventListeners() {
  document.querySelector(".prev-month").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
    renderAside();
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
    renderAside();
  });

  document.querySelector(".prev-year").addEventListener("click", () => {
    selectedDate.setFullYear(selectedDate.getFullYear() - 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
    renderAside();
  });

  document.querySelector(".next-year").addEventListener("click", () => {
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    renderHeader(selectedDate);
    loadYear();
    renderMain();
    renderAside();
  });
}
