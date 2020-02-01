var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=pAxeLmVndZQ5FT6mm6fQieZRFPAFaSJi";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });