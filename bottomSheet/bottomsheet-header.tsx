import React from 'react';
import classNames from 'classnames';

import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Button = function (props: {
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	text: string | JSX.Element;
	onClick?: () => void;
}) {
	const { leftIcon, rightIcon, text = 'Zamknij', onClick: handleClick = null } = props;

	const Icon = function ({ children }: { children: React.ReactNode }) {
		return (
			<div className='w-3/12'>
				<div className='flex flex-row flex-nowrap justify-cente px-1'>{children}</div>
			</div>
		);
	};

	return (
		<button
			className={classNames('text-zinc-400 table', 'hover:text-zinc-100')}
			onClick={(e) => (handleClick ? handleClick() : null)}>
			<div className='flex flex-row flex-nowrap items-center justify-center'>
				{leftIcon && <Icon>{leftIcon}</Icon>}
				<div
					className={classNames('mx-auto', {
						'w-9/12': leftIcon || rightIcon,
						'w-full': !leftIcon && !rightIcon,
					})}>
					<div className='block mx-2'>
						<p className='text-xs text-inherit '>{text}</p>
					</div>
				</div>
				{rightIcon && <Icon>{rightIcon}</Icon>}
			</div>
		</button>
	);
};

function BottomSheetHeader(props: {
	icon?: JSX.Element;
	title: string;
	separate: boolean;
	save?: boolean;
	onBack?: () => void;
	onSave?: () => void;
	onClose?: () => void;
}) {
	const { title, separate, onBack, onSave, onClose } = props;

	const styles = classNames('p-4 md:px-8 pb-6 border-b', {
		'bg-zinc-800': separate,
		'border-[#FFFFFF11]': separate,
		'border-b-transparent': !separate,
	});

	return (
		<div className={`popup-header ${styles}`}>
			<div className='flex flex-row flex-nowrap items-center select-none'>
				<div className='w-3/12'>
					<div className='flex flex-row flex-nowrap justify-start'>
						{onBack && (
							<Button
								leftIcon={<ChevronLeftIcon className='w-3 h-3 text-inherit mx-auto block' />}
								text='Powrót'
								onClick={onBack}
							/>
						)}

						{onClose && onSave && (
							<Button
								text='Anuluj'
								onClick={onClose}
							/>
						)}


					</div>
				</div>
				<div className='w-6/12'>
					<div className='px-8 text-center'>
						<p className='text-xs font-bold select-none'>{title}</p>
					</div>
				</div>
				<div className='w-3/12'>
					<div className='flex flex-row flex-nowrap justify-end'>
						{onClose && !onSave && (
							<Button
								text='Zamknij'
								rightIcon={<XMarkIcon className='w-3 h-3 text-inherit mx-auto block' />}
								onClick={onClose}
							/>
						)}
						{onSave && (
							<Button
								text='Zapisz'
								onClick={onSave}
							/>
						)}
					</div>

				</div>
			</div>
		</div>
	);
}

BottomSheetHeader.displayName = 'BottomSheetHeader';

export default BottomSheetHeader;
