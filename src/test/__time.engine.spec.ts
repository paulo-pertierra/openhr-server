import 'mocha';
import { expect } from 'chai';

import { timingEngine } from '../modules/time/time.engine';

// AM
// 7:00 - 9:00 Time In window
// 9:01 - 12:15 Time Out window

// PM
//12:30 - 1:30 Time In Window
//1:31 - 5:00 Time Out Window

// Hehe, my first tests. Baby steps to become a full-stack senior web dev.
// Tests

describe('Timing Engine Test', () => {
  it('should return timeInAm for 8am', () => {
    const date = new Date().setHours(8);
    const result = timingEngine(new Date(date)); // Lousy conversion!

    console.log(result);
    expect(result).to.have.nested.property('data.timeInAm');
  });

  it('should return timeOutAm for 10am', () => {
    const date = new Date().setHours(10);
    const result = timingEngine(new Date(date)); // Lousy conversion!

    console.log(result);
    expect(result).to.have.nested.property('data.timeOutAm');
  });

  it('should return timeInPm for 12:35pm', () => {
    const date = new Date().setHours(12, 35);
    const result = timingEngine(new Date(date));

    console.log(result);
    expect(result).to.have.nested.property('data.timeInPm');
  });

  it('should return timeOutPm for 4:35pm', () => {
    const date = new Date().setHours(16, 35);
    const result = timingEngine(new Date(date));

    console.log(result);
    expect(result).to.have.nested.property('data.timeOutPm');
  });

  it('should return errror for 6:35pm', () => {
    const date = new Date().setHours(18, 35);
    const result = timingEngine(new Date(date));

    console.log(result);
    expect(result).to.have.nested.property('error');
  });
});
