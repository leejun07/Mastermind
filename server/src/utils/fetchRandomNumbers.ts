export const fetchRandomNumbers = async (solutionLength: number) => {
  try {
    const response = await fetch(
      `https://www.random.org/integers/?num=${solutionLength}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );
    const processedResponse = await response.text();
    return processedResponse;
  } catch (error) {
    console.log(error);
  }
};
