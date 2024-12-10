import React from 'react';

const SelectField = ({ label, name, options, register, required = true }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <select
        {...register(name, { required: required })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;