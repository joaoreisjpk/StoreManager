import * as productModel from "../models/productModel";

const getByName = async (name: string) => productModel.getByName(name);

export { getByName };
