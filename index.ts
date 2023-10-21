import express from "express";

const app = express();
const port = 3020;

app.get("/", (req,res)=>{
    res.send("Hello Hoya😀");
});

app.listen(port, ()=>{
    console.log(`🚀 Server is listening on port: ${port}`);
});