# Projeto Cadastro-Usuarios
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/LombaAnderson/Cadastro-Usuarios/blob/main/LICENSE)


# Sobre o projeto

Cadastro-Usuarios é um sistema de chat onde é possível enviar mensagens para multiplos usuários com a utilização de Endpoints para que seja possível criar e se conectar a uma sala criada com Socket I/O 
e é possível enviar e receber mensagens. Foi criada também uma API REST para cadastro de nome de usuário, e-mail e senha em NodeJs, criação de banco de dados em Mongodb Atlas(abaixo disponibilizo temporariamente a senha para acesso que depois será retirada) e no login do cadastro foi criado em token(JWT) e usado o Postman para verificação.  


## Imagem do front-end do chat
<div align="center">
<img src="https://user-images.githubusercontent.com/60937513/141195980-defa013d-7094-4578-bbda-033ae42b1b0f.png" width="600" />
</div>

# Tecnologias utilizadas
## Back end
- NodeJs
- express
- mongoose
- bcrypt
-jwt
-nodemon

-Acesso ao Mongodb Atlas
DB_USER=anderson
DB_PASS=2nvzrfSGS4zqOG3g
SECRET= DUJHASJKSAPFSAFCB78787997865D

## Front end
- Vuejs / CSS / JS 

# Como executar o projeto

## Back end
Pré-requisitos: NodeJs, 

```bash
# clonar repositório
git clone https://github.com/lombaAnderson/Cadastro-Usuarios

# executar o projeto
Não é necessário pois o nodemon automaticamente o executa.

```

## Front end web
Pré-requisitos: Vuejs  

```bash
# clonar repositório
git clone https://github.com/lombaAnderson/Cadastro-Usuarios

# instalar pasta do Vuejs
vue new cadastro_websocket

# entrar na pasta do projeto 
cd cadastro_websocket

# criar arquivo onde o servidor funcionará
server.js

# executar o projeto
node server.js

```

# Autor

Anderson Lomba de Oliveira

Linkedin

https://www.linkedin.com/in/anderson-lomba-140279142/
