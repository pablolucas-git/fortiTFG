<?php

class DatabaseConn
{
    protected $conn;


    function __construct()
    {
        $servername = "localhost";
        $username = "forti";
        $password = "forti";
        $dbname = "forti";

        // Create connection
        $this->conn = new mysqli($servername, $username, $password, $dbname);
    }

    function comprobarLogin($username, $password)
    {

        try {
            $sql = "SELECT * FROM Usuario u WHERE u.username='$username' AND u.password='$password'";
            
            $result = $this->conn->query($sql);
            echo "\n" . $username . "\n" . $password . "\n";
            echo $result->fetch_assoc();
        } catch (Exception $e) {
            echo $e;
        }
        if ($result->num_rows > 0) {
            return true;
        }
        return false;
    }
    function comprobarRegistro($datos)
    {

        $email = $datos["email"];
        $username = $datos["username"];
        $password = $datos["password"];
        $nombre = $datos["nombre"];
        echo 'aqui';

        $problemaMail = false;
        $problemaUser = false;


        try {
            $sql = "SELECT * FROM Usuario WHERE username='$username'";
            $result = $this->conn->query($sql);
        } catch (Exception $e) {
            echo $e;
        }
        if ($result->num_rows > 0) {
            $problemaUser = true;
        }

        try {
            $sql = "SELECT * FROM Usuario WHERE email='$email'";
            $result = $this->conn->query($sql);
        } catch (Exception $e) {
            echo $e;
        }
        if ($result->num_rows > 0) {
            $problemaMail = true;
        }






        if ($problemaMail) {
            return 'mail';
        }
        if ($problemaUser) {
            return 'user';
        }

        $id = $this->asignarId();

        $sql = "INSERT INTO Usuario VALUES($id, '$nombre', '$username', '$password', '$email')";


        if ($this->conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            return false;
        }

        return true;
    }

    function asignarId()
    {
        $existeID = false;
        do {
            $existeID = false;
            $id = random_int(0, 2147483646);
            try {
                $sql = "SELECT * FROM Usuario WHERE id=" . $id;
                $result = $this->conn->query($sql);
            } catch (Exception $e) {
                echo $e;
            }
            if ($result->num_rows > 0) {
                $existeID = true;
            }
        } while ($existeID);

        return $id;
    }
}