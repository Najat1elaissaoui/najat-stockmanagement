<?php
include 'db.php';

// Récupérer toutes les tâches de la base de données
$sql = "SELECT * FROM tasks";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Tâches</title>
    <!-- Inclure Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Inclure Font Awesome pour les icônes -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Liste des Tâches</h1>
        <a href="add.php" class="btn btn-primary mb-4"><i class="fas fa-plus"></i> Ajouter une Tâche</a>

        <div class="list-group">
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <span><?php echo htmlspecialchars($row['task_name']); ?></span>
                    <span class="d-flex">
                        <a href="edit.php?id=<?php echo $row['id']; ?>" class="btn btn-warning btn-sm mr-2">
                            <i class="fas fa-edit"></i> Modifier
                        </a>
                        <a href="delete.php?id=<?php echo $row['id']; ?>" class="btn btn-danger btn-sm">
                            <i class="fas fa-trash-alt"></i> Supprimer
                        </a>
                    </span>
                </div>
            <?php endwhile; ?>
        </div>
    </div>

    <!-- Inclure Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
