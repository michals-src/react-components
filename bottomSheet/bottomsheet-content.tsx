import React from 'react';

import BottomSheetHeader from './bottomsheet-header';

export type BottomSheetContentProps = {
	children: React.ReactNode,
	onClose?: () => void,
	onSave?: () => void,
	onBack?: () => void,
	icon?: any,
	title?: string,
}

function BottomSheetContent(props: BottomSheetContentProps) {
	const {
		children,
		onClose: onCloseProps,
		onSave: onSaveProps,
		onBack: onBackProps,
		icon: iconProps,
		title: titleProp = '',
	} = props;

	return (
		<>
			<BottomSheetHeader
				title={titleProp}
				separate={false}
				icon={iconProps}
				onBack={onBackProps}
				onSave={onSaveProps}
				onClose={onCloseProps}
			/>
			<div className='relative z-10'>
				<div className='max-h-[calc(70vh)]'>
					<div
						className='popup-content-wrapper'
						style={{ height: 'auto' }}>
						<div
							className='popup-content overflow-auto max-h-[calc(70vh)] p-4 md:px-8'>
							<div>
								<div
									style={{ maxHeight: '1000000px' }}>
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BottomSheetContent;
