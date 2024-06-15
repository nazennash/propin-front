import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../components/pages/stores/Cart';

export const Details = () => {
	const { productId } = useParams();
	const [productData, setProductData] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		const getProductData = async () => {
			try {
				const url = `http://127.0.0.1:8000/products/products/${productId}/`;
				const response = await axios.get(url);
				setProductData(response.data);
			} catch (error) {
				console.error('Error fetching product details:', error.message);
			}
		};

		getProductData();
	}, [productId]);

	const handleAddToCart = () => {
		dispatch(
			addToCart({
				productId: productData.id,
				description: productData.description,
				...productData,
				quantity: 1,
			})
		);
	};

	const buyNow = async () => {
		try {
			const token = localStorage.getItem('token');
			const phoneNumber = '0797382426';
			const price = parseInt(productData.discounted_price);

			if (token) {
				const response = await axios.post(
					`https://whale-app-tlndf.ondigitalocean.app/api/payment/`,
					{
						price,
						phone_number: phoneNumber,
					},
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (response.status === 201) {
					console.log('Payment successful');
				} else {
					console.error('Failed to process payment');
				}
			}
		} catch (error) {
			console.error('Error processing payment:', error.message);
		}
	};

	return (
		<div className='container mx-auto lg:p-10'>
			<div className='grid lg:grid-cols-10 border grid-cols-2 mt-10'>
				<div className='col-span-4 lg:m-auto mx-auto mt-10'>
					<img
						className='w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]'
						src={productData.image}
						alt={productData.name}
						style={{
							objectFit: 'cover',
						}}
					/>
				</div>
				<div className='col-span-5 p-10 border-l'>
					<div className=''>
						<div className='font-bold text-3xl'>
							{productData.brand}
						</div>
						<div className='font-bold text-red-500'>
							Kshs. {productData.discounted_price}
						</div>
						<br />
						<hr />
						<div className='mt-5 mb-5'>
							<p className='font-bold mb-5'>
								Product Description:
							</p>
							<small>{productData.description}</small>
						</div>
						<hr />
						<br />
						<div className='mb-5'>
							<span className='font-bold'>Color: </span>
							<span className=''>{productData.color}</span>
						</div>
						<div className='mb-5'>
							<span className='font-bold'>Size: </span>
							<span className=''>{productData.size}</span>
						</div>
						<div className='flex'>
							<span className='font-bold'>
								<Heart size={23} color='red' />
							</span>
							<span>- Save for later</span>
						</div>
						<br />
						<div className='flex text-center'>
							<Link
								to='#'
								className='bg-green-700 p-2 rounded-md text-[14px] text-white mr-4'
								onClick={buyNow}
							>
								Buy Now
							</Link>
							<button
								onClick={handleAddToCart}
								className='bg-blue-500 p-2 rounded-md text-[14px] text-white hover:text-blue-800'
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
			<br />
			<br />
		</div>
	);
};
