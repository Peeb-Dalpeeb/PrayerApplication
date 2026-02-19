import { X } from 'lucide-react';

type StudentListProps = {
  students: string[];
  title: string;
  color: string;
  onClose: () => void;
  onSelect: (student: string) => void;
};

export default function StudentList({
  students,
  title,
  color,
  onClose,
  onSelect,
}: StudentListProps) {
  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex w-full items-center justify-between rounded-t-3xl px-8 py-4 text-white ${color}`}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          title="Close"
          className="rounded-full bg-white/20 p-4"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto bg-white px-4 py-4 pb-4 ">
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
