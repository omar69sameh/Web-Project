<?php
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "users";

//database connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// check if email and password match
function verifyLogin($conn, $email, $password) {
    $email = mysqli_real_escape_string($conn, $email);
    $result = $conn->query("SELECT * FROM clients WHERE email = '$email'");
    
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];
        
        if (password_verify($password, $hashedPassword)) {
            return true; 
        }
    }
    
    return false;
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email and password match
    if (verifyLogin($conn, $email, $password)) {
        echo "Login successful. Welcome, $email!";
    } else {
        echo "Invalid email or password. Please sign up or try again.";
    }
} else {
    echo "Email or password not provided.";
}
$conn->close();
?>
