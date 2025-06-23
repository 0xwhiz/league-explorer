
import { useQuery } from '@tanstack/react-query';
import { SeasonResponse } from '../types';

const fetchSeasons = async (leagueId: string): Promise<SeasonResponse> => {
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch seasons');
  }
  return response.json();
};

export const useSeasons = (leagueId: string | null) => {
  return useQuery({
    queryKey: ['seasons', leagueId],
    queryFn: () => fetchSeasons(leagueId!),
    enabled: !!leagueId,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};
