import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Approval {
  id: string;
  screen_id: string;
  creative_id: string;
  status: 'pending' | 'approved' | 'rejected';
  screen: { name: string };
  creative: { name: string, file_url: string, file_type: string };
  created_at: string;
}

export function useApprovals() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: approvals, isLoading, error } = useQuery({
    queryKey: ['approvals', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Complex query to get approvals for screens owned by the user
      // In a real app, we might have a view or specific RPC
      const { data, error } = await supabase
        .from('screen_creative_approvals')
        .select(`
          *,
          screen:screens!inner(name, owner_id),
          creative:creatives(name, file_url, file_type)
        `)
        .eq('screen.owner_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as unknown as Approval[];
    },
    enabled: !!user,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from('screen_creative_approvals')
        .update({ 
            status,
            [status === 'approved' ? 'approved_at' : 'rejected_at']: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
    },
  });

  return {
    approvals,
    isLoading,
    error,
    updateStatus
  };
}
