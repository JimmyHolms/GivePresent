import app from '../../../client/app';
import templateUrl from './networkWatcher.html';
import { NetworkWatcherCtrl } from './networkWatcher.controller';

const name = 'networkWatcher';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: NetworkWatcherCtrl,
  controllerAs: name
});