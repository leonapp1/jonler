"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import CartButton from "@/components/ui/CartButton";
import { useCart } from "@/context/CartContext";
import { useCartStore } from "@/store/useCartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useProducts from "@/hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import CategoryBadge from "@/components/ui/CategoryBadge";
import ProductTypeBadge from "@/components/ui/ProductTypeBadge"; // Correct import for ProductTypeBadge
import ProductPrice from "@/components/ui/ProductPrice"; // Correct import for ProductPrice

interface Product {
	id: string;
	name: string;
	price: string;
	image: string;
	description: string;
	tipo?: string;
	categoria?: string;
	images?: string[];
}

export default function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = use(params);

	const { dispatch } = useCart();
	const openCart = useCartStore((state) => state.open);
	const { products, loading, error } = useProducts();
	const [product, setProduct] = useState<Product | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const foundProduct = products.find((p) => p.id === resolvedParams.id);
		if (foundProduct) {
			setProduct(foundProduct);
		}
	}, [products, resolvedParams.id]);

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500">
				{error}
			</div>
		);
	}

	if (loading || !product) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Cargando...
			</div>
		);
	}

	const addToCart = () => {
		dispatch({
			type: "ADD_ITEM",
			payload: {
				id: product.id,
				name: product.name,
				price: parseFloat(product.price),
				image: product.image,
				quantity: 1,
			},
		});
		openCart();
	};

	return (
		<>
			<Header />
			<div className="py-16 h-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden mt-32 md:mt-20">
				<div className=" mx-auto max-w-7xl ">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 sm:p-6">
						{/* Image Gallery Section */}
						<div className="space-y-6 flex flex-col items-center">
							<Swiper
								modules={[Navigation, Pagination]}
								navigation
								pagination={{ clickable: true }}
								spaceBetween={15}
								slidesPerView={1}
								className="w-full h-[350px] sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl"
							>
								{[product.image, ...(product.images || [])].map(
									(img, index) => (
										<SwiperSlide
											key={index}
											className="relative"
										>
											<Image
												src={img}
												alt={`${product.name} - Image ${
													index + 1
												}`}
												fill
												className="object-cover transition-transform duration-300 hover:scale-105"
												priority
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
												quality={95}
											/>
											<button
												onClick={() =>
													setIsModalOpen(true)
												}
												className="absolute bottom-6 right-6 p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 cursor-pointer transform hover:scale-110 backdrop-blur-sm"
											>
												<Maximize2 size={32} />
											</button>
										</SwiperSlide>
									)
								)}
							</Swiper>
						</div>

						{/* Product Details */}
						<div className="flex flex-col gap-6 text-white p-6 backdrop-blur-md bg-white/20 rounded-2xl shadow-xl">
							<div className="flex flex-row w-full relative">
								<div className="flex flex-wrap gap-3">
									{product.categoria && (
										<CategoryBadge
											category={product.categoria}
										/>
									)}
									{product.tipo && (
										<ProductTypeBadge tipo={product.tipo} />
									)}
								</div>
								<div className="absolute -top-12 -right-12 transform rotate-3">
									<ProductPrice price={product.price} />
								</div>
							</div>

							<div>
								<h1 className="text-2xl font-bold  bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent leading-tight">
									{product.name}
								</h1>

								<div className="relative ">
									<p className="text-base leading-relaxed text-purple-50 text-justify  border-purple-400/40 py-4 ">
										{product.description}
									</p>
								</div>
							</div>

							<CartButton onClick={addToCart}>
								Agregar al Carrito
							</CartButton>
						</div>
					</div>
				</div>
        {/* Productos relacionados */}
        <section className=" py-8 max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-50">Otros Productos que te pueden gustar</h2>
          <div>
            
          </div>

        </section>
			</div>

			{/* Modal for Fullscreen Image */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
					<button
						onClick={() => setIsModalOpen(false)}
						className="absolute top-4 right-3 text-white text-2xl z-50 cursor-pointer hover:scale-110 hover:text-purple-300 transition-all duration-300 flex items-center gap-2"
					>
						X
					</button>
					<Swiper
						modules={[Navigation, Pagination]}
						navigation
						pagination={{ clickable: true }}
						spaceBetween={10}
						slidesPerView={1}
						className="w-full h-full"
					>
						{[product.image, ...(product.images || [])].map(
							(img, index) => (
								<SwiperSlide key={index}>
									<Image
										src={img}
										alt={`Fullscreen Image ${index + 1}`}
										fill
										className="object-contain"
										priority
										sizes="100vw"
										quality={90}
									/>
								</SwiperSlide>
							)
						)}
					</Swiper>
				</div>
			)}

			<Footer />
		</>
	);
}
