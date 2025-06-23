
import { useQuery } from '@tanstack/react-query';
import { LeagueResponse } from '../types';

const fetchLeagues = async (): Promise<LeagueResponse> => {
  const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
  if (!response.ok) {
    throw new Error('Failed to fetch leagues');
  }
  return response.json();
};

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: fetchLeagues,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
