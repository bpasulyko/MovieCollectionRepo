NewMovieCreator = (function() {

	var _saveMovieOnSuccess;
	var newMovieObj = {};

	function newMovieCreator(saveMovieOnSuccess) {
		_saveMovieOnSuccess = saveMovieOnSuccess;
		this.init = init;
	}

	function init(){
		resetInputs();
		togglePopUp("open");
	}

	function validateMovieObj(newMovieObj) {
		return (newMovieObj.Title != "" && 
				newMovieObj.Director != "" && 
				newMovieObj.Genre != ". . ." && 
				(newMovieObj.Year != "" && !isNaN(newMovieObj.Year)) && 
				(newMovieObj.IMDBrating != "" && !isNaN(newMovieObj.IMDBrating)));
	}

	function saveMovie() {
		newMovieObj.Title = $("#movieTitle").val();
		newMovieObj.Director = $("#director").val();
		newMovieObj.Genre = $("#genre option:selected").val();
		newMovieObj.Year = $("#year").val();
		newMovieObj.imageURL = "../img/" + $("#movieTitle").val().toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g,'') + ".png";
		newMovieObj.Watched = $("#watched").val() === "on" ? 1 : 0;
		newMovieObj.IMDBrating = $("#rating").val();
		newMovieObj.DateAdded = new Date();

		if (validateMovieObj(newMovieObj)) {
			$.ajax({
		        url: "movies.php",
		        type: "POST",
		        data: { json: JSON.stringify(newMovieObj),
		        		func: "save" },
		        cache: false,
		        datatype: "json",
		        success: _saveMovieOnSuccess
		    });
		} else {
			if ($("#newMovieBody label").children().length === 0) {
				$("#newMovieBody label").append("<span> *</span>");
			}
		}
	}

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
		$("#newMovieBody label span").remove();
	}

	/***** EVENTS *****/
	$(document).on("click", ".closePopUp", function () {
	    togglePopUp("close");
	});

	$(document).on("click", "#saveMovie", function () {
		saveMovie();
	});

	return newMovieCreator;
}());