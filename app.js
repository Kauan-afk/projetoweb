const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.render("index.handlebars")
})

app.post("/cadastrar", function(req,res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao conectar: " +erro)
    })

    
})

app.get("/consultar", function(req,res){
    post.findAll().then(function(post){
        res.render("consultar", {post: post})
    })
})

app.get("/atualizar/:id", function(req,res){
    post.findAll({where: {"id": req.params.id}}).then(function(posts){
    res.render("atualizar",{post: posts})})

})

app.listen("8081", function(req,res){
    console.log("Rodando!")
})