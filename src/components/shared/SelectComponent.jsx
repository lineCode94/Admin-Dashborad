import { Input, Label, Select } from "@windmill/react-ui";
import { Controller } from "react-hook-form";
import ErrorSpan from "./ErrorSpan";
import SelectReact from "react-select";
// Select = Label  name | id ,register ,register name,multiple? , col ? ,getValue of option,get value name
export const SelectComponent = ({
  label,
  registerName,
  col = true,
  getValue,
  getTitle,
  options,
  register,
  disabled = false,
  placeholder,
  error = null,

  checkBox = false,
  w,
}) => {
  return (
    <>
      <Label
        className={`${
          col ? "flex flex-col " : "flex px-2 justify-between items-center mb-2"
        } w-full`}
      >
        <span
          className={` text-base font-normal text-gray-600 dark:text-gray-400  ${
            col ? "mb-2 block " : " "
          }`}
        >
          {label}
        </span>
        <div className=" min-w-20">
          <Select
            defaultValue={"default"}
            placeholder="Select a Country"
            disabled={disabled}
            className={`bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-gray-500 py-3 px-2
          focus:border-gray-500 block   dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
            style={{
              // width: `${col ? "100%" : w ? w : "auto"} !important`,
              width: "100%",
            }}
            id={registerName}
            {...register(`${registerName}`)}
          >
            <option value="default" className="hidden text-gray-500" disabled>
              {placeholder}
            </option>
            {options?.map((opt) => (
              // Get's value and title from the option
              // TODO add check box for each option with selected checked
              <option key={getValue(opt)} value={getValue(opt)}>
                {/* {checkBox && (
                  <Input
                    type="checkbox"
                    checked={getValue(opt) === watch(registerName)}
                  />
                )} */}
                {getTitle(opt)}
              </option>
            ))}
          </Select>
        </div>
        <ErrorSpan error={error} />
      </Label>
      {/* <div>
        <label htmlFor={registerName}>{label}</label>
      </div> */}
    </>
  );
};
export const MultipleControlledSelect = ({
  label,
  registerName,
  col = true,
  getValue,
  getTitle,
  options: opts,
  disabled = false,
  error,
  control,
  loading,
  isClearable,
  multi = true,
}) => {
  const optionsArray = opts?.map((opt) => ({
    value: getValue(opt),
    label: getTitle(opt),
    opt,
  }));

  return (
    <>
      <Controller
        control={control}
        name={registerName}
        render={({ field: { onChange, onBlur, value, name, ref } }) => {
          return (
            <>
              <Label
                className={`${
                  col
                    ? "flex flex-col "
                    : "flex px-2 justify-between items-center mb-2"
                } w-full`}
              >
                <span
                  className={` text-base font-normal text-gray-600 dark:text-gray-400  ${
                    col ? "mb-2 block " : " "
                  }`}
                >
                  {label}
                </span>
                <div className=" min-w-20">
                  <SelectReact
                    options={optionsArray}
                    onChange={onChange}
                    // defaultValue={"default"}
                    isDisabled={disabled}
                    isMulti={multi}
                    isSearchable={true}
                    onBlur={onBlur}
                    value={value}
                    name={registerName}
                    ref={ref}
                    isLoading={loading}
                    hideSelectedOptions={true}
                    isClearable={isClearable}
                    styles={{
                      control: (styles, { isFocused }) => ({
                        ...styles,
                        ":hover": {
                          borderColor: "#FFD237",
                        },
                        ":active": {
                          outlineColor: "#FFD237",
                        },
                        ":focus": {
                          outlineColor: "#FFD237",
                        },
                      }),
                      input: (styles) => ({
                        ...styles,
                        ":hover": {
                          borderColor: "#FFD237",
                        },
                        ":active": {
                          outlineColor: "#FFD237",
                        },
                        ":focus": {
                          outlineColor: "#FFD237",
                        },
                      }),
                    }}
                    //       className={`bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-gray-500 py-3 px-2
                    // focus:border-gray-500 block   dark:bg-gray-700 dark:border-gray-600
                    // dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
                    style={{
                      // width: `${col ? "100%" : w ? w : "auto"} !important`,
                      width: "100%",
                    }}
                    // id={registerName}
                  />
                </div>
                <ErrorSpan error={error} />
              </Label>
            </>
          );
        }}
      />
    </>
  );
};
export default SelectComponent;
