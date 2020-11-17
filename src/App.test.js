import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ApiService from './services/api';
import { act } from 'react-dom/test-utils';
import dbJson from '../db.json';

describe('App', () => {
  let getSpy = jest.fn();

  beforeEach(() => {
    getSpy = jest.spyOn(ApiService.prototype, 'get').mockReturnValue(dbJson.movie);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Movie heading', async () => {
    await act(async () => {
      render(<App />);
      const movieHeadingElement = screen.getByText('Movies');
      expect(movieHeadingElement).toBeInTheDocument();
    })
  });

  test('should display loading spinner on init', async () => {
    await act(async() => {
      render(<App />);
      const loadingSpinner = screen.getByRole('progressbar');
      expect(loadingSpinner).toBeInTheDocument();
    });
  })

  test('should test loading spinner disappearance', async () => {
    await act(async() => {
      render(<App/>);

      const loadingSpinner = screen.getByRole('progressbar');

      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      });
    });
  })

  test('should make a call to the api get method', async () => {
    await act(async () => {
      render(<App/>);

      const loadingSpinner = screen.getByRole('progressbar');

      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      });

      expect(getSpy).toHaveBeenCalledWith(['movie']);
    });
  });
});
