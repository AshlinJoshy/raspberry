import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCreatives } from '../../hooks/useCreatives';

const creativeSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  file_url: z.string().url('Must be a valid URL'),
  file_type: z.enum(['video', 'image']),
  duration_seconds: z.number().optional(),
  width: z.number().min(1),
  height: z.number().min(1),
  file_size_bytes: z.number().min(1),
});

type CreativeFormInputs = z.infer<typeof creativeSchema>;

export default function CreativeUpload() {
  const navigate = useNavigate();
  const { uploadCreative } = useCreatives();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CreativeFormInputs>({
    resolver: zodResolver(creativeSchema),
    defaultValues: {
      file_type: 'image',
      width: 1920,
      height: 1080,
      file_size_bytes: 1000000,
    }
  });

  const fileType = watch('file_type');

  const onSubmit = async (data: CreativeFormInputs) => {
    try {
      await uploadCreative.mutateAsync(data);
      navigate('/advertiser/creatives');
    } catch (error) {
      console.error('Failed to upload creative:', error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 shadow-sm rounded-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Upload Creative</h3>
          <p className="mt-1 text-sm text-slate-400">
            Upload your ad content (Image or Video).
          </p>
      </div>

      <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="name" className="form-label">Creative Name</label>
                <div className="mt-2">
                  <input
                    {...register('name')}
                    type="text"
                    className="form-input"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="file_type" className="form-label">File Type</label>
                <div className="mt-2">
                  <select
                    {...register('file_type')}
                    className="form-input"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

               <div className="col-span-6">
                <label htmlFor="file_url" className="form-label">File URL (Mock Upload)</label>
                <div className="mt-2">
                  <input
                    {...register('file_url')}
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="form-input"
                  />
                  {errors.file_url && <p className="text-red-400 text-xs mt-1">{errors.file_url.message}</p>}
                </div>
              </div>

              {fileType === 'video' && (
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="duration_seconds" className="form-label">Duration (seconds)</label>
                  <div className="mt-2">
                    <input
                      {...register('duration_seconds', { valueAsNumber: true })}
                      type="number"
                      className="form-input"
                    />
                    {errors.duration_seconds && <p className="text-red-400 text-xs mt-1">{errors.duration_seconds.message}</p>}
                  </div>
                </div>
              )}

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="width" className="form-label">Width (px)</label>
                <div className="mt-2">
                  <input
                    {...register('width', { valueAsNumber: true })}
                    type="number"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="height" className="form-label">Height (px)</label>
                <div className="mt-2">
                   <input
                    {...register('height', { valueAsNumber: true })}
                    type="number"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pt-6 border-t border-slate-800">
                 <button
                    type="button"
                    onClick={() => navigate('/advertiser/creatives')}
                    className="bg-transparent py-2.5 px-4 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 mr-3 transition-colors"
                >
                    Cancel
                </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-auto px-6"
              >
                {isSubmitting ? 'Uploading...' : 'Upload Creative'}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
