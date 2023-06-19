import 'mocha';
import { expect } from 'chai';
import { eventFieldIsValid } from '../event.validation';

describe('Validation for event fields using eventFieldIsValid()', () => {
  it('should return true if field from the schema exists.', () => {
    const data = 'title';
    console.log(data);
    expect(eventFieldIsValid(data)).to.equal(true);
  });
  it('should return false if field from the schema does not exist.', () => {
    const data = 'asdf';
    console.log(data);
    expect(eventFieldIsValid(data)).to.equal(false);
  });
});
