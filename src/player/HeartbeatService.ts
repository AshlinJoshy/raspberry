import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useHeartbeat(screenId: string) {
  useEffect(() => {
    if (!screenId) return;

    const sendHeartbeat = async () => {
      try {
        await supabase
          .from('screens')
          .update({ 
            last_heartbeat: new Date().toISOString(),
            is_online: true 
          })
          .eq('id', screenId);
      } catch (error) {
        console.error('Heartbeat failed:', error);
      }
    };

    // Send immediately
    sendHeartbeat();

    // Send every 60 seconds
    const interval = setInterval(sendHeartbeat, 60000);

    return () => clearInterval(interval);
  }, [screenId]);
}
