import Button from './Button';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  onAddVideoClick: () => void;
}

export default function Header({ onAddVideoClick }: HeaderProps) {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-300/60 dark:border-gray-700/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto py-5 px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <span className="text-blue-600 dark:text-blue-400">Watch</span>
              <span className="text-gray-900 dark:text-white">Tube</span>
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="primary"
              onClick={onAddVideoClick}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
            >
              Add Video
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}