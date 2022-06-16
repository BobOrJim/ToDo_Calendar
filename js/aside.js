import { loadedYearRepo, selectedDate } from "./globalVariables.js";
import { saveYear } from "./repository.js";
import { renderMain } from "./main.js";

export async function renderAside() {
  //console.log("renderAside()");
  const asideContainer = document.getElementById("todos-Container");
  asideContainer.innerHTML = ""; //Remove all markup from calendarContainer

  for (
    let monthNumber = 0;
    monthNumber < loadedYearRepo.length;
    monthNumber++
  ) {
    for (
      let dayNumber = 0;
      dayNumber < loadedYearRepo[monthNumber].length;
      dayNumber++
    ) {
      for (
        let toDoNumber = 0;
        toDoNumber < loadedYearRepo[monthNumber][dayNumber].tasks.length;
        toDoNumber++
      ) {
        let dateString =
          selectedDate.getFullYear() +
          "-" +
          (monthNumber + 1) +
          "-" +
          (dayNumber + 1);
        let toDoDescription =
          loadedYearRepo[monthNumber][dayNumber].tasks[toDoNumber];
        let test = createToDoCardMarkup(dateString, toDoDescription);
        asideContainer.appendChild(test);
      }
    }
  }
}

function createToDoCardMarkup(dateString, toDoDescription) {
  //Skapar div todo-card
  const toDoCard = document.createElement("div");
  toDoCard.classList.add("todo-card");
  //Skapar div todo-card-left
  const toDoCardLeft = document.createElement("div");
  toDoCardLeft.classList.add("todo-card-left");
  //Skapar p todo-date
  const toDoDate = document.createElement("p");
  toDoDate.classList.add("todo-date");
  toDoDate.innerHTML = dateString;
  //Skapar textarea todo-textarea
  const toDoTextarea = document.createElement("textarea");
  toDoTextarea.classList.add("todo-textarea");
  toDoTextarea.innerHTML = toDoDescription;
  //Skapar div todo-card-right
  const toDoCardRight = document.createElement("div");
  toDoCardRight.classList.add("todo-card-right");
  //Skapar p todo-remove
  const toDoRemove = document.createElement("p");
  toDoRemove.classList.add("todo-remove");
  // toDoRemove.innerHTML = "X";
  toDoRemove.innerHTML =
    "<img src='img/calendar-delete.png' style = 'width: 60%' alt='remove'>";
  toDoRemove.addEventListener("click", (e) => todoRemoveEventHandler(e));
  //Skapar p todo-update
  const toDoUpdate = document.createElement("p");
  toDoUpdate.classList.add("todo-update");
  // toDoUpdate.innerHTML = "U";
  toDoUpdate.innerHTML =
    "<img src='img/calendar-update.png' style = 'width: 60%' alt='remove'>";
  toDoUpdate.addEventListener("click", (e) => todoUpdateEventHandler(e));
  //Lägger till elementen i div todo-card
  toDoCard.appendChild(toDoCardLeft);
  toDoCard.appendChild(toDoCardRight);
  toDoCardLeft.appendChild(toDoDate);
  toDoCardLeft.appendChild(toDoTextarea);
  toDoCardRight.appendChild(toDoRemove);
  toDoCardRight.appendChild(toDoUpdate);
  return toDoCard;
}

function todoRemoveEventHandler(e) {
  const toDoCard = e.target.parentElement.parentElement;
  const toDoCardLeft = toDoCard.children[0];
  const toDoDate = toDoCardLeft.children[0];
  loadedYearRepo[toDoDate.innerHTML.split("-")[1] - 1][
    toDoDate.innerHTML.split("-")[2] - 1
  ].tasks.splice(toDoCard.children[1].children[0].innerHTML, 1);
  saveYear();
  renderMain();
  renderAside();
}

function todoUpdateEventHandler(e) {
  console.log("todoUpdateEventHandler");
  const toDoCard = e.target.parentElement.parentElement;
  const toDoCardLeft = toDoCard.children[0];
  const toDoDate = toDoCardLeft.children[0];
  const toDoTextarea = toDoCardLeft.children[1];
  let month = toDoDate.innerHTML.split("-")[1] - 1;
  let day = toDoDate.innerHTML.split("-")[2] - 1;
  let index = loadedYearRepo[month][day].tasks.indexOf(toDoTextarea.innerHTML);
  loadedYearRepo[month][day].tasks[index] = toDoTextarea.value;
  saveYear();
  renderMain();
  renderAside();
}
