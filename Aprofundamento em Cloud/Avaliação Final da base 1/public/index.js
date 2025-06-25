const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexão com SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
    // Criar tabelas
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS profiles (
        user_id INTEGER PRIMARY KEY,
        data_nascimento DATE,
        foto_perfil TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }
});

// Rota de Cadastro
app.post('/register', async (req, res) => {
  const { username, password, email, telefone, data_nascimento, foto_perfil } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (username, password, email, telefone) VALUES (?, ?, ?, ?)`,
      [username, hashedPassword, email, telefone],
      function (err) {
        if (err) {
          return res.status(400).json({ error: 'Usuário ou email já existe.' });
        }
        const userId = this.lastID;
        db.run(
          `INSERT INTO profiles (user_id, data_nascimento, foto_perfil) VALUES (?, ?, ?)`,
          [userId, data_nascimento, foto_perfil],
          (err) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao criar perfil.' });
            }
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    res.json({ message: 'Login realizado com sucesso!', userId: user.id });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});