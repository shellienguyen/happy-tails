const Volunteer = require('./Volunteer');
const Canine = require('./Canine');
const Kennel = require('./Kennel');
const Demeanor = require('./Demeanor');

//create associations
Canine.belongsTo(Volunteer, {foreignKey: 'has_walked_am'});
Canine.belongsTo(Volunteer, {foreignKey: 'has_walked_pm'});
Canine.belongsTo(Volunteer, {foreignKey: 'has_potty_am'});
Canine.belongsTo(Volunteer, {foreignKey: 'has_potty_pm'});

Canine.belongsTo(Kennel, {foreignKey: 'k_id'});
Canine.belongsTo(Demeanor, {foreignKey: 'c_demeanor'});

module.exports = { Volunteer, Canine, Kennel, Demeanor };