import React, {useEffect} from "react";
import CategoryScreenDropdown from "./CategoryScreenDropdown";

interface ICategoryScreenProps {}

const CategoryScreen: React.FunctionComponent<ICategoryScreenProps> = () => {
    const getCategories = async ():Promise<Array<any>> => {
        const categoriesData = await fetch('https://opentdb.com/api_category.php')
        const categories = await categoriesData.json()
        return categories.trivia_categories;
    }


    useEffect(() => {
        getCategories();
    }, []);
    

  return (
    <>
      <CategoryScreenDropdown title="Number of Questions" options={[]} />
      <CategoryScreenDropdown title="Select Category" options={[]} />
      <CategoryScreenDropdown title="Select Difficulty" options={[]} />
      <CategoryScreenDropdown title="Select Type" options={[]} />
    </>
  );
};

export default CategoryScreen;
