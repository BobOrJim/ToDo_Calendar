var apiUrlToken = "https://svenskahelgdagar.info/v2/access_token";
//var apiUrlToday = "https://svenskahelgdagar.info/v2/today";
//var apiUrlPrevious = "https://svenskahelgdagar.info/v2/previous";
//var apiUrlNext = "https://svenskahelgdagar.info/v2/next";
var apiUrlDate = "https://svenskahelgdagar.info/v2/date/";
var apiUrlYear = "https://svenskahelgdagar.info/v2//year/2022";

var requestBodyUrl1 = {
  grant_type: "client_credentials",
  client_id: "alannandre4225",
  client_secret: "d37dd8-8d60dd-382975-a063bb-f50381",
};

var optionPost = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBodyUrl1),
};

async function asyncGetToken() {
  try {
    const response = await fetch(apiUrlToken, optionPost);
    const data = await response.json();
    // enter you logic when the fetch is successful
    console.log(data);
    return data.access_token;
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  }
}

async function asyncGetYear() {
  try {
    let response = await fetch(apiUrlYear, {
      method: "get",
      headers: {
        Authorization: `bearer ${await asyncGetToken()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    // enter you logic when the fetch is successful
    console.log(data);
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  }
}

async function asyncGetDate(date) {
  try {
    let response = await fetch(apiUrlDate + date, {
      method: "get",
      headers: {
        Authorization: `bearer ${await asyncGetToken()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
    //return await response.json();
    // enter you logic when the fetch is successful
    /*     
    var red = data.response.public_sunday;
    console.log(red);
    return data.public_sunday; */
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  }
}

/* asyncGetYear();
let today = new Date().toISOString().slice(0, 10);
console.log(today); */
var date = "2024-12-25";
console.log(date);
var Url = apiUrlDate + date;
console.log(Url);

async function checkIfRedDay(date) {
  let dateData = await asyncGetDate(date);
  let isRed = dateData.response.public_sunday;
  console.log(isRed);
  if (isRed) {
    console.log("Red Day!!!");
  } else console.log("Go to work!");
  return isRed;
}

checkIfRedDay(date);
