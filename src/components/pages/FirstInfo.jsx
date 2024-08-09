import React from 'react';
import { Box, Check2Circle, CreditCard, Heart } from 'react-bootstrap-icons';

export const FirstInfo = () => {
	return (
		<div className='container mx-auto'>
			<div className='gap-5 grid lg:grid-cols-4 md:gap-10 lg:gap-10 md:grid-cols-2 md:p-5 p-10'>
				<div className='col-span-1 text-center'>
					<CreditCard
						size={25}
						className='inline-block my-2 font-bold'
						aria-label="Payment only Online Icon"
					/>
					<h1 className='text-xl font-bold'>Payment only Online</h1>
					<p className='text-[15px] my-2'>
						Experience seamless online payments with our secure gateway.
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Box
						size={25}
						className='inline-block'
						aria-label="New stocks and sales Icon"
					/>
					<h1 className='text-xl font-bold'>New Stocks and Sales</h1>
					<p className='text-[15px] my-2'>
						Stay updated with our latest inventory and exclusive offers.
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Check2Circle
						size={25}
						className='inline-block'
						aria-label="Quality Assurance Icon"
					/>
					<h1 className='text-xl font-bold'>Quality Assurance</h1>
					<p className='text-[15px] my-2'>
						Guaranteed quality with every purchase you make.
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Heart
						size={25}
						className='inline-block'
						aria-label="Delivery from 1 Hour Icon"
					/>
					<h1 className='text-xl font-bold'>Delivery from 1 Hour</h1>
					<p className='text-[15px] my-2'>
						Fast and reliable delivery right to your doorstep.
					</p>
				</div>
			</div>
			<hr />
		</div>
	);
};
