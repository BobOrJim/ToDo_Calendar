import { Day } from "./models/day.js";
import { loadedYearRepo, selectedDate } from "./globalVariables.js";
import { changeRedDays } from "./fetchRedDaysAPI.js";
import { renderMain } from "./main.js";

export function loadYear() {
  let stuff = JSON.parse(localStorage.getItem(selectedDate.getFullYear()));
  if (stuff === null) {
    buildYear();
    seedYear();
  } else {
    let data = JSON.parse(localStorage.getItem(selectedDate.getFullYear()));
    loadedYearRepo.push(...data);
  }
}

export function saveYear() {
  localStorage.setItem(
    selectedDate.getFullYear(),
    JSON.stringify(loadedYearRepo)
  );
}

function buildYear() {
  console.log("running buildYear()");
  loadedYearRepo.push(addDaysToMonth(1)); //januari
  loadedYearRepo.push(addDaysToMonth(2)); //februari
  loadedYearRepo.push(addDaysToMonth(3)); //mars
  loadedYearRepo.push(addDaysToMonth(4)); //april
  loadedYearRepo.push(addDaysToMonth(5)); //maj
  loadedYearRepo.push(addDaysToMonth(6)); //juni
  loadedYearRepo.push(addDaysToMonth(7)); //juli
  loadedYearRepo.push(addDaysToMonth(8)); //augusti
  loadedYearRepo.push(addDaysToMonth(9)); //september
  loadedYearRepo.push(addDaysToMonth(10)); //oktober
  loadedYearRepo.push(addDaysToMonth(11)); //november
  loadedYearRepo.push(addDaysToMonth(12)); //december
}

function addDaysToMonth(monthNumber) {
  let month = [];
  for (
    let i = 1;
    i <= new Date(selectedDate.getFullYear(), monthNumber, 0).getDate();
    i++
  ) {
    var day = new Day();
    day.number = i;
    day.isRed = false;
    day.tasks = [];
    month.push(day);
  }
  return month;
}

async function seedYear() {
  console.log("running seedYear()");
  loadedYearRepo[5][1].tasks.push("Buy soda");
  loadedYearRepo[5][10].tasks.push("Buy beer");
  loadedYearRepo[5][11].tasks.push("Buy milk");
  loadedYearRepo[5][11].tasks.push("Buy bread");
  loadedYearRepo[5][11].tasks.push("Buy cheese");
  loadedYearRepo[5][22].tasks.push("Buy butter");
  loadedYearRepo[5][22].tasks.push("Buy eggs");

  await changeRedDays(selectedDate.getFullYear());
  renderMain();
}
