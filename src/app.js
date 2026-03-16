import express from "express";

const app=express();//create an express app

app.use(express.json())//middleware to parse json request body
app.use(express.urlencoded({extended: true}))//middleware to parse urlencoded request body

//routes import
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter);

// example route http://localhost:4000/api/v1/users/register

export default app;