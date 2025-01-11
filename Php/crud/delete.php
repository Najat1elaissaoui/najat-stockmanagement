<?php
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Supprimer la tâche de la base de données
    $sql = "DELETE FROM tasks WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php"); // Rediriger vers la page d'accueil après suppression
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
