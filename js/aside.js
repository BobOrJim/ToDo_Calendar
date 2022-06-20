import { loadedYearRepo, selectedDate } from "./globalVariables.js";
import { saveYear, loadYear } from "./repository.js";
import { renderMain } from "./main.js";
import { addZero, renderHeader } from "./header.js";

let openAddToDoMenu = false;
let toDoSelectedDate = "";

export function initAside() {
  const temporaryIcon = document.querySelector(".temporary");
  temporaryIcon.addEventListener("click", (e) => {
    openAddToDoMenu = !openAddToDoMenu;
    renderAside();
  });

  //Remove all selected days in main
  const temporaryIcon2 = document.querySelector(".temporary2");
  temporaryIcon2.addEventListener("click", (e) => {
    for (let monthNumber = 0; monthNumber < loadedYearRepo.length; monthNumber++ ) {
      for (let dayNumber = 0; dayNumber < loadedYearRepo[monthNumber].length; dayNumber++) {
        loadedYearRepo[monthNumber][dayNumber].isSelected = false;
      }
    }
    renderMain();
    renderAside();
  });

}

export function renderAside() {
  const asideContainer = document.getElementById("todos-Container");
  asideContainer.innerHTML = ""; //Remove all markup from calendarContainer before it is rendered again

  if (openAddToDoMenu) {
    renderAddToDoMenu(asideContainer);
  } else {
    renderAsideTodos(asideContainer);
  }
}

function renderAddToDoMenu(asideContainer) {
  //Add datepicker
  const datepicker = document.createElement("INPUT");
  datepicker.setAttribute("type", "date");
  datepicker.setAttribute("value", new Date().toISOString().split("T")[0]);
  toDoSelectedDate = datepicker.value;
  datepicker.classList.add("datepicker");
  datepicker.addEventListener("change", (e) => datepickerEventHandler(e));
  asideContainer.appendChild(datepicker);

  //Add textarea
  const textarea = document.createElement("textarea");
  textarea.classList.add("add-todo-textarea");
  asideContainer.appendChild(textarea);

  //Add button
  const button = document.createElement("button");
  button.classList.add("add-todo-button");
  button.innerHTML = "Add";
  button.addEventListener("click", (e) => addToDoEventHandler(e));
  asideContainer.appendChild(button);
}

function datepickerEventHandler(e) {
  //För goare UX
  toDoSelectedDate = e.target.value;
  selectedDate.setFullYear(toDoSelectedDate.split("-")[0]);
  selectedDate.setMonth(toDoSelectedDate.split("-")[1] - 1);
  selectedDate.setDate(toDoSelectedDate.split("-")[2]);
  loadYear(); //Använder selectedDate, för att läsa in ett nytt i i memory från localStorage (om det finns, annars genereras ett nytt år)
  renderHeader(selectedDate);
  renderMain();
}

function addToDoEventHandler(e) {
  const year = toDoSelectedDate.split("-")[0];
  const month = toDoSelectedDate.split("-")[1];
  const day = toDoSelectedDate.split("-")[2];
  const toDoText = document.querySelector(".add-todo-textarea").value;
  loadedYearRepo[month - 1][day - 1].tasks.push(toDoText);
  saveYear();
  renderMain();
  openAddToDoMenu = false;
  renderAside();
}

function renderAsideTodos(asideContainer) {
  var selected = false;
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
        if (loadedYearRepo[monthNumber][dayNumber].isSelected) {
          selected = true;
          console.log(selected);
          let dateString =
            selectedDate.getFullYear() +
            "-" +
            addZero(monthNumber + 1) +
            "-" +
            addZero(dayNumber + 1);
          let toDoDescription =
            loadedYearRepo[monthNumber][dayNumber].tasks[toDoNumber];
          let test = createToDoCardMarkup(dateString, toDoDescription);
          asideContainer.appendChild(test);
        }
      }
    }
  }
  if (!selected) {
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
            addZero(monthNumber + 1) +
            "-" +
            addZero(dayNumber + 1);
          let toDoDescription =
            loadedYearRepo[monthNumber][dayNumber].tasks[toDoNumber];
          let test = createToDoCardMarkup(dateString, toDoDescription);
          asideContainer.appendChild(test);
        }
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

  const toDoRemove = document.createElement("span");
  toDoRemove.title = "ta bort todo";
  toDoRemove.classList.add("material-symbols-outlined");
  toDoRemove.innerHTML = "event_busy";
  toDoRemove.addEventListener("click", (e) => todoRemoveEventHandler(e));
  //Skapar p todo-update
  const toDoUpdate = document.createElement("span");
  toDoUpdate.title = "updatera todo";
  toDoUpdate.classList.add("material-symbols-outlined");
  toDoUpdate.innerHTML = "event_repeat";

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
