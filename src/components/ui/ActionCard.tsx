import { LucideIcon, ChevronDown } from 'lucide-react';
import { GREEN_GRADIENT, BLUE_GRADIENT } from '../../styles/constants';

type ActionCardProps = {
  title: string;
  icon: LucideIcon;
  variant?: 'blue' | 'green';
  onClick: () => void;
};

export default function ActionCard({
  title,
  icon: Icon,
  variant = 'blue',
  onClick,
}: ActionCardProps) {
  const variants = {
    blue: BLUE_GRADIENT,
    green: GREEN_GRADIENT,
  };
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-4 py-6 text-white shadow-lg transition-transform active:scale-95 ${variants[variant]}`}
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
