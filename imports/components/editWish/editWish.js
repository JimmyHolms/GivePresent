import app from '../../../client/app';
import templateUrl from './editWish.html';
import { EditWishCtrl } from './editWish.controller';

const name = 'editWish';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: EditWishCtrl,
  controllerAs: name
});