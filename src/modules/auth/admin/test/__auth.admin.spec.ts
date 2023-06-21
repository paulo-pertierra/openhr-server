// import 'mocha';
// import { expect } from 'chai';
// import * as authAdminService from '../auth.admin.service';
// import { AuthError } from '../../auth.errors';

// describe('Admin Authentication', () => {
//   it('should successfully login with admin details and a jwt', async () => {
//     expect(await authAdminService.loginAdmin('admin.paulo.pertierra', '5ba621x4d')).has.ownProperty(
//       'uuid'
//     );
//   });

//   it('should throw an error if user already exists.', async () => {
//     expect(
//       await authAdminService.registerAdmin({
//         username: 'admin.paulo.pertierra',
//         password: '5ba621x4d',
//         lastName: 'Pertierra',
//         firstName: 'Paulo Roman',
//         middleName: 'Hilomen',
//         email: 'paulopertierra@gmail.com'
//       })
//     ).to.throw(AuthError);
//   });
// });
