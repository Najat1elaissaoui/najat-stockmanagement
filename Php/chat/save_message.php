<?php
require('ChatRooms.php');

// Check if data was posted
if (!isset($_POST['user_id']) || !isset($_POST['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required data (user_id or message)."]);
    exit;
}

$user_id = $_POST['user_id'];
$message = $_POST['message'];

echo "Debug: user_id = $user_id, message = $message\n";

try {
    $chat_object = new ChatRooms();
    $chat_object->save_message($user_id, $message);
    echo "Message saved successfully.";
} catch (Exception $e) {
    error_log($e->getMessage(), 3, '/path/to/error.log');
    echo "Error: " . $e->getMessage();
}

?>
