<?php
require '../config/db.php'; // Connexion à la base de données

$message = ""; // Variable pour afficher les messages à l'utilisateur

// Traitement de l'upload du fichier
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Vérifier si le fichier a été téléchargé sans erreur
    if ($file['error'] == 0) {
        // Informations du fichier
        $file_name = basename($file['name']); // Nom du fichier
        $file_size = round($file['size'] / 1024, 2); // Taille du fichier en Ko
        $upload_dir = '../assets/uploads/';
        $file_path = $upload_dir . $file_name; // Chemin complet du fichier

        // Vérifier si le dossier d'upload existe, sinon le créer
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        // Déplacer le fichier dans le répertoire d'uploads
        if (move_uploaded_file($file['tmp_name'], $file_path)) {
            try {
                // Préparer la requête SQL pour insérer les infos dans la table "files"
                $stmt = $pdo->prepare("INSERT INTO files (name, size, path) VALUES (:name, :size, :path)");
                $stmt->bindParam(':name', $file_name, PDO::PARAM_STR);
                $stmt->bindParam(':size', $file_size, PDO::PARAM_STR);
                $stmt->bindParam(':path', $file_path, PDO::PARAM_STR);
                $stmt->execute();

                // Message de succès
                $message = "Le fichier a été téléchargé avec succès et enregistré dans la base de données.";
            } catch (PDOException $e) {
                // Gestion des erreurs SQL
                $message = "Erreur lors de l'enregistrement en base de données : " . $e->getMessage();
            }
        } else {
            $message = "Erreur lors du déplacement du fichier.";
        }
    } else {
        $message = "Erreur lors du téléchargement du fichier. Code erreur : " . $file['error'];
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uploader un Fichier</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f9f9fb;
            font-family: Arial, sans-serif;
        }
        .upload-container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .upload-header {
            background-color: #5a189a;
            color: #fff;
            padding: 15px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            font-size: 1.5rem;
        }
        .btn-upload {
            background-color: #5a189a;
            color: #fff;
            border: none;
        }
        .btn-upload:hover {
            background-color: #7b2cbf;
        }
        .alert {
            margin-top: 15px;
        }
        .btn-back {
            background-color: #f72585;
            color: #fff;
        }
        .btn-back:hover {
            background-color: #d00077;
        }
    </style>
</head>
<body>
<div class="upload-container">
    <div class="upload-header">
        Uploader un Nouveau Fichier
    </div>
    <div class="card-body">
        <?php if ($message) { echo "<div class='alert alert-info text-center'>$message</div>"; } ?>
        <form method="POST" enctype="multipart/form-data">
            <div class="form-group mb-3">
                <label for="file" class="form-label">Sélectionner un fichier :</label>
                <input type="file" name="file" class="form-control" id="file" required>
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-upload">Uploader</button>
                <a href="dashboard.php" class="btn btn-back">Retour</a>
            </div>
        </form>
    </div>
</div>
</body>
</html>
