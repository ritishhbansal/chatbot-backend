const express = require("express");
const dotenv = require('dotenv');
const botRouter = require("./routers/botrouter")
const cors = require("cors")
const session = require("express-session");
const Mongodbstore = require("connect-mongodb-session")(session);
const { mongoConnect } = require("./utils/databaseUtil");
const authRouter = require("./routers/authRouter");


const app = express();
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const store = new Mongodbstore({
    uri: process.env.MONGO_URL,
    databaseName: 'Chatbot',
    collection: 'session'
});

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

app.use(session ({
    secret: "chatbot",
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use("/messageapi", botRouter);
app.use("/auth", authRouter)

const PORT = process.env.PORT || 4567;
mongoConnect(() => {
app.listen(PORT, () => {
    console.log(`backend server running on address http://localhost:${PORT}`);
});
});