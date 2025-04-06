"use client";

import { useEffect, useState } from "react";

interface Product {
	id: string;
	name: string;
	price: string;
	image: string;
	description: string;
	tipo: string;
	categoria: string;
	images?: string[];
}
const apiUrl = "https://script.google.com/macros/s/AKfycbyz00Fe_-oTsmYkQjauUKLkgBazgU46edkZLDXvp3EA7xAIeVx7WKQDe1YKpVIGpWEO/exec";
export default function useProducts(category?: string, searchTerm?: string,tipo?: string) {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Keep hook order consistent - move all useEffect calls to top
	useEffect(() => {
		const fetchProducts = async () => {
			console.time("fetchProducts");
			setLoading(true);

			try {
				// Verificar si los datos están en localStorage con timestamp
				const cachedData = localStorage.getItem(apiUrl);
				const cachedTimestamp = localStorage.getItem(`${apiUrl}_timestamp`);
				const now = Date.now();
				const oneHour = 3600000; // 1 hora en milisegundos
				
				if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < oneHour) {
					setProducts(JSON.parse(cachedData));
					setLoading(false);
					console.timeEnd("fetchProducts");
					return;
				}

				// Realizar la petición
				const response = await fetch(apiUrl, {
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				localStorage.setItem(apiUrl, JSON.stringify(data)); // Guardar en localStorage
				localStorage.setItem(`${apiUrl}_timestamp`, Date.now().toString()); // Guardar timestamp
				setProducts(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Error desconocido"
				);
			} finally {
				setLoading(false);
				console.timeEnd("fetchProducts");
			}
		};

		fetchProducts();
	}, []); // Removed apiUrl from dependencies

	useEffect(() => {
		if (!products.length) return;

		let result = products;

		if (category) {
			result = result.filter((product) => product.categoria === category);
		}

		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			result = result.filter(
				(product) =>
					product.name.toLowerCase().includes(term) ||
					product.description.toLowerCase().includes(term) ||
					product.tipo.toLowerCase().includes(term)
			);
		}
		if (tipo) {
			const term = tipo.toLowerCase();
			result = result.filter(
				(product) =>
					product.name.toLowerCase().includes(term) ||
					product.description.toLowerCase().includes(term) ||
					product.tipo.toLowerCase().includes(term)
			);
		}

		setFilteredProducts(result);
	}, [products, category, searchTerm,tipo]);

	return {
		products: filteredProducts.length > 0 ? filteredProducts : products,
		loading,
		error,
	};
}
