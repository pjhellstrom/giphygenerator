$(document).ready(function() {

$("#btnWrapper").on("click", "button", function() {
    
    var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"
    var searchKey = this.textContent;
    var limit = 10;
    var queryURL = `https://api.giphy.com/v1/gifs/search?q="${searchKey}"&api_key=${apiKey}&limit=${limit}"`;


    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var imgDiv = $("<div>");
            imgDiv.attr("class","card")
            var title = results[i].title;
            var rating = results[i].rating;
            var p1 = $("<p>").text(`Title: ${title}`);
            var p2 = $("<p>").text(`Rating: ${rating}`);
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);
            imgDiv.prepend(p2);
            imgDiv.prepend(p1);
            imgDiv.prepend(image);

            $("#imgWrapper").prepend(imgDiv);
        }
    });
});

// Search button click listener that adds a button to the button wrapper
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#searchInput").val();

    if (searchInput === "") {
        alert("Please enter a search term!");
    }
    else {
    searchInput = $("#searchInput").val();
    var btnCreate = $("<button>").text(searchInput);
    btnCreate.attr("class","btn btn-sm btn-outline-info")
    $("#btnWrapper").append(btnCreate);
    }
});

});