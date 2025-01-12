<?php
session_start();
$captchaError = ""; // Variable to store error message
$captchaSuccess = ""; // Variable to store success message

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the CAPTCHA is correct
    $userInput = $_POST['captcha'];
    if ($userInput === $_SESSION['captcha']) {
        $captchaSuccess = "CAPTCHA verified successfully!";
    } else {
        $captchaError = "CAPTCHA does not match. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CAPTCHA Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>CAPTCHA Verification</h1>
        <form method="POST">
            <label for="captcha">Enter CAPTCHA:</label><br>
            <img src="captcha.php" alt="CAPTCHA Image"><br>
            <input type="text" name="captcha" id="captcha" required>
            <button type="submit">Verify</button>
        </form>
        
        <!-- Display success or error message only after form submission -->
        <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
            <p class="message <?php echo !empty($captchaError) ? 'error' : ''; ?> <?php echo !empty($captchaSuccess) ? 'success' : ''; ?>">
                <?php echo htmlspecialchars($captchaError ? $captchaError : $captchaSuccess); ?>
            </p>
        <?php else: ?>
            <!-- Display nothing before submission -->
        <?php endif; ?>
    </div>
</body>
</html>
