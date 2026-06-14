import { ClipboardCheck } from 'lucide-react';

export default function RollReminder() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-1 text-sm text-gray-500 fill">
      <ClipboardCheck className="size-4 text-gray-400" strokeWidth={2} />
      <span>Don't forget to take roll!</span>
    </div>
  );
}
