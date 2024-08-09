import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, addQuantity, minusQuantity, fetchCartItems } from '../../components/pages/stores/Cart';
import gif from '../../assets/thank_you.gif';
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';
import { useAuth } from '../Auth';
import { axiosInstance } from '../../apiconfig.jsx'; // Use axiosInstance

const Cart = () => {
	const auth = useAuth();

	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const carts = useSelector(store => store.cart.items);

	useEffect(() => {
		dispatch(fetchCartItems()); // This should now correctly fetch and set the items
	}, [dispatch]);

	useEffect(() => {
		// Debugging: log the cart items
		console.log('Cart items:', carts);
	}, [carts]);

	const handleMinusQuantity = (productId) => {
		dispatch(minusQuantity({ productId, quantity: 1 }));
	};

	const handleAddQuantity = (productId) => {
		dispatch(addQuantity({ productId, quantity: 1 }));
	};

	const handleRemoveItem = (itemId) => {
		dispatch(removeItem(itemId));
	};

	const buyNow = async () => {
		try {
			const token = localStorage.getItem('authToken');
			const phoneNumber = localStorage.getItem('phoneNumber');
			const price = parseInt(totalAmount);

			const response = await axiosInstance.post(
				`/products/payment/`,
				{
					price,
					phone_number: phoneNumber,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 201) {
				setShowModal(true);
			} else {
				console.error('Failed to process payment');
				setShowModal(true);
			}

		} catch (error) {
			console.error('Error processing payment:', error.message);
		}
	};

	const subtotal = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const shippingAmount = 5.00;
	const delivery = 130;
	const totalAmount = subtotal + shippingAmount + delivery;

	return (
		<div className='lg:container mx-auto p-5'>
			<div className='m-10'>
				<h3 className='text-center text-3xl font-bold'>
					Shopping Cart
				</h3>
			</div>
			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
					<div className='bg-white p-8 rounded-lg'>
						<h2 className='text-2xl font-bold mb-4'>Success!</h2>
						<img src={gif} alt='' width={300} />
						<p>Check your phone for payment prompt.</p>
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
			<div className='grid md:grid-cols-12 md:gap-5 md:m-5'>
				<div className='md:col-span-9 col-span-12'>
					<div>
						{carts.length === 0 ? (
							<div className="text-center text-gray-500">
								No items in the cart
							</div>
						) : (
							carts.map((item) => (
								<div
									key={item.id}
									className='grid grid-cols-12 gap-5 mb-4 border border-gray-300 rounded-xl p-3'
								>
									<div className='col-span-5 md:col-span-3'>
										<img
											className='object-cover'
											src={item.image}
											alt={item.name}
											style={{
												width: '150px',
												height: '150px',
												objectFit: 'cover',
												display: 'flex',
											}}
										/>
									</div>

									<div className='col-span-10 md:col-span-9 flex flex-col justify-between'>
										<div>
											<p className='text-lg font-semibold'>
												{item.name}
											</p>
											<p className='text-sm text-gray-600'>
												{item.description}
											</p>
										</div>
										<div className='flex justify-between items-center'>
											<p className='text-lg font-semibold text-red-500'>
												${item.price}
											</p>
											<div className='flex items-center'>
												<button
													className='text-white px-1 rounded-xl hover:text-gray-700 focus:outline-none'
													onClick={() =>
														handleMinusQuantity(item.productId)
													}
												>
													<DashCircle color='red' />
												</button>
												<span className='mx-1'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														handleAddQuantity(item.productId)}
													className='text-white px-1 rounded-xl hover:text-gray-700 focus:outline-none'
												>
													<PlusCircle color='blue' />
												</button>
											</div>
										</div>
										<button
											className='w-1/4 mt-2 bg-gray-700 text-white text-sm font-semibold rounded-md py-1 px-3 focus:outline-none ml-auto hover:bg-red-800'
											onClick={() =>
												handleRemoveItem(item.productId)
											}
										>
											Remove
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				<div className='md:col-span-3 col-span-12 border rounded-xl'>
					<div className='p-3'>
						<p className='font-bold mb-3'>Cart Total</p>
						<div>
							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px]'>
									SubTotal
								</small>
								<small>Kshs. {subtotal.toFixed(2)}</small>
							</div>
							<hr />
							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px] text-red-600'>
									Shipping
								</small>
								<small>Kshs. {shippingAmount.toFixed(2)}</small>
							</div>
							<hr />
							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px]'>
									Choose delivery point
								</small>
								<small>Kshs. {delivery.toFixed(2)}</small>
							</div>

							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px]'>
									Total
								</small>
								<small className='font-bold underline text-red-600'>
									Kshs. {totalAmount.toFixed(2)}
								</small>
							</div>
							<br />
							{!auth.user ? (
								<div className='text-center text-red-500'>
									<span>Please <Link to="/register" className='hover:text-blue-600'>login</Link> to proceed</span>
								</div>
							) : (
								<div className='p-3'>
									<button
										onClick={buyNow}
										className='bg-blue-700 text-white text-sm font-semibold rounded-md p-3 hover:bg-gray-800 focus:outline-none ml-auto'
									>
										Checkout
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<br />
			<br />
		</div>
	);
};

export default Cart;
