const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbconfig');
const usertablemodel = require('./usertable')

console.log("dbConfig ",dbConfig)

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'postgres'
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.models = {};
(async()=>{
    try{
        db.models.usertable = usertablemodel(sequelize, DataTypes);
    } catch(e){
        console.log('Error in connection :',e);
    }
})();


module.exports = db
