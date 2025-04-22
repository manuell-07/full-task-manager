<?php
session_start();
require '../commons/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $db->prepare("SELECT * FROM task.usr WHERE email = :email AND password = :pwd");
    $stmt->execute([
        'email' => $email,
        'pwd' => $password
    ]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Aquí la corrección clave:
    if ($user) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        header('Location: /full-task-manager-copia/index.html');
        exit;
    } else {
        header('Location: ../../login.html?error=1');
        exit;
    }
}
