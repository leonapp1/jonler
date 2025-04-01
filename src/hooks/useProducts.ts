import { useEffect, useState, useRef } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  tipo: string;
  categoria: string;
}

export default function useProducts(apiUrl: string, category?: string, searchTerm?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<{url: string, data: Product[]} | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = new URL(apiUrl);
        
        // Verificar si los datos están en caché para esta URL
        if (cacheRef.current?.url === apiUrl) {
          setProducts(cacheRef.current.data);
          return;
        }
        
        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Almacenar en caché
        cacheRef.current = {url: apiUrl, data};
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      if (category) {
        result = result.filter(product => product.categoria === category);
      }
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term) ||
          product.tipo.toLowerCase().includes(term)
        );
      }
      
      setFilteredProducts(result);
    }
  }, [products, category, searchTerm]);

  return { products: filteredProducts.length > 0 ? filteredProducts : products, loading, error };
}