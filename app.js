require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const linkRoute = require('./routes/linkroute');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const session = require('express-session');

const app = express();
const path = require('path');

const PORT = process.env.PORT;
const MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL;

// Conectar ao MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_CONNECT_URL);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

connectDB();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use('/', linkRoute);

app.use('/user', express.json(), userRouter);
app.use('/admin', express.json(), adminRouter);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
