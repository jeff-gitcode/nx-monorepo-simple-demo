import fetchMock from 'jest-fetch-mock';
import 'reflect-metadata';
import { FetchService } from './fetch.service';

fetchMock.enableMocks();

describe('fetch service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should return users when get user', async () => {
    const mockResposne = { data: '12345' };
    const fetchService = new FetchService();

    const url = 'http://localhost';

    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const result = await fetchService.get(url);
    expect(result).toStrictEqual(mockResposne);
  });

  test('should return users when post user', async () => {
    const mockResposne = { data: '12345' };
    const fetchService = new FetchService();

    const url = 'http://localhost';

    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const result = await fetchService.post(url, 'fetch test');
    expect(result).toStrictEqual(mockResposne);
  });

  test('should return users when put user', async () => {
    const mockResposne = { data: '12345' };
    const fetchService = new FetchService();

    const url = 'http://localhost';

    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const result = await fetchService.put(url, 'fetch test');
    expect(result).toStrictEqual(mockResposne);
  });

  test('should return users when delete user', async () => {
    const mockResposne = { data: '12345' };
    const fetchService = new FetchService();

    const url = 'http://localhost';

    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const result = await fetchService._delete(url);
    expect(result).toStrictEqual(mockResposne);
  });
});
