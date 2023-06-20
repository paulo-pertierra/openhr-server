import 'mocha';
import { expect } from 'chai';

import * as tokenHandler from '../tokenHandler';

describe('Token Handler', () => {
  it('should generate a web token for the user.', () => {
    const result = tokenHandler.generateToken('helu');
    console.log(result);
    expect(result).to.be.a('string');
  });
});
