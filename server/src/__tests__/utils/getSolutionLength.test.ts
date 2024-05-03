import { getSolutionLength } from '../../utils/getSolutionLength';

describe('getSolutionLength', () => {
  it('returns the correct solution length for Easy difficulty', () => {
    const result = getSolutionLength('Easy');
    expect(result).toBe(3);
  });

  it('returns the correct solution length for Normal difficulty', () => {
    const result = getSolutionLength('Normal');
    expect(result).toBe(4);
  });

  it('returns the correct solution length for Hard difficulty', () => {
    const result = getSolutionLength('Hard');
    expect(result).toBe(5);
  });

  it('returns undefined for an invalid difficulty level', () => {
    const result = getSolutionLength('Invalid');
    expect(result).toBeUndefined();
  });
});
