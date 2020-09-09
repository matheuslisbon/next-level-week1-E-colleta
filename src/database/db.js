// importa a depedencia do sqlite 3 

const sqlite3 = require('sqlite3').verbose()

//iniciar/criar o objeto de banco de dados (irar fazer operaçoes no banco)

const db = new sqlite3.Database('./src/database/database.db')
// exporta o servidor para o server.js
module.exports = db

//utilizar o objeto de banco de dados para nossas operaçoes

 db.serialize(() =>{
    //criar tabela
    //logo... inserir dadso a tabela 
    //consultar os dados da tabela 
    //deletar um dado da tabela 
    //criar \/ tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    // AGORA INSERIR DADOS

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
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim America",
    "Numero 260",
    "Santa Catarina",
    "Rio do sul",
    "Resíduos Eletrônicos, Làmpadas"
]
//inserindo dados \/
function afterInsertData(err){
    if (err){
        return console.log(err)
    }
    console.log('cadastrado com sucesso')
    console.log(this)
}
    //inseriu dados
    //db.run(query, values, afterInsertData)

    // consultar dados inseridos na tabela
    //db.all(`SELECT * FROM places`, function(err, rows){
    //    if (err){
    //       return console.log(err)
     //   }
    //    console.log('aqui estao seu registros')
    //    console.log(rows)
    //})

    //deleta os dados inseridos na tabela
    //db.run(`DELETE FROM places WHERE id = ?`, [2], function(err, rows){
    //    if(err){
    //        return console.log(err)
    //
    //    }
    //    console.log('aqui estao seus registros')
    //    console.log(rows)
    //})
})

