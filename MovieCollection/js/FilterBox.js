FilterBox = (function() {

	var _movieList;
	var _rebuildMovieGrid;

	function filterBox(movieList, rebuildMovieGrid) {
		_movieList = movieList;
		_rebuildMovieGrid = rebuildMovieGrid;
		bindEvents();
	}

	function bindEvents() {
		$("#filterDiv").on("click", ".filterSubOptions li", function () {
			$(".filterSubOptions li").removeClass("active");
			$(this).addClass("active");
			hideAllMovies();
			showMoviesMatchingFilter($(".filterOptions.open").text(), $(this));
		});

		$("#filterDiv").on("click", "#clearFilter span", function () {
			sortMovieListBy("Title", "sort-asc");
			_rebuildMovieGrid();
			hideGenreOptions();
			hideYearOptions();
			hideSortOptions();
			$(".filterSubOptions li").removeClass("active");
			$(".filterSubOptions i").remove();
			$("#titleSearch").val("");
		});

		$("#filterDiv").on("click", ".filterOptions", function () {
			if ($(this).text() === "Genre") {
				toggleGenreOptions($(this));
			} else if ($(this).text() === "Year") {
				toggleYearOptions($(this));
			} else {
				toggleSortOptions($(this));
			}
		});
	}

	function toggleGenreOptions($option) {
		if ($option.hasClass("open")) {
			hideGenreOptions();
		} else {
			showGenreOptions();
			hideYearOptions();
			hideSortOptions();
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
			hideSortOptions();
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

	function toggleSortOptions($option) {
		if ($option.hasClass("open")) {
			hideSortOptions();
		} else {
			showSortOptions();
			hideGenreOptions();
			hideYearOptions();
		}
	}

	function hideSortOptions() {
		$("#sortFilterOptions").slideUp('fast');
		$("#sortOption").removeClass("open");
	}

	function showSortOptions() {
		$("#sortFilterOptions").slideDown('fast');
		$("#sortOption").addClass("open");
	}

	function hideAllMovies() {
		$("[data-movieId]").addClass("hidden");
	}

	function showAllMovies() {
		$("[data-movieId]").removeClass("hidden");
	}

	function showMoviesMatchingFilter(filterType, filterOption) {
		if (filterType === "Genre") {
			filterByGenre(filterOption.text());
		} else if (filterType === "Year") {
			filterByYear(filterOption.text());
		} else {
			sortMovieListBy(filterOption.attr("name"), filterOption.attr("sort-order"));
		}
	}

	function filterByGenre(genre) {
		_movieList.getMoviesByGenre(genre).forEach(function(val) {
			$("[data-movieId='" + val.MovieId + "']").removeClass("hidden");
		});
	}

	function filterByYear(year) {
		var selectedYear = parseInt(year.split("'")[0]);
		_movieList.getMoviesByYear(selectedYear).forEach(function(val) {
			$("[data-movieId='" + val.MovieId + "']").removeClass("hidden");
		});
	}

	function sortMovieListBy(sortOptionName, sortOrder) {
		_movieList.sortMovieListBy(sortOptionName, sortOrder);
		$(".filterSubOptions i").remove();
		redrawMovieGrid();
		$(".filterSubOptions li[name='" + sortOptionName + "']").append("<i class='fa fa-" + sortOrder + "'></i>");
		sortOrder = sortOrder == "sort-asc" ? "sort-desc" : "sort-asc";
		$(".filterSubOptions li[name='" + sortOptionName + "']").attr("sort-order", sortOrder);
	}

	return filterBox;
}());
