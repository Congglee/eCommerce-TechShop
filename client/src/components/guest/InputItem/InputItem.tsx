import React from "react";

type Props = {};

interface inputItemProps {
  type?: string;
  name: string;
  value?: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
  isDefaultValue?: boolean;
  style?: string;
  defaultValue?: string | number;
}

const InputItem = (props: inputItemProps) => {
  const {
    type,
    name,
    value,
    placeholder,
    handleChange,
    isDefaultValue,
    isReadOnly,
    defaultValue,
    style,
  } = props;

  return (
    <input
      type={type ? type : "text"}
      placeholder={placeholder}
      className={`${
        style
          ? style
          : "border-transparent border-2 bg-[#f6f6f6] w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-main-600 focus:ring-0 rounded-[4px]"
      } `}
      name={name}
      onChange={handleChange}
      readOnly={isReadOnly ? true : false}
      defaultValue={isDefaultValue ? defaultValue : undefined}
      value={isDefaultValue ? undefined : value}
    />
  );
};

export default InputItem;
