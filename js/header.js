import { selectedMonth } from "./main.js";

document.addEventListener("DOMContentLoaded", main);

const date = new Date();

function main() {
  addEventListeners();
}

function addEventListeners() {
  const prevMonth = document.querySelector(".prev-month");
  prevMonth.addEventListener("click", () => {
    selectedMonth(date.setMonth(date.getMonth() - 1));
  });

  const nextMonth = document.querySelector(".next-month");
  prevMonth.addEventListener("click", () => {
    selectedMonth(date.setMonth(date.getMonth() + 1));
  });

  const prevYear = document.querySelector(".prev-year");
  prevYear.addEventListener("click", () => {
    selectedYear(date.setFullYear(date.getFullYear() - 1));
  });

  const nextYear = document.querySelector(".next-year");
  nextYear.addEventListener("click", () => {
    selectedYear(date.setFullYear(date.getFullYear() + 1));
  });
}
