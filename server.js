const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Configuração da conexão com o banco de dados
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'hoteis'
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Função de teste
const teste = (req, res) => {
    res.send("Back-end respondendo");
};

// CRUD - Clientes
const createClientes = (req, res) => {
    const { nome, cpf, email, endereco,data_nascimento, data_cadastro} = req.body;

    const query = 'INSERT INTO Clientes (nome, cpf, email, endereco, data_nacimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Cliente criado com sucesso', result });
        }
    });
};

const readClientes = (req, res) => {
    con.query("SELECT * FROM Clientes", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateClientes = (req, res) => {
    const { cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;

    const query = 'UPDATE Clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente atualizado com sucesso', result });
        }
    });
};

const deleteClientes = (req, res) => {
    let {id} = req.params.cliente_id;

    const query = `DELETE FROM Clientes WHERE cliente_id= ${id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente removido com sucesso', result });
        }
    });
};

// CRUD - Telefone
const createTelefone = (req, res) => {
    const { telefone_id, cliente_id, numero, tipo  } = req.body;

    const query = 'INSERT INTO Telefone (telefone_id, cliente_id, numero, tipo) VALUES(?, ?, ?, ?)';
    con.query(query, [telefone_id, cliente_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Telefone criado com sucesso', result });
        }
    });
};

const readTelefone = (req, res) => {
    con.query("SELECT * FROM telefone", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateTelefone = (req, res) => {
    const { telefone_id, cliente_id, numero, tipo,  } = req.body;

    const query = 'UPDATE Telefone SET numero = ?, tipo = ? WHERE telefone_id = ?';
    con.query(query, [telefone_id, cliente_id, numero, tipo,], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Telefone  atualizado com sucesso', result });
        }
    });
};

const deleteTelefone = (req, res) => {
    const { idCliente } = req.params;

    const query = 'DELETE FROM Telefone    WHERE idTelefone  = ?';
    con.query(query, [idCliente], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Telefone  removido com sucesso', result });
        }
    });
};

// CRUD - Quartos
const createQuartos = (req, res) => {
    const { quarto_id, numero, andar, tipo, _diaria, statusQuarto, cliente_id } = req.body;

    const query = 'INSERT INTO Quartos (quarto_id, numero, andar, tipo, _diaria, statusQuarto, cliente_id ) VALUES(?, ?, ?)';
    con.query(query, [quarto_id, numero, andar, tipo, _diaria, statusQuarto, cliente_id ], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Quartos criado com sucesso', result });
        }
    });
};

const readQuartos = (req, res) => {
    con.query("SELECT * FROM Quartos", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateQuartos = (req, res) => {
    const { quarto_id, numero, andar, tipo, _diaria, statusQuarto, cliente_id  } = req.body;

    const query = 'UPDATE Quartos SET quarto_id = ?, numero = ?, andar = ? WHERE idQuartos = ?';
    con.query(query, [quarto_id, numero, andar, tipo, _diaria, statusQuarto, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Quartos atualizado com sucesso', result });
        }
    });
};

const deleteQuartos = (req, res) => {
    const { idQuartos } = req.params;

    const query = 'DELETE FROM Quartos WHERE idQuartos = ?';
    con.query(query, [idQuartos], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Quartos removido com sucesso', result });
        }
    });
};

// CRUD - Reservas
const createReservas = (req, res) => {
    const {cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;

    const query = 'INSERT INTO Reservas (cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva) VALUES(?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Reservas criada com sucesso', result });
        }
    });
};

const readReservas = (req, res) => {
    con.query("SELECT * FROM Reservas", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateReservas = (req, res) => {
    const { reserva_id, cliente_id, quarto_id,data_reserva, data_entrada, data_saida, valor_total,statusReserva } = req.body;

    const query = 'UPDATE Reservas SET cliente_id = ?, quarto_id = ?, data_reserva = ?, data_entrada = ?, data_saida = ?, valor_total = ?, statusReserva = ? WHERE reserva_id = ? ';
    con.query(query, [cliente_id, quarto_id,data_reserva, data_entrada, data_saida, valor_total,statusReserva, reserva_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Reservas atualizada com sucesso', result });
        }
    });
};

const deleteReservas = (req, res) => {
    const { reserva_id } = req.params;

    const query = 'DELETE FROM Reservas WHERE reserva_id = ?';
    con.query(query, [reserva_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Reservas removida com sucesso', result });
        }
    });
};

// CRUD - Estacionamento
const createEstacionamento= (req, res) => {
    const { estacionamento_id, cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;

    const query = 'INSERT INTO Estacionamento(estacionamento_id, cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [estacionamento_id, cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Estacionamento criada com sucesso', result });
        }
    });
};

const readEstacionamento = (req, res) => {
    con.query("SELECT * FROM Estacionamento", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateEstacionamento = (req, res) => {
    const { cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;

    const query = 'UPDATE Estacionamento SET   idReservas = ?, inicio = ?, fim = ?, status = ? WHERE cliente_id = ?';
    con.query(query, [ veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Estacionamentos atualizada com sucesso', result });
        }
    });
};

const deleteEstacionamento = (req, res) => {
    const {cliente_id } = req.params;

    const query = 'DELETE FROM Estacionamento WHERE cliente_id = ?';
    con.query(query, [cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Estacionamento removida com sucesso', result });
        }
    });
};


// Inicialização do Express
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

// Rotas para Clientes
app.post("/Clientes", createClientes);
app.get("/Clientes", readClientes);
app.put("/Clientes", updateClientes);
app.delete("/Clientes/:cliente_id", deleteClientes);

// Rotas para Telefone
app.post("/telefone", createTelefone);
app.get("/telefone", readTelefone);
app.put("/telefone", updateTelefone);
app.delete("/telfone/:", deleteTelefone);

// Rotas para Quartos
app.post("/Quartos", createQuartos);
app.get("/Quartos", readQuartos);
app.put("/Quartos", updateQuartos);
app.delete("/funcionarios/:", deleteQuartos);

// Rotas para Reservas
app.post("/reservas", createReservas);
app.get("/reservas", readReservas);
app.put("/reservas", updateReservas);
app.delete("/reservas/:reserva_id", deleteReservas);

// Rotas para Estacionamento
app.post("/Estacionamento", createEstacionamento);
app.get("/Estacionamento", readEstacionamento);
app.put("/Estacionamento", updateEstacionamento);
app.delete("/Estacionamento/:", deleteEstacionamento);


// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});