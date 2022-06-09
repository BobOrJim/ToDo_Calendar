import { loadYear, months } from "./repository.js";

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  console.clear();
  loadYear();
  print();
}
