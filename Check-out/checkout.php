<?php
// Check for the correct request method
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Database configuration
    $servername = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "users";

    // Create connection
    $conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve order details from GET query parameters
    $OrderID = $_GET['OrderID'] ?? 0;
    $OrderDate = $_GET['OrderDate'] ?? '';
    $TotalQuantity = $_GET['TotalQuantity'] ?? 0;
    $TotalPrice = $_GET['TotalPrice'] ?? 0.0;

    // Prepare and execute the order INSERT query
    $orderInsertSql = $conn->prepare("INSERT INTO orders (OrderID, OrderDate, TotalQuantity, TotalPrice) VALUES (?, ?, ?, ?)");
    $orderInsertSql->bind_param("isid", $OrderID, $OrderDate, $TotalQuantity, $TotalPrice);

    if ($orderInsertSql->execute()) {
        echo "Order data inserted successfully";
    } else {
        echo "Error inserting order data: " . $conn->error;
    }
    $orderInsertSql->close();

    // Close the connection
    $conn->close();
} else {
    echo "Invalid request method. Only GET is accepted.";
}
?>
