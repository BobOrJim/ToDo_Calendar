import { loadYear } from "./repository.js";
import { renderMain } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  console.clear();
  loadYear();
  renderMain();
}
