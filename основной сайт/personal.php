<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .stats-container {
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 10px;
            padding: 20px;
            margin: 20px auto;
            max-width: 800px;
            color: #fff;
        }

        .stats-title {
            color: #00ffcc;
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
        }

        .game-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .game-stat-card {
            background: rgba(0, 255, 204, 0.1);
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            border: 1px solid #00ffcc;
        }

        .game-name {
            color: #00ffcc;
            font-size: 18px;
            margin-bottom: 10px;
        }

        .best-score {
            font-size: 24px;
            color: #fff;
            margin: 10px 0;
        }

        .no-stats {
            text-align: center;
            color: #888;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Личный кабинет</h1>
        
        <div class="stats-container">
            <h2 class="stats-title">Лучшие результаты в мини-играх</h2>
            <div class="game-stats" id="gameStats">
                <!-- Статистика будет добавлена через JavaScript -->
            </div>
        </div>

        <div class="controls">
            <button onclick="window.location.href='index.php'">На главную</button>
            <button onclick="resetStats()">Сбросить статистику</button>
        </div>
    </div>

    <script src="js/gameStats.js"></script>
    <script>
        // Отображение статистики
        function displayStats() {
            const statsContainer = document.getElementById('gameStats');
            const stats = GameStats.getAllStats();
            const gameNames = {
                'snake': 'Змейка',
                'dino': 'Динозаврик'
            };

            statsContainer.innerHTML = '';

            if (Object.keys(stats).length === 0) {
                statsContainer.innerHTML = '<div class="no-stats">Пока нет рекордов. Сыграйте в игры, чтобы установить новые рекорды!</div>';
                return;
            }

            for (const [game, score] of Object.entries(stats)) {
                if (game === 'minesweeper') continue;
                const gameName = gameNames[game] || game;
                const cardHtml = `
                    <div class="game-stat-card">
                        <div class="game-name">${gameName}</div>
                        <div class="best-score">${score}</div>
                        <div>Лучший результат</div>
                    </div>
                `;
                statsContainer.innerHTML += cardHtml;
            }
        }

        // Сброс статистики
        function resetStats() {
            if (confirm('Вы уверены, что хотите сбросить всю статистику игр?')) {
                GameStats.resetStats();
                displayStats();
            }
        }

        // Отображаем статистику при загрузке страницы
        displayStats();
    </script>
</body>
</html>
