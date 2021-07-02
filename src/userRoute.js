const fs = require('fs') // FILE SYSTEM
const {join} = require('path')

//Arquivo json para simular o bando de dados
const filePath = join(__dirname,'users.json')

//Buscar usuários no arquivo
const getUsers = () =>{
  const data = fs.existsSync(filePath) // Verificar se arquivo existe
    ? fs.readFileSync(filePath) //se existir vai ler o arquivo
    : [] // se não retornar um array vazio

    try {
      return JSON.parse(data)
    } catch (error) {
      return []
    }
}

//Salvar
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users,null,'\t')) // escrever arquivo
// '\t' para criar tabulação

const userRoute = (app) =>{
  app.route('/users/:id?')
  .get((req,res)=>{
    const users = getUsers()

    res.send({users})
  })
  .post((req,res)=>{
    const users = getUsers()
    
    users.push(req.body) // inserir campos que esta enviando
    saveUser(users)

    res.status(201).send('OK')
  })
  .put((req,res)=>{
    const users = getUsers()

    saveUser(users.map(user => {
      if(user.id === req.params.id){
        return{
          ...user,
          ...req.body
        }
      }
      return user
    }))
    res.status(200).send('OK')
  })
  .delete((req,res)=>{
    const users = getUsers()

    saveUser(users.filter(user => user.id !== req.params.id))

    res.status(200).send('OK')
  })
}

module.exports = userRoute