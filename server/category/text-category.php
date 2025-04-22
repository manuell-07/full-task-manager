<?php
require '../commons/db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "Usuario no autenticado.";
    exit;
}

try {
    $user_id = $_SESSION['user_id'];

    $stmt = $db->prepare("SELECT * FROM task.category WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<h2>Categorías del usuario $user_id:</h2>";
    echo "<ul>";
    foreach ($categorias as $cat) {
        echo "<li><strong>ID:</strong> {$cat['id']} - <strong>Nombre:</strong> {$cat['name']}</li>";
    }
    echo "</ul>";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
