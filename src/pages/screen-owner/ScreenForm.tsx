import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useScreens } from '../../hooks/useScreens';

const screenSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  location_address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  screen_type: z.enum(['mall', 'gym', 'taxi', 'highway', 'other']),
  resolution_width: z.number().min(100),
  resolution_height: z.number().min(100),
  status: z.enum(['active', 'inactive', 'maintenance']),
});

type ScreenFormInputs = z.infer<typeof screenSchema>;

export default function ScreenForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createScreen, updateScreen, screens } = useScreens();
  const isEdit = !!id;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ScreenFormInputs>({
    resolver: zodResolver(screenSchema),
    defaultValues: {
      status: 'inactive',
      screen_type: 'other',
    }
  });

  useEffect(() => {
    if (isEdit && screens) {
      const screen = screens.find(s => s.id === id);
      if (screen) {
        reset({
          name: screen.name,
          location_address: screen.location_address,
          city: screen.city,
          country: screen.country,
          screen_type: screen.screen_type,
          resolution_width: screen.resolution_width,
          resolution_height: screen.resolution_height,
          status: screen.status,
        });
      }
    }
  }, [id, screens, reset, isEdit]);

  const onSubmit = async (data: ScreenFormInputs) => {
    try {
      if (isEdit && id) {
        await updateScreen.mutateAsync({ id, updates: data });
      } else {
        await createScreen.mutateAsync(data);
      }
      navigate('/screen-owner/screens');
    } catch (error) {
      console.error('Failed to save screen:', error);
    }
  };

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{isEdit ? 'Edit Screen' : 'Register New Screen'}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details about your digital screen.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Screen Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="location_address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  {...register('location_address')}
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.location_address && <p className="text-red-500 text-xs mt-1">{errors.location_address.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  {...register('city')}
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  {...register('country')}
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="screen_type" className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  {...register('screen_type')}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="mall">Mall</option>
                  <option value="gym">Gym</option>
                  <option value="taxi">Taxi</option>
                  <option value="highway">Highway</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="resolution_width" className="block text-sm font-medium text-gray-700">Width (px)</label>
                <input
                  {...register('resolution_width', { valueAsNumber: true })}
                  type="number"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.resolution_width && <p className="text-red-500 text-xs mt-1">{errors.resolution_width.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="resolution_height" className="block text-sm font-medium text-gray-700">Height (px)</label>
                <input
                  {...register('resolution_height', { valueAsNumber: true })}
                  type="number"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                 {errors.resolution_height && <p className="text-red-500 text-xs mt-1">{errors.resolution_height.message}</p>}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={() => navigate('/screen-owner/screens')}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isSubmitting ? 'Saving...' : 'Save Screen'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
