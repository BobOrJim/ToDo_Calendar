import { renderMain } from "./main.js";
import { selectedDate } from "./globalVariables.js";

// import { months } from "./repository.js";

document.addEventListener("DOMContentLoaded", headerMain);

//const date = new Date();

const months = [
  // Använder denna tills months i repository är inlagt
  "Janurai",
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

  document.querySelector(".header-dates p").innerHTML =
    "Dagens datum: " +
    new Date().toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
}

function renderHeader(selectedDate) {
  document.getElementById("header-month").innerHTML = months[selectedDate.getMonth()];

  document.getElementById("header-year").innerHTML = selectedDate.getFullYear();
}

function addEventListeners() {
  document.querySelector(".prev-month").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderHeader(selectedDate);
    //selectedMonth(date.getMonth());
    renderMain();
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderHeader(selectedDate);
    //selectedMonth(date.getMonth());
    renderMain();
  });

  document.querySelector(".prev-year").addEventListener("click", () => {
    selectedDate.setFullYear(selectedDate.getFullYear() - 1);
    renderHeader(selectedDate);
    // selectedYear(date.getFullYear());
    renderMain();
  });

  document.querySelector(".next-year").addEventListener("click", () => {
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    renderHeader(selectedDate);
    // selectedYear(date.getFullYear());
    renderMain();
  });
}
