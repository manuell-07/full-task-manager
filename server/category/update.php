<?php
session_start();
require '../commons/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$user_id = $_SESSION['user_id'];
$id = $_POST['id'] ?? null;
$name = $_POST['name'] ?? '';

if (!$id || !$name) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$stmt = $conn->prepare("UPDATE task.category SET name = ? WHERE id = ? AND user_id = ?");
$stmt->bind_param('sii', $name, $id, $user_id);
$stmt->execute();

echo json_encode(['success' => true]);
