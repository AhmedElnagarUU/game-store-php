<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'game_store';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]));
}

// ** استقبال بيانات JSON وتحويلها إلى مصفوفة **  
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["status" => "error", "message" => "Invalid JSON data"]));
}

// ** تحضير استعلام الإدخال **
$stmt = $pdo->prepare("INSERT INTO add_game (name, surname, price, `desc1`, link, `release1`, platforms, genre, developers, publishers, inCart, selected, isHovered, isLiked, rating, cover, footage) 
VALUES (:name, :surname, :price, :desc, :link, :release, :platforms, :genre, :developers, :publishers, :inCart, :selected, :isHovered, :isLiked, :rating, :cover, :footage)");

$stmt->execute([
    ':name' => $data['name'] ?? '',
    ':surname' => $data['surname'] ?? '',
    ':price' => $data['price'] ?? '',
    ':desc' => $data['desc'] ?? '',
    ':link' => $data['link'] ?? '',
    ':release' => $data['release'] ?? '',
    ':platforms' => $data['platforms'] ?? '',
    ':genre' => $data['genre'] ?? '',
    ':developers' => $data['developers'] ?? '',
    ':publishers' => $data['publishers'] ?? '',
    ':inCart' => "True",
    ':selected' =>"True",
    ':isHovered' => "True",
    ':isLiked' => "True",
    ':rating' => $data['rating'] ?? '',
    ':cover' => $data['cover'] ?? '',
    ':footage' => $data['footage'] ?? ''
]);

echo json_encode(["status" => "success", "message" => "Game added successfully!"]);
?>
