require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken')
const { registerRoute } = require('./routes/register');
const { loginRoute } = require('./routes/login');
const { logoutRoute } = require('./routes/logout');
const showPostRoute = require('./routes/showPost');
const  createPostRoute = require('./routes/createPost');
const cookieParser = require('cookie-parser')
const connectDB= require("./db/connect")
const cors = require("cors")
const app = express();

app.use('/uploads',express.static(__dirname + '/uploads'))
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', registerRoute());
app.use('/api/v1', loginRoute());
app.use('/api/v1',logoutRoute());
app.use('/api/v1',createPostRoute);
app.use('/api/v1',showPostRoute)


app.get('/api/v1/profile', (req, res) => {

 const { token } = req.cookies;
console.log('Token:', token);

jwt.verify(token, process.env.JWT_SECRET,{},(err, info) => {
  if (err) throw err;
  if (info) {
    console.log(info.userName);
  }

  res.json(info);
  console.log("2");
});
});





const PORT = 4000;
const start =async () =>{
  try {
    await connectDB(process.env.MONGO_URI);
     app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();