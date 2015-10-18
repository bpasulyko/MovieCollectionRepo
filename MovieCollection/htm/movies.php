<?php  
  require_once 'functions.php';
  $connection = new mysqli('localhost', 'root', '', 'collectionsdb');
	if ($connection->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  if (isset($_POST["json"])) {
    $movieObj = json_decode($_POST["json"], true);
  } 

  $func = $_POST["func"];

  if ($func == "save") {
    $newlyAddedMovieId = saveMovie($connection, $movieObj);
    echo json_encode(getMovies($connection, $newlyAddedMovieId));
  } else if ($func == "loadAll") {
    echo json_encode(getMovies($connection, 0));
  }

	$connection->close();
?>