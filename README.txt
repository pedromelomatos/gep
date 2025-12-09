README - GEP Tech backend (PHP + MySQL)

Arquivos no ZIP:
- index.html         -> Página pública (formulário aponta para submit.php)
- config.php         -> Configuração do banco (alterar DB_USER / DB_PASS)
- submit.php         -> Endpoint que recebe o formulário e salva em MySQL
- admin.php          -> Página administrativa com autenticação Basic (usuário/senha no topo de arquivo)
- README.txt         -> Este arquivo

Instruções rápidas:

1) Crie o banco e tabela no MySQL:
   CREATE DATABASE IF NOT EXISTS geptech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE geptech;
   CREATE TABLE IF NOT EXISTS contatos (
     id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(255) NOT NULL,
     telefone VARCHAR(30) DEFAULT NULL,
     unidade ENUM('parceria','aluno','mentor') NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

2) Altere as credenciais em config.php:
   define('DB_USER', 'seu_usuario');
   define('DB_PASS', 'sua_senha');

3) Para acessar a área administrativa abra:
   http://seu-dominio/admin.php
   Usuário temporário: admin
   Senha temporária: troque_esta_senha
   (Altere em admin.php ou implemente um login real)

4) Coloque estes arquivos em um servidor com PHP >= 7.4 e acesso ao MySQL.
   Use HTTPS em produção.

5) Recomendações:
   - Remova credenciais hard-coded; use variáveis de ambiente (.env).
   - Adicione CSRF token no formulário se precisar de proteção extra.
   - Configure um sistema de logs.
