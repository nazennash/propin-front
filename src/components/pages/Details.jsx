import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../components/pages/stores/Cart';
import gif from '../../assets/thank_you.gif';

export const Details = () => {
	const [showModal, setShowModal] = useState(false);
	const { productId } = useParams();
	const [productData, setProductData] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		const getProductData = async () => {
			try {
				const url = `http://198.211.106.68/products/products/${productId}/`;
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
			const token = localStorage.getItem('authToken');
			const phoneNumber = localStorage.getItem('phoneNumber');
			const price = parseInt(productData.discounted_price)

			console.log(phoneNumber)
			console.log(token)
			console.log(productData.discounted_price)


			const response = await axios.post(
				`http://198.211.106.68/products/payment/`,
				{
					price,
					phone_number: phoneNumber,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			);

			console.log("nash")

			if (response.status === 201) {
				console.log('Payment successful');
				setShowModal(true);
			} else {
				console.error('Failed to process payment');
				setShowModal(true);
			}

		} catch (error) {
			console.error('Error processing payment:', error.message);
		}
	};

	return (
		<div className='container mx-auto lg:p-10'>
			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
					<div className='bg-white p-8 rounded-lg'>
						<h2 className='text-2xl font-bold mb-4'>Success!</h2>
						<img src={gif} alt='' width={300} />
						<p>Thank you for buying {productData.brand}</p>
						<p>Bridging the digital divide</p>
						<button
							className='mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			)}
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
							<button
								onClick={() => buyNow()}
								className='bg-green-700 p-2 rounded-md text-[14px] text-white mr-4'
							>

								Buy Now
							</button>
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
