const artistModel = require('../models/productModel');

const getByName = async (name) => artistModel.getByName(name);

module.exports(getByName);