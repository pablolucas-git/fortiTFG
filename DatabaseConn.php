<?php

class DatabaseConn
{
    const servername = "localhost";
    const username = "forti";
    const password = "forti";
    const dbname = "forti";

    // Create connection
    const conn = new mysqli(servername, username, password, dbname);



    function comprobarLogin($username, $password)
    {

        try {
            $sql = "SELECT * FROM Usuario WHERE username=" . $username . " AND password= " . $password;
            $result = self::conn->query($sql);
        } catch (Exception $e) {
            echo $e;
        }
        if ($result->num_rows > 0) {
            return false;
        }
        return true;
    }
    function comprobarRegistro($datos)
    {

        $email = $datos["email"];
        $username = $datos["username"];
        $password = $datos["password"];
        $nombre = $datos["nombre"];

        $problemaMail = false;
        $problemaUser = false;


        try {
            $sql = "SELECT * FROM Usuario WHERE username=" . $username;
            $result = self::conn->query($sql);
        } catch (Exception $e) {
            echo $e;
        }
        if ($result->num_rows > 0) {
            $problemaUser = true;
        }

        try {
            $sql = "SELECT * FROM Usuario WHERE email=" . $email;
            $result = self::conn->query($sql);
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


        if (self::conn->query($sql) === TRUE) {
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
            $id = random_int(0, PHP_INT_MAX);
            try {
                $sql = "SELECT * FROM Usuario WHERE id=" . $id;
                $result = self::conn->query($sql);
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