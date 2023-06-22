const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 3001;

const postRouter = require("./routes/post.js")
const commentRouter = require("./routes/comment.js")
const userRouter = require("./routes/user.js")
const authRouter = require("./routes/auth.js")

const connect = require("./schemas")

connect()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use("/api", [postRouter, commentRouter, userRouter, authRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});