import app from '../../../client/app';
import templateUrl from './signUp.html';
import { SignUpCtrl } from './signUp.controller';

const name = 'signUp';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: SignUpCtrl,
  controllerAs: name
});