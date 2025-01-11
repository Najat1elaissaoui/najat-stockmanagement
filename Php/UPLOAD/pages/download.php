<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: ../login.php");
    exit;
}

include '../config/db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $pdo->prepare("SELECT * FROM files WHERE id = ?");
    $stmt->execute([$id]);
    $file = $stmt->fetch();

    if ($file && file_exists($file['path'])) {
        // Force le téléchargement
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file['path']) . '"');
        header('Content-Length: ' . filesize($file['path']));
        readfile($file['path']);
        exit;
    }
}
header("Location: dashboard.php");
exit;
?>
