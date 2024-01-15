<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $subject = $_POST["subject"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $date = $_POST["hire-date"];

    // Create a string with the form data
    $data = "Subject: $subject\nEmail: $email\nMessage: $message\nDate: $date\n\n";

    // Specify the file path
    $file_path = "submissions.txt";

    // Open the file in append mode and write the data
    file_put_contents($file_path, $data, FILE_APPEND | LOCK_EX);

    // You can add further processing or redirect the user to a thank you page if needed
    header("Location: thank_you.html");
    exit();
}
?>
