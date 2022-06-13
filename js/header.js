import { selectedMonth } from "./main.js";
// import { months } from "./repository.js";

document.addEventListener("DOMContentLoaded", headerMain);

const date = new Date();

const months = [ // Använder denna tills months i repository är inlagt
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

  renderHeader(date);

  document.querySelector(".header-dates p").innerHTML = 
    "Dagens datum: " + new Date().toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
  });
}

function renderHeader(date) {
  document.getElementById("header-month").innerHTML = months[date.getMonth()];
  
  document.getElementById("header-year").innerHTML = date.getFullYear();
}

function addEventListeners() {
  document.querySelector(".prev-month").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderHeader(date);
    selectedMonth(date.getMonth());
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderHeader(date);
    selectedMonth(date.getMonth());
  });

  document.querySelector(".prev-year").addEventListener("click", () => {
    date.setFullYear(date.getFullYear() - 1);
    renderHeader(date);
    // selectedYear(date.getFullYear());
  });

  document.querySelector(".next-year").addEventListener("click", () => {
    date.setFullYear(date.getFullYear() + 1);
    renderHeader(date);
    // selectedYear(date.getFullYear());
  });
}
