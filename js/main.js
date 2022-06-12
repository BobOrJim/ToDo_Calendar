export function initMain() {
  console.log("running initMain()");
  renderMain();
}

export function selectedMonth(monthNumber) {
  //Denna kommer personen som bygger header anropa, när användare blädrar månad
  renderMain();
}

export function toDosChanged() {
  //Denna kommer personen som bygger aside anropa, efter efter att months är ändrad (i aside)
  renderMain();
}

function renderMain() {
  //Kommer använda months datastrukturen för att rendera all markup.
  initEventListners();
}

function initEventListners() {
  //kommer adda alla eventlistners
}

function dayClickedEventHandler(e) {
  //Denna metod kommer ta fram dag som användare klickat på, och skicka denna info vidare genom att anropa en metod i aside, tex selectedDay(dayNumber)
}
