import Header from './components/ui/Header';
import ActionCard from './components/ui/ActionCard';
import { RotateCw, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import StudentList from './components/ui/StudentList';
import { GREEN_GRADIENT, BLUE_GRADIENT } from './styles/constants';
import { ActivityRecord } from './types/types';
import ActivityFeed from './components/ui/ActivityFeed';
import axios from 'axios';

export default function App() {
  const [selectionState, setSelectionState] = useState<
    'spinner' | 'prayer' | 'null'
  >('null');
  const [history, setHistory] = useState<ActivityRecord[]>([]);
  const [isServerAwake, setIsServerAwake] = useState(false);

  const deleteRecord = async (idToRemove: string) => {
    try {
      // 1. Tell the Backend to delete it from MongoDB
      // We send the specific ID in the URL
      await axios.delete(
        `https://prayerapplication-backend.onrender.com/api/activities/${idToRemove}`
      );

      // 2. Only if the backend succeeds, remove it from the screen
      setHistory((prevHistory) =>
        prevHistory.filter((record) => record.id !== idToRemove)
      );
    } catch (error) {
      console.error('Failed to delete record from database:', error);
      alert('Could not delete record. Is the backend running?');
    }
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          'https://prayerapplication-backend.onrender.com/api/activities'
        );
        setHistory(response.data);
        setIsServerAwake(true);
      } catch (error) {
        console.error('Failed to load history from database', error);
      }
    };
    loadData();
  }, []); // This [] ensures it only runs once when the page opens

  const addRecord = async (studentName: string) => {
    if (selectionState === 'null') return;

    const newRecord: ActivityRecord = {
      id: crypto.randomUUID(),
      student: studentName, // Mapping studentName to the 'student' key
      action: selectionState as 'spinner' | 'prayer',
      timestamp: new Date(),
    };

    try {
      // This sends the data over the bridge to your Backend
      await axios.post(
        'https://prayerapplication-backend.onrender.com/api/activities',
        newRecord
      );

      // This updates the list you see on the screen
      setHistory((prev) => [newRecord, ...prev]);
    } catch (error) {
      console.error('Failed to save to database:', error);
      alert("Check your backend! The record couldn't be saved to MongoDB.");
    }
  };

  if (!isServerAwake) {
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col gap-4 bg-gray-100 px-4 text-center">
        <h2 className='text-2xl font-bold text-blue-600'>Server is not awake</h2>
        <p className="text-xl font-bold text-gray-500">Because we are on a free server, this first load may take 45 seconds to wake up the backend.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100">
      <div className="flex h-screen w-full flex-col gap-3 md:max-w-2xl">
        <Header />

        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 px-4 pb-4 md:px-0">
          <ActionCard
            title="Who Spun the Wheel?"
            icon={RotateCw}
            variant="blue"
            onClick={() => setSelectionState('spinner')}
          />
          <ActionCard
            title="Who Prayed?"
            icon={Heart}
            variant="green"
            onClick={() => setSelectionState('prayer')}
          />
          <ActivityFeed history={history} onDelete={deleteRecord} />
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
                  ? 'Who Spun the Wheel?'
                  : 'Who Prayed?'
              }
              onClose={() => setSelectionState('null')}
              onSelect={(student) => {
                addRecord(student);
                setSelectionState('null');
              }}
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
