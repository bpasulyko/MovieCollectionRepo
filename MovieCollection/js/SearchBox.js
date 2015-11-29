SearchBox = (function() {

	function searchBox() {
		this.toggleSearchBox = toggleSearchBox;
	}

	function toggleSearchBox(isVisible) {
		if (isVisible) {
			hideSearchBox();
		} else {
			showSearchBox();
		}
	}

	function showSearchBox() {
	$("#searchBoxContent").delay(470).fadeIn("fast");
	$("#searchBoxDiv").fadeIn("fast").animate({
			width: "400px",
			height: "80px",
			padding: "20px",
			borderWidth:"5px"
		}, 500 );

		$("#titleSearch").keyup(function(){
			hideAllMovies();
			showMoviesMatchingSearch($(this).val().toLowerCase());
		});
	}

	function hideSearchBox() {
		$("#searchBoxContent").fadeOut("fast");
		$("#searchBoxDiv").animate({
			width: "0",
			height: "0",
			padding: "0px",
			borderWidth:"0px"
		}, 500 ).fadeOut("fast");
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