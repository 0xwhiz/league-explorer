
import React, { useState, useMemo } from 'react';
import { useLeagues } from '../hooks/useLeagues';
import SearchBar from '../components/SearchBar';
import SportFilter from '../components/SportFilter';
import LeagueCard from '../components/LeagueCard';
import SeasonBadgeModal from '../components/SeasonBadgeModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ThemeToggle from '../components/ThemeToggle';
import { League } from '../types';
import { Trophy, Filter, Zap } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState<{ id: string; name: string } | null>(null);

  const { data: leaguesData, isLoading, error } = useLeagues();

  const leagues = leaguesData?.leagues || [];

  // Get unique sports for filter
  const availableSports = useMemo(() => {
    const sports = leagues.map((league: League) => league.strSport).filter(Boolean);
    return Array.from(new Set(sports)).sort();
  }, [leagues]);

  // Filter leagues based on search term and selected sport
  const filteredLeagues = useMemo(() => {
    return leagues.filter((league: League) => {
      const matchesSearch = league.strLeague?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           league.strLeagueAlternate?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = selectedSport === 'all' || league.strSport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [leagues, searchTerm, selectedSport]);

  const handleLeagueClick = (leagueId: string) => {
    const league = leagues.find((l: League) => l.idLeague === leagueId);
    if (league) {
      setSelectedLeague({ id: leagueId, name: league.strLeague });
    }
  };

  const handleCloseModal = () => {
    setSelectedLeague(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Leagues</h2>
          <p className="text-gray-600 dark:text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sportygroup-style Header */}
      <div className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          
          <div className="text-center mb-6 sm:mb-8">
            {/* <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-emerald-500/10 p-3 sm:p-4 rounded-full border border-emerald-500/20">
                <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
              </div>
            </div> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
              Sports Leagues
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Discover professional sports leagues from around the world
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:gap-4 sm:items-center">
                <div className="flex-1 w-full">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search leagues..."
                  />
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <SportFilter
                    value={selectedSport}
                    onChange={setSelectedSport}
                    options={availableSports}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg p-3 sm:p-4 border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold text-lg">{filteredLeagues.length}</span> leagues found
                    {selectedSport !== 'all' && (
                      <span className="ml-2 text-gray-500 dark:text-gray-400">
                        in <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{selectedSport}</span>
                      </span>
                    )}
                  </p>
                  {searchTerm && (
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full self-start sm:self-center">
                      "{searchTerm}"
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Leagues Grid */}
            {filteredLeagues.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredLeagues.map((league: League, index: number) => (
                  <div 
                    key={league.idLeague}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <LeagueCard
                      league={league}
                      onClick={handleLeagueClick}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-20">
                <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 sm:p-12 border border-gray-200/30 dark:border-gray-700/30 max-w-md mx-auto">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Trophy className="h-8 sm:h-10 w-8 sm:w-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">No leagues found</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                    Try adjusting your search terms or filter criteria
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Season Badge Modal */}
      <SeasonBadgeModal
        isOpen={!!selectedLeague}
        onClose={handleCloseModal}
        leagueId={selectedLeague?.id || null}
        leagueName={selectedLeague?.name || ''}
      />
    </div>
  );
};

export default Index;
