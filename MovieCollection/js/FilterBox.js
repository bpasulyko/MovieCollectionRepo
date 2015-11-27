FilterBox = (function() {

	function filterBox() {
		this.showFilterBox = showFilterBox;
		this.hideFilterBox = hideFilterBox;
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

	function showMoviesMatchingSearch(searchString) {

	}

	return filterBox;
}());