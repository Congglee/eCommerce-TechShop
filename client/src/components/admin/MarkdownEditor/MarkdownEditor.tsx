import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

type MarkdownEditorProps = {
  label: string;
  name: string;
  control: any;
  defaultValue?: string;
  errorMessage?: string;
  className?: string;
};

const MarkdownEditor = ({
  label,
  name,
  control,
  defaultValue,
  errorMessage,
  className,
}: MarkdownEditorProps) => {
  return (
    <div className={className}>
      <label
        className={`${
          errorMessage
            ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
            : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        }`}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
          <Editor
            apiKey={import.meta.env.VITE_APP_MCETINY}
            initialValue={field.value}
            init={{
              height: 450,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
            }}
            onChange={(e) => field.onChange(e.target.getContent())}
          />
        )}
      />

      {errorMessage && (
        <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default MarkdownEditor;
