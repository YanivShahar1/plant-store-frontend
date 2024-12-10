import React, { useEffect } from 'react';
import InputField from '../addPlant/InputField';
import SelectField from '../addPlant/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchPlantByIdQuery, useUpdatePlantMutation } from '../../../redux/features/plants/plantsApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import TextAreaField from '../addPlant/TextAreaField';

const UpdatePlant = () => {
  const { id } = useParams();
  const { data: plantData, isLoading, isError, refetch } = useFetchPlantByIdQuery(id);
  const [updatePlant] = useUpdatePlantMutation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      tags: '' // Set default value for tags
    }
  });

  useEffect(() => {
    if (plantData) {
      // Set all form values based on plant data
      Object.keys(plantData).forEach(key => {
        if (key !== '_id' && key !== '__v' && key !== 'dateAdded') {
          setValue(key, plantData[key]);
        }
      });

      // Set nested care instructions
      Object.keys(plantData.careInstructions || {}).forEach(key => {
        setValue(`careInstructions.${key}`, plantData.careInstructions[key]);
      });

      // Handle tags specially - convert array to comma-separated string
      if (Array.isArray(plantData.tags)) {
        setValue('tags', plantData.tags.join(', '));
      }
    }
  }, [plantData, setValue]);

  const onSubmit = async (data) => {
    const updatePlantData = {
      name: data.name,
      scientificName: data.scientificName,
      description: data.description,
      price: Number(data.price),
      oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined,
      stock: Number(data.stock),
      category: data.category,
      careInstructions: {
        light: data.careInstructions.light,
        water: data.careInstructions.water,
        temperature: data.careInstructions.temperature,
        humidity: data.careInstructions.humidity
      },
      sunExposure: data.sunExposure,
      plantSize: data.plantSize,
      maintenanceLevel: data.maintenanceLevel,
      growthRate: data.growthRate,
      features: Array.isArray(data.features) ? data.features : [],
      bloomingSeason: data.bloomingSeason,
      coverImage: data.coverImage,
      // Handle empty tags properly
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      // tags: data.tags ? data.tags.includes(',') ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [data.tags.trim()] : [],
      poisonous: Boolean(data.poisonous),
      trending: Boolean(data.trending),
      status: data.status
    };

    try {
      await axios.put(`${getBaseUrl()}/api/plants/edit/${id}`, updatePlantData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: 'Plant Updated',
        text: 'Your plant has been updated successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      await refetch();
    } catch (error) {
      console.error('Failed to update plant:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update plant. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching plant data</div>;

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Plant</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <InputField
              label="Name"
              name="name"
              placeholder="Enter plant name"
              register={register}
            />

            <InputField
              label="Scientific Name"
              name="scientificName"
              placeholder="Enter scientific name"
              register={register}
            />

            <TextAreaField
              label="Description"
              name="description"
              placeholder="Enter plant description"
              type="textarea"
              register={register}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Price"
                name="price"
                type="number"
                placeholder="Current price"
                register={register}
              />

              <InputField
                label="Old Price"
                name="oldPrice"
                type="number"
                placeholder="Previous price (optional)"
                register={register}
                required={false}
              />
            </div>

            <InputField
              label="Stock"
              name="stock"
              type="number"
              placeholder="Available stock"
              register={register}
            />
          </div>

          {/* Categories and Features */}
          <div className="space-y-4">
            <SelectField
              label="Category"
              name="category"
              register={register}
              options={[
                { value: 'Indoor Plants', label: 'Indoor Plants' },
                { value: 'Outdoor Plants', label: 'Outdoor Plants' },
                { value: 'Succulents & Cacti', label: 'Succulents & Cacti' },
                { value: 'Flowering Plants', label: 'Flowering Plants' },
                { value: 'Trees & Shrubs', label: 'Trees & Shrubs' },
                { value: 'Herbs & Vegetables', label: 'Herbs & Vegetables' }
              ]}
            />

            <SelectField
              label="Plant Size"
              name="plantSize"
              register={register}
              options={[
                { value: 'Small (Up to 30cm/12")', label: 'Small (Up to 30cm/12")' },
                { value: 'Medium (30-100cm/1-3ft)', label: 'Medium (30-100cm/1-3ft)' },
                { value: 'Large (100cm+/3ft+)', label: 'Large (100cm+/3ft+)' }
              ]}
            />

            <SelectField
              label="Maintenance Level"
              name="maintenanceLevel"
              register={register}
              options={[
                { value: 'Easy', label: 'Easy' },
                { value: 'Moderate', label: 'Moderate' },
                { value: 'Expert', label: 'Expert' }
              ]}
            />

            <SelectField
              label="Growth Rate"
              name="growthRate"
              register={register}
              options={[
                { value: 'Slow', label: 'Slow' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Fast', label: 'Fast' }
              ]}
            />
          </div>
        </div>

        {/* Care Instructions */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Light Requirements"
              name="careInstructions.light"
              register={register}
              options={[
                { value: 'Low Light (Shade)', label: 'Low Light (Shade)' },
                { value: 'Medium Light (Indirect Sun)', label: 'Medium Light (Indirect Sun)' },
                { value: 'Bright Light (Direct Sun)', label: 'Bright Light (Direct Sun)' }
              ]}
            />

            <SelectField
              label="Watering Needs"
              name="careInstructions.water"
              register={register}
              options={[
                { value: 'Low (Keep Soil Dry)', label: 'Low (Keep Soil Dry)' },
                { value: 'Moderate (Water Weekly)', label: 'Moderate (Water Weekly)' },
                { value: 'Frequent (2-3 Times Weekly)', label: 'Frequent (2-3 Times Weekly)' }
              ]}
            />

            <SelectField
              label="Temperature Range"
              name="careInstructions.temperature"
              register={register}
              options={[
                { value: 'Cool (15-18°C / 60-65°F)', label: 'Cool (15-18°C / 60-65°F)' },
                { value: 'Average (18-24°C / 65-75°F)', label: 'Average (18-24°C / 65-75°F)' },
                { value: 'Warm (24-29°C / 75-85°F)', label: 'Warm (24-29°C / 75-85°F)' }
              ]}
            />

            <SelectField
              label="Humidity"
              name="careInstructions.humidity"
              register={register}
              options={[
                { value: 'Low (30-40%)', label: 'Low (30-40%)' },
                { value: 'Medium (40-60%)', label: 'Medium (40-60%)' },
                { value: 'High (60%+)', label: 'High (60%+)' }
              ]}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputField
                label="Cover Image URL"
                name="coverImage"
                type="text"
                placeholder="Image URL"
                register={register}
              />

              <InputField
                label="Tags (comma-separated)"
                name="tags"
                type="text"
                placeholder="e.g., tropical, beginner-friendly, pet-safe"
                register={register}
                required={false}
              />
            </div>

            <div className="space-y-4">
              <SelectField
                label="Blooming Season"
                name="bloomingSeason"
                register={register}
                options={[
                  { value: 'Spring', label: 'Spring' },
                  { value: 'Summer', label: 'Summer' },
                  { value: 'Fall', label: 'Fall' },
                  { value: 'Winter', label: 'Winter' },
                  { value: 'Year-round', label: 'Year-round' },
                  { value: 'Non-flowering', label: 'Non-flowering' }
                ]}
              />

              <SelectField
                label="Status"
                name="status"
                register={register}
                required={true}
                options={[
                  { value: 'In Stock', label: 'In Stock' },
                  { value: 'Low Stock', label: 'Low Stock' },
                  { value: 'Out of Stock', label: 'Out of Stock' },
                  { value: 'Coming Soon', label: 'Coming Soon' },
                  { value: 'Discontinued', label: 'Discontinued' }
                ]}
              />

              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('poisonous')}
                    className="rounded text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Poisonous if ingested</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('trending')}
                    className="rounded text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Mark as Trending</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Update Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlant;