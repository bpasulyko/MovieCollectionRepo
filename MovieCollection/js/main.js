/***********************************************************************************************************************/
/************************************************** GLOBAL VARIABLES ***************************************************/
/***********************************************************************************************************************/

/***************************************************************************************************************/
/************************************************** FUNCTIONS **************************************************/
/***************************************************************************************************************/
function togglePopUp(state) {
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
	debugger;
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
	console.log(response);
	togglePopUp("close");
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
    resetInputs();
});

$(document).ready(function () {
	loadAllMovies();
});