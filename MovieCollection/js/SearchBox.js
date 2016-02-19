SearchBox = (function() {

	function searchBox() {
		init();
	}

	function init() {
		$("#titleSearch").focus();
		$("#titleSearch").keyup(function(){
		 		hideAllMovies();
		 		showMoviesMatchingSearch($(this).val().toLowerCase());
		});
	}

	function hideAllMovies() {
		$("[data-movieId]").addClass("hidden");
	}

	function showMoviesMatchingSearch(searchString) {
		$("[data-movieId]").each(function(){
			if ($(this).children('.hoverDiv').children('span').text().toLowerCase().indexOf(searchString) != -1) {
				$(this).removeClass("hidden");
			}
		});
	}

	return searchBox;
}());
