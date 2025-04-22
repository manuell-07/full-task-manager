<?php
require '../commons/db.php';
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        trim($_POST['title']) != '' &&
        isset($_SESSION['user_id']) &&
        trim($_POST['category_id']) != ''
    ) {
        try {
            if (!empty($_POST['id'])) {
                // UPDATE
                $q = "UPDATE task.task SET title = :title, description = :description, due_date = :due_date, completed = :completed, category_id = :category_id WHERE id = :id AND user_id = :user_id";
                $stmt = $db->prepare($q);
                $stmt->execute([
                    ":title" => $_POST["title"],
                    ":description" => $_POST["description"],
                    ":due_date" => $_POST["due_date"],
                    ":completed" => isset($_POST["completed"]) ? 1 : 0,
                    ":category_id" => $_POST["category_id"],
                    ":id" => $_POST["id"],
                    ":user_id" => $_SESSION['user_id']
                ]);
            } else {
                // CREATE
                $q = "INSERT INTO task.task(title, description, due_date, completed, user_id, category_id)
                      VALUES (:title, :description, :due_date, :completed, :user_id, :category_id)";
                $stmt = $db->prepare($q);
                $stmt->execute([
                    ":title" => $_POST["title"],
                    ":description" => $_POST["description"],
                    ":due_date" => $_POST["due_date"],
                    ":completed" => isset($_POST["completed"]) ? 1 : 0,
                    ":user_id" => $_SESSION['user_id'],
                    ":category_id" => $_POST["category_id"]
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

