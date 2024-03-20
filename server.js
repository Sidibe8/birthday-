const express = require('express')
require('dotenv').config()
const app = express()
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const router = require('./routes/index.routes');
app.set('view engine', 'ejs')


// Middleware pour servir les fichiers statiques (CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
db()

// Utilisation du middleware CORS pour autoriser les requêtes cross-origin
const cors = require("cors");
// const { verifyToken } = require('./middlewares');
app.use(cors());

// Middleware de vérification du token JWT sur toutes les routes, sauf /login et /auth_login
// app.use(verifyToken);

// app.get("/", (req, res) => {

//     res.render("index")
// })
// app.get("/login", (req, res) => {

//     res.render("login")
// })

app.use('/api', router)

app.listen(process.env.port, () => {
    console.log("app listening on port " + process.env.port)
})