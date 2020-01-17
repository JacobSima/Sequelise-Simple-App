const Sequelize = require('sequelize').Sequelize
  // Option 1: Passing parameters separately
  const db = new Sequelize(process.env.DB_CONNECT, process.env.DB, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: process.env.DB,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })


  async function connectDB(){
    try {
      await db.authenticate()
      console.log(`DB running on ${db.config.host} port: ${db.config.port} and connected to ${db.config.database} Database`)
    } catch (error) {
      console.log(error.message)
    }
  }


module.exports ={
  db,connectDB
} 
