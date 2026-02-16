import Header from './components/ui/Header';

export default function App() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100">
      <div className="flex w-full flex-col md:max-w-2xl">
        <Header />
      </div>
    </div>
  );
}
