
export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface Season {
  idSeason: string;
  strSeason: string;
  strSeasonBadge: string;
}

export interface LeagueResponse {
  leagues: League[];
}

export interface SeasonResponse {
  seasons: Season[];
}
