import React from "react";
import { Controller } from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  control: any;
  errorMessage: any;
  defaultValue?: any;
  name: string;
  label: string;
  options?: Option[];
  id: string;
  defaultOptionValue?: string;
};

const AdminSelect = ({
  options,
  control,
  errorMessage,
  defaultValue,
  name,
  label,
  id,
  defaultOptionValue,
}: Props) => {
  const findOptionsByValue = (value: string | number) => {
    return options?.find((option) => option.value === value);
  };
  const selectedOption = findOptionsByValue(defaultValue);

  return (
    <div>
      <label
        htmlFor={id}
        className={`${
          errorMessage
            ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
            : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        }`}
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
            className={`${
              errorMessage
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            }`}
            value={value}
            onChange={onChange}
          >
            {selectedOption && (
              <option value={selectedOption.value}>
                {selectedOption.label}
              </option>
            )}
            {selectedOption &&
              options
                ?.filter((option) => option !== selectedOption)
                .map((option, index) => {
                  return (
                    <option value={option.value} key={index}>
                      {option.label}
                    </option>
                  );
                })}

            {!selectedOption && <option value="">{defaultOptionValue}</option>}
            {!selectedOption &&
              options?.map((option, index) => {
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
