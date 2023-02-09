<?php
$servername = "localhost";
$username = "forti";
$password = "forti";
$dbname = "forti";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);


// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$user_id = $_POST["userid"];
$nombre = "";

try{
  $sql = "SELECT * FROM Usuario WHERE id=" . $user_id;
  $result = $conn->query($sql);
}
catch(Exception $e){
  echo $e;
}
  if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
      $nombre = $row["nombre"];
    }
  }



$sql = "SELECT * FROM Posts WHERE usuario=" . $user_id;
$result = $conn->query($sql);
$posts = array();
try{
  
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $imagen = null;
    if ($row["imagen"] == 1) {
      $imagen = $row["id"] . ".jpg";
    }

    $post = [
      "header" => [
        "foto" => $row["usuario"] . ".jpg",
        "nombre" => $nombre
      ],
      "contenido" => [
        "texto" => $row["texto"],
        "imagen" => $imagen
      ],
      "comentarios" => null
    ];
    $posts[] = $post;
  }
} else {
  echo "0 results";
}
}
catch(Exception $e){
  echo 'nop';
}
try{
  header('Content-type: application/json');
  echo json_encode( $posts );
}
catch(Exception $e){
  echo 'nop';
}