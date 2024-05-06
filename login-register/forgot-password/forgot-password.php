<?php
header('Content-Type: application/json');
try{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "users";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $email = $conn->real_escape_string($_POST['email']);
    
    $stmt = $conn->prepare("SELECT * FROM clients WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $response = array();
    
    if ($result->num_rows > 0) {
        $response['message'] = "Email is already in the database.";
    } else {
        $response['message'] = "Email is not valid.";
    }
    
    $stmt->close();
    $conn->close();
    
        // Send the JSON response
    echo json_encode($response, JSON_PRETTY_PRINT);
}catch (Exception $e) {
    // Catch any errors and return a JSON error message
    http_response_code(500); // Set a 500 Internal Server Error response code
    echo json_encode(array("error" => $e->getMessage()));
    exit;}
?>
