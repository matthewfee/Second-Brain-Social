/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field } from 'formik';

export const GenderPicker = () => (
  <div className="gender flex gap-2 p-2 rounded-xl border-2 border-gray-400 w-full max-w-[240px] h-12">
    <label htmlFor="gender" className="p-1">
      <Field type="radio" name="gender" value="male" />
      <span className="ml-1">Male </span>
    </label>
    <label htmlFor="gender" className="p-1">
      <Field type="radio" name="gender" value="female" />
      <span className="ml-1">Female </span>
    </label>
    <label htmlFor="gender" className="p-1">
      <Field type="radio" name="gender" value="other" />
      <span className="ml-1">Other </span>
    </label>
  </div>
);
