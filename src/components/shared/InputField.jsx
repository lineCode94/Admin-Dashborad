import { Input, Label } from "@windmill/react-ui";
import ErrorSpan from "./ErrorSpan";

const InputField = ({
  register,
  label,
  registerName,
  error = null,
  placeholder,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="flex h-full flex-col space-y-2 mt-2 w-full ">
      <Label htmlFor={registerName}>
        <span className="text-base font-normal text-gray-600 dark:text-gray-400 ">
          {label}
        </span>
        <Input
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          id={registerName}
          {...register(`${registerName}`, { required: true })}
          className="h-12 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
        />
        <ErrorSpan error={error} />
      </Label>
    </div>
  );
};

export default InputField;
