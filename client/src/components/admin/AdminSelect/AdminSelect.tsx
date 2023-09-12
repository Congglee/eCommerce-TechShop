import React from "react";
import { Controller } from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  control: any;
  errorMessage: any;
  defaultValue: any;
  name: string;
  label: string;
  options: Option[];
  id: string;
};

const AdminSelect = ({
  options,
  control,
  errorMessage,
  defaultValue,
  name,
  label,
  id,
}: Props) => {
  const findOptionsByValue = (value: string | number) => {
    return options.find((option) => option.value === value);
  };
  const selectedOption = findOptionsByValue(defaultValue);

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <select
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            value={value}
            onChange={onChange}
          >
            {selectedOption && (
              <option value={selectedOption.value}>
                {selectedOption.label}
              </option>
            )}

            {options
              .filter((option) => option !== selectedOption)
              .map((option, index) => {
                return (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                );
              })}
          </select>
        )}
      />

      {errorMessage && (
        <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default AdminSelect;
