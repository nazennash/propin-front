import React from 'react';
import { Box, Check2Circle, CreditCard, Heart } from 'react-bootstrap-icons';

export const FirstInfo = () => {
	return (
		<div className='container mx-auto'>
			<div className='sm:hidden gap-5 grid lg:grid-cols-4 md:gap-10 lg:gap-10 md:grid-cols-2 md:p-5 p-10'>
				<div className='col-span-1 text-center'>
					<CreditCard
						size={25}
						className='inline-block my-2 font-bold'
					/>
					<h1 className='text-xl font-bold'>Payment only Online</h1>
					<p className='text-[15px] my-2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Box size={25} className='inline-block' />
					<h1 className='text-xl font-bold'>New stocks and sales</h1>
					<p className='text-[15px] my-2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Check2Circle size={25} className='inline-block' />
					<h1 className='text-xl font-bold'>Quality assurance</h1>
					<p className='text-[15px] my-2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Heart size={25} className='inline-block' />
					<h1 className='text-xl font-bold'>Delivery from 1 hour</h1>
					<p className='text-[15px] my-2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<hr />
			<br />
			<br />
		</div>
	);
};
