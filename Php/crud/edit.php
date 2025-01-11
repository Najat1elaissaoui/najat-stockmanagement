<?php
include 'db.php';

// Vérifier si un ID est passé en paramètre
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Récupérer la tâche à modifier
    $sql = "SELECT * FROM tasks WHERE id = $id";
    $result = $conn->query($sql);
    $task = $result->fetch_assoc();
}

// Si le formulaire est soumis, mettre à jour la tâche
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['task_name'])) {
    $task_name = htmlspecialchars($_POST['task_name']);

    $sql = "UPDATE tasks SET task_name = '$task_name' WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php"); // Rediriger vers la page d'accueil après modification
        exit();
    } else {
        echo "Erreur: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier la Tâche</title>
    <!-- Inclure Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Inclure Font Awesome pour les icônes -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Modifier la Tâche</h1>

        <div class="card">
            <div class="card-body">
                <form action="edit.php?id=<?php echo $id; ?>" method="POST">
                    <div class="mb-3">
                        <label for="task_name" class="form-label">Nom de la Tâche</label>
                        <input type="text" class="form-control" id="task_name" name="task_name" value="<?php echo htmlspecialchars($task['task_name']); ?>" required>
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Enregistrer les Modifications
                    </button>
                    <a href="index.php" class="btn btn-secondary ms-2">
                        <i class="fas fa-arrow-left"></i> Retour à la Liste
                    </a>
                </form>
            </div>
        </div>
    </div>

    <!-- Inclure Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
