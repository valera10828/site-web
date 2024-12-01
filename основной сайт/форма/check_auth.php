<?php
session_start();
header('Content-Type: application/json');

$response = [
    'isLoggedIn' => isset($_SESSION['logged_in']) && $_SESSION['logged_in'],
    'user' => null
];

if ($response['isLoggedIn']) {
    $response['user'] = [
        'id' => $_SESSION['user_id'],
        'name' => $_SESSION['user_name'],
        'email' => $_SESSION['user_email']
    ];
}

echo json_encode($response);
?>
