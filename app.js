/* importações */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

// Configuração da resposta do Json
app.use(express.json())

// Models
const User = require('./models/User')

//  Rota Aberta-  Rota Pública
app.get('/', (req, res) => {
      res.status(200).json({ msg: "Bem vindos a API de cadastro!" })
})

// Rota Privada
app.get("/user/:id", checkToken, async (req, res) => {

      const id = req.params.id

      //Verificando se o usuário existe
      const user = await User.findById(id, '-password')

      if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" })
      }

      res.status(200).json({ user })

})

function checkToken(req, res, next) {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split("")[1]

      if (!token) {
            return res.status(401).json({ msh: "Acesso negado!" })
      }

      try {
            const secret = process.env.SECRET

            jwt.verify(token, secret)

            next()

      } catch (error) {
            res.status(400).json({ msg: "Token inválido" })
      }
}

// Registro de Usuários
app.post('/auth/register', async (req, res) => {

      const { name, email, password, confirmpassword } = req.body

      // validações
      if (!name) {
            return res.status(422).json({ msg: 'Seu nome é obrigatório!' })
      }
      if (!email) {
            return res.status(422).json({ msg: 'Seu email é obrigatório!' })
      }
      if (!password) {
            return res.status(422).json({ msg: 'Sua senha é obrigatória!' })
      }
      if (password !== confirmpassword) {
            return res.status(422).json({ msg: 'As senhas não conferem!' })
      }

      // Verificando se o usuário existe
      const userExists = await User.findOne({ email: email })

      if (userExists) {
            return res.status(422).json({ msg: 'Por gentileza, utilize outro email!' })
      }

      // criação da senha
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      // Criação do usuário
      const user = new User({
            name,
            email,
            password: passwordHash,
      })

      try {
            await user.save()

            res.status(201).json({ msg: 'Usuário criado com sucesso!' })

      } catch (error) {
            res.status(500).json({
                  msg: 'Erro no servidor, tente novamente mais tarde!',
            })
      }
})

// Login do usuário
app.post('/auth/login', async (req, res) => {
      const { email, password } = req.body

      //Validações
      if (!email) {
            return res.status(422).json({ msg: 'Seu email é obrigatório!' })
      }
      if (!password) {
            return res.status(422).json({ msg: 'Sua senha é obrigatória!' })
      }

      // Verificando se o usuário existe
      const user = await User.findOne({ email: email })

      if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
      }

      // Verificando se a senha é a mesma
      const checkPassword = await bcrypt.compare(password, user.password)

      if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha incorreta!' })
      }

      try {

            const secret = process.env.SECRET

            const token = jwt.sign(
                  {
                        id: user._id,
                  },
                  secret,
            )

            res.status(200).json({ msg: "Autenticação realizada com sucesso!", token })
      } catch (err) {
            console.log(error)

            res.status(500).json({
                  msg: 'Erro no servidor, tente novamente mais tarde!',
            })
      }
})

// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
      .connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8nytc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      )
      .then(() => {
            app.listen(3000)
            console.log('Conectou ao banco de dados')
      })
      .catch((err) => console.log(err))

