const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
require('dotenv').config({ path: './config/config.env' })

//connect to DB
const {connectDB} = require('./config/connectDB')
connectDB()

const app = express()

//middlewares
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set static folder
app.use(express.static(path.join(__dirname,'public')))


// Index route
app.get('/',async(req,res)=>{
  res.render('index',{layout:'landing'})
})


//use routes
app.use('/gigs',require('./routes/gig'))


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running on port: ${PORT}`))