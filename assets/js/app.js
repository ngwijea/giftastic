   var heroesList = ["Hulk","Iron Man","Black Widow","Captain Marvel"]
   
   function displayHeroInfo() {

      var heroes = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroes + "&limit=10&api_key=pAxeLmVndZQ5FT6mm6fQieZRFPAFaSJi";


      // Creates AJAX call for the specific hero button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        // Creates a div to hold the hero
        var heroDiv = $("<div class='hero'>");
        // Retrieves the Rating Data
        var rating = response.data[0].rating;
        // Creates an element to have the rating displayed
         var pOne = $("<p>").text("Rating: " + rating);
        // Displays the rating
        heroDiv.append(pOne);
        $("#heroes-view").prepend(heroDiv);
      });

    }


// Function for displaying hero data
function renderButtons() {

$("#buttons-view").empty();

        // Looping through the array of heroes
        for (var i = 0; i < heroesList.length; i++) {

          // Then dynamicaly generating buttons for each hero in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("hero");
          // Adding a data-attribute with a value of the hero at index i
          a.attr("data-name", heroesList[i]);
          // Providing the button's text with a value of the hero at index i
          a.text(heroesList[i]);
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
    var hero = $("#hero-input").val().trim();
    // The hero from the textbox is then added to our array
    heroes.push(hero);

    // calling renderButtons which handles the processing of our heroes array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of heroes
  renderButtons();

  // Adding click event listeners to all elements with a class of "hero"
  $(document).on("click", ".hero", displayHeroInfo);


