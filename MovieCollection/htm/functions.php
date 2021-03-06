<?php
  function getMovies($connection, $newMovieId) {
    if ($newMovieId != 0) {
	    $getMoviesQuery = "SELECT * FROM movies WHERE movieId = " . $newMovieId;
    } else {
      $getMoviesQuery = "SELECT * FROM movies ORDER BY title ASC";
    }

	  $getMoviesQueryResult = $connection->query($getMoviesQuery);

	  $retVal = array();
	  $i = 0;

	  while($movieRow = $getMoviesQueryResult->fetch_assoc()){
      $movieObj = array("MovieId"=>$movieRow['movieId'], "Title"=>$movieRow['Title'], "Director"=>$movieRow['Director'], "Genre"=>$movieRow['Genre'], "Year"=>$movieRow['Year'], "imageURL"=>$movieRow['imageURL'], "Watched"=>$movieRow['Watched'], "LoanedTo"=>$movieRow['LoanedTo'], "IMDBrating"=>$movieRow['IMDBrating'], "DateAdded"=>$movieRow['DateAdded']);

		  $retVal[$i] = $movieObj;
		  $i++;
	  }

    return $retVal;
  }

  function saveMovie($connection, $movieObj) {
      $title = $movieObj["Title"];
      $director = $movieObj["Director"];
      $genre = $movieObj["Genre"];
      $year = $movieObj["Year"];
      $imageURL = $movieObj["imageURL"];
      $watched = $movieObj["Watched"];
      $imdbrating = $movieObj["IMDBrating"];
      $dateAdded = $movieObj["DateAdded"];

      /*****INSERT RECORD INTO MOVIE TABLE*****/
      $insertMovieQuery = "INSERT INTO movies(movieId, Title, Director, Genre, Year, imageURL, Watched, LoanedTo, IMDBrating, DateAdded) VALUES (NULL,'$title','$director','$genre','$year','$imageURL','$watched',NULL,'$imdbrating','$dateAdded')";
      $insertMovieQueryResult = $connection->query($insertMovieQuery);

      return $connection->insert_id;
  }
?>
