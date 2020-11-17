import ApiService from './api';
import environment from '../environment/environment';
import dbJson from '../../db.json';

describe('ApiService', () => {
  describe('ApiService.get', () => {
    let fetchSpy = jest.fn();
    let apiService = null;

    beforeEach(() => {
      const fakeResponse = dbJson;

      fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(fakeResponse.movie)
      })

      apiService = new ApiService(environment.apiUrl);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    })

    it('should make a call to fetch with the correct props', () => {
      apiService.get(['movie']);

      expect(fetchSpy).toHaveBeenCalledWith(`${environment.apiUrl}/movie`);
    })

    it('should return the correct response', async () => {
      const result = await apiService.get(['movie']);

      expect(result).toEqual(dbJson.movie);
    })
  })
})