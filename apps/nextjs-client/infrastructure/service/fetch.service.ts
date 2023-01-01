import { injectable } from 'inversify';

export abstract class IFetchService {
  abstract get(url: string): Promise<any>;
  abstract post(url: string, body?: any): Promise<any>;
  abstract put(url: string, body?: any): Promise<any>;
  abstract _delete(url: string): Promise<any>;
}

@injectable()
export class FetchService implements IFetchService {
  async get(url: string): Promise<any> {
    const requestOptions = {
      method: 'GET',
      // cache: 'no-cache',
    };
    const response = await fetch(url, requestOptions);
    return await handleResponse(response);
  }

  async post(url: string, body: any = {}): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return await handleResponse(response);
  }

  async put(url: string, body: any = {}): Promise<any> {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);

    return await handleResponse(response);
  }

  async _delete(url: string): Promise<any> {
    const requestOptions = {
      method: 'DELETE',
    };
    const response = await fetch(url, requestOptions);

    return await handleResponse(response);
  }
}

async function handleResponse(response: any) {
  const data = await response.json();
  // const text = await response.text();
  // const data = text && JSON.parse(text);

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
