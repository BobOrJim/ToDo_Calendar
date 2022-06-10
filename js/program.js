import { loadYear, months } from "./repository.js";
import { initMain } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  console.clear();
  loadYear();
  initMain();
}
