var topics = ["Hulk", "Iron Man", "Black Widow", "Captain Marvel"];

function displayHeroInfo() {
  var heroes = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    heroes +
    "&limit=10&api_key=pAxeLmVndZQ5FT6mm6fQieZRFPAFaSJi";

  // Creates AJAX call for the specific hero button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);

    var results = response.data;

    $("#heroes-view").empty();

    for (var i = 0; i < results.length; i++) {
      // Creates a div to hold the hero
      var heroDiv = $("<div>");
      // Retrieves the Rating Data
      var rating = response.data[i].rating;
      // Creates an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);
      // Displays the rating
      heroDiv.append(pOne);
      // Creates an element to hold the Gifs
      var gifs = $("<img>");
      // Get the Gif URLs with their appropriate state
      gifs.attr("src", results[i].images.fixed_width.url);
      gifs.attr("data-still", results[i].images.fixed_width_still.url);
      gifs.attr("data-animate", results[i].images.fixed_width.url);
      gifs.attr("data-state", "still");
      gifs.addClass("move");

      // Show Gifs
      heroDiv.append(gifs);

      $("#heroes-view").prepend(heroDiv);
    }
  });
}

// // function to animate
function animate() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

// Function for displaying hero data
function renderButtons() {
  $("#buttons-view").empty();

  // Looping through the array of heroes
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each hero in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("submit");
    // Adding a data-attribute with a value of the hero at index i
    a.attr("data-name", topics[i]);
    // Providing the button's text with a value of the hero at index i
    a.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-hero").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var hero = $("#hero-input")
    .val()
    .trim();
  // The hero from the textbox is then added to our array
  topics.push(hero);

  // calling renderButtons which handles the processing of our heroes array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of heroes
renderButtons();

// Adding click event listeners to all elements with a class of "hero"
$(document).on("click", ".submit", displayHeroInfo);
$(document).on("click", ".move", animate);
