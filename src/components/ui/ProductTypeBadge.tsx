import React from 'react';

interface ProductTypeBadgeProps {
  tipo: string;
}

const ProductTypeBadge: React.FC<ProductTypeBadgeProps> = ({ tipo }) => {
  return (
    <p className="text-lg font-semibold text-emerald-200 bg-emerald-500/15 px-4 py-1.5 rounded-full inline-block hover:bg-emerald-500/20 transition-colors duration-200 shadow-sm">
      {tipo}
    </p>
  );
};

export default ProductTypeBadge;