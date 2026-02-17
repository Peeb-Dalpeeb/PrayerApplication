import { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

type ActionCardProps = {
  title: string;
  icon: LucideIcon;
  variant: 'blue' | 'green';
  onClick: () => void;
};

export default function ActionCard({
  title,
  icon: Icon,
  variant = 'blue',
  onClick,
}: ActionCardProps) {
  const variants = {
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
    green: 'bg-gradient-to-r from-green-400 to-green-600 text-white',
  };
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-6 rounded-xl px-8 py-6 text-white shadow-lg transition-transform active:scale-95 ${variants[variant]}`}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-white/20">
        <Icon strokeWidth={2.5} />
      </div>
      <h2 className="flex w-full items-center justify-between text-xl font-semibold">
        {title}
        <div className="size-4">{<ChevronDown />}</div>
      </h2>
    </button>
  );
}
