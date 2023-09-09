const connectToMongo = require('./db');
const express = require('express');
const app = express()
const cors = require("cors")
const port = 8000
connectToMongo()


app.use(express.json())

app.get("/",(req,res)=>{
    res.send('hello world')
})

app.use(cors())
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Server Running at http://localhost:${port}`)
})