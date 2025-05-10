import React from 'react';

const Header = ({ title = "Theraphy Hub" }) => {
  return (
    <div className="w-full h-full bg-sidebar-bg text-white ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="border-t border-gray-600 mt-4"></div>
      </div>
    </div>
  );
};

export default Header;