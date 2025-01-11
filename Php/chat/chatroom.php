<?php
include './config/db.php';
session_start();

// Verify if the user is logged in
if (!isset($_SESSION['userdata']) || !isset($_SESSION['userdata']['id'])) {
    header('Location: index.php');
    exit();
}

$user_id = $_SESSION['userdata']['id']; // Get the logged-in user's ID

$database_object = new Database_connection();
$connect = $database_object->connect();

// Initialize message variable for feedback
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['message'])) {
    $user_message = trim($_POST['message']);
    
    // Validate message input
    if (!empty($user_message)) {
        try {
            $sql = "INSERT INTO message (content, user_id) VALUES (:content, :user_id)";
            $stmt = $connect->prepare($sql);
            $stmt->execute([
                ':content' => $user_message,
                ':user_id' => $user_id
            ]);
            $message = "Message sent successfully!";
            header('Location: chatroom.php');
            exit();
        } catch (Exception $e) {
            $message = "Error sending message: " . htmlspecialchars($e->getMessage());
        }
    } else {
        $message = "Message cannot be empty.";
    }
}

// Fetch messages with usernames
$sql = "SELECT m.content, m.user_id, u.username 
        FROM message m 
        JOIN userdata u ON m.user_id = u.id 
        ORDER BY m.id";
$stmt = $connect->query($sql);
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Online Chat App</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .message {
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .my-message {
            background-color: #d1e7dd;
            align-self: flex-end;
        }
        .others-message {
            background-color: #f8d7da;
            align-self: flex-start;
        }
        .message-header {
            font-weight: bold;
        }
    </style>
</head>
<body>
<div class="container-fluid">
    <div class="row p-2 bg-primary text-white">
        <h2 class="col-12 text-center">Chat App</h2>
    </div>
    <?php if ($message): ?>
        <div class="alert alert-info text-center"><?= htmlspecialchars($message) ?></div>
    <?php endif; ?>
    <div class="row p-2 bg-light" style="height: 70vh; overflow-y: auto;">
        <?php while ($row = $stmt->fetch(PDO::FETCH_ASSOC)): ?>
            <?php
            $is_current_user = $row['user_id'] == $user_id;
            $message_class = $is_current_user ? "my-message" : "others-message";
            $username = $is_current_user ? "Me" : htmlspecialchars($row['username']);
            ?>
            <div class="col-12">
                <div class="d-flex <?= $is_current_user ? 'justify-content-end' : 'justify-content-start' ?>">
                    <div class="message <?= $message_class ?> p-2">
                        <div class="message-header"><?= $username ?>:</div>
                        <div><?= htmlspecialchars($row['content']) ?></div>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
    <form class="row p-2 bg-primary send-message" action="chatroom.php" method="POST">
        <div class="col-9 col-md-10">
            <input type="text" name="message" class="form-control" placeholder="Write your message" required>
        </div>
        <div class="col-3 col-md-2">
            <button type="submit" class="btn btn-light form-control">Send</button>
        </div>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
