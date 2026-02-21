import { Users, Calendar } from 'lucide-react';

export default function Header() {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="flex flex-col items-start gap-3 rounded-t-3xl bg-gradient-to-r from-blue-500 to-green-500 p-8 text-white">
      <h1 className="flex items-center gap-3 text-3xl font-medium">
        <Users className="size-8" />
        Prayer Tracker
      </h1>
      <p className="flex items-center gap-3 text-sm opacity-90">
        <Calendar className="size-4" />
        {formattedDate}
      </p>
    </header>
  );
}
