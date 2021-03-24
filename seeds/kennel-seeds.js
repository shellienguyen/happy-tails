const { Kennel } = require('../models');

const kennelData = [
   {
      k_name: 'Paws'
   },
   {
      k_name: 'Camp Bow Wow'
   },
   {
      k_name: 'Doggie Town'
   },
   {
      k_name: 'Woof Woof'
   },
   {
      k_name: 'Fluffy'
   },
   {
      k_name: 'Slobbery'
   },
   {
      k_name: 'Canine Couture'
   },
   {
      k_name: 'De Treats'
   },
   {
      k_name: 'Dogventure'
   },
   {
      k_name: 'Bestie'
   },
   {
      k_name: 'All-Star'
   },
   {
      k_name: 'Ruff Line'
   },
   {
      k_name: 'Precious'
   },
   {
      k_name: 'Dogtopia'
   },
   {
      k_name: 'The Good Life'
   },
   {
      k_name: 'Unleashed'
   },
   {
      k_name: 'Tall Tails'
   },
   {
      k_name: 'The Four Paws'
   },
   {
      k_name: 'Pawsome'
   },
   {
      k_name: 'Paw Pal'
   },
   {
      k_name: 'Better Bark'
   },
   {
      k_name: 'Woody Gang'
   },
   {
      k_name: 'Bark Bud'
   },
   {
      k_name: 'Wag Zone'
   },
   {
      k_name: 'Crate Escape'
   },
   {
      k_name: 'Fur House'
   },
   {
      k_name: 'Belly Rub'
   },
   {
      k_name: 'Tails-A-Waggin'
   },
   {
      k_name: 'Big Paw'
   },
   {
      k_name: 'Moochy Poochy'
   },
   {
      k_name: 'Homeward'
   }
];

const seedKennels = () => Kennel.bulkCreate(kennelData);

module.exports = seedKennels;