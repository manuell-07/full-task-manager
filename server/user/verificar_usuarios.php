<?php
require '../commons/db.php';

try {
    $stmt = $db->query("SELECT id, name, email, password FROM task.usr");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$usuarios) {
        echo "No se encontraron usuarios en la base de datos.";
    } else {
        echo "<h2>Usuarios encontrados en la base de datos:</h2>";
        echo "<ul>";
        foreach ($usuarios as $user) {
            echo "<li>";
            echo "ID: " . htmlspecialchars($user['id']) . "<br>";
            echo "Nombre: " . htmlspecialchars($user['name']) . "<br>";
            echo "Email: " . htmlspecialchars($user['email']) . "<br>";
            echo "Password (en base de datos): " . htmlspecialchars($user['password']) . "<br>";
            echo "<hr>";
            echo "</li>";
        }
        echo "</ul>";
    }
} catch (PDOException $e) {
    echo "Error al consultar la base de datos: " . $e->getMessage();
}
