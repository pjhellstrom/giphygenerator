// Global var definitions
var topics = ["MICHAEL SCOTT", "DWIGHT SCHRUTE", "JIM HALPERT", "PAM BEESLY", "KEVIN MALONE", "STANLEY HUDSON", "MEREDITH PALMER", "ANDY BERNARD", "ANGELA MARTIN", "KELLY KAPOOR","DARRYL PHILBIN", "ERIN HANNON", ];

//jQuery
$(document).ready(function() {

//Create buttons from initial topics array
createBtn();

// Button creater
function createBtn() {
    $("#btnWrapper").empty();
    for (var j = 0; j <topics.length; j++) {
        var btnCreate = $("<button>").text(topics[j].toUpperCase());
        btnCreate.attr("type","button");        
        btnCreate.attr("class","btn btn-sm btn-success");
        btnCreate.attr("data-toggle","tooltip");
        btnCreate.attr("data-placement","top");
        btnCreate.attr("title","Click to Generate 9 Giphys");
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
            var pTitle = $("<p>").text(title.toUpperCase().split(" GIF")[0]);
            var pRating = $("<p>").text(rating);
            var image = $("<img>");

            imgDiv.attr("class","img-card");
            pTitle.attr("class","img-card-text-title");
            pRating.attr("class","img-card-text-rating");
            image.attr("src", results[i].images.fixed_width_still.url);
            image.attr("src-static", results[i].images.fixed_width_still.url);
            image.attr("src-animated", results[i].images.fixed_width.url);
            image.attr("animation-status","static");
            image.attr("animation-status-all","static");
            imgDiv.prepend(pTitle);
            imgDiv.prepend(pRating);
            imgDiv.prepend(image);

            $("#imgWrapper").prepend(imgDiv);
        }
    });
});

// Animate on click
$("#imgWrapper").on("click", "img", function() {

    var status = $(this).attr("animation-status");

    if (status === "static") {
        $(this).attr("src", $(this).attr("src-animated"));
        $(this).attr("animation-status", "animated");
    } else {
        $(this).attr("src", $(this).attr("src-static"));
        $(this).attr("animation-status", "static");
    };
});

// Animate all with button
$("#animateAllBtn").on("click", function() {
 
    $("img").each(function() {
        
        var statusAll = $(this).attr("animation-status-all");

        if (statusAll === "static") {
            $(this).attr("src", $(this).attr("src-animated"));
            $(this).attr("animation-status-all", "animated");
        } else {
            $(this).attr("src", $(this).attr("src-static"));
            $(this).attr("animation-status-all", "static");
        };
    });
});

});//end jQuery