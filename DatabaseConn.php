<?php

class DatabaseConn
{



    const hola = "ddd";
    function comprobarLogin($username, $password)
    {
        return true;
    }
    function comprobarRegistro($datos)
    {

        $email = $datos["email"];
        $username = $datos["username"];
        $password = $datos["password"];
        $nombre = $datos["nombre"];


        $problemaMail = true;
        $problemaUser = true;
        $id = $this->asignarId();
        if ($problemaMail) {
            return 'mail';
        }
        if ($problemaUser) {
            return 'user';
        }
        return true;
    }

    function asignarId()
    {
        do {
            $id = random_int(0, PHP_INT_MAX);
        } while (false);

        return $id;
    }
}