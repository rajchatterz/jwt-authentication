require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 6000

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})