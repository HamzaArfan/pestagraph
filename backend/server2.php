<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get domain parameter from URL
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_parts = explode('/', $uri);
$domain = end($uri_parts);

// Function to make API request
function getCompanyData($domain) {
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://b2b-company-data-enrichment1.p.rapidapi.com/companies/enrich?domain=" . urlencode($domain),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: b2b-company-data-enrichment1.p.rapidapi.com",
            "x-rapidapi-key: Izk7uHBUVcmshQqKrqmko9WywG6Fp12gmsajsnDzGBPAODILlb"
        ],
        CURLOPT_SSL_VERIFYPEER => false // Similar to unverified context in Python
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return ["error" => $err];
    } else {
        return json_decode($response, true);
    }
}

// Check if this is an API request
if (strpos($uri, '/api/company/') !== false) {
    try {
        $result = getCompanyData($domain);
        echo json_encode($result);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Not found"]);
}
?>