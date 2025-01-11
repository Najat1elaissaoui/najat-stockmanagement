<?php
// Démarrer la session
session_start();

// Stocker des données dans la session
$_SESSION['username'] = 'JohnDoe';
$_SESSION['email'] = 'john.doe@example.com';

echo "<script type='text/javascript'>alert('Session started and data stored.'); window.location.href = 'index.html';</script>";
?>
