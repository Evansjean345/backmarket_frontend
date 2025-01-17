import React, { createContext, useCallback, useEffect } from 'react';
import { getAllCategoriesUrl,addCategoryUrl,addSubCategoryUrl,addMultipleCategoriesUrl } from '../url';
import axios from 'axios';
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [categoriesAndSubCategories, setCategoriesAndSubCategories] = React.useState([]);
  const [error, setError] = React.useState(null);

  const getAllCategories = useCallback(async () => {
    try {
      const response = await axios.get(getAllCategoriesUrl);
      setCategories(response.data);
    } catch (error) {
      setError(error.message);
    }
  },[]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const addCategory = async (category) => {
    try {
      const response = await axios.post(addCategoryUrl, category);
      setCategories([...categories, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const addSubCategory = async (subCategory) => {
    try {
      const response = await axios.post(addSubCategoryUrl, subCategory);
      setSubCategories([...subCategories, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const addCategoriesAndSubCategories = async (categories) => {
    try {
      const response = await axios.post(addMultipleCategoriesUrl, categories);
      setCategoriesAndSubCategories([...categoriesAndSubCategories, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, subCategories, categoriesAndSubCategories, error, getAllCategories, addCategory, addSubCategory, addCategoriesAndSubCategories }}>
      {children}
    </CategoryContext.Provider>
  );

  };