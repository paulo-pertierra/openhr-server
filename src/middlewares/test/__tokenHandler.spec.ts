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

  it('should generate a user token.', () => {
    const jwt = tokenHandler.generateUserToken(userId);
    console.log(jwt);
    expect(jwt).to.be.a('string');
  });
  it('should throw a TokenExpiredError for expired tokens.', () => {
    expect(() =>
      tokenHandler.validateAdminToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJ1c2VySWQiOiJ0aGlzSXNhVGVzdFN0cmluZyIsImlhd' +
          'CI6MTY4NzI1MTA4NywiZXhwIjoxNjg3MjU0Njg3fQ' +
          '.HkHrjYdLm2d1GtKAzNcHiFtMujv-uasfOC42PIWWzfE'
      )
    ).to.Throw();
  });

  it('should throw a JsonWebTokenError if admin token is wrong.', () => {
    expect(() => tokenHandler.validateAdminToken('')).to.Throw(JsonWebTokenError);
  });

  it('should validate user or admin token.', () => {
    console.log(
      tokenHandler.validateAllToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0aGlzSXNhVGVzdFN0cmluZyIsImlhdCI6MTY4NzMxMzQ5OSwiZXhwIjoxNjg3MzU2Njk5fQ.wV2ojy1THCO08lNEH2DA3lKxQ2eQogBXGRaR21rM1t0'
      )
    );
    expect(
      tokenHandler.validateAllToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0aGlzSXNhVGVzdFN0cmluZyIsImlhdCI6MTY4NzMxMzY0NCwiZXhwIjoxNjg3MzE3MjQ0fQ.3QtPMoazNpSR4-jbJRRR6Clwpr2A4aiUX5SwYOtdq8E'
      )
    ).to.be.a('object');
  });
});
