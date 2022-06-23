import { loadYear } from "./repository.js";
import { renderMain } from "./main.js";
import { renderAside, initAside } from "./aside.js";
import { headerMain } from "./header.js";

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  console.clear();
  loadYear();
  initAside();
  renderAside();
  headerMain();
  renderMain();
}
