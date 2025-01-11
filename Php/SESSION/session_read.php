<?php
// Démarrer la session
session_start();

// Lire les données de la session
if (isset($_SESSION['username']) && isset($_SESSION['email'])) {
    $message = "Username: " . $_SESSION['username'] . "\\nEmail: " . $_SESSION['email'];
} else {
    $message = "No session data found.";
}

echo "<script type='text/javascript'>alert('$message'); window.location.href = 'index.html';</script>";
?>
