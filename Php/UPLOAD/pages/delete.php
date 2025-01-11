<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: ../login.php");
    exit;
}

include '../config/db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Récupérer le fichier
    $stmt = $pdo->prepare("SELECT * FROM files WHERE id = ?");
    $stmt->execute([$id]);
    $file = $stmt->fetch();

    if ($file) {
        // Supprimer le fichier physique
        if (file_exists($file['path'])) {
            unlink($file['path']);
        }

        // Supprimer l'entrée de la base de données
        $delete_stmt = $pdo->prepare("DELETE FROM files WHERE id = ?");
        $delete_stmt->execute([$id]);

        header("Location: dashboard.php");
        exit;
    }
}
header("Location: dashboard.php");
exit;
?>
