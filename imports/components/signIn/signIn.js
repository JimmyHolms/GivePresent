import app from '../../../client/app';
import templateUrl from './signIn.html';
import { SignInCtrl } from './signIn.controller';

const name = 'signIn';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: SignInCtrl,
  controllerAs: name
});