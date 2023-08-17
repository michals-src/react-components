import React from 'react';
import classNames from 'classnames';

const CarouselIndicator = function Carousel(props: any) {
	const { onClick: onClickCallback, isActive, ...other } = props;
	return (
		<button
			role='button'
			className='p-3 m-0'
			onClick={(e) => onClickCallback(e)}
			{...other}>
			<span
				className={classNames('block w-3 h-3 rounded-full', {
					'bg-orange-400': isActive,
					'bg-zinc-600': !isActive,
				})}
				style={{
					transitionProperty: 'background-color',
					transitionDuration: '0.4s',
					transitionTimingFunction: 'ease',
				}}></span>
		</button>
	);
};

CarouselIndicator.displayName = 'CarouselIndicator';

export default function CarouselIndicators(props: {
	length: number;
	value: number;
	onChange?: (event: React.MouseEventHandler<HTMLDivElement>, child: React.ReactNode) => void;
}) {
	const { onChange: onChangeCallback, length, value } = props;

	const handleChange = (event: any, child: React.ReactNode, childValue: number) => {
		const newValue = childValue;
		if (!onChangeCallback || !event || newValue === value) return;

		const nativeEvent = event.nativeEvent || event;
		const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: { value: newValue },
		});

		onChangeCallback?.(clonedEvent, child);
	};

	const items = Array(length)
		.fill(<CarouselIndicator />)
		.map((child, b) => {
			return React.cloneElement(child, {
				key: b,
				onClick: (e: any) => handleChange(e, child, b),
				isActive: b === value,
			});
		});

	return <div className='mt-4 flex flex-row flex-nowrap justify-center'>{items}</div>;
}

CarouselIndicators.displayName = 'CarouselIndicators';
