MovieList = (function() {

	var _movieList;

	function movieList() {
		this.getMovieList = function() { return _movieList; };
		this.setMovieList = function(movieList) { _movieList = movieList; };
		this.updateMovieList = function(newMovie) { _movieList.push(newMovie); }
		this.getMovieById = getMovieById;
		this.getMoviesByGenre = getMoviesByGenre;
		this.getMoviesByYear = getMoviesByYear;
		this.getMovieIds = getMovieIds;
		this.sortMovieListBy = sortMovieListBy;
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
			return val.Year >= year && val.Year <= (year + 9)
		});
	}

	function getMovieIds() {
		var movieIdList = [];
		_movieList.forEach(function(val) {
			movieIdList.push(parseInt(val.MovieId));
		});
		return movieIdList;
	}

	function sortMovieListBy(sortOption, order) {
		if (order === "sort-asc") {
			_movieList.sort(function(a,b){
				if (a[sortOption] < b[sortOption])
			    return -1;
			  else if (a[sortOption] > b[sortOption])
			    return 1;
			  else
			    return 0;
			});
		} else {
			_movieList.sort(function(a,b){
				if (a[sortOption] < b[sortOption])
			    return 1;
			  else if (a[sortOption] > b[sortOption])
			    return -1;
			  else
			    return 0;
			});
		}
	}

	return movieList;
}());
