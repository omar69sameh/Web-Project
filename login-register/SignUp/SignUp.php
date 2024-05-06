<?php
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "users";

// database connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// check if email already exists
function emailExists($conn, $email) {
    $stmt = $conn->prepare("SELECT * FROM clients WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0;
}

if (isset($_POST['Firstname']) && isset($_POST['Lastname']) && isset($_POST['email']) && isset($_POST['password'])) {
    $firstName = $_POST['Firstname'];
    $lastName = $_POST['Lastname'];
    $email = $_POST['email'];
    $formPassword = $_POST['password'];

    // Check if email already exists
    if (emailExists($conn, $email)) {
        echo "Email already in use.";
    } else {
        // Hash the password
        $hashedPassword = password_hash($formPassword, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO clients (firstname, lastname, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

        if ($stmt->execute()) {
            echo "New account created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }
    }
} else {
    echo "All fields are required.";
}

$conn->close();
?>
