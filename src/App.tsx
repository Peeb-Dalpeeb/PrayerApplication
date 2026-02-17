import Header from './components/ui/Header';
import ActionCard from './components/ui/ActionCard';
import { RotateCw, Heart } from 'lucide-react';
import { useState } from 'react';
import StudentList from './components/ui/StudentList';
import { GREEN_GRADIENT, BLUE_GRADIENT } from './styles/constants';

export default function App() {
  const [selectionState, setSelectionState] = useState<
    'spinner' | 'prayer' | 'null'
  >('null');
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100">
      <div className="flex w-full flex-col gap-3 md:max-w-2xl">
        <Header />
        <ActionCard
          title="Who Spun the Wheel Today?"
          icon={RotateCw}
          variant="blue"
          onClick={() => setSelectionState('spinner')}
        />
        <ActionCard
          title="Who Prayed Today?"
          icon={Heart}
          variant="green"
          onClick={() => setSelectionState('prayer')}
        />
      </div>

      {selectionState !== 'null' && (
        <div className="fixed inset-0 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectionState('null')}
          ></div>

          <div className="relative flex w-full md:max-w-2xl">
            <StudentList
              students={[
                'Marcus',
                'John',
                'Emma',
                'Emily',
                'Jack',
                'James',
                'Sophia',
                'Olivia',
                'Liam',
                'Noah',
              ]}
              title={
                selectionState === 'spinner'
                  ? 'Who Spun the Wheel Today?'
                  : 'Who Prayed Today?'
              }
              onClose={() => setSelectionState('null')}
              onSelect={() => setSelectionState('null')}
              color={
                selectionState === 'spinner' ? BLUE_GRADIENT : GREEN_GRADIENT
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
