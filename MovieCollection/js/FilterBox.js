FilterBox = (function() {

	var _movieList;

	function filterBox(movieList) {
		_movieList = movieList;
		bindEvents();
	}

	function bindEvents() {
		$("#filterDiv").on("click", ".filterSubOptions li", function () {
			$(".filterSubOptions li").removeClass("active");
			$(this).addClass("active");
			hideAllMovies();
			showMoviesMatchingFilter($(".filterOptions.open").text(), $(this).text());
		});

		$("#filterDiv").on("click", "#clearFilter span", function () {
			showAllMovies();
			hideGenreOptions();
			hideYearOptions()
			$(".filterSubOptions li").removeClass("active");
			$("#titleSearch").val("");
		});

		$("#filterDiv").on("click", ".filterOptions", function () {
			if ($(this).text() === "Genre") {
				toggleGenreOptions($(this));
			} else {
				toggleYearOptions($(this));
			}
		});
	}

	function toggleGenreOptions($option) {
		if ($option.hasClass("open")) {
			hideGenreOptions();
		} else {
			showGenreOptions();
			hideYearOptions();
		}
	}

	function hideGenreOptions() {
		$("#genreFilterOptions").slideUp('fast');
		$("#genreOption").removeClass("open");
	}

	function showGenreOptions() {
		$("#genreFilterOptions").slideDown('fast');
		$("#genreOption").addClass("open");
	}

	function toggleYearOptions($option) {
		if ($option.hasClass("open")) {
			hideYearOptions();
		} else {
			showYearOptions();
			hideGenreOptions();
		}
	}

	function hideYearOptions() {
		$("#yearFilterOptions").slideUp('fast');
		$("#yearOption").removeClass("open");
	}

	function showYearOptions() {
		$("#yearFilterOptions").slideDown('fast');
		$("#yearOption").addClass("open");
	}

	function hideAllMovies() {
		$("[data-movieId]").addClass("hidden");
	}

	function showAllMovies() {
		$("[data-movieId]").removeClass("hidden");
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
		if (year === "Any") {
			$("[data-movieId]").removeClass("hidden");
		} else {
			var selectedYear = parseInt(year.split("'")[0]);
			_movieList.getMoviesByYear(selectedYear).forEach(function(val) {
				$("[data-movieId='" + val.MovieId + "']").removeClass("hidden");
			});
		}
	}

	return filterBox;
}());
