import express from "express";

import userRouter from "./routes/user"

const app = express();
const port = 3020;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/user", userRouter);

app.get("/", (req,res)=>{
    res.send("Hello Hoya😀");
});

app.listen(port, ()=>{
    console.log(`🚀 Server is listening on port: ${port}`);
});
