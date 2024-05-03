import axios from 'axios';

export const fetchRandomNumbers = async (solutionLength: number): Promise<string> => {
  try {
    const response = await axios.get(
      `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return '';
  }
};
