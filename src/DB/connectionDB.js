import { Sequelize } from 'sequelize' ;


export const sequelize = new Sequelize('assignment5', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql' 
});

export const connectionDB = async()=>{
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}



export const syncDB = async()=>{
    try {
  await sequelize.sync();
  console.log('Sync has been established successfully.');
} catch (error) {
  console.error('Unable to sync with the database:', error);
}
}