import { Response } from 'express';
import { validationService } from '../../services/ValidationService';

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
    it('should return 400 if user is out of guesses', () => {
      const res = mockResponse();
      validationService.validateGuess('1234', 'Easy', 0, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        log: 'User out of guesses',
        status: 400,
        message: { err: 'User out of guesses' },
      });
    });

    it('returns 400 status and error message for user out of guesses', () => {
      const res = mockResponse();
      validationService.validateGuess('12345', 'Easy', 1, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        log: 'Invalid submitted guess',
        status: 400,
        message: { err: 'Invalid submitted guess' },
      });
    });

    it('should not return a response if guess is valid', () => {
      const res = mockResponse();
      validationService.validateGuess('123', 'Easy', 1, res);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
