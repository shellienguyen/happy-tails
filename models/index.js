const Volunteer = require('./Volunteer');
const Canine = require('./Canine');
const Kennel = require('./Kennel');
const Demeanor = require('./Demeanor');
//create associations
Canine.belongsTo(Volunteer, {foreignKey: 'has_walked_am'});
Canine.belongsTo(Volunteer, {foreignKey: 'has_walked_pm'});
Canine.belongsTo(Volunteer, {foreignKey: 'has_potty_am'});
Canine.belongsTo(Volunteer, {foreignKey: 'has_potty_pm'});

// Volunteer.hasMany(Canine, {foreignKey: 'has_walked_am'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_walked_pm'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_potty_am'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_potty_pm'});

// Demeanor.hasMany(Canine, {foreignKey: 'd_id'});
Canine.belongsTo(Kennel, {foreignKey: 'k_id'});
Canine.belongsTo(Demeanor, {foreignKey: 'c_demeanor'});
// Kennel.belongsTo(Canine, {foreignKey: 'k_id'});
// Demeanor.hasMany(Canine, {foreignKey: 'c_demeanor'});
Kennel.hasMany(Canine, {foreignKey: 'k_id'});

module.exports = { Volunteer, Canine, Kennel, Demeanor };