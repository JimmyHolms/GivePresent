import app from '../../../client/app';
import templateUrl from './welcome.html';
import { WelcomeCtrl } from './welcome.controller';

const name = 'welcome';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: WelcomeCtrl,
  controllerAs: name
});