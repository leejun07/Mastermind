import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchRandomNumbers } from '../../utils/fetchRandomNumbers';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

const testFetchRandomNumbers = async (mockedResponse: string, solutionLength: number) => {
  axiosMock.get.mockResolvedValue({ data: mockedResponse });
  const result = await fetchRandomNumbers(solutionLength);

  const expectedUrl = expect.stringContaining(
    `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
  );

  expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
  expect(result).toEqual(mockedResponse);
};

describe('fetchRandomNumbers', () => {
  it('fetches random numbers successfully on easy difficulty', async () => {
    await testFetchRandomNumbers('1\n2\n3\n', 3);
  });

  it('fetches random numbers successfully on normal difficulty', async () => {
    await testFetchRandomNumbers('1\n2\n3\n4\n', 4);
  });

  it('fetches random numbers successfully on hard difficulty', async () => {
    await testFetchRandomNumbers('1\n2\n3\n4\n5\n', 5);
  });
});
