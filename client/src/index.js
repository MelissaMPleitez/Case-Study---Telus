const express = require('express');
const request = require('request');
const { engine } = require('express-handlebars');
//const v1Router =require('./version1/routes');

const app = express();

const PORT = process.env.PORT || 3030;

app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.get("/",(req,res)=>{
    request("https://dummyjson.com/users",(err,response,body)=>{
        if (!err){
            const users = JSON.parse(body);
            res.render("home",{ 
                layout:"main",
                users:users
            });
        }
    })
});
app.get("/dates",(req,res)=>{
    request("https://dummyjson.com/users",(err,response,body)=>{
        if (!err){
            const users = JSON.parse(body);
            res.render("dates",{ 
                layout:"main",
                users:users
            });
        }
    })
});
//app.use('/api/version1', v1Router);

app.listen(PORT, ()=>{ console.log(`Listening in port ${PORT}`)});