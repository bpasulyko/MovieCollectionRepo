MovieList = (function() {

	var _movieList;

	function movieList() {
		this.getMovieList = function() { return _movieList; };
		this.setMovieList = function(movieList) { _movieList = movieList; };
		this.updateMovieList = function(newMovie) { _movieList.push(newMovie); }
		this.getMovieById = getMovieById;
		this.getMoviesByGenre = getMoviesByGenre;
		this.getMoviesByYear = getMoviesByYear;
	}

	function getMovieById(movieId) {
		var movie;
		_movieList.forEach(function(val){
			if (val.MovieId == movieId) {
				movie = val;
			}
		})
		return movie;
	}

	function getMoviesByGenre(genre) {
		return _movieList.filter(function(val) {
			return val.Genre == genre;
		});
	}

	function getMoviesByYear(year) {
		return _movieList.filter(function(val) {
			return val.Year >= selectedYear && val.Year <= (selectedYear + 9)
		});
	}

	return movieList;
}());