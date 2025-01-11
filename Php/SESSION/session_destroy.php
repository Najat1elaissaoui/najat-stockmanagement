<?php
// Démarrer la session
session_start();

// Détruire toutes les données de la session
session_unset();
session_destroy();

echo "<script type='text/javascript'>alert('Session destroyed.'); window.location.href = 'index.html';</script>";
?>
