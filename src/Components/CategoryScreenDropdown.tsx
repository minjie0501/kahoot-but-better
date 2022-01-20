import * as React from "react";

interface ICategoryScreenDropdownProps {
  title: string;
  options: Array<any>;
}

const CategoryScreenDropdown: React.FunctionComponent<ICategoryScreenDropdownProps> = ({title, options}) => {
  return (
    <>
      <label htmlFor={title} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {title}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/ p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </select>
    </>
  );
};

export default CategoryScreenDropdown;
