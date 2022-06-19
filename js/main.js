import { loadedYearRepo, selectedDate } from "./globalVariables.js";
import { getFirstDayInMonth, getLastDayInMonth } from "./fetchRedDaysAPI.js";
import { loadYear, saveYear } from "./repository.js";
import { renderAside } from "./aside.js";

let weekDays = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

export async function renderMain() {
  saveYear();
  const calendarContainer = document.getElementById("calendarContainer");
  calendarContainer.innerHTML = ""; //Remove all markup from calendarContainer

  await addDummyDaysToBeginingOfMonth();
  addDaysToMonth();
  addDummyDaysToEndOfMonth();
}

async function addDummyDaysToBeginingOfMonth() {
  const calendarContainer = document.getElementById("calendarContainer");
  let day = await getFirstDayInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );
  //console.log("first day of month: " + day);
  let dummyDaysBeforeToAdd = weekDays.indexOf(day);
  let daysInPreviousMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  ).getDate();
  for (let i = dummyDaysBeforeToAdd; i > 0; i--) {
    const dayCard = createDummyDayCardMarkup(daysInPreviousMonth - i);
    calendarContainer.appendChild(dayCard);
  }
}

function addDaysToMonth() {
  const calendarContainer = document.getElementById("calendarContainer");
  for (let i = 0; i < loadedYearRepo[selectedDate.getMonth()].length; i++) {
    const dayCard = createDayCardMarkup(selectedDate.getMonth(), i);
    dayCard.addEventListener("click", () =>
      dayClickedEventHandler(selectedDate.getMonth(), i)
    );
    calendarContainer.appendChild(dayCard);
  }
}

async function addDummyDaysToEndOfMonth() {
  let day = await getLastDayInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );
  let dummyDaysAfterToAdd = 6 - weekDays.indexOf(day);

  for (let i = 0; i < dummyDaysAfterToAdd; i++) {
    const dayCard = createDummyDayCardMarkup(i);
    calendarContainer.appendChild(dayCard);
  }
}

function dayClickedEventHandler(monthNumber, i, e) {
  loadedYearRepo[monthNumber][i].isSelected =
    !loadedYearRepo[monthNumber][i].isSelected;
  renderMain();
  renderAside();
  //Denna metod kommer ta fram dag som användare klickat på, och skicka denna info vidare genom att anropa en metod i aside, tex selectedDay(dayNumber)
}

function createDayCardMarkup(monthNumber, dayNumber) {
  //Skapar div day-card
  const dayCard = document.createElement("div");
  dayCard.classList.add("day-card");
  if (loadedYearRepo[monthNumber][dayNumber].isRed) {
    dayCard.classList.add("day-card-idRed");
  }
  if (loadedYearRepo[monthNumber][dayNumber].isSelected) {
    dayCard.classList.add("day-card-isSelected");
  }

  //Skapar p day-card-nameDay
  const dayCardNameDay = document.createElement("p");
  dayCardNameDay.classList.add("day-card-nameDay");
  const nameDay = loadedYearRepo[monthNumber][dayNumber].nameDay;
  dayCardNameDay.innerHTML = nameDay;
  dayCard.appendChild(dayCardNameDay);

  //Skapar p day-card-text
  const dayCardText = document.createElement("p");
  dayCardText.classList.add("day-card-text");
  dayCardText.innerHTML = dayNumber + 1;
  dayCard.appendChild(dayCardText);

  //Skapar p day-card-tasks
  const dayCardTasks = document.createElement("p");
  dayCardTasks.classList.add("day-card-tasks");
  const numberOfTasks = loadedYearRepo[monthNumber][dayNumber].tasks.length;
  if (numberOfTasks > 0) {
    dayCardTasks.innerHTML = numberOfTasks;
    dayCard.appendChild(dayCardTasks);
  }

  return dayCard;
}

function createDummyDayCardMarkup(dayNumber) {
  //Skapar div day-card
  const dayCard = document.createElement("div");
  dayCard.classList.add("day-card");
  dayCard.classList.add("day-card-isDummy");


  //Skapar p day-card-text
  const dayCardText = document.createElement("p");
  if(dayCard.classList.contains("day-card-isDummy")){
    dayCardText.classList.add("day-card-isDummy-text");
    dayCardText.innerHTML = dayNumber + 1;
    dayCard.appendChild(dayCardText);
    return dayCard;
  }
  else {dayCardText.classList.add("day-card-text");
  dayCardText.innerHTML = dayNumber + 1;
  dayCard.appendChild(dayCardText);
  return dayCard;
}
}
