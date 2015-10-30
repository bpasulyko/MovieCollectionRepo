MovieDetails = (function() {

	var _movie;

	function movieDetails(movie) {
		_movie = movie;
		init();
		bindEvents();
	}

	function init() {
		$("#detailsLeft img").attr("src", _movie.imageURL);
		fillInMovieDetails();

		$("#movieDetailsDiv").fadeIn(2000, function (){  // 1.  fade in entire details div
			$("#detailsLeft img").fadeIn(1500, function(){  // 2.  fade in cover image
				$("#detailsRightContent").children().each(function(index) {  // 3.  fade in all children on right side
					$(this).delay(500*index).fadeIn(1000);
				}).promise().done(function () { $("#detailsLeft i").fadeIn(400); });
			});
		});
	}

	function bindEvents() {
		$("#movieDetailsDiv").on("click", "#detailsLeft i", function () {
			$("#movieDetailsDiv").fadeOut(1000);
		});

		$("#movieDetailsDiv").on("click", "#loanedOut", function (){
			if ($(this).is(':checked')) {
		        $("#loanedTo").removeAttr("disabled");
		    } else {
		    	$("#loanedTo").text("");
		    	$("#loanedTo").attr("disabled", "disabled");
		    }
		});
	}

	function fillInMovieDetails() {
		$("#titleSpan").text(_movie.Title);
		$("#yearSpan").text(" (" + _movie.Year + ")");
		$("#directorSpan").text(_movie.Director);
		$("#genreSpan").text(_movie.Genre);
		$("#imdbRatingSpan").text(_movie.IMDBrating);

		var watched = _movie.Watched == 1 ? "checked" : "";
		$("#watchedDetails").prop("checked", watched);

		var loanedOut = _movie.LoanedTo != null ? "checked" : "";
		$("#loanedOut").prop("checked", loanedOut);
		$("#loanedTo").text(_movie.LoanedTo);
	}

	return movieDetails;
}());