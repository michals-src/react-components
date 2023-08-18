import React from 'react';

import BottomSheetContext from './bottomsheet-context';
import { Portal } from '../';
import BottomSheetView from './bottomsheet-view';
import BottomSheetHeader from './bottomsheet-header';
import BottomSheetContent from './bottomsheet-content';

let screens: any = {};

const BottomSheet = function ({ children, open, onClose }: { children?: any; open: boolean; onClose: () => void }) {
	const [sheets, setSheets] = React.useState<any>({});
	const [sheetID, setSheetID] = React.useState<string>('root');
	const [prevSheetID, setPrevSheetID] = React.useState<string>('');

	const [touchY, setTouchY] = React.useState<Array<number>>([0, 0]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [created, setCreated] = React.useState<boolean>(false);
	const parentRef = React.createRef<HTMLDivElement>();
	const windowRef = React.createRef<HTMLDivElement>();

	const childrenArr: any = React.useCallback(
		function () {
			if (children === null) return [];
			return !Array.isArray(children) || children.length <= 0 ? [children] : children;
		},
		[children]
	);

	React.useEffect(() => {
		if (open) setVisible(true);
	}, [open]);

	React.useEffect(() => {
		if (windowRef.current === null) return;

		const transitionEnd = function (e: any) {
			if (!open) {
				setCreated(false);
				setVisible(false);
				setTouchY([0, 0]);
			}
		};

		const abc = windowRef.current;
		const xde = setTimeout(function () {
			if (created) abc.style.transform = `translateY(${!open ? 100 : 0}%)`;
		}, 40);
		windowRef.current.addEventListener('transitionend', transitionEnd);

		return function () {
			clearInterval(xde);
		};
	}, [windowRef, created]);

	React.useEffect(() => {
		childrenArr().map((child: React.ReactNode, index: number) => {
			if (!React.isValidElement(child)) return;

			const route = child.props.root ? 'root' : child.props.as;
			let transferProps: object = {};

			if(sheets[route]){
				// Wywoływany wtedy i tylko wtedt, gdy kompoenty zostały wcześniej zainicjalizowane
				// Nie jest to pierwsze wywołanie useEffect
				// Jeżeli komponent w trakcie pracy otrzymał transferProps to zostają one skopiowane
				// w celu uniknięcia ich utraty przy odświeżeniu komponentu (sheet) akcją np. useSate
				transferProps = sheets[route].props;
			}
			
			const item: React.ReactElement  = React.cloneElement(child, Object.assign({ ...child.props }, transferProps));


			 React.cloneElement(child, Object.assign({ ...child.props }));
			

			screens[route] = item;
			setSheets((state: any) => {
				return { ...state, [`${route}`]: item };
			});
		});

		return function () {
			setSheets({});
			//screens = {};
		};
	}, [childrenArr]);

	const ContentItem = React.useMemo(() => React.isValidElement(sheets[sheetID]) ? sheets[sheetID] : null, [sheets, sheetID])

	const back = function (transferprops: object = {}) {
		navigate(prevSheetID, transferprops);
	};

	const navigate = function (to: string, transferprops: object = {}) {
		if (Object.keys(sheets).indexOf(to) < 0) {
			throw Error('Bottm sheet [navigation]');
		}

		/**
		 * transferprops
		 * Dodatkowe własności przekazywane przez element navigate
		 */
		if (Object.keys(transferprops).length > 0) {
			const sheet = sheets[to];
			const screenWithTransferProps = React.cloneElement(sheet, {"transferprops": JSON.parse(JSON.stringify(transferprops))});

			setSheets((state: any) => {
				return {
					...state,
					[`${to}`]: screenWithTransferProps,
				};
			});
		}
		setSheetID((state) => {
			setPrevSheetID(state);
			return to;
		});
	};

	const close = function () {
		setSheetID('root');
		onClose?.();
	};

	const ctxValue = React.useMemo(
		() => ({
			close,
			navigate,
			back,
		}),
		[sheets]
	);

	if (!visible) return null;

	return (
		<>
			<Portal onCreate={() => setCreated(true)}>
				<div className='fixed left-0 right-0 bottom-0 w-full h-full touch-none z-[99999]'>
					<div
						className='w-[100vw] h-[100vh] absolute top-0 left-0'
						style={{
							background: 'rgba(0,0,0,0.8)',
							opacity: `${open ? 1 : 0}`,
							transition: 'opacity .1s ease',
						}}></div>

					<div
						ref={parentRef}
						className='w-full h-auto absolute bottom-0 left-0 touch-pan-x'
						style={{
							transform: `translateY(${touchY[0]}px)`,
						}}>
						<div
							ref={windowRef}
							className='max-w-lg mx-auto bg-zinc-900 text-white relative overflow-hidden rounded-t-xl'
							style={{
								transform: `translateY(100%)`,
								transition: 'transform .15s ease',
							}}
							onTouchMove={(e) => {
								setTouchY((state) => {
									const currY = e.touches[0].screenY;
									if (state[1] === 0) return [0, currY];

									let moveY = state[0] + (currY - state[1]);
									if (state[0] > moveY && state[0] <= 0) moveY = 0;
									return [moveY, currY];
								});
								if (parentRef.current !== null) {
									parentRef.current.style.transition = '';
								}
							}}
							onTouchEnd={(e) => {
								if (touchY[0] >= 100) {
									onClose?.();
									return;
								}
								setTouchY([0, 0]);
								if (parentRef.current !== null) {
									parentRef.current.style.transition = 'transform .1s ease';
								}
							}}>
							<BottomSheetContext.Provider value={ctxValue}>{ContentItem}</BottomSheetContext.Provider>
						</div>
					</div>
				</div>
			</Portal>
		</>
	);
};

BottomSheet.dispalyName = 'BottomSheet';

export default Object.assign(BottomSheet, {
	View: BottomSheetView,
	Header: BottomSheetHeader,
	Content: BottomSheetContent,
});
