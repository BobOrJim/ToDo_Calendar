//sholiday.faboul.se/dagar/v2.1/2022/06/14

//Check if a day is a red day with the function checkIfRedDay(day, month, year), and it returns a bool.
//Check what is the first day of a month with the function getFirstDayInMonth(month, year), and it returns a string with the first day of the month.

//URL used
var apiUrl = "https://sholiday.faboul.se/dagar/v2.1/";

//method to get all red days for a specific year
async function asyncGetYear(year) {
  try {
    let response = await fetch(apiUrl+year, {
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
    console.log(data);
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
async function getFirstDayInMonth(month, year) {
  var date = `${year}/${month}/01`;
  let dateData = await asyncGetDate(date);
  let firstDay = dateData.dagar[0].veckodag;
  console.log(firstDay);
  return firstDay;
}
