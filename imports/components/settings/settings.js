import app from '../../../client/app';
import templateUrl from './settings.html';
import { SettingsCtrl } from './settings.controller';

const name = 'settings';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: SettingsCtrl,
  controllerAs: name
});