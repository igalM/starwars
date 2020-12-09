import { Api } from "../utils/axios";
import { ApiResponse, IMovieSet } from "../types";

class MoviesApi extends Api {

    public async getMovies(): Promise<IMovieSet> {
        const response = await this.get<ApiResponse>('/films');
        return this.transformResponse(response.data.results);
    }

    public transformResponse(data: IMovieSet): IMovieSet {
        const transformedMovies: IMovieSet = {};
        for (const key of Object.keys(data)) {
            data[key].isFavorite = false;
            transformedMovies[data[key].episode_id] = data[key];
        }
        return transformedMovies;
    }

}

export const moviesApi = new MoviesApi();