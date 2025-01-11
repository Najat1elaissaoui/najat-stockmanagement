<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['task_name'])) {
    $task_name = htmlspecialchars($_POST['task_name']);
    
    $sql = "INSERT INTO tasks (task_name) VALUES ('$task_name')";
    
    if ($conn->query($sql) === TRUE) {
        header("Location: index.php"); // Rediriger vers la page d'accueil après ajout
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter une Tâche</title>
    <!-- Inclure Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Inclure Font Awesome pour les icônes -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Ajouter une Tâche</h1>
        <form action="add.php" method="POST">
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="task_name" placeholder="Nom de la tâche" required>
                <button class="btn btn-success" type="submit">
                    <i class="fas fa-check"></i> Ajouter
                </button>
            </div>
        </form>
        <a href="index.php" class="btn btn-secondary">Retour à la liste des tâches</a>
    </div>

    <!-- Inclure Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
