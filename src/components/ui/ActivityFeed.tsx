import { ActivityRecord } from '@/types/types';
import { RotateCw, Heart, History } from 'lucide-react';

type ActivityFeedProps = {
  history: ActivityRecord[];
};

export default function ActivityFeed({ history }: ActivityFeedProps) {
  return (
    <div className="mt-5 flex flex-col flex-1 min-h-0 gap-4 rounded-xl bg-white px-8 py-6 shadow-lg">
      <div className="flex items-center gap-2">
        <History />
        <h2 className="text-1xl font-semibold">Recent Activity</h2>
      </div>

      <div className="flex-1 flex  flex-col gap-2 overflow-y-auto pr-2">
        {history.length === 0 && <div>No activity yet.</div>}
        {history.map((record) => (
          <div
            key={record.id}
            className="flex items-center gap-4 rounded-lg bg-gray-100/80 p-4"
          >
            <span>
              {record.action === 'spinner' ? (
                <RotateCw className="size-6 text-blue-500" />
              ) : (
                <Heart className="size-6 text-green-500" />
              )}
            </span>
            <span className="flex flex-col">
              <span className="font-semibold">{record.student}</span>
              <span className="text-sm opacity-60">
                {record.action === 'spinner' ? 'Spun the Wheel' : 'Prayed'}
              </span>
            </span>
            <span className="ml-auto text-sm opacity-60">
              {record.timestamp.toLocaleString([], {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
