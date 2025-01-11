<iframe src="<?= $file['path'] ?>" class="w-100" style="height: 600px; border: none;"></iframe>
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
        // Détermine le type de contenu
        $mime_type = mime_content_type($file['path']);
        header("Content-Type: $mime_type");
        readfile($file['path']);
        exit;
    }
}
header("Location: dashboard.php");
exit;
?>
