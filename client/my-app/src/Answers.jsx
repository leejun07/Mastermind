import axios from 'axios';

export const Answer = () => {
  const handleButtonClick = async (solution) => {
    try {
      const response = await axios.post('http://localhost:8080/game/start', {
        difficultyLevel: difficultyLevel,
      });

      console.log(response.data); // Log the response data for debugging
      // Here you can handle the response as needed, e.g., update the UI
    } catch (error) {
      console.error('Error starting the game:', error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('Easy')}>Easy</button>
      <button onClick={() => handleButtonClick('Normal')}>Normal</button>
      <button onClick={() => handleButtonClick('Hard')}>Hard</button>
    </div>
  );
};
