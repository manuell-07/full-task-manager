<?php
require '../commons/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (trim($_POST['name']) != '' && isset($_SESSION['user_id'])) {
        try {
            if (!empty($_POST['id'])) {
                // UPDATE
                $q = "UPDATE task.category SET name = :name WHERE id = :id AND user_id = :user_id";
                $stmt = $db->prepare($q);
                $stmt->execute([
                    ":name" => $_POST["name"],
                    ":id" => $_POST["id"],
                    ":user_id" => $_SESSION['user_id']
                ]);
            } else {
                // CREATE
                $q = "INSERT INTO task.category(name, user_id) VALUES (:name, :user_id)";
                $stmt = $db->prepare($q);
                $stmt->execute([
                    ":name" => $_POST["name"],
                    ":user_id" => $_SESSION['user_id']
                ]);
            }
            header("Location: /full-task-manager-copia");
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            exit();
        }
    } else {
        echo 'Campos obligatorios vacíos.';
    }
}
?>
