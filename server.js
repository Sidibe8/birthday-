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
const allowedOrigins = [
    "https://booyz.netlify.app",
    "https://esugu.netlify.app",
  "https://gestion-esugu.netlify.app", 
    ];

    app.use(cors({
        origin: '*', // Autorise toutes les origines
        credentials: true, // Autorise les cookies cross-origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }));
      
      // Configuration des en-têtes CORS supplémentaires
      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });

// Middleware de vérification du token JWT sur toutes les routes, sauf /login et /auth_login
// app.use(verifyToken);

// app.get("/", (req, res) => {

//     res.render("index")
// })
// app.get("/login", (req, res) => {

//     res.render("login")
// })

app.get('/', (req, res) => {
    res.send('Bienvenue sur la plateforme de livraison locale !');
  });
  
  
app.use('/api', router)

app.listen(process.env.port, () => {
    console.log("app listening on port " + process.env.port)
})