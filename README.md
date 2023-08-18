# React components

Biblioteka komponentów przeznaczonych dla React.js oparta na tailwindcss.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4a96abf3-4358-4c77-b5a5-6c740a4d5494/deploy-status)](https://app.netlify.com/sites/merry-semifreddo-54121a/deploys)

[STRONA DEMONSTRACYJNA](https://merry-semifreddo-54121a.netlify.app/)

Przed użyciem kompoentów nalezy w środowisku dodać odpowiednie biblioteki:

- **Wymagane dodatkowe biblioteki**
  - [tailwindcss](https://tailwindcss.com/)
  - [uuidjs](https://www.npmjs.com/package/uuidjs)
  - [classnames](https://www.npmjs.com/package/classnames)

**note** wszystkie niezbędne paczki projektu umieszczone są w pliku package.json

## Quickstart

**1. Carousel** (ES6 module syntax)

```javascript
import { Carousel } from "./react-components";

return (

    type CarouselProps = {
        shade?: boolean;
        shadeColor?: string;
        indicators?: boolean;
        children: React.ReactNode;
    };

    <Carousel CarouselProps>
        <Carousel.Item key={item - key}>
            <div className="...">...</div>
        </Carousel.Item>
    </Carousel>
);
```

**2. List** (ES6 module syntax)

```javascript
import { List } from "./react-components";

return (

    type ListProps = {};

    <List>
        <List.Item>
            <BeakerIcon className='w-6 h-6' />
            <div className='px-6'>
                <p className='text-sm'>List item 1</p>
            </div>
        </List.Item>
        <List.Item>
            <BellAlertIcon className='w-6 h-6' />
            <div className='px-6'>
                <p className='text-sm'>List item 2</p>
            </div>
        </List.Item>
        <List.Item>
            <ArrowLongUpIcon className='w-6 h-6' />
            <div className='px-6'>
                <p className='text-sm'>List item 3</p>
            </div>
        </List.Item>
        <List.Item>
            <ChatBubbleBottomCenterIcon className='w-6 h-6' />
            <div className='px-6'>
                <p className='text-sm'>List item 3</p>
            </div>
        </List.Item>
    </List>
);
```

**3. Accordion** (ES6 module syntax)

**note** W celu nadania wyglądu najlepiej używać razem z komponentem List

```javascript
import { List, Accordion } from "./react-components";

return (

    type AccordionProps = { key:? any } & HTMLDivElement;

    <List>
        <Accordion key={ item - key } AccordionProps>
            <Accordion.Item>
                <Accordion.ItemHeader>
                    <List.Item>
                        <p className='...'>...</p>
                    </List.Item>
                </Accordion.ItemHeader>
                <Accordion.ItemCollapse>
                    <p className="..."> ... </p>
                </Accordion.ItemCollapse>
            </Accordion.Item>
            ...
            <Accordion.Item>
                <Accordion.ItemHeader>
                    <List.Item>
                        <p className='...'>...</p>
                    </List.Item>
                </Accordion.ItemHeader>
                <Accordion.ItemCollapse>
                    <p className="..."> ... </p>
                </Accordion.ItemCollapse>
            </Accordion.Item>
        </Accordion>
    </List>
);
```

**4. Coolor** (ES6 module syntax)

**note** lista kolorów może być edytowana bezpośrednio w pliku index.tsx komponentu

```javascript
import { Coolors, colors } from "./react-components";

return (

    const [color, setColor] = React.useState<(typeof colors)[number]>(colors[0]);

    type CoolorsProps = {
        value: string;
        onClick?: React.MouseEventHandler<HTMLInputElement>;
        align?: 'start' | 'center' | 'end';
        size?: 'sm' | 'md' | 'lg';
    };

    <Coolors
        CoolorsProps

        value={color}
        onClick={(e) => setColor(e.currentTarget.value)}
    />
);
```

**4. Range** (ES6 module syntax)

```javascript
import { Range } from "./react-components";

return (

    const [value, setValue] = React.useState<number>(0);

    type CoolorsProps = {
        step?: number;
        thumb?: boolean;
        track?: boolean;
        variant?: 'sm' | 'md' | 'lg';
    };

    <Range
        CoolorsProps

        value={value}
        onChange={(e) => setValue(+e.currentTarget.value)}
    />
);
```

**5. Picker** (ES6 module syntax)

```javascript
import { Picker } from "./react-components";

return (

    type PickerSelectProps = {
        children: React.ReactNode;
        onChange: (a: React.MouseEvent<HTMLInputElement>, b?: React.ReactNode) => void;
        value: any;
        shadeColor?: string
    };

    <Picker>
        <Picker.Select
        PickerSelectProps

        shadeColor='#1e293b' value="1" onChange={ a => console.log( a.currentTarget.value )}>
            <Picker.Option value="1">1</Picker.Option>
            <Picker.Option value="2">2</Picker.Option>
            <Picker.Option value="3">3</Picker.Option>
            <Picker.Option value="4">4</Picker.Option>
            <Picker.Option value="5">5</Picker.Option>
            ....
            <Picker.Option value="98">98</Picker.Option>
            <Picker.Option value="99">99</Picker.Option>
        </Picker.Select>
    </Picker>
);
```

**6. BottomSheet** (ES6 module syntax)

**note** tworząc widok należy pamiętać o użyciu BottomSheet.Content

```javascript
import { BottomSheet } from "./react-components";

return (

    type BottomSheetProps = {
        children?: any;
        open: boolean;
        onClose: () => void
    };

    type ComponentProps = {
        back: (props: object) => void;
        close: () => void;
        save: () => void;
        navigate: (nazwa_ekranu (parametr as): string, dodatkoweProps: object);
        { ... parametry przekazane przez navigate }
    };

    <div className='mb-10'>
        <h1 className='text-2xl text-slate-100'>BottomSheet</h1>
        <p className='text-slate-400'>Wysuwany dolny panel typu drawer z pozycją dolną</p>

        <div className='mt-4'>
            <button className='px-4 py-2 bg-purple-900 text-white rounded-lg shadow-md' onClick={() => setOpen(true)}>Otwórz bottom sheet</button>
        </div>
    </div>

    import { BottomSheet } from "./react-components";
    const SheetRootView = function SheetCustomeView(props: ComponentProps){
        return (
            <BottomSheet.Content onClose={props.close}>
                <div>
                    <p className='mb-4'>Widok główny</p>
                    {props.hasSome && <p className='mb-4'>Aktualnie parametry otrzymane od funkcji navigate: {JSON.stringify(props)}</p>}
                    {!props.hasSome && <p className='mb-4'>Aktualnie brak parametrów otrzymanych od funkcji navigate</p>}
                    <button className='px-4 py-2 bg-purple-900 rounded-lg text-white' onClick={() => props.navigate('sheet-custome', { namee: 'Joe Doe'})}>
                        <div className='flex flex-row flex-nowrap items-center'>
                            <p>Następny widok</p> <div className='ml-4'><ArrowLongRightIcon className='w-4 h-4' /></div>
                        </div>
                    </button>
                </div>
            </BottomSheet.Content>
        )
    }

    import { BottomSheet } from "./react-components";
    const SheetCustomeView = function SheetCustomeView(props: ComponentProps){
        return (
            <BottomSheet.Content onBack={() => props.back({ hasSome: true, 'nazwa': 'powrót z ekranu SheetCustomeView'})} onSave={() => alert('Funkcja zapisu ...')}>
                <div>
                    <p>Widok przykładowy</p>
                    <p>Atrybut przekazany funkcją navigate: <span className='text-zinc-300'>{ props.namee }</span></p>
                </div>
            </BottomSheet.Content>
        )
    }

    // Portal - może być umieszczony w dowolnym miejscy, tak, aby mieć odczyt do stanu open i setOpen
    <BottomSheet
        BottomSheetProps

        open={open} onClose={() => setOpen(false)}
    >
        <BottomSheet.View root='true'>
            <SheetRootView ComponentProps />
        </BottomSheet.View>
        ...
        <BottomSheet.View as='sheet-custome'>
            <SheetCustomeView ComponentProps />
        </BottomSheet.View>
    </BottomSheet>
);
```

© Autor Michał Sierzputowski
