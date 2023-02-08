const express = require('express');
const app = express();
const fs = require('node:fs/promises');
const data = require("./data.json");
const cors = require("cors");
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//.....routing

app.post("/withdraw", (req, res) => {
    let balance =  Number(data.balance)-Number(req.body.withdraw) 
    fs.writeFile(__dirname + '/data.json', JSON.stringify({balance:balance})).then(
        (result) => {
            console.log(result);
            res.redirect(req.get("referer")+"App/index.html")
        }
    );
})


app.post("/deposite", (req, res) => {
    fs.writeFile(__dirname + '/data.json', JSON.stringify({balance:req.body.deposite})).then(
        (result) => {
            console.log(result);
            res.redirect(req.get("referer")+"App/index.html")
        }
    );
})

app.get("/balance", (req, res) => {
    res.json(data.balance)
});


//......listining......
app.listen(5000, () => {
    console.log("server started");
});