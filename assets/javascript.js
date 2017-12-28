////### Before You Begin
//
//	1. **Hit the GIPHY API**.
//	   * Fool around with the GIPHY API. [Giphy API](https://github.com/Giphy).
//	   * Be sure to read about these GIPHY parameters (hint, hint):
//		 * `q`
//		 * `limit`
//		 * `rating`
//	   * Like many APIs, GIPHY requires developers to use a key to access their API data. To use the GIPHY API, you'll need a GIPHY account (don't worry, it's free!) and then obtain an API Key by [creating an app](https://developers.giphy.com/dashboard/?create=true).
//	   * Make sure you switch the protocol in the query URL from **`http to https`**, or the app may not work properly when deployed to Github Pages.
//

//   
//	
//		   
//	For each loop that appends button with topic "name". 
//		   
//	click listener that grabs 10 non animated gif images. When each button is clicked, they animate. CLick again and they stop.
//		   
//	display giphy rating under each 
//		   

//https://api.giphy.com/v1/gifs/search?api_key=uIHPgaW6SucV93Vl5Z2yxoIrXHU51Vyz&q=


var cuisines = ["italian", "mexican", "thai", "chinese", "sushi", "japanese", "vietnamese", ];



   function renderButtons() {
	   	
	   var buttons = $("<div class='buttons'>");
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
     

        // Looping through the array of movies
        for (var i = 0; i < cuisines.length; i++) {

         
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("cuisine");
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
			 
			 	console.log(preview);	
			 
			 	var prev = $("<img>").attr({ src: preview, id: imageId } )
				foodView.append(prev);
	
			 	var animated = gifData.id.images.fixed_height_downsampled.url;
			 
			 
			 
			 
			 //gets rating and appends to //div
			 	var rated = gifData[i].rating;
			 
		       	var pOne = $("<p>").text("Rating: " + rated);
			
				foodView.append(pOne);
          
        	}
      	
		
		 $("#foodPorn").append(foodView);
			});
					
}


 $(document).on("click", ".cuisine", displayGifs);