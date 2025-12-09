<?php

// Função simples para carregar o .env
function loadEnv($path) {
    if (!file_exists($path)) {
        die(".env não encontrado em: $path");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        // Ignora comentários
        if (strpos(trim($line), '#') === 0) continue;

        // Divide chave=valor
        list($key, $value) = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}

// Carrega o .env (ajuste o caminho se o arquivo estiver em outra pasta)
loadEnv(__DIR__ . '/.env');

$servername = $_ENV['DB_HOST'];
$username   = $_ENV['DB_USER'];
$password   = $_ENV['DB_PASS'];
$dbname     = $_ENV['DB_NAME'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

echo "Conectado com sucesso ao banco!";
?>