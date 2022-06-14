//sholiday.faboul.se/dagar/v2.1/2022/06/14

//Check if a day is a red day using the API https://sholiday.faboul.se/
//The function to use is checkIfRedDay(date), and it returns a bool.

//URL used
var apiUrlDate = "https://sholiday.faboul.se/dagar/v2.1/";
var apiUrlYear = "https://sholiday.faboul.se/dagar/v2.1/2022";

//method to get all red days for a specific year
async function asyncGetYear() {
  try {
    let response = await fetch(apiUrlYear, {
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
    let response = await fetch(apiUrlDate + date, {
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

asyncGetYear();
checkIfRedDay(25, 12, 2022);
getFirstDayInMonth(6, 2022);
