const { Demeanor } = require('../models');

const demeanorData = [
   {
      d_desc: 'Easy'
   },
   {
      d_desc: 'Moderate'
   },
   {
      d_desc: 'Difficult'
   },
   {
      d_desc: 'Highly Challenging'
   }
];

const seedDemeanor = () => Demeanor.bulkCreate(demeanorData);

module.exports = seedDemeanor;