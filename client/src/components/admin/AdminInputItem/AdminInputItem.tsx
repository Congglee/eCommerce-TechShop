import React from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeHolder?: string;
  name: string;
  value?: string;
  register: UseFormRegister<any>;
  inputId: string;
  label: string;
  rules?: RegisterOptions;
  className?: string;
  isMutipleFile?: boolean;
};

const AdminInputItem = ({
  type,
  placeHolder,
  errorMessage,
  name,
  register,
  inputId,
  label,
  rules,
  className,
  isMutipleFile,
}: Props) => {
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className={`${
          errorMessage
            ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
            : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={inputId}
        multiple={isMutipleFile ? true : false}
        className={`
          ${
            errorMessage
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          }
        `}
        placeholder={placeHolder}
        {...register(name, rules)}
      />

      {errorMessage && (
        <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default AdminInputItem;
