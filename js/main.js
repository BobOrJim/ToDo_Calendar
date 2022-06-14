import { months } from "./repository.js";

let monthNumber = new Date().getMonth();

export function initMain() {
  console.log("running initMain()");
  console.log(months);
  renderMain();
}

export function selectedMonth(selectedMonthNumber) {
  monthNumber = selectedMonthNumber;
  renderMain();
}

export function toDosChanged() {
  //Denna kommer personen som bygger aside anropa, efter efter att months är ändrad (i aside)
  renderMain();
}

function renderMain() {
  const calendarContiner = document.getElementById("calendarContiner");
  calendarContiner.innerHTML = "";

  for (let i = 0; i < months[monthNumber].length; i++) {
    const dayCard = createDayCardMarkup(monthNumber, i);
    dayCard.addEventListener("click", () => dayClickedEventHandler(monthNumber, i));
    calendarContiner.appendChild(dayCard);
  }
}

function dayClickedEventHandler(monthNumber, i, e) {
  months[monthNumber][i].isSelected = !months[monthNumber][i].isSelected;
  //console.log("HALOJ");
  console.log(months[monthNumber][i].isSelected);
  renderMain();
  //Denna metod kommer ta fram dag som användare klickat på, och skicka denna info vidare genom att anropa en metod i aside, tex selectedDay(dayNumber)
}

function createDayCardMarkup(monthNumber, dayNumber) {
  //Skapar div day-card
  const dayCard = document.createElement("div");
  dayCard.classList.add("day-card");
  if (months[monthNumber][dayNumber].isRed) {
    dayCard.classList.add("day-card-idRed");
  }
  if (months[monthNumber][dayNumber].isSelected) {
    console.log("HALOJ");
    dayCard.classList.add("day-card-isSelected");
  }

  //Skapar p day-card-text
  const dayCardText = document.createElement("p");
  dayCardText.classList.add("day-card-text");
  dayCardText.innerHTML = dayNumber + 1;
  dayCard.appendChild(dayCardText);

  //Skapar p day-card-tasks
  const dayCardTasks = document.createElement("p");
  dayCardTasks.classList.add("day-card-tasks");
  const numberOfTasks = months[monthNumber][dayNumber].tasks.length;
  if (numberOfTasks > 0) {
    dayCardTasks.innerHTML = numberOfTasks;
    dayCard.appendChild(dayCardTasks);
  }

  return dayCard;
}
