// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")


//exportar o arquivo ds.js para ser utilizado na aplicação
module.exports = db

//utilizar o objeto de banco de dados, para as operações
// db.serialize(() => {
//     //Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)


//     //Inserir dados
//     const query = `
//             INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items
//             ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//         "Papersider",
//         "Rua Capitão João Busse, Cajuru",
//         "Nº 365",
//         "Paraná",
//         "Curitiba",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     //função callback (chame de volta, depois de terminar tudo isso)
//     // db.run(query, values, afterInsertData)

//     //Consultar dados
//     db.all(`SELECT name FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros: ")
//         console.log(rows)
//     })

//     //Deletar dados
//     //Quando usa (?), deve ser chamado a coleção para pegar o registro [1]
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
//         if(err) {
//             return console.log(err)
//         }
        
//         console.log("Registro deletado com sucesso!")

//     })

   

    
// })

