const { Canine } = require('../models');

const CanineData = [
   {
      c_name: 'Snowball',
      c_demeanor: 1,
      has_walked_am: 1,
      has_potty_am: 2,
      has_walked_pm: 3,
      has_potty_pm: 3,
      k_id: 1
   },
   {
      c_name: 'Penny',
      c_demeanor: 1,
      has_walked_am: 3,
      has_potty_am: 4,
      k_id: 2
   },
   {
      c_name: 'Louie',
      c_demeanor: 2,
      k_id: 3
   },
   {
      c_name: 'Ranger',
      c_demeanor: 2,
      k_id: 4
   },
   {
      c_name: 'Pandora',
      c_demeanor: 3,
      has_walked_am: 5,
      k_id: 5
   },
   {
      c_name: 'Oreo',
      c_demeanor: 3,
      k_id: 6
   },
   {
      c_name: 'Rusty',
      c_demeanor: 3,
      has_walked_am: 6,
      has_walked_pm: 8,
      has_potty_am: 7,
      has_potty_pm: 7,
      k_id: 7
   },
   {
      c_name: 'Princess',
      c_demeanor: 2,
      has_potty_am: 8,
      k_id: 8
   },
   {
      c_name: 'Sassy',
      c_demeanor: 1,
      has_walked_am: 8,
      k_id: 9
   },
   {
      c_name: 'Tootsie',
      c_demeanor: 1,
      k_id: 10
   },
   {
      c_name: 'Mocha',
      c_demeanor: 2,
      has_walked_am: 11,
      has_walked_pm: 1,
      has_potty_am: 12,
      has_potty_pm: 10,
      k_id: 11
   },
   {
      c_name: 'Prince',
      c_demeanor: 2,
      has_walked_am: 12,
      k_id: 12
   },
   {
      c_name: 'Pepper',
      c_demeanor: 3,
      k_id: 13
   },
   {
      c_name: 'Milo',
      c_demeanor: 2,
      k_id: 14
   },
   {
      c_name: 'Maverick',
      c_demeanor: 3,
      has_potty_am: 5,
      k_id: 15
   },
   {
      c_name: 'Lady',
      c_demeanor: 1,
      has_potty_am: 4,
      has_potty_pm: 12,
      k_id: 16
   },
   {
      c_name: 'Koko',
      c_demeanor: 1,
      k_id: 17
   },
   {
      c_name: 'Kallie',
      c_demeanor: 3,
      has_walked_am: 7,
      has_potty_am: 9,
      k_id: 18
   },
   {
      c_name: 'Daphne',
      c_demeanor: 2,
      has_potty_am: 12,
      k_id: 19
   },
   {
      c_name: 'Chewy',
      c_demeanor: 1,
      k_id: 20
   },
   {
      c_name: 'Cinnamon',
      c_demeanor: 2,
      k_id: 21
   },
   {
      c_name: 'Brownie',
      c_demeanor: 3,
      k_id: 22
   },
   {
      c_name: 'Cassie',
      c_demeanor: 2,
      has_walked_am: 7,
      k_id: 23
   },
   {
      c_name: 'Biscuit',
      c_demeanor: 1,
      k_id: 24
   },
   {
      c_name: 'Athena',
      c_demeanor: 3,
      k_id: 25
   },
   {
      c_name: 'Belle',
      c_demeanor: 1,
      has_walked_am: 8,
      has_potty_am: 1,
      k_id: 16
   },
   {
      c_name: 'Apollo',
      c_demeanor: 1,
      has_walked_am: 2,
      k_id: 24
   },
   {
      c_name: 'Candy',
      c_demeanor: 1,
      k_id: 9
   }
];

const seedCanine = () => Canine.bulkCreate(CanineData);

module.exports = seedCanine;