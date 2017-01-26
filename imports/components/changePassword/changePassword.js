import app from '../../../client/app';
import templateUrl from './changePassword.html';
import { ChangePasswordCtrl } from './changePassword.controller';

const name = 'changePassword';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: ChangePasswordCtrl,
  controllerAs: name
});