/***********************************************************************************************************************/
/************************************************** GLOBAL VARIABLES ***************************************************/
/***********************************************************************************************************************/

/***************************************************************************************************************/
/************************************************** FUNCTIONS **************************************************/
/***************************************************************************************************************/
function togglePopUp(state) {
	resetInputs();
	if (state === "open") {
	    $("#darkDiv").removeClass("hidden");
    	$("#newMovieDiv").removeClass("hidden");
	} else {
	    $("#darkDiv").addClass("hidden");
    	$("#newMovieDiv").addClass("hidden");
	}
}

function resetInputs() {
	$("#movieTitle").val("");
	$("#director").val("");
	$("#genre option").first().prop("selected", "selected");
	$("#year").val("");
	$("#rating").val("");
}

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
		$("#main .container-fluid").append(mainBodyString);
		$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");
	});
}

function getMovieHtmlString(movie) {
	var mainBodyString = "";
	mainBodyString += "<div class='col-lg-3 col-sm-3 col-xs-3' data-movieId='" + movie.MovieId + "'>";
	mainBodyString += "</div";
	return mainBodyString;
}

function saveMovie() {
	var newMovieObj = {};
	newMovieObj.Title = $("#movieTitle").val();
	newMovieObj.Director = $("#director").val();
	newMovieObj.Genre = $("#genre option:selected").val();
	newMovieObj.Year = $("#year").val();
	newMovieObj.imageURL = "../img/" + $("#movieTitle").val().toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g,'') + ".png";
	newMovieObj.Watched = $("#watched").val() === "on" ? 1 : 0;
	newMovieObj.IMDBrating = $("#rating").val();

	$.ajax({
        url: "movies.php",
        type: "POST",
        data: { json: JSON.stringify(newMovieObj),
        		func: "save" },
        cache: false,
        datatype: "json",
        success: saveMovieOnSuccess
    });
}

function saveMovieOnSuccess(response) {
	togglePopUp("close");
	var movie = JSON.parse(response)[0];
	var mainBodyString = getMovieHtmlString(movie);
	$("#main .container-fluid").prepend(mainBodyString);
	$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");
}

/************************************************************************************************************/
/************************************************** EVENTS **************************************************/
/************************************************************************************************************/
/***** ADD A NEW MOVIE *****/
$(document).on("click", "#newMovie", function () {
	togglePopUp("open");
});

$(document).on("click", "#saveMovie", function () {
	saveMovie();
});

/***** GENERAL JQUERY *****/
$(document).on("click", ".closePopUp", function () {
    togglePopUp("close");
});

$(document).ready(function () {
	loadAllMovies();
});