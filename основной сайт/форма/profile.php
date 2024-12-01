<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: form.html');
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();

    // Если администратор, получаем всех пользователей
    $allUsers = [];
    if ($_SESSION['user_role'] === 'admin') {
        $stmt = $pdo->query("SELECT name, email, created_at FROM users");
        $allUsers = $stmt->fetchAll();
    }
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: linear-gradient(45deg, #0066cc, #003366);
            min-height: 100vh;
            padding: 20px;
        }

        .profile-container {
            background: white;
            border-radius: 10px;
            padding: 20px;
            max-width: 600px;
            margin: 20px auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
        }

        .profile-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }

        .profile-data {
            margin: 20px 0;
        }

        .data-item {
            margin: 15px 0;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
        }

        .data-label {
            font-weight: bold;
            color: #0066cc;
            margin-bottom: 5px;
        }

        .data-value {
            color: #333;
        }

        .logout-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #0066cc;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }

        .logout-btn:hover {
            background-color: #0052a3;
        }

        .back-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #fff;
            color: #0066cc;
            text-decoration: none;
            border: 2px solid #0066cc;
            border-radius: 5px;
            margin-right: 10px;
        }

        .back-btn:hover {
            background-color: #f8f9fa;
        }

        .admin-section {
            margin-top: 30px;
        }

        .admin-section h2 {
            color: #333;
            margin-bottom: 15px;
        }

        .user-list {
            list-style: none;
            padding: 0;
        }

        .user-list li {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <div class="profile-header">
            <h1>Личный кабинет</h1>
        </div>
        <div class="profile-data">
            <div class="data-item">
                <div class="data-label">Имя:</div>
                <div class="data-value"><?php echo htmlspecialchars($user['name']); ?></div>
            </div>
            <div class="data-item">
                <div class="data-label">Email:</div>
                <div class="data-value"><?php echo htmlspecialchars($user['email']); ?></div>
            </div>
            <div class="data-item">
                <div class="data-label">Дата регистрации:</div>
                <div class="data-value"><?php echo htmlspecialchars($user['created_at']); ?></div>
            </div>
        </div>
        <div style="text-align: center;">
            <a href="../index.html" class="back-btn">На главную</a>
            <a href="logout.php" class="logout-btn">Выйти</a>
        </div>

        <?php if ($_SESSION['user_role'] === 'admin'): ?>
        <div class="admin-section">
            <h2>Пользователи</h2>
            <ul class="user-list">
                <?php foreach ($allUsers as $u): ?>
                <li>
                    <strong>Имя:</strong> <?php echo htmlspecialchars($u['name']); ?><br>
                    <strong>Email:</strong> <?php echo htmlspecialchars($u['email']); ?><br>
                    <strong>Дата регистрации:</strong> <?php echo htmlspecialchars($u['created_at']); ?>
                </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php endif; ?>
    </div>
</body>
</html>
