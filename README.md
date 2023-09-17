# 🏦 Banco Digital

## 💻 Sobre o projeto

📄 Projeto de construção de uma API RESTful de um **Banco Digital** desenvolvido durante o desafio do Módulo 2 do Curso de Desenvolvimento de Software com foco em Backend oferecido pela [Cubos Academy](https://cubos.academy/).

A Cubos Academy é uma escola com cursos de tecnologia para todos os perfis, do iniciante ao avançado.

---

## ⚙️ Funcionalidades

📝 Listar contas </br>
📁 Criar nova conta </br>
💾 Atualizar dados do usuário</br>
❌ Excluir conta </br>
💰 Realizar depósito </br>
💳 Realizar saque </br>
💸 Realizar transferência </br>
🧾 Consultar saldo </br>
💹 Consultar extrato </br>

___

## 🖱️ Como executar o projeto

1. Faça um fork do projeto.

2. Clone esse repositório.

3. Instale as dependências:
</br>`npm install`

4. Execute a aplicação em modo de desenvolvimento:
</br>`npm run dev`


```
A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

___

## Endpoints

### 1️⃣ Listar contas

http://localhost:3000/contas?senha_banco=Cubos123Bank


Nesse endpoint realizamos a consulta de todas as contas cadastradas, desde que a senha correta verificada em middleware seja informada.

___

### 2️⃣ Criar nova conta

http://localhost:3000/contas


Nesse endpoint podemos criar uma nova conta bancária para um cliente.

___

### 3️⃣ Atualizar dados do usuário

http://localhost:3000/contas/:numeroConta/usuario

Nesse endpoint conseguimos realizar a atualização dos dados de cadastro de um cliente, desde que o número da conta do cliente seja informado como parâmetro de rota.

___

### 4️⃣ Excluir conta

http://localhost:3000/contas/:numeroConta

Nesse endpoint excluímos uma conta referente ao número de conta informado nos parâmetros de rota.
___

### 5️⃣ Realizar depósito

http://localhost:3000/transacoes/depositar

Nesse endpoint realizamos as operações de depósito de valores em uma conta.
___

### 6️⃣ Realizar saque

http://localhost:3000/transacoes/sacar

Nesse endpoint realizamos as operações de saque de valores de uma conta.
___

### 7️⃣ Realizar transferência

http://localhost:3000/transacoes/transferir

Nesse endpoint realizamos as operações de transferência de valores de uma conta para outra.
___

### 8️⃣ Consultar saldo

http://localhost:3000/contas/saldo?numero_conta=1&senha=12342

Nesse endpoint realizamos as operações de consulta de saldo de valores de uma conta.
___

### 9️⃣ Consultar extrato

http://localhost:3000/contas/extrato?numero_conta=1&senha=12342

Nesse endpoint realizamos as operações de extratos de transações realizadas em uma conta.

___

## 🛠 Tecnologias

![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Nodejs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Json](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

## 💪 Como contribuir para o projeto
1. Faça um fork do projeto.

2. Crie uma nova branch com as suas alterações:  
`
git checkout -b my-feature
`

3. Salve as alterações e crie uma mensagem de commit contando o que você fez:  
`
git commit -m "feature: My new feature"
`
4. Envie as suas alterações:  
`
git push origin my-feature
`

___

## 👨‍💻 Autor

[Rafael Santos Bezerra](https://www.linkedin.com/in/rafael-santos-bezerra/) ✨

___

## 📝 Licença
Feito com ❤️ por Rafael Santos 👋🏽 [Entre em contato!](https://www.linkedin.com/in/rafael-santos-bezerra/)









