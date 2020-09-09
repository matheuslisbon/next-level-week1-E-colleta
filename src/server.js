const express = require('express')
const server = express()

//configurar pasta publica
server.use(express.static('public'))
//importando o servidor 
const db = require('./database/db')

//utilizando o nunjucks -> template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express:server,
    noCache:true
})
server.use(express.urlencoded({extend:true}))



//agora é configura caminhos da aplicação 
//ligar o servidor
server.get('/', (req, res)=>{
    return res.render('index.html')
})
server.get('/create-point',(req, res)=>{
//das strings da nossa url(method inseguro)



    return res.render('create-point.html')
})
server.post('/savepoint', (req, res)=>{

    //inserir dados ao banco de dados 
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
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send('ERROR NO CADASTRO')
        }
        console.log('cadastrado com sucesso')
        console.log(this)
        return res.render('create-point.html', {saved:true})

    }
 

    //req.body: o corpo do nosso formulario
    db.run(query, values, afterInsertData)



})
server.get('/search',(req, res)=>{
    const search = req.query.search
    console.log(req.query.search)
    if (search == ''){
        return res.render('search-results.html', {total: 0})
    }

    //pegar dados do banco de dados 

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows){
        if (err){
            return console.log(err)
        }
        console.log('aqui estao seus registros')
        console.log(rows)

        //quantidade de pontos encontrados 
        const total = rows.length

        //isso puxa os dados do banco de dados
        //e põe na requisição da chamada get results
        return res.render('search-results.html', {places:rows, total})
    })


    
})


server.listen(3002, ()=>{
    console.log('servidor rodando na porta 3002')
})