<?php
session_start(); // Start the session to store the CAPTCHA text

// Generate a random string
$captchaText = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 0, 6);
$_SESSION['captcha'] = $captchaText; // Store the text in a session variable

// Create the image
$image = imagecreate(150, 50); // Width: 150px, Height: 50px
$bgColor = imagecolorallocate($image, 255, 255, 255); // White background
$textColor = imagecolorallocate($image, 0, 0, 0); // Black text

// Add noise (optional)
for ($i = 0; $i < 50; $i++) {
    $noiseColor = imagecolorallocate($image, rand(150, 255), rand(150, 255), rand(150, 255));
    imagesetpixel($image, rand(0, 150), rand(0, 50), $noiseColor);
}

// Add the text to the image
imagestring($image, 5, 30, 15, $captchaText, $textColor);

// Output the image
header("Content-Type: image/png");
imagepng($image);
imagedestroy($image); // Free memory
?>
