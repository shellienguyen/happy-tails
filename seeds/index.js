
const seedDemeanor = require('./demeanor-seeds');
const seedKennel = require('./kennel-seeds');
const seedVolunteer = require('./volunteer-seeds');
const seedCanine = require('./canine-seeds');

const sequelize = require('../config/connection');


const seedAll = async () => {
   await sequelize.sync({ force: true });
   console.log('*********************************');
   console.log('******** DATABASE SYNCED ********');
   console.log('*********************************\n');

   await seedVolunteer();
   console.log('**********************************');
   console.log('***** VOLUNTEER TABLE SEEDED *****');
   console.log('**********************************\n');

   await seedDemeanor();
   console.log('*********************************');
   console.log('***** DEMEANOR TABLE SEEDED *****');
   console.log('*********************************\n');

   await seedKennel();
   console.log('*******************************');
   console.log('***** KENNEL TABLE SEEDED *****');
   console.log('*******************************\n');

   await seedCanine();
   console.log('*******************************');
   console.log('***** CANINE TABLE SEEDED *****');
   console.log('*******************************\n');

   process.exit(0);
};

seedAll();