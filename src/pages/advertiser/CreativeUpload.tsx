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
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upload Creative</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload your ad content (Image or Video).
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Creative Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="file_type" className="block text-sm font-medium text-gray-700">File Type</label>
                <select
                  {...register('file_type')}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

               <div className="col-span-6">
                <label htmlFor="file_url" className="block text-sm font-medium text-gray-700">File URL (Mock Upload)</label>
                <input
                  {...register('file_url')}
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.file_url && <p className="text-red-500 text-xs mt-1">{errors.file_url.message}</p>}
              </div>

              {fileType === 'video' && (
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="duration_seconds" className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
                  <input
                    {...register('duration_seconds', { valueAsNumber: true })}
                    type="number"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.duration_seconds && <p className="text-red-500 text-xs mt-1">{errors.duration_seconds.message}</p>}
                </div>
              )}

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width (px)</label>
                <input
                  {...register('width', { valueAsNumber: true })}
                  type="number"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (px)</label>
                <input
                  {...register('height', { valueAsNumber: true })}
                  type="number"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
                 <button
                    type="button"
                    onClick={() => navigate('/advertiser/creatives')}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                    Cancel
                </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Uploading...' : 'Upload Creative'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
