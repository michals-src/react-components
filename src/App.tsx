import React from 'react';
import './App.css';

import { Carousel, Accordion, List } from './react-components';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';

function App() {
	const data = ['Javascript', 'React.js', 'Next.js', 'Gastby', 'Docker', 'Node.js', 'express.js'];

	return (
		<React.Fragment key='App'>
			<div className='w-full min-h-screen flex justify-center items-center px-12'>
				<div className='max-w-4xl mx-auto bg-slate-800 border border-slate-700 p-8 rounded-lg'>
					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Karuzela</h1>
						<p className='text-slate-400'>Przewijanie elementów umieszczonych wewnątrz komponentu</p>

						<div className='mt-4'>
							<Carousel
								shade={true}
								shadeColor='#1e293b'
								indicators={true}>
								{data.map((technology: any, idx: any) => {
									return (
										<Carousel.Item key={idx}>
											<div className='px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 mr-4 w-[600px]'>
												{technology}
											</div>
										</Carousel.Item>
									);
								})}
							</Carousel>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Accordion</h1>
						<p className='text-slate-400'>Lista z ukrytą treścią</p>

						<div className='mt-4'>
							<List>
								<Accordion key={2}>
									<Accordion.Item>
										<Accordion.ItemHeader>
											<List.Item>
												<ArrowsUpDownIcon className='w-6 h-6' />
												<div className='flex-1 pl-6'>
													<p className='text-sm'>List Accordion item 2</p>
												</div>
											</List.Item>
										</Accordion.ItemHeader>
										<Accordion.ItemCollapse>
											<div className='px-6'>Jamajca</div>
										</Accordion.ItemCollapse>
									</Accordion.Item>
									<Accordion.Item>
										<Accordion.ItemHeader>
											<List.Item>
												<ArrowsUpDownIcon className='w-6 h-6' />
												<div className='flex-1 pl-6'>
													<p className='text-sm'>List Accordion item 3</p>
												</div>
											</List.Item>
										</Accordion.ItemHeader>
										<Accordion.ItemCollapse>Maruba</Accordion.ItemCollapse>
									</Accordion.Item>
								</Accordion>
							</List>
						</div>
					</div>

					{/* <BottomSheet
						open={open}
						onClose={() => setOpen(false)}>
						<BottomSheet.View root='true'>

						</BottomSheet.View>
					</BottomSheet> */}
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
