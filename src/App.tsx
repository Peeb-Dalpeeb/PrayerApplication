import Header from './components/ui/Header';
import ActionCard from './components/ui/ActionCard';
import { RotateCw, Heart } from 'lucide-react';
import { useState } from 'react';
import StudentList from './components/ui/StudentList';
import { GREEN_GRADIENT, BLUE_GRADIENT } from './styles/constants';
import { ActivityRecord } from './types/types';
import ActivityFeed from './components/ui/ActivityFeed';

export default function App() {
  const [selectionState, setSelectionState] = useState<
    'spinner' | 'prayer' | 'null'
  >('null');
  const [history, setHistory] = useState<ActivityRecord[]>([]);

  const addRecord = (studentName: string) => {
    if (selectionState === 'null') return;
    const newRecord: ActivityRecord = {
      id: crypto.randomUUID(),
      student: studentName,
      action: selectionState as 'spinner' | 'prayer',
      timestamp: new Date(),
    };
    setHistory((prevHistory) => [newRecord, ...prevHistory]);
    setSelectionState('null');
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100">
      <div className="flex h-screen w-full flex-col gap-3 md:max-w-2xl">
        <Header />

        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 px-4 pb-4 md:px-0">
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
          <ActivityFeed history={history} />
        </div>
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
                'Marcus Hammond',
                'Finn Beath',
                'Jack Frischknecht',
                'Eden Gore',
                'Indie Palomino',
                'Grace Strickland',
                'Malikey Homer',
                'Danielle KeKolani',
              ]}
              title={
                selectionState === 'spinner'
                  ? 'Who Spun the Wheel Today?'
                  : 'Who Prayed Today?'
              }
              onClose={() => setSelectionState('null')}
              onSelect={addRecord}
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
