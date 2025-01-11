<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Application</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            background-color: #f5f5f5;
            font-family: 'Arial', sans-serif;
        }
        .chat-container {
            max-width: 100px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        #chat-box {
            height: 100px;
            overflow-y: scroll;
            padding: 20px;
            border-bottom: 1px solid #ddd;
        }
        .message {
            display: flex;
            margin-bottom: 10px;
        }
        .message .username {
            font-weight: bold;
            margin-right: 10px;
            color: rgb(67, 132, 190);
        }
        .message .content {
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 20px;
            max-width: 70%;
        }
        .my-message .content {
            background-color: rgb(54, 109, 171);
            color: white;
            align-self: flex-end;
        }
        .others-message .content {
            background-color: #f1f1f1;
        }
        #message-form {
           
            padding: 10px;
            background-color: rgb(54, 109, 171);
        }
        #message-input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 20px;
            margin-right: 10px;
        }
        #send-button {
            padding: 10px;
            background-color: #fff;
            border: none;
            border-radius: 50%;
            cursor: pointer;
        }
        #send-button:hover {
            background-color: rgb(54, 109, 171);
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <h1 class="text-center p-3 text-white" style="background-color: rgb(54, 109, 171);">Welcome, <?= $_SESSION['username']; ?></h1>
        <div id="chat-box"></div>

        <form id="message-form">
            <input type="text" id="message-input" placeholder="Type a message..." required>
            <button type="button" id="send-button"><i class="fas fa-paper-plane"></i></button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function fetchMessages() {
            $.get('fetch_messages.php', function(data) {
                $('#chat-box').html(data);
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            });
        }

        $('#send-button').click(function() {
            var message = $('#message-input').val();
            if (message.trim() !== "") {
                $.post('send_message.php', { message: message }, function() {
                    $('#message-input').val('');
                    fetchMessages();
                });
            }
        });

        setInterval(fetchMessages, 2000);
        fetchMessages();
    </script>
</body>
</html>
