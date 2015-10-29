MovieDetails = (function() {

	var _movie;

	function movieDetails(movie) {
		_movie = movie;
		init();
	}

	function init() {
		$("#detailsLeft img").attr("src", _movie.imageURL);
		$("#movieDetailsDiv").fadeIn(2000, function (){
			$("#detailsLeft").children().each(function(index) {
				$(this).delay(400*index).fadeIn(1500);
			});
		});
	}

	return movieDetails;
}());