const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const PORT       = 3000;
const db         = require('./db/connection');
const bodyParser = require('body-parser');

app.listen(PORT, function(){
    console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false}));


// handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

// static folders 
app.use(express.static(path.join(__dirname, 'public')));

// db connection 
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar");
    });

// routes
app.get('/', (req, res) => {
    res.render('index');
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));