import React from 'react';

const TextAreaField = ({ label, name, register, placeholder, required = true }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <textarea
        {...register(name, { required: required })}
        className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        rows="4"
      />
    </div>
  );
};

export default TextAreaField;