const express = require("express")
//chamando o express para o servidor
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")


//configurar pasta publica
server.use(express.static("public"))


//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando templane engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    // não tenha cache
    noCache: true
})


//configurar caminhos (rotas) da aplicacao
//pagina inicial
//req: requisição (pedido)
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

//rota que recebe os dados do formulário para criar um novo cadastro
server.get("/create-point", (req, res) => {  
    
    //req.query: Query Strings da URL
    // console.log(req.query)

    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {

    //req.body: O corpo do formulário
    // console.log(req.body)


    //inserir dados no banco
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
         
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
   
})



server.get("/search", (req, res) => {    

    //variavel para pegar os dados de pesquisa
    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    //pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        //contar quantos elementos tem dentro do array
        const total = rows.length

        //mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })   
})



//ligar o servidor (nº da porta)
server.listen(3000)
