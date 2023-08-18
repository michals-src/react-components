import classNames from 'classnames';
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';

export type RangeProps = {
	//value?: number;
	// value?: React.Dispatch<React.SetStateAction<number>>;
	//onChange?: React.ChangeEventHandler<HTMLInputElement>;
	//onClick?: React.MouseEventHandler<HTMLInputElement>;
	step?: number;
	thumb?: boolean;
	track?: boolean;
	variant?: 'sm' | 'md' | 'lg';
};

const Range = forwardRef<HTMLInputElement, RangeProps & React.HTMLProps<HTMLInputElement>>(
	({ value = 0, onChange, onClick, step, thumb = true, variant = 'md', track = true, ...other }, ref) => {
		const progressRef = useRef<HTMLDivElement>(null);
		const thumbRef = useRef<HTMLDivElement>(null);


		const cnPlaceholder = classNames('w-full h-3 rounded-md bg-[rgba(0,0,0,.2)]', {
			'h-1': variant === 'sm',
			'h-3': variant === 'md',
			'h-6': variant === 'lg',
		});

		const cnThumb = classNames('w-3 h-3 bg-white rounded-full absolute top-[50%] right-0 cursor-pointer', {
			'w-2 h-2': variant === 'sm',
			'w-4 h-4': variant === 'md',
			'w-7 h-7': variant === 'lg',
		});

		useEffect(() => {
			if (progressRef.current == null || thumbRef.current == null) return;

			progressRef.current.style.width = `${value}%`;
			thumbRef.current.style.width = `${value}%`;
		}, [value]);

		const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
			if (!e.currentTarget) return;
			onClick?.(e);
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!e.target) return;
			e.target.focus();

			onChange?.(e);
		};

		return (
			<div className='relative cursor-pointer w-full touch-none'>
				<div className={cnPlaceholder}>
					<div
						ref={progressRef}
						className={`absolute top-0 left-0 w-full h-full rounded-lg ${!track ? 'opacity-0' : ''}`}
						style={{
							background: `linear-gradient(to right, rgba(255, 255, 255, .1) 0%, rgba(255, 255, 255, .4) 100%`,
						}}></div>
				</div>
				<div
					ref={thumbRef}
					className='absolute top-0 w-auto h-full pl-3'>
					{thumb && (
						<div
							ref={thumbRef}
							className={cnThumb}
							style={{
								transform: ` translateY(-50%)`,
							}}></div>
					)}
				</div>

				<input
					type='range'
					className='absolute top-0 bottom-0 left-0 right-0 opacity-0 h-full cursor-pointer w-full touch-pan-x'
					value={value}
					onClick={handleClick}
					onChange={handleChange}
					ref={ref}
					step={step}
					{...other}
				/>
			</div>
		);
	}
);

Range.displayName = 'Range';

export default Range;
