import { forwardRef, Ref } from "react";

const PickerOption = forwardRef(function PickerOption(props: {
  value: any,
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}, ref: Ref<HTMLDivElement>) {
  const { onClick, children, ...other } = props;

  return (
    <div
      className='text-sm text-zinc-600 height-[32px] leading-[32px] select-none'
      ref={ref}
      {...other}
      onClick={onClick}>
      <div className='flex flex-row flex-nowrap justify-center'>{children}</div>
    </div>
  );
});

export default PickerOption;
