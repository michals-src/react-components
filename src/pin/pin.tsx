import React, { useState, useEffect, useRef } from 'react';

const Pin = ({ el, duration, children, ...props }) => {
	const ref = useRef(null);

	const [scrollYProgress, setScrollYProgress] = useState(0);
	const [heightEl, setHeightEl] = useState(0);

	// Style rodzica
	const [isPadding, setIsPadding] = useState(false);
	const [paddingTop, setPaddingTop] = useState(0);
	const [paddingBottom, setPaddingBottom] = useState(0);
	let boxSizing = 'content-box';

	// Style elementu trzymającego
	const [position, setPosition] = useState('static');
	let left = 0;
	let top = 0;

	useEffect(() => {
		setHeightEl(el.current.getBoundingClientRect().height);
		setPaddingBottom(`${duration}px`);

		const scrollDocument = () => {
			let refEl = el.current.getBoundingClientRect();
			const rect = ref.current.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			const offsetStart = rect.top + scrollTop;
			const offsetEnd = offsetStart + duration;

			//console.log(scrollTop, offsetStart, offsetEnd);

			if (scrollTop < offsetStart) {
				setPaddingTop(0);
				setPaddingBottom(`${duration}px`);
				setPosition('static');
				setIsPadding(false);
				setScrollYProgress(0);
			}

			if (scrollTop >= offsetStart && scrollTop <= offsetEnd) {
				// if (isPadding === false) {
				//     setPaddingTop(-rect.top);
				//     setPaddingBottom(`${duration + rect.top}px`);
				//     setIsPadding(true);
				// }
				setPosition('fixed');
				let progressY = (scrollTop - offsetStart) / duration;
				setScrollYProgress(progressY);
			}

			if (scrollTop > offsetEnd) {
				setPaddingTop(`${duration}px`);
				setPaddingBottom(0);
				setPosition('static');
				setIsPadding(false);
				setScrollYProgress(1);
			}
		};

		window.addEventListener('scroll', scrollDocument);
		window.addEventListener('resize', scrollDocument);

		return () => {
			window.removeEventListener('scroll', scrollDocument);
			window.removeEventListener('resize', scrollDocument);
		};
	}, [el, duration, ref]);

	return (
		<>
			<div
				className='relative'
				style={{ height: heightEl, paddingTop, paddingBottom, boxSizing }}
				ref={ref}>
				<div
					className='w-full h-auto'
					style={{ position, top, left }}>
					{children(scrollYProgress)}
				</div>
			</div>
			{/* <div style={{ height: heightEl }}></div> */}
		</>
	);
};
