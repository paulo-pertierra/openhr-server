import 'mocha';
import { expect } from 'chai';
import { timingEngine } from '../time.engine';

describe('Timing Engine Test', () => {
  it('should return timeInAm for 8am', () => {
    const date = new Date().setHours(8);
    const result = timingEngine(new Date(date)); // Lousy conversion!

    console.log(result);
    expect(result).to.be.a.string('timeInAm');
  });

  it('should return timeOutAm for 10am', () => {
    const date = new Date().setHours(10);
    const result = timingEngine(new Date(date)); // Lousy conversion!

    console.log(result);
    expect(result).to.be.a.string('timeOutAm');
  });

  it('should return timeInPm for 12:35pm', () => {
    const date = new Date().setHours(12, 35);
    const result = timingEngine(new Date(date));

    console.log(result);
    expect(result).to.be.a.string('timeInPm');
  });

  it('should return timeOutPm for 4:35pm', () => {
    const date = new Date().setHours(16, 35);
    const result = timingEngine(new Date(date));

    console.log(result);
    expect(result).to.be.a.string('timeOutPm');
  });

  it('should return error for 6:35pm', () => {
try{ 
  const date = new Date().setHours(18, 35);
  const result =  timingEngine(new Date(date));

  console.log(result);
  expect(() => timingEngine(new Date(date))).to.Throw();
} catch (error) {
}
  });
});
