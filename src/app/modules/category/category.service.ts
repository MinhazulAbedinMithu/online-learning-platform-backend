import { TCategory } from './category.interface';
import CategoryModel from './category.model';

const createCategory = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

const getAllCategories = async () => {
  const result = await CategoryModel.find({})
    .populate('createdBy', '-password')
    .select(['_id', 'name', 'createdBy']);
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
};
