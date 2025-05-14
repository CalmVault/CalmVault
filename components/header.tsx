import React, { FC } from 'react';
interface HeaderProp {
  title: string;
  titleSize?: string
}
const Header: FC<HeaderProp> = ({ title = "Theraphy Hub", titleSize }) => {
  return (
    <div className="w-full h-full bg-sidebar-bg text-white ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className={`${titleSize ? titleSize : "text-3xl"} font-bold`}>{title}</h1>
        <div className="border-t border-gray-600 mt-4"></div>
      </div>
    </div>
  );
};

export default Header;