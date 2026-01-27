import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Screen {
  id: string;
  name: string;
  location_address: string;
  city: string;
  state?: string;
  country: string;
  screen_type: 'mall' | 'gym' | 'taxi' | 'highway' | 'other';
  resolution_width: number;
  resolution_height: number;
  status: 'active' | 'inactive' | 'maintenance';
  is_online: boolean;
  last_heartbeat?: string;
  photo_url?: string;
  operating_hours_start?: string;
  operating_hours_end?: string;
}

export type ScreenFormData = Omit<Screen, 'id' | 'owner_id' | 'is_online' | 'last_heartbeat' | 'created_at' | 'updated_at'>;

export function useScreens() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: screens, isLoading, error } = useQuery({
    queryKey: ['screens', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('screens')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Screen[];
    },
    enabled: !!user,
  });

  const createScreen = useMutation({
    mutationFn: async (newScreen: ScreenFormData) => {
      const { data, error } = await supabase
        .from('screens')
        .insert([{ ...newScreen, owner_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] });
    },
  });

  const updateScreen = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ScreenFormData> }) => {
      const { data, error } = await supabase
        .from('screens')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] });
    },
  });

   const deleteScreen = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('screens')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] });
    },
  });

  return {
    screens,
    isLoading,
    error,
    createScreen,
    updateScreen,
    deleteScreen
  };
}
