const Sequelize = require("sequelize");

// initialze an instance of Sequelize
const sequelize = new Sequelize({
    database: 'web',
    username: 'itmouser',
    password: 'itmo2019',
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    host: '127.0.0.1'
});

// check the databse connection
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
    
var UserModel = require('./models/user');
const User = UserModel(sequelize, Sequelize);

// Create database and tables if doesn't exist
sequelize.sync()//{force:true}
.then(()=>{
  console.log('Database and tables created!!');
})

module.exports = {
    User
}
