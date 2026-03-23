import { useState } from 'react';
import { ActivityRecord } from '@/types/types';
import { RotateCw, Heart, History, Trash2 } from 'lucide-react';

type ActivityFeedProps = {
  history: ActivityRecord[];
  onDelete: (id: string) => void;
};

export default function ActivityFeed({ history, onDelete }: ActivityFeedProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
              onClick={() => setDeletingId(record.id)}
            >
              <Trash2 className="ml-auto size-6 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-center text-gray-900">Delete Record</h3>
            <p className="text-center text-gray-600">Are you sure you want to delete this record?</p>
            <div className="mt-2 flex justify-center gap-3">
              <button
                className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300 active:scale-95"
                onClick={() => setDeletingId(null)}
              >
                No
              </button>
              <button
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600 active:scale-95"
                onClick={() => {
                  onDelete(deletingId);
                  setDeletingId(null);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
