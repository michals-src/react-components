import React, { FC } from 'react';
import ListItem from './list-item'

const List = ({ children }: any) => {
	const items = children === undefined ? [] : Array.isArray(children) ? children : [children];

	const Separator: FC<React.HTMLProps<HTMLDivElement>> = function () {
		return (
			<div className='px-5'>
				<div className='w-full h-[1px] bg-white opacity-10'></div>
			</div>
		);
	};

	const kids = items.map((child: React.ReactNode, index: number) => {
		if (!React.isValidElement(child)) return;

		return (
			<React.Fragment key={index}>
				{index >= 1 && child.props?.children !== undefined && <Separator key={`separator-${index}`} />}

				{React.cloneElement(child, {})}
			</React.Fragment>
		);
	});
	return <div className='w-full h-auto bg-slate-700 border border-slate-600 rounded-md text-slate-100'>{kids}</div>;
};

export default Object.assign(List, {
	Item: ListItem
});
