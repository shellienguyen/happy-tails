const Volunteer = require('./Volunteer');
const Canine = require('./Canine');
const Kennel = require('./Kennel');
const Demeanor = require('./Demeanor');
//create associations
Canine.belongsTo(Volunteer, {foreignKey:'has_walked_am'});
Canine.belongsTo(Volunteer, {foreignKey:'has_walked_pm'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_walked_am'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_walked_pm'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_potty_am'});
// Volunteer.hasMany(Canine, {foreignKey: 'has_potty_pm'});

// Demeanor.belongsTo(Canine, {foreignKey: 'c_demeanor'});
Canine.belongsTo(Kennel, {foreignKey: 'k_id'});
Canine.belongsTo(Demeanor, {foreignKey: 'c_demeanor'});

// Kennel.belongsTo(Canine, {foreignKey: 'k_id'});
Canine.belongsTo(Kennel, {foreignKey: 'k_id'});


module.exports = { Volunteer, Canine, Kennel, Demeanor };