<?php
    $host = 'localhost';
    $port = '5433';
    $user = 'postgres';
    $pass = '123456789';
    $db_name = 'task_tool';

    try {
        $db = new PDO('pgsqñ:host=$host;port=$port;db_name=$db_name',
        $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    } catch(PDOException $e) {
        echo 'Error de conexion' . $e->getMessage();
        exit();
    }
?>