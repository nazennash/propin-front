import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

export const Category = () => {
	const { categoryId } = useParams();

	const [categoryProducts, setCategoryProducts] = useState([]);
	const [uniqueSubCategories, setUniqueSubCategories] = useState([]);
	const [uniqueSubTypeCategories, setUniqueSubTypeCategories] = useState([]);
	const [uniqueCategories, setUniqueCategories] = useState([]);
	const [uniqueBrands, setUniqueBrands] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		getCategoryProducts(categoryId, currentPage);
	}, [categoryId, currentPage]);

	const getCategoryProducts = async (mainCategoryId, page) => {
		setIsLoading(true);
		setError(null);
		try {
			const url = `//198.211.106.68/products/products/main_category/${mainCategoryId}/?page=${page}`;
			const response = await axios.get(url);
			const data = response.data;
			if (data && data.results) {
				setCategoryProducts(data.results);
				setTotalPages(Math.ceil(data.count / data.page_size));

				const subCategories = new Set();
				const subTypeCategories = new Set();
				const categories = new Set();
				const brands = new Set();

				data.results.forEach((product) => {
					subCategories.add(product.sub_category.name);
					subTypeCategories.add(product.sub_type_category.name);
					categories.add(product.name);
					brands.add(product.brand);
				});

				setUniqueSubCategories(Array.from(subCategories));
				setUniqueSubTypeCategories(Array.from(subTypeCategories));
				setUniqueCategories(Array.from(categories));
				setUniqueBrands(Array.from(brands));
			}
		} catch (error) {
			setError('Error fetching category products');
			console.error('Error fetching category products:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className='container mx-auto '>
			<div className='p-5 w-1/2 mx-auto'>
				<div className="md:hidden mx-auto ">
					<div className="relative mt-2 rounded-md shadow-sm">
						<input
							type="text"
							name="price"
							id="price"
							className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#24C6DC] sm:text-sm sm:leading-6"
							placeholder="Search..."
						/>
					</div>
				</div>
			</div>
			<div className='grid lg:grid-cols-12 gap-5'>
				<div className='lg:col-span-2 lg:grid hidden lg:block'>
					<div className='mb-3'>
						<div className='bg-blue-500 p-3 text-[16px] font-bold text-white rounded-t-lg mb-3'>
							<Link to='#' className='bg-blue-500' aria-current='true'>
								Main Categories
							</Link>
						</div>
						<div className='px-2 text-[16px] font-bold rounded-t-lg mb-3'>
							{uniqueSubCategories.map((category, index) => (
								<Link key={index} to='#' className=''>
									{category}
								</Link>
							))}
						</div>
					</div>

					<div className='mb-3'>
						<div className='bg-blue-500 p-3 text-[16px] font-bold text-white rounded-t-lg mb-3'>
							<Link to='#' className='' aria-current='true'>
								Categories
							</Link>
						</div>
						<div className='px-2 text-[16px] font-bold rounded-t-lg mb-3'>
							{uniqueSubTypeCategories.map((category, index) => (
								<Link key={index} to='#' className=''>
									{category}
								</Link>
							))}
						</div>
					</div>

					<div className='mb-3'>
						<div className='bg-blue-500 p-3 text-[16px] font-bold text-white rounded-t-lg mb-3'>
							<Link to='#' className='' aria-current='true'>
								Sub-Categories
							</Link>
						</div>
						<div className='px-2 text-[16px] font-bold rounded-t-lg mb-3'>
							{uniqueCategories.map((category, index) => (
								<Link key={index} to='#' className=''>
									{category}
								</Link>
							))}
						</div>
					</div>

					<div className=''>
						<div className='bg-blue-500 p-3 text-[16px] font-bold text-white rounded-t-lg mb-3'>
							<Link to='#' className='' aria-current='true'>
								Brand
							</Link>
						</div>
						<div className='px-2 text-[16px] font-bold rounded-t-lg mb-3'>
							{uniqueBrands.map((brand, index) => (
								<Link key={index} to='#' className=''>
									{brand}
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className='lg:col-span-8 md:block'>
					<div className=''>
						<small className=''></small>
					</div>
					{error && <div className='text-red-500'>{error}</div>}
					{isLoading ? (
						<div className='text-center'>Loading...</div>
					) : (
						categoryProducts.map((product, index) => (
							<div
								className='border p-5 mb-5 rounded-lg grid grid-cols-12'
								key={index}
							>
								<div className='lg:col-span-3 col-span-12 lg:mt-5'>
									<div className="flex object-cover object-center w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] mx-auto overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75">
										<img
											src={product.image}
											alt={product.name}
											className="items-center h-full w-full object-cover object-center lg:h-full lg:w-3/4 mx-auto"
										/>
									</div>
								</div>
								<div className='lg:col-span-9 col-span-12'>
									<h5 className='text-xl font-bold'>{product.brand}</h5>
									<small className='text-red-600 text-[14px] font-bold'>
										Price: {product.discounted_price}
									</small>
									<br />
									<small className=''>
										<del>{product.price}</del>
									</small>
									<br />
									<small className=''>{product.description}</small>
									<br />
									<br />
									<Link
										to={`/details/${product.id}`}
										className='bg-blue-500 p-4 rounded-md text-[14px] text-white py-2 '
									>
										View details
									</Link>
								</div>
							</div>
						))
					)}
					<div className='mt-4 flex justify-center'>
						<button
							onClick={prevPage}
							disabled={currentPage === 1}
							className={`mr-2 px-3 py-1 bg-blue-500 text-white rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'
								}`}
						>
							<ArrowLeft />
						</button>
						<button
							onClick={nextPage}
							disabled={currentPage === totalPages}
							className={`px-3 py-1 bg-blue-500 text-white rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'
								}`}
						>
							<ArrowRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
