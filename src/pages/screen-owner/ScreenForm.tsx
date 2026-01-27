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
    <div className="bg-slate-900 border border-slate-800 shadow-sm rounded-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">{isEdit ? 'Edit Screen' : 'Register New Screen'}</h3>
          <p className="mt-1 text-sm text-slate-400">
            Fill in the details about your digital screen.
          </p>
      </div>
      
      <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="name" className="form-label">Screen Name</label>
                <div className="mt-2">
                  <input
                    {...register('name')}
                    type="text"
                    className="form-input"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
              </div>

              <div className="col-span-6">
                <label htmlFor="location_address" className="form-label">Address</label>
                <div className="mt-2">
                  <input
                    {...register('location_address')}
                    type="text"
                    className="form-input"
                  />
                  {errors.location_address && <p className="text-red-400 text-xs mt-1">{errors.location_address.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="city" className="form-label">City</label>
                <div className="mt-2">
                  <input
                    {...register('city')}
                    type="text"
                    className="form-input"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="form-label">Country</label>
                <div className="mt-2">
                  <input
                    {...register('country')}
                    type="text"
                    className="form-input"
                  />
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="screen_type" className="form-label">Type</label>
                <div className="mt-2">
                  <select
                    {...register('screen_type')}
                    className="form-input"
                  >
                    <option value="mall">Mall</option>
                    <option value="gym">Gym</option>
                    <option value="taxi">Taxi</option>
                    <option value="highway">Highway</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="status" className="form-label">Status</label>
                <div className="mt-2">
                  <select
                    {...register('status')}
                    className="form-input"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="resolution_width" className="form-label">Width (px)</label>
                <div className="mt-2">
                  <input
                    {...register('resolution_width', { valueAsNumber: true })}
                    type="number"
                    className="form-input"
                  />
                  {errors.resolution_width && <p className="text-red-400 text-xs mt-1">{errors.resolution_width.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="resolution_height" className="form-label">Height (px)</label>
                <div className="mt-2">
                  <input
                    {...register('resolution_height', { valueAsNumber: true })}
                    type="number"
                    className="form-input"
                  />
                  {errors.resolution_height && <p className="text-red-400 text-xs mt-1">{errors.resolution_height.message}</p>}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end pt-6 border-t border-slate-800">
                <button
                    type="button"
                    onClick={() => navigate('/screen-owner/screens')}
                    className="bg-transparent py-2.5 px-4 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 mr-3 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-auto px-6"
                >
                    {isSubmitting ? 'Saving...' : 'Save Screen'}
                </button>
            </div>
          </form>
      </div>
    </div>
  );
}
