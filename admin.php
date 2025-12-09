<?php
// admin.php
require_once __DIR__ . '/config.php';

// Credenciais temporárias da área administrativa (altere em produção)
$ADMIN_USER = 'admin';
$ADMIN_PASS = 'troque_esta_senha';

if (!isset($_SERVER['PHP_AUTH_USER']) || $_SERVER['PHP_AUTH_USER'] !== $ADMIN_USER || $_SERVER['PHP_AUTH_PW'] !== $ADMIN_PASS) {
    header('WWW-Authenticate: Basic realm="Área Administrativa"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Autenticação necessária.';
    exit;
}

$pdo = getPDO();
$stmt = $pdo->query("SELECT id, nome, telefone, unidade, created_at FROM contatos ORDER BY created_at DESC");
$rows = $stmt->fetchAll();
?>
<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <title>Admin - Envios de Contato</title>
    <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="estilos/css.css" />
    <link rel="stylesheet" href="estilos/admin.css" />
</head>

<body>
    <div class="admin-container">
        <header class="admin-header">
            <h1>Envios de Contato</h1>
            <p><a href="index.html" class="btn-voltar">Voltar ao site</a></p>
        </header>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Interesse</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($rows)): ?>
                    <tr>
                        <td colspan="5">Nenhum contato encontrado.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($rows as $r): ?>
                        <tr>
                            <td><?= htmlspecialchars($r['id']) ?></td>
                            <td><?= htmlspecialchars($r['nome']) ?></td>
                            <td><?= htmlspecialchars($r['telefone']) ?></td>
                            <td><?= htmlspecialchars($r['unidade']) ?></td>
                            <td><?= htmlspecialchars($r['created_at']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <script src="scripts/admin.js"></script>
</body>

</html>