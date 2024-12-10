// components/CheckboxField.jsx
import React from 'react';

const CheckboxField = ({ label, name, register }) => {
  return (
    <div className="mb-4">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          {...register(name)}
          className="rounded text-green-600 focus:ring focus:ring-offset-2 focus:ring-green-500"
        />
        <span className="ml-2 text-sm font-semibold text-gray-700">{label}</span>
      </label>
    </div>
  );
};

export default CheckboxField;