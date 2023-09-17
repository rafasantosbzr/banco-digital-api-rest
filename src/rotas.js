const express = require('express')
const rotas = express()

const { listarContas, criarConta, atualizarUsuario, excluirConta, realizarDeposito, realizarSaque, realizarTransferencia, consultarSaldo, consultarExtrato } = require('./controladores/contas')
const verificarSenha = require('./intermediarios/intermediario')



rotas.get('/contas', verificarSenha, listarContas)
rotas.post('/contas', criarConta)
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario)
rotas.delete('/contas/:numeroConta', excluirConta)
rotas.post('/transacoes/depositar', realizarDeposito)
rotas.post('/transacoes/sacar', realizarSaque)
rotas.post('/transacoes/transferir', realizarTransferencia)
rotas.get('/contas/saldo', verificarSenha, consultarSaldo)
rotas.get('/contas/extrato', verificarSenha, consultarExtrato)



module.exports = rotas