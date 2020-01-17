const express = require('express')
const router = express.Router()
const db = require('../config/connectDB')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


// get gig list
router.get('/',async(req,res)=>{
  try {
    const values = await Gig.findAll()
    const gigs = values.map(gig => gig.dataValues)
    res.render('gigs',{gigs})
   
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message)
  } 
})

// display add gig form
router.get('/add',async(req,res)=>{
  res.render('add')
})

//add a gig
router.post('/add',async(req,res)=>{
  
   let {title,technologies,budget,description,contactEmail} = req.body
   
   let errors =[]
   if(!title){
     errors.push({text:'Please add a title'})
   }
   if(!technologies){
     errors.push({text:'Please some technologies'})
   }
   if(!description){
     errors.push({text:'Please some description'})
   }
   if(!contactEmail){
     errors.push({text:'Please add a contactEmail'})
   }

   // check for error
   if(errors.length >0){
      res.render('add',{
        errors,
        title,technologies,budget,description,contactEmail
      })
   }else{

    if(!budget){
      budget ='Unknown'
    }else{
      budget = `$${budget}`
    }

    // Make lower case and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',')

    try {
      // insert Into table
   await  Gig.create({title,technologies,budget,description,contactEmail})
   res.redirect('/gigs')
   } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
   }
   }
})
 

// search for gigs
router.get('/search',async(req,res)=>{

  let {term} = req.query
  term = term.toLowerCase()

  try {
  const values =   await Gig.findAll({where:{technologies:{[Op.like]:'%'+ term + '%'}}})
  const gigs = values.map(gig => gig.dataValues)
    res.render('gigs',{gigs})
  } catch (error) {
    console.log(error.message)
  }
  
})


module.exports = router

 

