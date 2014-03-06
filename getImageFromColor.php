<?php
  $color = $_GET['color'];
  $accessToken = getenv('ACCESS_TOKEN');

  $searchResults = file_get_contents('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=' . $accessToken . '&color=' . $color . '&has_images=true');
  $searchResults = json_decode($searchResults)->objects;

  //pick random object
  echo '<img src="'. $searchResults[array_rand($searchResults)]->images[0]->b->url . '" />';


?>