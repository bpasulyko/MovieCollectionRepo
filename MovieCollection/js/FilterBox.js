FilterBox = (function() {

	var _movieList;

	function filterBox(movieList) {
		_movieList = movieList;
		this.toggleFilterBox = toggleFilterBox;
		bindEvents();
	}

	function bindEvents() {
		$("#filterBoxDiv").on("click", ".ulSubList li", function () {
			toggleFilterBox(true);
			hideAllMovies();
			showMoviesMatchingFilter($(this).parent().siblings("span").text(), $(this).text());
		});
	}

	function toggleFilterBox(isVisible) {
		if (isVisible) {
			hideFilterBox();
		} else {
			showFilterBox();
		}
	}

	function showFilterBox() {
		$(".mainUlList").show("slide",{ direction: "up", easing:"easeOutBounce" }, "slow");
	}

	function hideFilterBox() {
		$(".mainUlList").hide("slide", { direction: "up", easing:"easeOutBounce" }, "slow");
	}

	function hideAllMovies() {
		$("[data-movieId]").addClass("hidden");
	}

	function showMoviesMatchingFilter(filterType, filterOption) {
		if (filterType === "Genre") {
			filterByGenre(filterOption);
		} else if (filterType === "Year") {
			filterByYear(filterOption);
		}
	}

	function filterByGenre(genre) {
		if (genre === "Any") {
			$("[data-movieId]").removeClass("hidden");
		} else {
			_movieList.getMoviesByGenre(genre).forEach(function(val) {
				$("[data-movieId='" + val.MovieId + "']").removeClass("hidden");
			});
		}
	}

	function filterByYear(year) {
		var selectedYear = parseInt(year.split("'")[0]);
		if (year === "Any") {
			$("[data-movieId]").removeClass("hidden");
		} else {
			_movieList.getMovieList().forEach(function(val) {
				if (val.Year >= selectedYear && val.Year <= (selectedYear + 9)) {
					$("[data-movieId='" + val.MovieId + "']").removeClass("hidden");
				}
			});
		}
	}
	
	return filterBox;
}());