var apiUrl1 = "https://svenskahelgdagar.info/v2/access_token";
var apiUrl2 = "https://svenskahelgdagar.info/v2/today";

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

/* var a = fetch(apiUrl1, optionPost)
  .then((res) => res.json)
  .then((data) => console.log(data)); */

/* const  = async () => { */
async function asyncGetToken() {
  try {
    const response = await fetch(apiUrl1, optionPost);
    const data = await response.json();
    // enter you logic when the fetch is successful
    //console.log(data);
    /*     const token = data.access_token;
    console.log(token); */
    console.log(data);
    return data.access_token;
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  }
}

var token1 = asyncGetToken();
console.log(token1);

var optionGet = {
  method: "get",
  headers: {
    Authorization: token1,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const asyncGetToday = async () => {
  try {
    const response = await fetch(apiUrl2, optionGet);
    const data = await response.json();
    // enter you logic when the fetch is successful
    console.log(data);
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  }
};

asyncGetToday();

/*res.json {
    if (res.ok) {
      console.log("SUCCESS");
      return res.json;
    } else {
      console.log("Not Successful");
    }
    console.log(res);
  } )*/
/*   .then((data) => console.log(data));
console.log(a); */

/* var b = fetch(apiUrl2, optionGet)
  .then((res) => {
    if (res.ok) {
      console.log("SUCCESS");
      return res.json;
    } else {
      console.log("Not Successful");
    }
    console.log(res);
  })
  .then((data) => console.log(data));
console.log(b); */

/* getData();

  async function getData(){
       const response= await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita%');
       console.log(response);
       const data= await response.json();
       console.log(data);
       length=data.drinks.length;
       console.log(data);
       var temp="";
       for(i=0;i<length;i++)
       {
          temp+="<tr>";
          temp+="<td>"+data.drinks[i].strDrink+"</td>";
          temp+="<td>"+data.drinks[i].strInstructions+"</td>";
       }

    document.getElementById("data").innerHTML=temp;
     } */
