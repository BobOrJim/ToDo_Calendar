//sholiday.faboul.se/dagar/v2.1/2022/06/14

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
async function checkIfRedDay(day, month, year) {
  var date = `${year}/${month}/${day}`;
  let dateData = await asyncGetDate(date);
  let isRed = dateData.dagar[0]["röd dag"];
  console.log(isRed);
  if (isRed == "Ja") {
    console.log("Red Day!!!");
    return true;
  } else console.log("Go to work!");
  return false;
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

  var date = `${year}/${month +1}`;
  let dateData = await asyncGetDate(date);
  let lastDay = dateData.dagar[dateData.dagar.length -1].veckodag;
  lastDayInMonthMap.set(key, lastDay);
  return lastDay;
}
