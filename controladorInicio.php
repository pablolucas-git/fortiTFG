<?php

require_once("DatabaseConn.php");



if (isset($_POST["login"])) {
    iniciarSesion();
}
if (isset($_POST["registro"])) {
    registrar();
}

function registrar()
{
    $database = new DatabaseConn();
    $email = $_POST["email"];
    $foto = $_FILES["foto"];
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $nombre = $_POST["nombre"];
    $res = $database->comprobarRegistro(["email" => $email, "username" => $username, "nombre" => $nombre, "password" => $password]);
    if($res == "mail"){
        echo "problemaMail";
    }
    else if($res == "user"){
        echo "problemaUser";
    }
    else if($res){
        echo 'registrado';
    }
    else{
        echo 'fallo';
    }
}

function iniciarSesion(){
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $database = new DatabaseConn();
    if($database->comprobarLogin($username, $password)){
        echo 'loggeado';
    }
    else{
        echo 'fallo';
    }
}