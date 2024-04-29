export const validateGuess = (guess: string): void => {
  if (typeof guess !== 'string' || guess.length !== 4) {
    throw new Error('Guess must be a string of length 4');
  }

  for (let i = 0; i < guess.length; i++) {
    if (isNaN(Number(guess[i]))) {
      throw new Error('Guess must be all numbers');
    }
  }
};
