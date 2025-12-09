<?php
// submit.php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

function clean_string($s) {
    $s = trim($s);
    // Remove tags e caracteres indesejados
    $s = filter_var($s, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    return mb_substr($s, 0, 255);
}

$nome = isset($_POST['nome']) ? clean_string($_POST['nome']) : '';
$telefone = isset($_POST['telefone']) ? clean_string($_POST['telefone']) : null;
$unidade = isset($_POST['unidade']) ? clean_string($_POST['unidade']) : '';

$errors = [];

if ($nome === '') $errors[] = 'Nome é obrigatório.';
$validUnidades = ['parceria','aluno','mentor'];
if (!in_array($unidade, $validUnidades, true)) $errors[] = 'Selecione um interesse válido.';

if (!empty($errors)) {
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    } else {
        $msg = urlencode(implode(' | ', $errors));
        header("Location: index.html?error={$msg}");
        exit;
    }
}

try {
    $pdo = getPDO();
    $sql = "INSERT INTO contatos (nome, telefone, unidade) VALUES (:nome, :telefone, :unidade)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome' => $nome,
        ':telefone' => $telefone,
        ':unidade' => $unidade
    ]);

    header('Location: index.html?success=1');
    exit;
} catch (PDOException $e) {
    error_log('DB ERROR: ' . $e->getMessage());
    header('Location: index.html?error=' . urlencode('Erro ao salvar. Tente novamente.'));
    exit;
}
