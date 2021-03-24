const { Volunteer } = require('../models');

const volunteerData = [
   {
      username: 'shellsn',
      password: 'pwd111',
      v_fname: 'Shellie',
      v_lname: 'Nguyen'
   },
   {
      username: 'ericas',
      password: 'pwd111',
      v_fname: 'Erica',
      v_lname: 'Salcedo'
   },
   {
      username: 'nathans',
      password: 'pwd111',
      v_fname: 'Nathan',
      v_lname: 'Stephens'
   },
   {
      username: 'alexr',
      password: 'pwd111',
      v_fname: 'Alex',
      v_lname: 'Reveles'
   },
   {
      username: 'christophert',
      password: 'pwd111',
      v_fname: 'Christopher',
      v_lname: 'Thompson'
   },
   {
      username: 'ethanr',
      password: 'pwd111',
      v_fname: 'Ethan',
      v_lname: 'Ruanjingtian'
   },
   {
      username: 'sidoniey',
      password: 'pwd111',
      v_fname: 'Sidonie',
      v_lname: 'Young'
   },
   {
      username: 'amelias',
      password: 'pwd111',
      v_fname: 'Amelia',
      v_lname: 'Santos'
   },
   {
      username: 'jenniferl',
      password: 'pwd111',
      v_fname: 'Jennifer',
      v_lname: 'Lilac'
   },
   {
      username: 'sandyh',
      password: 'pwd111',
      v_fname: 'Sandy',
      v_lname: 'Hilden'
   },
   {
      username: 'gracep',
      password: 'pwd111',
      v_fname: 'Grace',
      v_lname: 'Park'
   },
   {
      username: 'minhd',
      password: 'pwd111',
      v_fname: 'Minh',
      v_lname: 'Dang'
   }
];

const seedVolunteers = () => Volunteer.bulkCreate(volunteerData, { individualHooks: true, returning: true });

module.exports = seedVolunteers;