import { ActivityRecord } from '@/types/types';
import { RotateCw, Heart, History, Trash2 } from 'lucide-react';

type ActivityFeedProps = {
  history: ActivityRecord[];
  onDelete: (id: string) => void;
};

export default function ActivityFeed({ history, onDelete }: ActivityFeedProps) {
  return (
    <div className="mt-2 flex min-h-0 flex-1 flex-col gap-4 rounded-xl bg-white px-4 py-6 shadow-sm">
      <div className="flex items-center gap-2">
        <History />
        <h2 className="text-1xl font-semibold">Recent Activity</h2>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
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
                {record.action === 'spinner' ? 'Spun' : 'Prayed'}{' '}
                {new Date(record.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </span>
            <button
              title="Delete activity"
              className="ml-auto rounded-lg bg-red-100 p-3 transition-transform active:scale-95"
              onClick={() => onDelete(record.id)}
            >
              <Trash2 className="ml-auto size-6 text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
