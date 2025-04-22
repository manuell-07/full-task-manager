<?php
require '../commons/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_SESSION['user_id'])) {
        try {
            $user_id = $_SESSION['user_id'];
            $q = "SELECT * FROM task.task WHERE user_id = :user_id";
            $stmt = $db->prepare($q);
            $stmt->execute(["user_id" => $user_id]);
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($tasks);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            exit();
        }
    } else {
        echo json_encode(["error" => "No autenticado"]);
    }
}
?>
