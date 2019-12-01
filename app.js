const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const alunoRotas = require('./api/routes/cadastrarAlunoRouter');


//Conectando ao mongo
mongoose.connect('mongodb+srv://' + process.env.MONGO_USR + ':' + process.env.MONGO_PWD + '@safira-3h7si.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

//logs da aplicacao gerenciados pelo pacote morgan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Eliminando o CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/aluno', alunoRotas);







module.exports = app