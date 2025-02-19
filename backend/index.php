<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if phone_number exists in the request
if (!isset($data['phone_number']) || empty($data['phone_number'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Phone number is required']);
    exit();
}

// Store your API token securely (consider using environment variables or a config file)
$api_token = "6653420429:jJSmds3a";
$api_url = "https://leakosintapi.com/";

// Prepare the request to the external API
$phone_number = $data['phone_number'];
$request_data = [
    'token' => $api_token,
    'request' => $phone_number,
    'limit' => 100,
    'lang' => 'en'
];

// Initialize cURL session
$ch = curl_init($api_url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($request_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Execute cURL session
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'API request failed: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

// Get HTTP status code
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Forward the response status and data
http_response_code($http_code);
echo $response;
?>