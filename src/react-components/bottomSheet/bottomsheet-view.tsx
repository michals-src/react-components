import React from 'react';
import BottomSheetContext from './bottomsheet-context';

function BottomSheetView(props: any): React.ReactElement {
	const bsCtxApi = React.useContext(BottomSheetContext);
	const { children, transferprops } = props;

	return (
		<>
			<div {...props}>
				{React.cloneElement(children, Object.assign({}, bsCtxApi, transferprops))}
			</div>
		</>
	);
}

export default BottomSheetView;
