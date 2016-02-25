/***********************************************************************************************************************/
/************************************************** GLOBAL VARIABLES ***************************************************/
/***********************************************************************************************************************/
var movieList = new MovieList();
var newMovieCreator = new NewMovieCreator(saveMovieOnSuccess);
var searchBox;
var filterBox;

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
	filterBox = new FilterBox(movieList, redrawMovieGrid);
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

function redrawMovieGrid() {
	$("#content").children().remove();
	buildMovieHtml();
}

function buildMovieHtml() {
	if (true) {
		buildGridView();
	} else {
		buildListView();
	}
}

function buildGridView() {
	movieList.getMovieList().forEach(function(movie) {
		var mainBodyString = getMovieHtmlString(movie);
		$("#content").append(mainBodyString);
		$("div[data-movieId='" + movie.MovieId + "'").css("background-image", "url('" + movie.imageURL + "')");
	});
}

function getMovieHtmlString(movie) {
	var mainBodyString = `
	<div class='col-xs-2' data-movieId='${movie.MovieId}' data-title='${movie.Title}'>
		<div class='infoIcon'><i class='fa fa-info-circle'></i></div>
		<div class='watchedIcon'><i class='fa fa-check'></i></div>
		<div class='movieDetails'>
			<label>Released:</label>
			<div class='year'>${movie.Year}</div>
			<label>Directed by:</label>
			<div class='director'>${movie.Director}</div>
			<div class='rating'>${movie.IMDBrating}</div>
		</div>
	</div>`;
	return mainBodyString;
}

function buildListView() {}

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

$(document).on("mouseenter", ".infoIcon", function () {
	$(this).siblings(".movieDetails").fadeIn("fast");
});

$(document).on("mouseleave", ".infoIcon", function () {
	$(this).siblings(".movieDetails").fadeOut("fast");
});

$(document).on("click", "#viewOptions span", function () {
	$("#viewOptions span").removeClass("active");
	$(this).addClass("active");
	//change views
});

$(document).ready(function () {
	loadAllMovies();
	searchBox = new SearchBox();
});
