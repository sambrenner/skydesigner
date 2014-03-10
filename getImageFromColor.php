<?php
  $color = $_GET['color'];
  $accessToken = getenv('ACCESS_TOKEN');

  $searchResults = file_get_contents('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=' . $accessToken . '&color=' . $color . '&has_images=true');
  $searchResults = json_decode($searchResults)->objects;

  $object = $searchResults[array_rand($searchResults)];

  header('Content-Type: application/json');
  echo '{';
    echo '"url":"'. $object->images[0]->b->url . '",';
    echo '"credits":"' . getCreativePeople($object->participants) . '"';
  echo '}';

  function getCreativePeople($people) {
    $primaryPeople = array_filter($people, function($person) {
      $returnVal = false;

      switch($person->role_name) {
        case 'Designer':
        case 'Artist':
        case 'Maker':
        case 'Embroiderer':
        case 'Engraver':
        case 'Graphic Designer':
        case 'Etcher':
        case 'Photographer':
        case 'Creator':
        case 'Model maker':
        case 'Modeler':
        case 'Textile Artist':
        case 'Ceramist':
        case 'Fabricator':
        case 'Jeweler':
        case 'Cartoonist':
        case 'Glass Worker':
        case 'Architect':
        case 'Landscape Architect':
        case 'Art Director':
        case 'Design Director':
          $returnVal = true;
          break;
      }

      return $returnVal;
    });

    $primaryPeopleString = '';
    $count = 0;

    if($primaryPeople) {
      foreach($primaryPeople as $primaryPerson) { 
        if($count > 0) $primaryPeopleString .= ', ';
        $primaryPeopleString .= ($primaryPerson->person_name);

        $count++;
      }
    } else {
      $primaryPeopleString = 'the Cooper-Hewitt Collection';
    }

    return $primaryPeopleString;
  }
?>