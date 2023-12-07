const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  define: {
    timestamps: false,
  },
});

const Funcionario = sequelize.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/funcionarios', async (req, res) => {
  try {
    const { nome, cargo, salario } = req.body;
    const funcionario = await Funcionario.create({ nome, cargo, salario });
    res.status(201).json(funcionario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Aplicação de exemplo ouvindo na porta ${port}`);
  });
  console.log('Conectado e sincronizado com o banco de dados SQLite');
}).catch((error) => {
  console.log(error);
});
