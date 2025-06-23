
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { League } from '../types';
import { Trophy, Star, ArrowRight } from 'lucide-react';

interface LeagueCardProps {
  league: League;
  onClick: (leagueId: string) => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, onClick }) => {
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

  const getSportColor = (sport: string) => {
    const colors = {
      'Soccer': 'bg-emerald-500',
      'Basketball': 'bg-orange-500',
      'American Football': 'bg-red-500',
      'Baseball': 'bg-blue-500',
      'Ice Hockey': 'bg-cyan-500',
      'Tennis': 'bg-yellow-500',
      'Boxing': 'bg-purple-500',
      'Motorsport': 'bg-gray-600',
      'Rugby': 'bg-emerald-600',
      'Cricket': 'bg-indigo-500',
    };
    return colors[sport as keyof typeof colors] || 'bg-emerald-500';
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 relative overflow-hidden h-full flex flex-col"
      onClick={() => onClick(league.idLeague)}
    >
      {/* Sportygroup-style hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="pb-3 relative z-10 flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className={`${getSportColor(league.strSport)} p-2.5 rounded-lg text-white shadow-lg flex items-center justify-center w-12 h-12`}>
            <span className="text-lg">{league.strLeague}</span>
          </div>
          <Star className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-emerald-400 transition-colors duration-300" />
        </div>
        {/* <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300 min-h-[3.5rem] flex items-center">
          {league.strLeague}
        </CardTitle> */}
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10 flex-grow flex flex-col">
        <div className="space-y-4 flex-grow">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold text-white px-3 py-1.5 rounded-full ${getSportColor(league.strSport)} shadow-sm`}>
              {getSportIcon(league.strSport)}{' '}{league.strSport}
            </span>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200/50 dark:bg-gray-700/50 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600">
              #{league.idLeague}
            </div>
          </div>
          
          {league.strLeagueAlternate && (
            <div className="bg-gray-100/30 dark:bg-gray-700/30 rounded-lg p-3 border border-gray-200/30 dark:border-gray-600/30 flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                <span className="text-gray-500 dark:text-gray-400">Also known as:</span>
                <br />
                <span className="text-gray-900 dark:text-white font-medium">{league.strLeagueAlternate}</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="pt-4 mt-1 mt-auto border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-500 dark:text-emerald-400 font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
              Click to view season badge
            </span>
            <ArrowRight className="h-3 w-3 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeagueCard;
