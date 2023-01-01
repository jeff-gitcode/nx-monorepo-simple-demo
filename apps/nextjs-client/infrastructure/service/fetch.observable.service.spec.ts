import fetchMock from 'jest-fetch-mock';
import 'reflect-metadata';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  FetchObservableService,
  getAuthorizationHeader,
} from './fetch.observable.service';

fetchMock.enableMocks();

describe('FetchObservableService', () => {
  const url = 'http://example.com/api/endpoint';
  let service: FetchObservableService;
  const mockResposne = {
    status: 200,
    body: {
      message: 'Mock response returned',
    },
  };

  beforeEach(() => {
    service = new FetchObservableService();
  });

  it('should make a POST request and return the response', (done) => {
    const body = {
      key: 'value',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    service.post(url, body).subscribe((res) => {
      expect(res).toEqual(mockResposne);
      done();
    });
  });

  it('should throw an error if the POST request fails', (done) => {
    const body = {
      key: 'value',
    };
    fetchMock.mockReject(new Error('Failed to fetch'));

    service.post(url, body).subscribe(
      () => {},
      (error) => {
        expect(error).toBeDefined();
        done();
      }
    );
  });

  it('should make a GET request and return the response', () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const result = service.get(url);

    result
      .pipe(
        switchMap((response) => {
          expect(response).toEqual(mockResposne);
          expect(fetchMock).toHaveBeenCalledWith(url);
          return of();
        })
      )
      .subscribe();
  });

  it('should make a PUT request and return response', () => {
    const body = { foo: 'bar' };
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(),
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const service = new FetchObservableService();
    service.put(url, body).subscribe();

    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });
  });

  it('should make a DELETE request and return response', () => {
    const headers = {
      ...getAuthorizationHeader(),
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResposne));

    const service = new FetchObservableService();
    service._delete(url).subscribe();

    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers,
    });
  });
});
