import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../../hooks/useCampaigns';
import { useCreatives } from '../../hooks/useCreatives';

const campaignSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  creative_id: z.string().uuid('Please select a creative'),
  start_date: z.string(),
  end_date: z.string(),
  budget: z.number().optional(),
  target_screen_types: z.array(z.string()).min(1, 'Select at least one screen type'),
  target_cities: z.string(),
  time_preferences: z.array(z.string()).optional(),
});

type CampaignFormInputs = z.infer<typeof campaignSchema>;

export default function CampaignForm() {
  const navigate = useNavigate();
  const { createCampaign } = useCampaigns();
  const { creatives } = useCreatives();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CampaignFormInputs>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      target_screen_types: [],
      time_preferences: ['all_day'],
    }
  });

  const onSubmit = async (data: CampaignFormInputs) => {
    try {
      await createCampaign.mutateAsync({
        ...data,
        target_cities: data.target_cities.split(',').map(s => s.trim()).filter(Boolean)
      });
      navigate('/advertiser/campaigns');
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  const approvedCreatives = creatives?.filter(c => c.status === 'approved' || c.status === 'pending'); // Allow pending for MVP testing

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Create Campaign</h3>
          <p className="mt-1 text-sm text-gray-500">
            Target your ads to specific screens and locations.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="creative_id" className="block text-sm font-medium text-gray-700">Select Creative</label>
                <select
                  {...register('creative_id')}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a creative...</option>
                  {approvedCreatives?.map(creative => (
                    <option key={creative.id} value={creative.id}>
                      {creative.name} ({creative.file_type})
                    </option>
                  ))}
                </select>
                {errors.creative_id && <p className="text-red-500 text-xs mt-1">{errors.creative_id.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  {...register('start_date')}
                  type="date"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  {...register('end_date')}
                  type="date"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date.message}</p>}
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Target Screen Types</label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {['mall', 'gym', 'taxi', 'highway', 'other'].map((type) => (
                    <div key={type} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          value={type}
                          {...register('target_screen_types')}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-700 capitalize">{type}</label>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.target_screen_types && <p className="text-red-500 text-xs mt-1">{errors.target_screen_types.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="target_cities" className="block text-sm font-medium text-gray-700">Target Cities (Comma separated)</label>
                <input
                  {...register('target_cities')}
                  type="text"
                  placeholder="New York, Los Angeles, Chicago"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget ($)</label>
                <input
                  {...register('budget', { valueAsNumber: true })}
                  type="number"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={() => navigate('/advertiser/campaigns')}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                    Cancel
                </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
