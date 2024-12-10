import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddPlantMutation } from '../../../redux/features/plants/plantsApi';
import Swal from 'sweetalert2';
import InputField from './InputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';
import CheckboxField from './CheckboxField';

const AddPlant = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [mainImage, setMainImage] = useState(null);
  const [addPlant, { isLoading }] = useAddPlantMutation();
  const [imageFileName, setimageFileName] = useState('')

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'Indoor Plants', label: 'Indoor Plants' },
    { value: 'Outdoor Plants', label: 'Outdoor Plants' },
    { value: 'Succulents & Cacti', label: 'Succulents & Cacti' },
    { value: 'Flowering Plants', label: 'Flowering Plants' },
    { value: 'Trees & Shrubs', label: 'Trees & Shrubs' },
    { value: 'Herbs & Vegetables', label: 'Herbs & Vegetables' },
  ];

  const sunExposureOptions = [
    { value: '', label: 'Select Sun Exposure' },
    { value: 'Full Sun (6+ hours direct)', label: 'Full Sun (6+ hours direct)' },
    { value: 'Partial Sun (3-6 hours direct)', label: 'Partial Sun (3-6 hours direct)' },
    { value: 'Shade (minimal direct sun)', label: 'Shade (minimal direct sun)' },
  ];

  const lightOptions = [
    { value: '', label: 'Select Light Requirement' },
    { value: 'Low Light (Shade)', label: 'Low Light (Shade)' },
    { value: 'Medium Light (Indirect Sun)', label: 'Medium Light (Indirect Sun)' },
    { value: 'Bright Light (Direct Sun)', label: 'Bright Light (Direct Sun)' },
  ];

  const wateringOptions = [
    { value: '', label: 'Select Watering Requirement' },
    { value: 'Low (Keep Soil Dry)', label: 'Low (Keep Soil Dry)' },
    { value: 'Moderate (Water Weekly)', label: 'Moderate (Water Weekly)' },
    { value: 'Frequent (2-3 Times Weekly)', label: 'Frequent (2-3 Times Weekly)' },
  ];

  const temperatureOptions = [
    { value: '', label: 'Select Temperature Requirement' },
    { value: 'Cool (15-18°C / 60-65°F)', label: 'Cool (15-18°C / 60-65°F)' },
    { value: 'Average (18-24°C / 65-75°F)', label: 'Average (18-24°C / 65-75°F)' },
    { value: 'Warm (24-29°C / 75-85°F)', label: 'Warm (24-29°C / 75-85°F)' },
  ];

  const humidityOptions = [
    { value: '', label: 'Select Humidity Level' },
    { value: 'Low (30-40%)', label: 'Low (30-40%)' },
    { value: 'Medium (40-60%)', label: 'Medium (40-60%)' },
    { value: 'High (60%+)', label: 'High (60%+)' },
  ];

  const maintenanceOptions = [
    { value: '', label: 'Select Maintenance Level' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Expert', label: 'Expert' },
  ];

  const growthRateOptions = [
    { value: '', label: 'Select Growth Rate' },
    { value: 'Slow', label: 'Slow' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Fast', label: 'Fast' },
  ];

  const sizeOptions = [
    { value: '', label: 'Select Plant Size' },
    { value: 'Small (Up to 30cm/12")', label: 'Small (Up to 30cm/12")' },
    { value: 'Medium (30-100cm/1-3ft)', label: 'Medium (30-100cm/1-3ft)' },
    { value: 'Large (100cm+/3ft+)', label: 'Large (100cm+/3ft+)' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setMainImage(file);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a valid image file',
        icon: 'error',
      });
    }
  };

  const validateForm = (data) => {
    const errors = [];
    
    // Required fields validation
    const requiredFields = {
      name: 'Plant name',
      scientificName: 'Scientific name',
      description: 'Description',
      category: 'Category',
      sunExposure: 'Sun exposure',
      price: 'Price',
      stock: 'Stock',
      light: 'Light requirement',
      water: 'Watering requirement',
      temperature: 'Temperature requirement',
      humidity: 'Humidity requirement',
      maintenanceLevel: 'Maintenance level',
      growthRate: 'Growth rate',
      plantSize: 'Plant size'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!data[field]) {
        errors.push(`${label} is required`);
      }
    });

    // if (!mainImage) {
    //   errors.push('Main image is required');
    // }

    // Field-specific validations
    if (data.name && (data.name.length < 2 || data.name.length > 100)) {
      errors.push('Plant name must be between 2 and 100 characters');
    }

    if (data.scientificName && (data.scientificName.length < 2 || data.scientificName.length > 100)) {
      errors.push('Scientific name must be between 2 and 100 characters');
    }

    if (data.description && (data.description.length < 10 || data.description.length > 2000)) {
      errors.push('Description must be between 10 and 2000 characters');
    }

    if (data.price && (data.price < 0 || !Number.isFinite(parseFloat(data.price)))) {
      errors.push('Price must be a valid positive number');
    }

    if (data.oldPrice && parseFloat(data.oldPrice) <= parseFloat(data.price)) {
      errors.push('Old price must be greater than current price');
    }

    if (data.stock && (parseInt(data.stock) < 0 || !Number.isInteger(parseFloat(data.stock)))) {
      errors.push('Stock must be a non-negative integer');
    }

    return errors;
  };

  const onSubmit = async (data) => {
    try {
      const validationErrors = validateForm(data);
      if (validationErrors.length > 0) {
        Swal.fire({
          title: 'Validation Error!',
          html: validationErrors.join('<br>'),
          icon: 'error'
        });
        return;
      }


      const formData = {
        ...data,
        coverImage: imageFileName,
        careInstructions: {
          light: data.light,
          water: data.water,
          temperature: data.temperature,
          humidity: data.humidity,
        },
      };

      await addPlant(formData).unwrap();
      
      Swal.fire({
        title: 'Success!',
        text: 'Plant added successfully',
        icon: 'success',
        confirmButtonColor: '#10B981',
      });

      reset();
      setMainImage(null);

    } catch (error) {
      console.error("Error adding plant:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add plant',
        icon: 'error',
        confirmButtonColor: '#EF4444',
      });
    }
  }
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if(file) {
          setMainImage(file);
          setimageFileName(file.name);
      }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Plant</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Plant Name"
              name="name"
              register={register}
              required
              placeholder="Enter plant name"
            />
            <InputField
              label="Scientific Name"
              name="scientificName"
              register={register}
              required
              placeholder="Enter scientific name"
            />
          </div>
          <TextAreaField
            label="Description"
            name="description"
            register={register}
            required
            placeholder="Enter plant description"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Category"
              name="category"
              options={categoryOptions}
              register={register}
              required
            />
            <SelectField
              label="Sun Exposure"
              name="sunExposure"
              options={sunExposureOptions}
              register={register}
              required
            />
          </div>
        </div>

        {/* Care Instructions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Care Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Light Requirements"
              name="light"
              options={lightOptions}
              register={register}
              required
            />
            <SelectField
              label="Watering Needs"
              name="water"
              options={wateringOptions}
              register={register}
              required
            />
            <SelectField
              label="Temperature"
              name="temperature"
              options={temperatureOptions}
              register={register}
              required
            />
            <SelectField
              label="Humidity"
              name="humidity"
              options={humidityOptions}
              register={register}
              required
            />
          </div>
        </div>

        {/* Characteristics */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Characteristics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Maintenance Level"
              name="maintenanceLevel"
              options={maintenanceOptions}
              register={register}
              required
            />
            <SelectField
              label="Growth Rate"
              name="growthRate"
              options={growthRateOptions}
              register={register}
              required
            />
            <SelectField
              label="Plant Size"
              name="plantSize"
              options={sizeOptions}
              register={register}
              required
            />
          </div>
          <div className="mt-4">
            <CheckboxField
              label="Poisonous"
              name="poisonous"
              register={register}
            />
            <CheckboxField
              label="Trending"
              name="trending"
              register={register}
            />
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pricing and Stock</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Price"
              name="price"
              type="number"
              register={register}
              required
              placeholder="Enter price"
            />
            <InputField
              label="Old Price"
              name="oldPrice"
              type="number"
              register={register}
              placeholder="Enter old price"
            />
            <InputField
              label="Stock"
              name="stock"
              type="number"
              register={register}
              required
              placeholder="Enter stock quantity"
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>
        
        {/* Image Upload */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Image</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Main Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {mainImage && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(mainImage)}
                  alt="Selected plant"
                  className="h-32 w-32 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? 'Adding Plant...' : 'Add Plant'}
        </button>
      </form>
    </div>
  );
};

export default AddPlant;