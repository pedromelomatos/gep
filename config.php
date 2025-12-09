<?php

// Carrega variáveis do arquivo .env
$envPath = __DIR__ . '/.env';

if (file_exists($envPath)) {
    $env = parse_ini_file($envPath);
} else {
    die("Erro: arquivo .env não encontrado.");
}

// Define constantes usando o .env
define('DB_HOST', $env['DB_HOST'] ?? 'localhost');
define('DB_NAME', $env['DB_NAME'] ?? '');
define('DB_USER', $env['DB_USER'] ?? '');
define('DB_PASS', $env['DB_PASS'] ?? '');

// Conexão
try {
    $conn = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("ERRO DE CONEXÃO: " . $e->getMessage());
}
