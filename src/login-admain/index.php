<?php
// Enable error reporting for debugging
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'game_store');
define('DB_USER', 'root');
define('DB_PASS', '');

// Set headers for CORS - more permissive for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request


// Log incoming request for debugging
$logMessage = date('Y-m-d H:i:s') . ': Request received' . PHP_EOL;
file_put_contents('auth_log.txt', $logMessage, FILE_APPEND);

// Get request data
$requestData = file_get_contents('php://input');
$logMessage = date('Y-m-d H:i:s') . ': Request data: ' . $requestData . PHP_EOL;
file_put_contents('auth_log.txt', $logMessage, FILE_APPEND);

// Decode JSON
$requestData = json_decode($requestData, true);

// Check if action is set
if (!isset($requestData['action'])) {
    sendResponse(false, 'No action specified', 400);
  
}

// Connect to database
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
    file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Database connected' . PHP_EOL, FILE_APPEND);
} catch (PDOException $e) {
    file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Database error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
    sendResponse(false, 'Database connection failed: ' . $e->getMessage(), 500);
  
}

// Process different actions
switch ($requestData['action']) {
    case 'login':
        handleLogin($pdo, $requestData);
   
        break;
    case 'register':
        handleRegister($pdo, $requestData);
        break;
    default:
        sendResponse(false, 'Invalid action', 400);
}

/**
 * Handle user login
 * 
 * @param PDO $pdo Database connection
 * @param array $data Request data
 */
function handleLogin($pdo, $data) {
    // Validate required fields
    if (empty($data['username']) || empty($data['password'])) {
        sendResponse(false, 'Username and password are required', 400);
        return;
    }

    try {
        // Prepare statement
        $stmt = $pdo->prepare("SELECT id, fullName, email, password FROM admain WHERE username = :username");
        $stmt->execute(['username' => $data['username']]);
        $user = $stmt->fetch();

        // Check if user exists
        if (!$user) {
            sendResponse(false, 'Invalid username or password', 401);
            return;
        }

        // Verify password
        if (!password_verify($data['password'], $user['password'])) {
            sendResponse(false, 'Invalid username or password', 401);
            return;
        }

        // User authenticated successfully
        // Remove password from response data
        unset($user['password']);
        
        // Add authentication token (you might want to implement JWT here)
        $user['token'] = generateAuthToken($user['id']);
        
        // Update last login timestamp
        $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
        $updateStmt->execute(['id' => $user['id']]);

        sendResponse(true, 'Login successful', 200, $user);
    } catch (PDOException $e) {
        file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Login error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
        sendResponse(false, 'Login failed: ' . $e->getMessage(), 500);
    }
}

/**
 * Handle user registration
 * 
 * @param PDO $pdo Database connection
 * @param array $data Request data
 */
function handleRegister($pdo, $data) {
    // Log the registration attempt
    file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Registration attempt with data: ' . json_encode($data) . PHP_EOL, FILE_APPEND);

    // Validate required fields
    if (empty($data['fullName']) || empty($data['email']) || empty($data['password']) || empty($data['confirmPassword'])) {
        sendResponse(false, 'All fields are required', 400);
        return;
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, 'Invalid email format', 400);
        return;
    }

    // Validate password match
    if ($data['password'] !== $data['confirmPassword']) {
        sendResponse(false, 'Passwords do not match', 400);
        return;
    }

    // Generate username from email (before @ symbol)
    $username =$data['email'];

    try {
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
        $stmt->execute(['email' => $data['email']]);
        
        if ($stmt->rowCount() > 0) {
            sendResponse(false, 'Email already registered', 409);
            return;
        }
        
        // Check if username exists, if so, append a number
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        
        if ($stmt->rowCount() > 0) {
            // Username exists, append a random number
            $username = $username . rand(100, 999);
        }
        
        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Insert new user
        $stmt = $pdo->prepare("
            INSERT INTO admain (fullName, email, username, password, created_at) 
            VALUES (:fullName, :email, :username, :password, NOW())
        ");
        
        $result = $stmt->execute([
            'fullName' => $data['fullName'],
            'email' => $data['email'],
            'username' => $username,
            'password' => $hashedPassword
        ]);
        
        if ($result) {
            file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Registration successful for: ' . $data['email'] . PHP_EOL, FILE_APPEND);
            sendResponse(true, 'Registration successful', 201, ['username' => $username]);
        } else {
            file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Registration failed - query returned false' . PHP_EOL, FILE_APPEND);
            sendResponse(false, 'Registration failed', 500);
        }
    } catch (PDOException $e) {
        file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Registration error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
        sendResponse(false, 'Registration failed: ' . $e->getMessage(), 500);
    }
}

/**
 * Generate a simple authentication token
 * In a production environment, use JWT or another secure token method
 * 
 * @param int $userId User ID
 * @return string Authentication token
 */
function generateAuthToken($userId) {
    // This is a simple example. In production, use JWT or another secure token system
    return bin2hex(random_bytes(32)) . '_' . $userId;
}

/**
 * Send JSON response
 * 
 * @param bool $success Success status
 * @param string $message Response message
 * @param int $statusCode HTTP status code
 * @param array $data Additional response data
 */
function sendResponse($success, $message, $statusCode = 200, $data = []) {
    http_response_code($statusCode);
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data
    ];
    
    // Log the response
    file_put_contents('auth_log.txt', date('Y-m-d H:i:s') . ': Response: ' . json_encode($response) . PHP_EOL, FILE_APPEND);
    
    echo json_encode($response);

}