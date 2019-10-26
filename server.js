const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
const ipRouter = require('./routers/ip')






require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(ipRouter)




// Set Static Folder
app.use(express.static(`${__dirname}/public`));




app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})