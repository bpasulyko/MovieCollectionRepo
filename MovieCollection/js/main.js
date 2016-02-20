/***********************************************************************************************************************/
/************************************************** GLOBAL VARIABLES ***************************************************/
/***********************************************************************************************************************/
var movieList = new MovieList();
var newMovieCreator = new NewMovieCreator(saveMovieOnSuccess);
var searchBox;
var filterBox;
var movieDetails;

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
	movieList.setMovieList(JSON.parse(response));
	buildMovieHtml();
	$("#loadingDiv").delay(3000).fadeOut("slow");
	filterBox = new FilterBox(movieList);
}

// function loadAllMovies() {
// 	var movieObjectList = [];
// 	for (var i in localStorage) {
// 		movieObjectList.push(JSON.parse(localStorage.getItem(i)));
// 	}
// 	movieList.setMovieList(movieObjectList);
// 	buildMovieHtml();
// 	$("#loadingDiv").delay(3000).fadeOut("slow");
// 	filterBox = new FilterBox(movieList);
// }

function buildMovieHtml() {
	var sortedList = movieList.getMovieList().sort(function compare(a,b) {
	  if (a.Title < b.Title)
	    return -1;
	  if (a.Title > b.Title)
	    return 1;
	  return 0;
	});

	sortedList.forEach(function(movie) {
		var mainBodyString = getMovieHtmlString(movie);
		$("#content").append(mainBodyString);
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
	$("#content").scrollTop(0);
	var movie = JSON.parse(response)[0];
	var mainBodyString = getMovieHtmlString(movie);
	$("#content").prepend(mainBodyString);
	$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");

	$("#darkDiv").addClass("hidden");
	$("#newMovieDiv").addClass("hidden");

	movieList.updateMovieList(JSON.parse(response)[0]);
}

// function saveMovieOnSuccess(movie) {
// 	$("#content").scrollTop(0);
// 	var mainBodyString = getMovieHtmlString(movie);
// 	$("#content").prepend(mainBodyString);
// 	$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");
//
// 	$("#darkDiv").addClass("hidden");
// 	$("#newMovieDiv").addClass("hidden");
//
// 	movieList.updateMovieList(movie);
// }

function pickRandomMovie() {
	$("#darkDiv").removeClass("hidden");
	$("#randomMovieDiv section").show();
	$("#closeRandomMovie").hide();
	$("#randomMovieDiv").fadeIn(500);
	$("#randomMovieDiv").removeClass("hidden");
	var movieIdList = movieList.getMovieIds().sort(function(a,b) { return a-b; });
	var low = movieIdList[0];
	var high = movieIdList[movieIdList.length - 1];
	var selectedMovieId = Math.floor(Math.random() * high) + low;
	while ($.inArray(selectedMovieId, movieIdList) == -1) {
		selectedMovieId = Math.floor(Math.random() * high) + low;
	}
	$("#randomMovieDiv section").delay(2000).fadeOut("slow");
	$("#closeRandomMovie").delay(2500).fadeIn("fast");
	$("#randomMovieDiv").css("background-image", "url('" + movieList.getMovieById(selectedMovieId).imageURL + "')");
}

/************************************************************************************************************/
/************************************************** EVENTS **************************************************/
/************************************************************************************************************/

/***** GENERAL JQUERY *****/
$(document).on("click", "#newMovie", function () {
	newMovieCreator.init();
});

$(document).on("click", "#pickMovie", function () {
	pickRandomMovie();
});

$(document).on("click", "#randomMovieDiv .closePopUp", function () {
		$("#darkDiv").addClass("hidden");
		$("#randomMovieDiv").addClass("hidden");
});

$(document).on("mouseenter", "div[data-movieId]", function() {
	$(".hoverDiv").hide();
	$(this).children('.hoverDiv').show();
});

$(document).on("mouseleave", ".hoverDiv", function() {
	$(".hoverDiv").hide();
});

$(document).on("click", ".hoverDiv i", function(){
	movieDetails = new MovieDetails(movieList.getMovieById($(this).parents("[data-movieId]").attr("data-movieId")));
});

$(document).ready(function () {
	loadAllMovies();
	searchBox = new SearchBox();
});
