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

// ** تنفيذ استعلام SELECT لاسترجاع جميع الألعاب **
$stmt = $pdo->prepare("SELECT * FROM add_game");
$stmt->execute();
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ** إعادة البيانات كـ JSON **
echo json_encode(["status" => "success", "data" => $games]);
?>
