const mongoose = require('mongoose');

const alunoSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    nome: { type: String, required: true },
    cpf: { type: Number, required: true },
    email: { type: String, required: true },
    matricula: { type: Number, required: true },
    tel: { type: Number, required: true },
});

module.exports = mongoose.model('aluno', alunoSchema);