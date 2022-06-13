//Döljer form och knapp tills man klickar på ikonen

const btn = document.getElementById("btn");
const form = document.getElementById("form");

form.style.display = "none";

btn.addEventListener("click", () => {
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});
