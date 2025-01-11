<?php 
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: ../login.php");
    exit;
}

include '../config/db.php';

// Récupérer le nombre de fichiers par page depuis l'URL ou définir une valeur par défaut
$files_per_page = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 10;

// Récupérer le nombre total de fichiers
$stmt = $pdo->query("SELECT COUNT(*) AS total FROM files");
$total_files = $stmt->fetchColumn();

// Calcul du nombre total de pages
$total_pages = ceil($total_files / $files_per_page);

// Récupérer la page actuelle
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $files_per_page;

// Récupérer les fichiers pour la page actuelle
$stmt = $pdo->prepare("SELECT * FROM files LIMIT :offset, :limit");
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':limit', $files_per_page, PDO::PARAM_INT);
$stmt->execute();
$files = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .center-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f9fa;
            padding: 20px;
        }
        .dashboard {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 1200px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        table {
            margin-top: 20px;
        }
        .pagination {
            justify-content: center;
        }
        .btn {
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <div class="center-container">
        <div class="dashboard">
            <div class="header">
                <h1 class="text-center mb-0">Admin Dashboard</h1>
                <div>
                
           
            <li>
                <a href="upload.php" style="background-color:rgb(150, 126, 199); color: white; padding: 8px 12px; text-decoration: none; border-radius: 5px;">
                Upload Files
                </a>
            </li>
            <li>
                <a href="logout.php" style="background-color:rgb(155, 44, 192); color: white; padding: 8px 12px; text-decoration: none; border-radius: 5px;">
                    Logout
                </a>
            </li>
                </div>
            </div>

           

            <table class="table table-bordered table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>File Name</th>
                       
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (count($files) > 0) {
                        foreach ($files as $row) {
                            echo "<tr>";
                            echo "<td>{$row['name']}</td>";
                           
                            echo "<td>
                                <a href='download.php?id={$row['id']}' class='btn btn-primary btn-sm'>Download</a>
                                <a href='view.php?id={$row['id']}' class='btn btn-info btn-sm'>View</a>
                                <a href='delete.php?id={$row['id']}' class='btn btn-danger btn-sm'>Delete</a>
                            </td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='3' class='text-center'>Aucun fichier disponible pour le moment.</td></tr>";
                    }
                    ?>
                </tbody>
            </table>

           
        </div>
    </div>
</body>
</html>
