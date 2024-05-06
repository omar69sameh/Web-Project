<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'users';
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone_number = $_POST['Phone'];
    $message = $_POST['message'];
    $sql = "INSERT INTO contactinfo (name, email, phone_number, message) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssis', $name, $email, $phone_number, $message);
    if ($stmt->execute()) {
        header("Location: http://localhost/Web%20Project/Contact/Thankyou/thankyou.html");
    } else {
        echo 'Error: ' . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>
