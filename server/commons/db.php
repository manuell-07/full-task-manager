<?php
$host = 'localhost';
$port = '5432';
$user = 'postgres';
$pass = '123456789';
$db_name = 'task-tool';

try {
    $db = new PDO("pgsql:host=$host;port=$port;dbname=$db_name",
    $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    echo 'Error de conexion' . $e->getMessage();
    exit();
}
?>