//sholiday.faboul.se/dagar/v2.1/2022/06/14
import { loadedYearRepo } from "./globalVariables.js";

//Check if a day is a red day with the function checkIfRedDay(day, month, year), and it returns a bool.
//Check what is the first day of a month with the function getFirstDayInMonth(month, year), and it returns a string with the first day of the month.

//URL used
var apiUrl = "https://sholiday.faboul.se/dagar/v2.1/";

//Hashmap to store first and last day of month. Solves the 500ms blinking problin in the main area during each renderMain()
let firstDayInMonthMap = new Map();
let lastDayInMonthMap = new Map();

//method to get all red days for a specific year
async function asyncGetYear(year) {
  try {
    let response = await fetch(apiUrl + year, {
      method: "get",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//Method to get information about a specific day
async function asyncGetDate(date) {
  try {
    let response = await fetch(apiUrl + date, {
      method: "get",
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Method to check if a day is a red day
export async function changeRedDays(year) {
  let response = await fetch(apiUrl + year);
  let yearData = await response.json();

  for (let m = 0; m < loadedYearRepo.length; m++) {
    let monthToCheck = `${loadedYearRepo.indexOf(loadedYearRepo[m]) + 1}`;

    if (monthToCheck.length === 1) monthToCheck = "0" + monthToCheck;

    for (let d = 0; d < loadedYearRepo[m].length; d++) {
      let dayToCheck = `${loadedYearRepo[m][d].number}`;

      if (dayToCheck.length === 1) dayToCheck = "0" + dayToCheck;

      let dateToCheck = year + "-" + monthToCheck + "-" + dayToCheck;

      loadedYearRepo[m][d].isRed = checkIfRedDay(dateToCheck, yearData);
    }
  }
}

function checkIfRedDay(date, yearData) {
  for (let i = 0; i < yearData.dagar.length; i++) {
    if (yearData.dagar[i].datum === date) {
      if (yearData.dagar[i]["röd dag"] === "Ja") return true;
      else return false;
    }
  }
}

//Method to check what day of the week is the first day of the month
export async function getFirstDayInMonth(month, year) {
  //Check if the firstday name is already in the map
  let key = `${month}-${year}`;
  if (firstDayInMonthMap.has(key)) {
    return firstDayInMonthMap.get(key);
  }

  var date = `${year}/${month + 1}/01`;
  let dateData = await asyncGetDate(date);
  let firstDay = dateData.dagar[0].veckodag;
  firstDayInMonthMap.set(key, firstDay);
  return firstDay;
}

//Method to check what day of the week is the last day of the month
export async function getLastDayInMonth(month, year) {
  //Check if the lastday name is already in the map

  let key = `${month}-${year}`;
  if (lastDayInMonthMap.has(key)) {
    return lastDayInMonthMap.get(key);
  }

  var date = `${year}/${month + 1}`;
  let dateData = await asyncGetDate(date);
  let lastDay = dateData.dagar[dateData.dagar.length - 1].veckodag;
  lastDayInMonthMap.set(key, lastDay);
  return lastDay;
}
