<?php
// Configuration de la base de données
$host = 'localhost:3307';
$username = 'root';
$password = '';
$dbname = 'studentdb';

// Création de la connexion
$conn = new mysqli($host, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}
?>
