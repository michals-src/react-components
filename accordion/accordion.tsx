import React from 'react';

import { AccordionContext } from './accordion-context';
import { useAccordion } from './use-accordtion';

import {AccordionItem} from "./accordion-item";
import {AccordionItemHeader} from "./accordion-header";
import {AccordionItemCollapse} from "./accordion-collapse";

const Accordion = function Accordion(props: any) {
	const { children, ...otherProps } = props;
	const ctx = useAccordion();

	return (
		<div {...otherProps}>
			<AccordionContext.Provider value={React.useMemo(() => ctx, [ctx])}>{children}</AccordionContext.Provider>
		</div>
	);
}

export default Object.assign(Accordion, {
    Item: AccordionItem,
    ItemHeader: AccordionItemHeader,
    ItemCollapse: AccordionItemCollapse
})
