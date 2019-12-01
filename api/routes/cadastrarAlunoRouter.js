const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Aluno = require('../models/alunoSchema');

router.get('/:alunoId', (req, res, next) => {
    const id = req.params.alunoId;
    Aluno.findById(id)
        .exec()
        .then(aluno => {
            res.status(200).json({
                aluno
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            });
        })

});
router.get('/', (req, res, next) => {
    const aluno = {};
    Aluno.find({})
        .exec()
        .then(cadastrarAluno => {
            res.status(200).json({
                cadastrarAluno
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            });
        })

});


router.post('/', (req, res, next) => {
    console.log(req.body.nome);

    const aluno = new Aluno({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        matricula: req.body.matricula,
        tel: req.body.tel
    });
    //promise
    console.log("antes de salvar o aluno", req.body.nome);
    aluno.save()
        .then(result => {
            res.status(200).json({
                message: ' POST /aluno',
                alunoAdicionado: aluno
            });
        })
        .catch(err => {
            res.status(500).json({
                err
            });
        });

});
router.put('/:alunoId', (req, res, next) => {
    const id = req.params.alunoId;
    console.log(req.body);

    Aluno.updateOne({ _id: id }, {
            $set: {
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                matricula: req.body.matricula,
                tel: req.body.tel
            }
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                err
            });
        });

});
router.delete('/:alunoId', (req, res, next) => {
    const id = req.params.alunoId;

    Aluno.remove({ _id: id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                err
            });
        });

});


module.exports = router;