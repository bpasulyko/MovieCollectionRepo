MovieList = (function() {

	var _movieList;

	function movieList() {
		this.getMovieList = function() { return _movieList; };
		this.setMovieList = function(movieList) { _movieList = movieList; };
		this.updateMovieList = function(newMovie) { _movieList.push(newMovie); }
		this.getMovieById = getMovieById;
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

	return movieList;
}());