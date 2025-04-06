import React from 'react';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className="inline-block bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
      {category}
    </span>
  );
};

export default CategoryBadge;