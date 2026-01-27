import { useParams } from 'react-router-dom';
import PlayerApp from '../../player/PlayerApp';
import { useHeartbeat } from '../../player/HeartbeatService';

export default function PlayerPage() {
  const { screenId } = useParams();

  // Initialize heartbeat
  useHeartbeat(screenId || '');

  if (!screenId) return <div>Invalid Screen ID</div>;

  return <PlayerApp screenId={screenId} />;
}
