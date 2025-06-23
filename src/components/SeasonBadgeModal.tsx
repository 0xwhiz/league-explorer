
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSeasons } from '../hooks/useSeasons';
import { Loader2, Trophy, Calendar, Award, X } from 'lucide-react';

interface SeasonBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  leagueId: string | null;
  leagueName: string;
}

const SeasonBadgeModal: React.FC<SeasonBadgeModalProps> = ({ 
  isOpen, 
  onClose, 
  leagueId, 
  leagueName 
}) => {
  const { data: seasonsData, isLoading, error } = useSeasons(leagueId);

  const firstSeason = seasonsData?.seasons?.[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-900 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {leagueName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          {isLoading && (
            <div className="text-center">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 border border-gray-600/50">
                <div className="flex items-center justify-center mb-4">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading Season Badge</h3>
                <p className="text-gray-400 dark:text-white">Fetching the latest season information...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="text-center">
              <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Failed to Load Badge</h3>
                <p className="text-sm text-gray-400 dark:text-white">Please try again later</p>
              </div>
            </div>
          )}
          
          {firstSeason?.strSeasonBadge && (
            <div className="text-center">
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30 shadow-inner mb-6">
                <img
                  src={firstSeason.strSeasonBadge}
                  alt={`${leagueName} season badge`}
                  className="max-w-full max-h-48 object-contain mx-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    console.log('Image failed to load:', firstSeason.strSeasonBadge);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-sm font-semibold text-emerald-400">Season Information</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {firstSeason.strSeason}
                </p>
              </div>
            </div>
          )}
          
          {seasonsData && !firstSeason?.strSeasonBadge && !isLoading && (
            <div className="text-center">
              <div className="bg-yellow-500/10 rounded-xl p-8 border border-yellow-500/20">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Season Badge Available</h3>
                <p className="text-sm text-gray-400">This league doesn't have a season badge to display</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeasonBadgeModal;
