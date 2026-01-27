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
    <div className="bg-slate-900 border border-slate-800 shadow-sm rounded-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Create Campaign</h3>
          <p className="mt-1 text-sm text-slate-400">
            Target your ads to specific screens and locations.
          </p>
      </div>
      <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name" className="form-label">Campaign Name</label>
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
                <label htmlFor="creative_id" className="form-label">Select Creative</label>
                <div className="mt-2">
                  <select
                    {...register('creative_id')}
                    className="form-input"
                  >
                    <option value="">Select a creative...</option>
                    {approvedCreatives?.map(creative => (
                      <option key={creative.id} value={creative.id}>
                        {creative.name} ({creative.file_type})
                      </option>
                    ))}
                  </select>
                  {errors.creative_id && <p className="text-red-400 text-xs mt-1">{errors.creative_id.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="start_date" className="form-label">Start Date</label>
                <div className="mt-2">
                  <input
                    {...register('start_date')}
                    type="date"
                    className="form-input"
                  />
                  {errors.start_date && <p className="text-red-400 text-xs mt-1">{errors.start_date.message}</p>}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="end_date" className="form-label">End Date</label>
                <div className="mt-2">
                   <input
                    {...register('end_date')}
                    type="date"
                    className="form-input"
                  />
                  {errors.end_date && <p className="text-red-400 text-xs mt-1">{errors.end_date.message}</p>}
                </div>
              </div>

              <div className="col-span-6">
                <label className="form-label mb-2">Target Screen Types</label>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {['mall', 'gym', 'taxi', 'highway', 'other'].map((type) => (
                    <div key={type} className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          value={type}
                          {...register('target_screen_types')}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-brand-600 focus:ring-brand-500 focus:ring-offset-slate-900"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label className="font-medium text-slate-300 capitalize">{type}</label>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.target_screen_types && <p className="text-red-400 text-xs mt-1">{errors.target_screen_types.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="target_cities" className="form-label">Target Cities (Comma separated)</label>
                <div className="mt-2">
                  <input
                    {...register('target_cities')}
                    type="text"
                    placeholder="New York, Los Angeles, Chicago"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="budget" className="form-label">Budget ($)</label>
                <div className="mt-2">
                  <input
                    {...register('budget', { valueAsNumber: true })}
                    type="number"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pt-6 border-t border-slate-800">
                 <button
                    type="button"
                    onClick={() => navigate('/advertiser/campaigns')}
                    className="bg-transparent py-2.5 px-4 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 mr-3 transition-colors"
                >
                    Cancel
                </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-auto px-6"
              >
                {isSubmitting ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
