// Global var definitions
var topics = ["MICHAEL SCOTT", "DWIGHT SCHRUTE"];

//jQuery
$(document).ready(function() {

//Create buttons from initial topics array
createBtn();

// Button creater
function createBtn() {
    $("#btnWrapper").empty();
    for (var j = 0; j <topics.length; j++) {
        var btnCreate = $("<button>").text(topics[j].toUpperCase());
        btnCreate.attr("class","btn btn-sm btn-success")
        $("#btnWrapper").append(btnCreate);
    }
};

// Generate static gifs and set attributes to allow for animate-on-click functionality
$("#btnWrapper").on("click", "button", function() {
    
    var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"
    var searchKey = this.textContent;
    var limit = 9;
    var queryURL = `https://api.giphy.com/v1/gifs/search?q="${searchKey}"&api_key=${apiKey}&limit=${limit}"`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var title = results[i].title;
            var rating = results[i].rating.toUpperCase();
            var imgDiv = $("<div>");
            var pTitle = $("<p>").text(title.toUpperCase());
            var pRating = $("<p>").text(rating);
            var image = $("<img>");

            imgDiv.attr("class","img-card");
            pTitle.attr("class","img-card-text-title");
            pRating.attr("class","img-card-text-rating");
            image.attr("src", results[i].images.fixed_width_still.url);
            image.attr("src-static", results[i].images.fixed_width_still.url);
            image.attr("src-animated", results[i].images.fixed_width.url);
            image.attr("animation-status","static");
            imgDiv.prepend(pTitle);
            imgDiv.prepend(pRating);
            imgDiv.prepend(image);

            $("#imgWrapper").prepend(imgDiv);
        }
    });
});

//Animate on click
$("#imgWrapper").on("click", "img", function() {

    var status = $(this).attr("animation-status");

    if (status === "static") {
        $(this).attr("src", $(this).attr("src-animated"));
        $(this).attr("animation-status", "animated")
    } else {
        $(this).attr("src", $(this).attr("src-static"));
        $(this).attr("animation-status", "static")
    };
});

// Search button click listener that adds a button to the button wrapper
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    
    topics.push($("#searchInput").val());
    createBtn();

    // topics.push(searchKey);

    // if (searchInput === "") {
    //     alert("Please enter a search term!");
    // } else {
    // searchInput = $("#searchInput").val().toUpperCase();
    // var btnCreate = $("<button>").text(searchInput);
    // btnCreate.attr("class","btn btn-sm btn-success")
    // $("#btnWrapper").append(btnCreate);
    // }
});

});//end jQuery