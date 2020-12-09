export interface IMovie {
    title: string;
    episode_id: number;
    opening_crawl: string;
    release_date: Date;
    characters: string[];
    planets: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    isFavorite: boolean;
}

export interface IMovieSet {
    [key: string]: IMovie;
}

export interface IFavoriteMoviesIdsSet {
    [key: string]: string;
}

export interface ApiResponse {
    results: IMovieSet;
};