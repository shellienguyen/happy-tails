const Volunteer = require('./Volunteer');
const Canine = require('./Canine');
const Kennel = require('./Kennel');
const Demeanor = require('./Demeanor');
//create associations
Canine.belongsToMany(Volunteer, {through:'has_walked_am'});
Canine.belongsToMany(Volunteer, {through:'has_walked_pm'});
Canine.belongsToMany(Volunteer, {through:'has_potty_am'});
Canine.belongsToMany(Volunteer, {through:'has_potty_pm'});

// Volunteer.belongsToMany(Canine, {through: 'has_walked_am'});
// Volunteer.belongsToMany(Canine, {through: 'has_walked_pm'});
// Volunteer.belongsToMany(Canine, {through: 'has_potty_am'});
// Volunteer.belongsToMany(Canine, {through: 'has_potty_pm'});
Volunteer.belongsToMany(Canine, {through: 'v_id'});
Volunteer.belongsToMany(Canine, {through: 'v_id'});
Volunteer.belongsToMany(Canine, {through: 'v_id'});
Volunteer.belongsToMany(Canine, {through: 'v_id'});

// Demeanor.hasMany(Canine, {foreignKey: 'd_id'});
Canine.belongsTo(Kennel, {foreignKey: 'k_id'});
Canine.belongsTo(Demeanor, {foreignKey: 'c_demeanor'});
// Kennel.belongsTo(Canine, {foreignKey: 'k_id'});
Kennel.hasMany(Canine, {foreignKey: 'k_id'});

module.exports = { Volunteer, Canine, Kennel, Demeanor };