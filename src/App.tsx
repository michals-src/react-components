import React from 'react';
import './App.css';

import { Carousel, Accordion, List, Coolors, Range, Picker, BottomSheet } from './react-components';
import { colors } from './react-components/coolors';
import {
	ArrowLongRightIcon,
	ArrowLongUpIcon,
	ArrowsUpDownIcon,
	BeakerIcon,
	BellAlertIcon,
	ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/solid';


const SheetRootView = function SheetCustomeView(props: any){

	return (
		<BottomSheet.Content onClose={props.close}>
			<div>
				<p className='mb-4'>Widok główny</p>
				{props.hasSome && <p className='mb-4'>Aktualnie parametry otrzymane od funkcji navigate: {JSON.stringify(props)}</p>}
				{!props.hasSome && <p className='mb-4'>Aktualnie brak parametrów otrzymanych od funkcji navigate</p>}
				<button className='px-4 py-2 bg-purple-900 rounded-lg text-white' onClick={() => props.navigate('sheet-custome', { namee: 'Joe Doe'})}>
					<div className='flex flex-row flex-nowrap items-center'>
						<p>Następny widok</p> <div className='ml-4'><ArrowLongRightIcon className='w-4 h-4' /></div>
					</div>
				</button>
			</div>
		</BottomSheet.Content>
	)
}

const SheetCustomeView = function SheetCustomeView(props: any){


	return (
		<BottomSheet.Content onBack={() => props.back({ hasSome: true, 'nazwa': 'powrót z ekranu SheetCustomeView'})} onSave={() => alert('Funkcja zapisu ...')}>
			<div>
				<p>Widok przykładowy</p>
				<p>Atrybut przekazany funkcją navigate: <span className='text-zinc-300'>{ props.namee }</span></p>
			</div>
		</BottomSheet.Content>
	)
}

function App() {
	const data = ['Javascript', 'React.js', 'Next.js', 'Gastby', 'Docker', 'Node.js', 'express.js'];
	const [color, setColor] = React.useState<(typeof colors)[number]>(colors[0]);
	const [value, setValue] = React.useState<number>(0);
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<React.Fragment key='App'>
			<div className='w-full min-h-screen flex justify-center items-center px-12 my-20'>
				<div className='w-full md:max-w-4xl mx-auto bg-slate-800 border border-slate-700 p-8 rounded-lg'>
					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Karuzela</h1>
						<p className='text-slate-400'>Przewijanie elementów umieszczonych wewnątrz komponentu. Potoczna nazwa slider badź carousel.</p>

						<div className='mt-4'>
							<Carousel
								shade={true}
								shadeColor='#1e293b'
								indicators={true}>
								{data.map((technology: any, idx: any) => {
									return (
										<Carousel.Item key={idx}>
											<div className='px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 mr-4 w-[500px]'>
												{technology}
											</div>
										</Carousel.Item>
									);
								})}
							</Carousel>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Lista</h1>
						<p className='text-slate-400'>Karta z elementami odseparowanymi linią</p>

						<div className='mt-4'>
							<List>
								<List.Item>
									<BeakerIcon className='w-6 h-6' />
									<div className='px-6'>
										<p className='text-sm'>List item 1</p>
									</div>
								</List.Item>
								<List.Item>
									<BellAlertIcon className='w-6 h-6' />
									<div className='px-6'>
										<p className='text-sm'>List item 2</p>
									</div>
								</List.Item>
								<List.Item>
									<ArrowLongUpIcon className='w-6 h-6' />
									<div className='px-6'>
										<p className='text-sm'>List item 3</p>
									</div>
								</List.Item>
								<List.Item>
									<ChatBubbleBottomCenterIcon className='w-6 h-6' />
									<div className='px-6'>
										<p className='text-sm'>List item 3</p>
									</div>
								</List.Item>
							</List>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Accordion</h1>
						<p className='text-slate-400'>Blok z nagłówkiem i ukrytą treścią, która zostaje widoczny po kliknięciu w nagłówek</p>

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
											<div className='px-6'>Los Angeles</div>
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
										<Accordion.ItemCollapse>
											<p className="p-6">
												Maruba
											</p>
										</Accordion.ItemCollapse>
									</Accordion.Item>
								</Accordion>
							</List>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Coolor</h1>
						<p className='text-slate-400'></p>

						<div className='mt-4'>
							<Coolors
								align='start'
								value={color}
								onClick={(e) => setColor(e.currentTarget.value)}
							/>
							<Coolors
								value={color}
								onClick={(e) => setColor(e.currentTarget.value)}
							/>
							<Coolors
								align='end'
								value={color}
								onClick={(e) => setColor(e.currentTarget.value)}
							/>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Coolor</h1>
						<p className='text-slate-400'></p>

						<div className='mt-4'>
							<Range
								value={value}
								onChange={(e) => setValue(+e.currentTarget.value)}
								thumb={true}
							/>

							<div className="mt-4">
								<p className='text-slate-400 mb-1'>Element bez wskaźnika</p>
								<p className='text-slate-400 mb-1'>Obecna wartość {value}</p>
							<Range
								value={value}
								onChange={(e) => setValue(+e.currentTarget.value)}
								thumb={false}
							/>
							</div>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>Picker</h1>
						<p className='text-slate-400'>Element typu select wzorowany na designu elementy apple ios</p>

						<div className='mt-4'>
							<Picker>
								<Picker.Select shadeColor='#1e293b' value="1" onChange={ a => console.log( a.currentTarget.value )}>
									<Picker.Option value="1">1</Picker.Option>
									<Picker.Option value="2">2</Picker.Option>
									<Picker.Option value="3">3</Picker.Option>
									<Picker.Option value="4">4</Picker.Option>
									<Picker.Option value="5">5</Picker.Option>
									<Picker.Option value="6">6</Picker.Option>
									<Picker.Option value="7">7</Picker.Option>
									<Picker.Option value="8">8</Picker.Option>
								</Picker.Select>
							</Picker>
						</div>
					</div>

					<div className='mb-10'>
						<h1 className='text-2xl text-slate-100'>BottomSheet</h1>
						<p className='text-slate-400'>Wysuwany dolny panel typu drawer z pozycją dolną</p>

						<div className='mt-4'>
							<button className='px-4 py-2 bg-purple-900 text-white rounded-lg shadow-md' onClick={() => setOpen(true)}>Otwórz bottom sheet</button>
						</div>
					</div>

					<BottomSheet open={open} onClose={() => setOpen(false)}>
						<BottomSheet.View root='true'>
							<SheetRootView />
						</BottomSheet.View>
						<BottomSheet.View as='sheet-custome'>
							<SheetCustomeView />
						</BottomSheet.View>
					</BottomSheet>

				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
