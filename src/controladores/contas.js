let { contas, saques, depositos, transferencias, } = require('../bancodedados')
const { format } = require('date-fns')

const buscarConta = (numeroConta) => {
    return contas.find(conta => conta.numero === numeroConta)
}

const verificarCpf = (cpf) => {
    return contas.find(conta => conta.usuario.cpf === cpf)
}

const verificarEmail = (email) => {
    return contas.find(conta => conta.usuario.email === email)
}

const listarContas = (req, res) => {
    return res.json(contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: 'Todos os campos devem ser informados!' })
    }

    let cpfEncontrado = verificarCpf(cpf)
    let emailEncontrado = verificarEmail(cpf)

    if (cpfEncontrado || emailEncontrado) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }

    let idConta = 1

    if (contas.length > 0) {
        idConta = Number(contas.length) + 1
    }

    const novaConta = {
        numero: String(idConta),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta)

    return res.status(201).send()
}

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { numeroConta } = req.params

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: 'Todos os campos devem ser informados!' })
    }

    let cpfEncontrado = verificarCpf(cpf)
    let emailEncontrado = verificarEmail(email)

    if (cpfEncontrado) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' })
    }

    if (emailEncontrado) {
        return res.status(400).json({ mensagem: 'O e-mail informado já existe cadastrado!' })
    }

    let contaEncontrada = buscarConta(numeroConta)

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    contaEncontrada.usuario.nome = nome
    contaEncontrada.usuario.cpf = cpf
    contaEncontrada.usuario.data_nascimento = data_nascimento
    contaEncontrada.usuario.telefone = telefone
    contaEncontrada.usuario.email = email
    contaEncontrada.usuario.senha = senha

    return res.status(204).send()
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    let contaEncontrada = buscarConta(numeroConta)

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (contaEncontrada.saldo !== 0) {
        return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' })
    }

    const indiceDaConta = contas.indexOf(contaEncontrada)

    contas.splice(indiceDaConta, 1)

    return res.status(204).send()
}

const realizarDeposito = (req, res) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }

    let contaEncontrada = buscarConta(numero_conta)

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (valor <= 0) {
        return res.status(403).json({ mensagem: 'Não é possível realizar depósito do valor informado!' })
    }

    contaEncontrada.saldo += valor

    const deposito = {
        data: format(new Date(), 'MM-dd-yyyy HH:mm:ss'),
        numero_conta,
        valor: Number(valor)
    }

    depositos.push(deposito)

    return res.status(204).send()
}

const realizarSaque = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, o valor do saque e a senha são obrigatórios!' })
    }

    let contaEncontrada = buscarConta(numero_conta)

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'Senha inválida!' })
    }

    if (contaEncontrada.saldo <= 0) {
        return res.status(403).json({ mensagem: 'Não há saldo disponível para saque!' })
    }

    if (valor < 0) {
        return res.status(403).json({ mensagem: 'O valor não pode ser menor que zero!' })
    }

    contaEncontrada.saldo -= valor

    const saque = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor: Number(valor)
    }

    saques.push(saque);

    return res.status(204).send()
}

const realizarTransferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, o número da conta destino, o valor do saque e a senha são obrigatórios!' })
    }

    let contaOrigem = buscarConta(numero_conta_origem)
    let contaDestino = buscarConta(numero_conta_destino)

    if (!contaOrigem) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (!contaDestino) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'Senha inválida!' })
    }

    if (contaOrigem.saldo <= 0) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente!' })
    }

    if (valor < 0) {
        return res.status(403).json({ mensagem: 'O valor não pode ser menor que zero!' })
    }

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const transferencia = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor: Number(valor)
    }

    transferencias.push(transferencia)

    return res.status(204).send()
}

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' })
    }

    let contaEncontrada = buscarConta(numero_conta)

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'Senha inválida!' })
    }

    return res.json({ saldo: contaEncontrada.saldo })
}

const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' })
    }

    let contaEncontrada = buscarConta(numero_conta)

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Não foi possível localizar conta para o número informado!' })
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'Senha inválida!' })
    }

    const depositosDaConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta
    })

    const saquesDaConta = saques.filter((saque) => {
        return saque.numero_conta === numero_conta
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta
    })

    const relatorioDaConta = {
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    return res.status(200).json(relatorioDaConta)
}

module.exports = {
    buscarConta,
    verificarCpf,
    verificarEmail,
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    realizarDeposito,
    realizarSaque,
    realizarTransferencia,
    consultarSaldo,
    consultarExtrato
}