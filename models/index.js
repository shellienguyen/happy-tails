const Volunteer = require('./Volunteer');
const Canine = require('./Canine');
const Kennel = require('./Kennel');
const Demeanor = require('./Demeanor');

Volunteer.hasMany(Canine, {foreignKey: 'has_walked_am'});
Volunteer.hasMany(Canine, {foreignKey: 'has_walked_pm'});
Volunteer.hasMany(Canine, {foreignKey: 'has_potty_am'});
Volunteer.hasMany(Canine, {foreignKey: 'has_potty_pm'});

Demeanor.belongsTo(Canine, {foreignKey: 'c_demeanor'});

Kennel.belongsTo(Canine, {foreignKey: 'k_id'});


module.exports = { Volunteer, Canine, Kennel, Demeanor };