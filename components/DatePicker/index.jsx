/* eslint-disable no-unused-vars */
import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

require('react-datepicker/dist/react-datepicker.css');

export const DatePickerField = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <div className="w-full max-w-[240px] ">
      <div className="flex gap-2 p-2 rounded-xl border-2 border-gray-400 h-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <DatePicker
          className="w-32 px-2 ml-2"
          {...field}
          {...props}
          startDate={new Date()}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          placeholderText="Birthday"
        />
      </div>
    </div>
  );
};
