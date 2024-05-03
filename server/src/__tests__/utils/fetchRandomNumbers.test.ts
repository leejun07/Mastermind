import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchRandomNumbers } from '../../utils/fetchRandomNumbers';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('fetchRandomNumbers', () => {
  it('fetches random numbers successfully on easy difficulty', async () => {
    const mockedResponse = '1\n2\n3\n';
    axiosMock.get.mockResolvedValue({ data: mockedResponse });

    const solutionLength = 3;
    const result = await fetchRandomNumbers(solutionLength);

    const expectedUrl = expect.stringContaining(
      `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );

    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedResponse);
  });

  it('fetches random numbers successfully on normal difficulty', async () => {
    const mockedResponse = '1\n2\n3\n4\n';
    axiosMock.get.mockResolvedValue({ data: mockedResponse });

    const solutionLength = 4;
    const result = await fetchRandomNumbers(solutionLength);

    const expectedUrl = expect.stringContaining(
      `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );

    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedResponse);
  });

  it('fetches random numbers successfully on easy difficulty', async () => {
    const mockedResponse = '1\n2\n3\n4\n5\n';
    axiosMock.get.mockResolvedValue({ data: mockedResponse });

    const solutionLength = 5;
    const result = await fetchRandomNumbers(solutionLength);

    const expectedUrl = expect.stringContaining(
      `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );

    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedResponse);
  });
});
