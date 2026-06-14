import { useState } from 'react';
import { ActivityRecord } from '@/types/types';
import { Target, History, RotateCw, Heart, Trash2, X } from 'lucide-react';
import { STUDENTS } from '@/styles/constants';

type TurnTrackerProps = {
  history: ActivityRecord[];
  onDelete: (id: string) => void;
};

type StudentSummary = {
  name: string;
  spinCount: number;
  lastSpinTime: Date | null;
};

export default function TurnTracker({ history, onDelete }: TurnTrackerProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter to only spinner actions
  const spinRecords = history.filter((r) => r.action === 'spinner');

  // Build a summary for each student
  const summaries: StudentSummary[] = STUDENTS.map((name) => {
    const studentSpins = spinRecords
      .filter((r) => r.student === name)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

    return {
      name,
      spinCount: studentSpins.length,
      lastSpinTime:
        studentSpins.length > 0 ? new Date(studentSpins[0].timestamp) : null,
    };
  });

  // Sort: never-spun first (alphabetical), then by oldest last spin
  summaries.sort((a, b) => {
    if (a.lastSpinTime === null && b.lastSpinTime === null) {
      return a.name.localeCompare(b.name);
    }
    if (a.lastSpinTime === null) return -1;
    if (b.lastSpinTime === null) return 1;
    return a.lastSpinTime.getTime() - b.lastSpinTime.getTime();
  });

  // History sorted newest first
  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="mt-2 flex min-h-0 flex-1 flex-col gap-4 rounded-xl bg-white px-4 py-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Target />
        <h2 className="text-1xl font-semibold">Turn Tracker</h2>
        <button
          title="View History"
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 active:scale-95"
          onClick={() => setShowHistory(true)}
        >
          <History className="size-4" />
          View History
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {summaries.map((student, index) => (
          <div
            key={student.name}
            className={`flex items-center gap-4 rounded-lg p-4 ${
              index === 0
                ? 'border-2 border-blue-400 bg-blue-50'
                : 'bg-gray-100/80'
            }`}
          >
            {/* Rank number */}
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                index === 0
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </span>

            {/* Name and last spin info */}
            <span className="flex flex-1 flex-col">
              <span className="font-semibold">{student.name}</span>
              <span className="text-sm opacity-60">
                {student.lastSpinTime
                  ? `Last: ${student.lastSpinTime.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}`
                  : 'No spins yet'}
              </span>
            </span>

            {/* Spin count badge */}
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                student.spinCount === 0
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              ×{student.spinCount}
            </span>
          </div>
        ))}
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[80dvh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
            {/* Modal header */}
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <History className="size-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                Activity History
              </h3>
              <button
                title="Close"
                className="ml-auto rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200 active:scale-95"
                onClick={() => setShowHistory(false)}
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Modal body — scrollable list */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-4">
              {sortedHistory.length === 0 && (
                <p className="text-center text-gray-400">No activity yet.</p>
              )}
              {sortedHistory.map((record) => (
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
                  <span className="flex flex-1 flex-col">
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
                    className="rounded-lg bg-red-100 p-3 transition-transform active:scale-95"
                    onClick={() => setDeletingId(record.id)}
                  >
                    <Trash2 className="size-5 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deletingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-center text-xl font-semibold text-gray-900">
              Delete Record
            </h3>
            <p className="text-center text-gray-600">
              Are you sure you want to delete this record?
            </p>
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
