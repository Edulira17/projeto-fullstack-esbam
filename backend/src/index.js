const express = require("express");
const cors = require("cors");
const sqlite = require("sqlite3");
const app = express();
const port = process.env.PORT_SERVER || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const db = new sqlite.Database("./bancodedados.db", (err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados!", err);
  } else {
    console.log("Database on!");
    db.run(
      `
      CREATE TABLE IF NOT EXISTS Alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      curso TEXT
    )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela", err.message);
        } else {
          console.log("Tabela 'Alunos' verificada/criada com sucesso.");
        }
      }
    );
  }
});

// ROUTES

// LISTAR TODOS OS ALUNOS:
app.get("/alunos", (req, res) => {
  db.all("SELECT * FROM Alunos ORDER BY nome", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar alunos: " + err.message });
      return;
    } else {
      res.json(rows);
    }
  });
});

// CADASTRAR UM NOVO ALUNO:
app.post("/alunos", (req, res) => {
  const { nome, email, curso } = req.body;

  if (!nome || !email || !curso) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios!" });
  }

  const sql = "INSERT INTO Alunos (nome, email, curso) VALUES (?, ?, ?)";
  db.run(sql, [nome, email, curso], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constrait failed")) {
        return res.status(400).json({
          error:
            "Este e-mail já está cadastrado, por favor tente novamente com um e-mail diferente!",
        });
      }
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar o aluno: " + err.message });
    }

    return res.status(201).json({ id: this.lastID, nome, email, curso });
  });
});

// Deletar Aluno pelo ID
app.delete("/alunos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Alunos WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao tentar excluir Aluno: " + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.json({ message: "Aluno excluido com sucesso !" });
  });
});

//Atualizar um aluno pelo ID
app.put("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, curso } = req.body;

  if (!nome && !email && !curso) {
    return res.status(400).json({
      error: "Forneça ao menos um campo para atualizar (nome, email, curso)",
    });
  }
  let fieldsToUpdate = [];
  let values = [];
  if (nome) {
    fieldsToUpdate.push("nome = ?");
    values.push(nome);
  }
  if (email) {
    fieldsToUpdate.push("email = ?");
    values.push(email);
  }
  if (curso) {
    fieldsToUpdate.push("curso = ?");
    values.push(curso);
  }

  values.push(id);

  const sql = `
      UPDATE Alunos SET ${fieldsToUpdate.join(", ")} WHERE id = ?;
    `;
  db.run(sql, values, function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constrait failed")) {
        return res.status(400).json({
          error: "Este e-mail já está cadastrado para outro aluno.",
        });
      }

      return res
        .status(500)
        .json({ error: "Erro ao atualizar aluno: " + err.message });
    }

    if (this.changes === 0) {
      return res
        .status(404)
        .json({ error: "Aluno não encontrado para atualização." });
    }

    db.get("SELECT * FROM Alunos WHERE id = ?", [id], (err, aluno) => {
      if (err) {
        res.status(500).json({ error: "Erro ao buscar aluno atualizado" });
      }

      res.json(aluno);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
