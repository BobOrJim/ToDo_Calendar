import { Day } from "./models/day.js";

export var months = [];

export function loadYear() {
  if (localStorage.getItem("year") === null) {
    buildYear();
    seedYear();
  } else {
    months = JSON.parse(localStorage.getItem("year"));
  }
}

export function saveYear() {
  localStorage.setItem("year", JSON.stringify(months));
}

function buildYear() {
  months.push(addDaysToMonth(1)); //januari
  months.push(addDaysToMonth(2)); //februari
  months.push(addDaysToMonth(3)); //mars
  months.push(addDaysToMonth(4)); //april
  months.push(addDaysToMonth(5)); //maj
  months.push(addDaysToMonth(6)); //juni
  months.push(addDaysToMonth(7)); //juli
  months.push(addDaysToMonth(8)); //augusti
  months.push(addDaysToMonth(9)); //september
  months.push(addDaysToMonth(10)); //oktober
  months.push(addDaysToMonth(11)); //november
  months.push(addDaysToMonth(12)); //december
}

function addDaysToMonth(monthNumber) {
  let month = [];
  for (let i = 1; i <= new Date(2022, monthNumber, 0).getDate(); i++) {
    var day = new Day();
    day.number = i;
    day.isRed = false; //här tro jag fetch från api skall anropas, som kollar om dag är röd. alt att vi hämtar månad för månad
    day.tasks = [];
    month.push(day);
  }
  return month;
}

function seedYear() {
  months.forEach((month) => {
    //console.log(month);
  });

  months[6].forEach((day) => {
    //console.log(day);
  });

  months[5][1].tasks.push("Buy soda");
  months[5][1].isRed = true;
  months[5][10].tasks.push("Buy beer");
  months[5][11].tasks.push("Buy milk");
  months[5][11].tasks.push("Buy bread");
  months[5][11].tasks.push("Buy cheese");
  months[5][22].tasks.push("Buy butter");
  months[5][22].tasks.push("Buy eggs");
}
