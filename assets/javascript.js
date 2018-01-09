

var cuisines = ["italian", "mexican", "thai", "chinese", "sushi", "japanese", "vietnamese", ];


   function renderButtons() {

	   var buttons = $("<div class='buttons'>");
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)


        // Looping through the array of movies
        for (var i = 0; i < cuisines.length; i++) {


          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("cuisine btn-primary");
          // Adding a data-attribute
          a.attr("data-name", cuisines[i]);
          // Providing the initial button text
          a.text(cuisines[i]);
          // Adding the button to the buttons-view div
          $("#buttonsView").append(a);
        }
      }

renderButtons()

function displayGifs() {

	$("#foodPorn").empty();

	var topic = $(this).attr("data-name");

	console.log(topic);

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uIHPgaW6SucV93Vl5Z2yxoIrXHU51Vyz&q=" + topic + "+food&limit=10";



		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

		// Creating a div to view the gallery.

		var foodView = $("<div class='foodView'>");

		var gifData = response.data;


		//gets the image rating
		 for (var i = 0; i < response.data.length; i++) {

			 	var imageId = gifData[i].id;

			 	var preview = gifData[i].images.fixed_height_still.url;

			 	var animated = gifData[i].images.fixed_height.url;
//			 	var animated =
			 	var rated = gifData[i].rating;

			 	var pOne = $("<p>").text("Rating: " + rated).attr({class: "foodCap"});


			 	var prev = $("<img>").attr({ src: preview, alt: animated, class: "foodImg" });

				pOne.append(prev);
				foodView.append(pOne);
//
        	}

		 $("#foodPorn").append(foodView);
				});

}

$("#addFood").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newFood = $("#foodInput").val().trim();
        var newButton = $("<button>");

        // Adding movie from the textbox to our array

        // Adding a class of movie to our button
        newButton.addClass("cuisine btn-primary");
        // Adding a data-attribute
        newButton.attr("data-name", newFood);
        // Providing the initial button text
        newButton.text(newFood);
        // Adding the button to the buttons-view div
        $("#buttonsView").append(newButton);

      });



// animates play pause by switching alt with src and vice versa.

function animate() {
	var image = $(this);
	var source = (image).attr("src");
	var alternate = (image).attr("alt");
//	var alternate = $(this).attr("alt")
	image.attr("src", alternate);
	image.attr("alt", source);
}

$(document).on("click", ".foodImg", animate);

$(document).on("click", ".cuisine", displayGifs);
