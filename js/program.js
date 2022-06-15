import { loadYear } from "./repository.js";
import { renderMain } from "./main.js";
import { renderAside } from "./aside.js";

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  console.clear();
  loadYear();
  renderAside();
  renderMain();
}
