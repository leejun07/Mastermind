import axios from 'axios';

/**
 * Fetches a random sequence of numbers from a specified API endpoint.
 * Input: solutionLength - The length of the random sequence to fetch.
 * Output: A Promise resolving to the fetched random number sequence.
 */
export const fetchRandomNumbers = async (solutionLength: number): Promise<string> => {
  try {
    // Make a GET request to the random.org API to fetch random numbers
    const response = await axios.get(
      `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return '';
  }
};
