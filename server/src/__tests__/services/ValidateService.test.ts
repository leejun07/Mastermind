import { Response } from 'express';
import { validationService } from '../../services/validationService';

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ValidationService', () => {
  describe('validateStartRequest', () => {
    it('should return 400 if difficulty level is invalid', () => {
      const res = mockResponse();
      validationService.validateStartRequest('InvalidLevel', res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        log: 'Invalid difficulty level',
        status: 400,
        message: { err: 'Invalid difficulty level' },
      });
    });

    it('should not return a response if difficulty level is valid', () => {
      const res = mockResponse();
      validationService.validateStartRequest('Easy', res);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('validateGuess', () => {
    it('should return 400 if game is over', () => {
      const res = mockResponse();
      validationService.validateGuess('123', 'Easy', true, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        log: 'Game is over. Please start a new game by selecting difficulty level',
        status: 400,
        message: { err: 'Game is over. Please start a new game by selecting difficulty level' },
      });
    });
    it('should not return a response if game is not over', () => {
      const res = mockResponse();
      validationService.validateGuess('123', 'Easy', false, res);
      expect(res.json).not.toHaveBeenCalled();
    });
    it('should return 400 if invalid user input length', () => {
      const res = mockResponse();
      validationService.validateGuess('1234', 'Easy', false, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        log: `Your guess must be 3 characters long.`,
        status: 400,
        message: {
          err: `Your guess must be 3 characters long.`,
        },
      });
    });
    it('should not return a response if valid user input length', () => {
      const res = mockResponse();
      validationService.validateGuess('123', 'Easy', false, res);
      expect(res.json).not.toHaveBeenCalled();
    });
    it('should return 400 if user input contains any numbers greater than 7', () => {
      const res = mockResponse();
      validationService.validateGuess('12892', 'Hard', false, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        log: 'Your guess must not include numbers greater than 7',
        status: 400,
        message: { err: 'Your guess must not include numbers greater than 7' },
      });
    });
    it('should not return a response if user input does not contain any numbers greater than 7', () => {
      const res = mockResponse();
      validationService.validateGuess('12451', 'Hard', false, res);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
