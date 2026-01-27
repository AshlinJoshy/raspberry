import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Campaign {
  id: string;
  name: string;
  creative_id: string;
  start_date: string;
  end_date: string;
  budget?: number;
  target_screen_types: string[];
  target_cities: string[];
  time_preferences?: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  created_at: string;
}

export type CampaignFormData = Omit<Campaign, 'id' | 'status' | 'created_at'>;

export function useCampaigns() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('campaigns')
        .select('*, creative:creatives(name, file_url)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Campaign & { creative?: { name: string, file_url: string } })[];
    },
    enabled: !!user,
  });

  const createCampaign = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      const { data: newCampaign, error } = await supabase
        .from('campaigns')
        .insert([{ ...data, advertiser_id: user?.id, status: 'draft' }])
        .select()
        .single();

      if (error) throw error;
      return newCampaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  return {
    campaigns,
    isLoading,
    error,
    createCampaign
  };
}
