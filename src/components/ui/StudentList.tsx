import { X } from 'lucide-react';

type StudentListProps = {
  students: string[];
  title: string;
  onClose: () => void;
  onSelect: (student: string) => void;
};

export default function StudentList({
  students,
  title,
  onClose,
  onSelect,
}: StudentListProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-between rounded-t-3xl bg-gray-600 bg-gradient-to-r from-green-400 to-green-600 px-8 py-4 text-white">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          title="Close"
          className="rounded-full bg-white/20 p-4"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="px-4 pb-4 flex max-h-96 flex-col gap-2 overflow-y-auto bg-white py-4">
        {students.map((student) => {
          return (
            <button
              key={student}
              onClick={() => onSelect(student)}
              className="rounded-lg border p-6 text-left transition-transform active:scale-95"
            >
              {student}
            </button>
          );
        })}
      </div>
    </div>
  );
}
