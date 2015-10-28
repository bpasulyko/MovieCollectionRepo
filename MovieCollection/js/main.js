/***********************************************************************************************************************/
/************************************************** GLOBAL VARIABLES ***************************************************/
/***********************************************************************************************************************/
var newMovieCreator = new NewMovieCreator(saveMovieOnSuccess);

/***************************************************************************************************************/
/************************************************** FUNCTIONS **************************************************/
/***************************************************************************************************************/
function loadAllMovies() {
	$.ajax({
        url: "movies.php",
        type: "POST",
        data: {func: "loadAll"},
        cache: false,
        datatype: "json",
        success: loadAllMoviesOnSuccess
    });
}

function loadAllMoviesOnSuccess(response) {
	buildMovieHtml(response);
	$("#loadingDiv").delay(3000).fadeOut("slow");
}

function buildMovieHtml(response) {
	var sortedList = JSON.parse(response).sort(function compare(a,b) {
	  if (a.Title < b.Title)
	    return -1;
	  if (a.Title > b.Title)
	    return 1;
	  return 0;
	});

	sortedList.forEach(function(movie) {
		var mainBodyString = getMovieHtmlString(movie);
		$("#content .container-fluid").append(mainBodyString);
		$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");
	});
}

function getMovieHtmlString(movie) {
	var mainBodyString = "";
	mainBodyString += "<div class='col-lg-2 col-sm-2 col-xs-2' data-movieId='" + movie.MovieId + "'>";
	mainBodyString += "<div class='watchedIcon'><i class='fa fa-check'></i></div>";
	mainBodyString += "<div class='hoverDiv'>";
	mainBodyString += "<span>" + movie.Title + "</span>";
	mainBodyString += "<i class='fa fa-play'></i>";
	mainBodyString += "</div>";
	mainBodyString += "</div>";
	return mainBodyString;
}

function saveMovieOnSuccess(response) {
	window.scrollTo(0, 0);
	var movie = JSON.parse(response)[0];
	var mainBodyString = getMovieHtmlString(movie);
	$("#content .container-fluid").prepend(mainBodyString);
	$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");

	$("#darkDiv").addClass("hidden");
	$("#newMovieDiv").addClass("hidden");
}

/************************************************************************************************************/
/************************************************** EVENTS **************************************************/
/************************************************************************************************************/

/***** GENERAL JQUERY *****/
$(document).on("click", "#newMovie", function () {
	newMovieCreator.init();
});

$(document).on("mouseenter", "div[data-movieId]", function() {
	$(".hoverDiv").hide();
	$(this).children('.hoverDiv').show();
});

$(document).on("mouseleave", ".hoverDiv", function() {
	$(".hoverDiv").hide();
});

$(document).ready(function () {
	loadAllMovies();
});