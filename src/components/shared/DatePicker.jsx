import { Label } from "@windmill/react-ui";
import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import { BsCalendar4 } from "react-icons/bs";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  control,
  min = true,
  label,
  registerName,
  interval = 15,
}) => {
  const today = Date.now();

  return (
    <Controller
      name={registerName}
      control={control}
      render={({ field: { onBlur, onChange, ref, value } }) => (
        <Label className="w-full space-y-2">
          <span>{label}</span>
          <DatePicker
            dateFormat="dd/MM/yyy : h:mm aa"
            customInput={<DateCustomInput />}
            showTimeInput
            showTimeSelect
            selected={value}
            onChange={(d) => {
              onChange(d);
            }}
            // timeFormat="HH:mm"
            timeIntervals={interval}
            onBlur={onBlur}
            minDate={min ? today : null}
            todayButton={"Today"}
          />
        </Label>
      )}
    />
  );
};
const DateCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div>
    <input
      className="h-12 text-base relative rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
      value={value}
      placeholder="dd/MM/yyy --:--:--"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
    ></input>
    <span
      onClick={onClick}
      className="absolute flex  pr-4 top-0 right-0 cursor-pointer h-full"
    >
      <BsCalendar4 className="h-auto  text-2xl" />
    </span>
  </div>
));
export default DatePickerComponent;
