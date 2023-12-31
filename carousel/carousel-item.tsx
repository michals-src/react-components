import React, { useRef } from 'react';

export type CarouselItemProps = {
	key?: any;
	moving?: number;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	children?: React.ReactNode;
};

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(props, ref) {
	const { children, moving, onClick: onClickProps, ...other } = props;
	const refEl = useRef(null);

	const handleClick = (e: any) => {
		//console.log(moving)
		if (!moving) onClickProps?.(e);
	};

	return (
		<div
			ref={(element) => {
				(refEl as React.MutableRefObject<HTMLDivElement | null>).current = element;
				if (typeof ref === 'function') ref(element);
				else if (ref) ref.current = element;
			}}
			className='w-auto h-full flex-[1_0_auto] select-none'
			onClick={handleClick}
			{...other}>
			{children}
		</div>
	);
});

export default CarouselItem;
