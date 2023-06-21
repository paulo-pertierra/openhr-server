import 'mocha';
import { expect } from 'chai';

import * as tokenHandler from '../tokenHandler';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const userId = 'thisIsaTestString';
var jwt: string;

describe('Token Handler', () => {
  it('should generate a web token for the admin.', () => {
    const jwt = tokenHandler.generateAdminToken(userId);
    console.log(jwt);
    expect(jwt).to.be.a('string');
  });

  // it('should throw a TokenExpiredError for expired tokens.', () => {
  //   expect(() =>
  //     tokenHandler.validateAdminToken(
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  //         'eyJ1c2VySWQiOiJ0aGlzSXNhVGVzdFN0cmluZyIsImlhd' +
  //         'CI6MTY4NzI1MTA4NywiZXhwIjoxNjg3MjU0Njg3fQ' +
  //         '.HkHrjYdLm2d1GtKAzNcHiFtMujv-uasfOC42PIWWzfE'
  //     )
  //   ).to.Throw(TokenExpiredError);
  // });

  it('should throw a JsonWebTokenError if admin token is wrong.', () => {
    expect(() => tokenHandler.validateAdminToken('')).to.Throw(JsonWebTokenError);
  });
});
