
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SportFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const SportFilter: React.FC<SportFilterProps> = ({ value, onChange, options }) => {
  const getSportIcon = (sport: string) => {
    const iconMap = {
      'Soccer': '⚽',
      'Basketball': '🏀',
      'American Football': '🏈',
      'Ice Hockey': '🏒',
      'Motorsport': '🏎️',
    };
    return iconMap[sport as keyof typeof iconMap] || '🏆';
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48 sm:w-56 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/20 text-gray-900 dark:text-white rounded-lg shadow-sm">
        <SelectValue placeholder="Filter by sport" className="text-gray-600 dark:text-gray-300" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-2xl rounded-lg z-50">
        <SelectItem value="all" className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 rounded-md m-1">
          <span className="font-medium flex items-center gap-2">
            🏆 All Sports
          </span>
        </SelectItem>
        {options.map((sport) => (
          <SelectItem key={sport} value={sport} className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 rounded-md m-1">
            <span className="font-medium flex items-center gap-2">
              <span>{getSportIcon(sport)}</span>
              {sport}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SportFilter;
