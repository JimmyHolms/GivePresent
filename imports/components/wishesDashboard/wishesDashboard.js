import app from '../../../client/app';
import templateUrl from './wishesDashboard.html';
import { WishesDashboardCtrl } from './wishesDashboard.controller';

const name = 'wishesDashboard';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: WishesDashboardCtrl,
  controllerAs: name
});