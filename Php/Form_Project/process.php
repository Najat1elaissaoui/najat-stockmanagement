
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submitted Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .info-container {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 100%;
            max-width: 400px;
        }
        h2 {
            text-align: center;
            color: #163f03;
            margin-bottom: 20px;
        }
        p {
            color: #555;
            margin: 10px 0;
        }
        strong {
            color: #163f03;
        }
        .button-container {
            text-align: center;
        }
        button {
            background: #63ce33;
            color: #fff;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        button:hover {
            background: #50a926;
        }
    </style>
</head>
<body>
    <div class="info-container">
        <h2>Your Information</h2>
        <p><strong>Name:</strong> <?php echo htmlspecialchars($_POST['name']); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($_POST['email']); ?></p>
        <p><strong>Age:</strong> <?php echo htmlspecialchars($_POST['age']); ?></p>
        <p><strong>Bio:</strong> <?php echo nl2br(htmlspecialchars($_POST['bio'])); ?></p>
        <div class="button-container">
            <button onclick="window.history.back();">Edit Information</button>
        </div>
    </div>
</body>
</html>
