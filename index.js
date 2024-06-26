/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    let gamecard = document.createElement("div");
    gamecard.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    gamecard.innerHTML = `
    <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
    <h2> ${games[i].name} </h2>
    <p> ${games[i].description} </p>
    <p> Goal: $${games[i].goal.toLocaleString()} </p>
    <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
     <p>Backers: ${games[i].backers}</p>
    `;

    gamesContainer.appendChild(gamecard);
  }
}
// create a new div element, which will become the game card
// add the class game-card to the list

// TIP: if your images are not displaying, make sure there is space
// between the end of the src attribute and the end of the tag ("/>")
// append the game to the games-container

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
//Use reduce on the GAMES_JSON array to calculate the total number of individual contributions made to games. Change the value of the contributionsCard to display the result.(backers)

let individual_contributions = GAMES_JSON.reduce(
  (counter, game) => counter + game.backers,
  0
);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${individual_contributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let raised = GAMES_JSON.reduce((counter, game) => counter + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${raised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let total_games = GAMES_JSON.reduce((num_games) => num_games + 1, 0);

gamesCard.innerHTML = `${total_games.toLocaleString()}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  // use the function we previously created to add the unfunded games to the DOM
  // console.log(unfundedGames);
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let fundedGames = GAMES_JSON.filter((game) => game.pledged > game.goal);
  // use the function we previously created to add unfunded games to the DOM
  // console.log(fundedGames);
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // console.log(GAMES_JSON);
  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const sum_unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

// create a string that explains the number of unfunded games using the ternary operator

let description =
  total_games > 1
    ? `A total of $${raised.toLocaleString()} has been raised for ${total_games}. Currently, ${
        sum_unfundedGames.length
      } games remain unfunded. We need your help to fund these amazing games!`
    : `A total of $${raised.toLocaleString()} has been raised for ${total_games}. Currently, ${
        sum_unfundedGames.length
      } games remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let paragraph = document.createElement("p");
paragraph.innerHTML = description;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first_game, second_game] = [...sortedGames];
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = first_game.name;
firstGameElement.style.color = "#f1f3f4"; // Change the color to whatever you want
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.textContent = second_game.name;
secondGameElement.style.color = "#f1f3f4"; // Change the color to whatever you want
secondGameContainer.appendChild(secondGameElement);
//do the same for the runner up item

/*************************************************************************************
 * Challenge 8: customization + addtional features
 * Skills used: various
 */

// Get the search button and the search input field from the DOM
const searchButton = document.getElementById("search-style");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", function () {
  // Get the value of the search input field
  let searchValue = searchInput.value.toLowerCase();
  // Filter the GAMES_JSON array to only include games whose name includes the search input value
  let filteredGames = GAMES_JSON.filter(
    (game) =>
      game.name.toLowerCase().startsWith(searchValue[0]) &&
      game.name.toLowerCase().includes(searchValue)
  );

  // Create a string with the names of filtered games
  let gameNames = filteredGames.map((game) => game.name).join(", ");

  // Display an alert with the list of filtered games
  filteredGames.length == 1
    ? alert(`Game found: ${gameNames}`)
    : gameNames.length > 1
    ? alert(`Games Found: ${gameNames}`)
    : alert(`No games found with the name: ${searchValue}`);

  // Clear the search input field
  searchInput.value = "";
});
