import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Creative {
  id: string;
  name: string;
  file_type: 'video' | 'image';
  file_url: string;
  duration_seconds?: number;
  width: number;
  height: number;
  file_size_bytes: number;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
}

export type CreativeFormData = Omit<Creative, 'id' | 'status' | 'rejection_reason' | 'created_at'>;

export function useCreatives() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: creatives, isLoading, error } = useQuery({
    queryKey: ['creatives', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('creatives')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Creative[];
    },
    enabled: !!user,
  });

  const uploadCreative = useMutation({
    mutationFn: async (data: CreativeFormData) => {
      const { data: newCreative, error } = await supabase
        .from('creatives')
        .insert([{ ...data, advertiser_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      return newCreative;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatives'] });
    },
  });

  return {
    creatives,
    isLoading,
    error,
    uploadCreative
  };
}
