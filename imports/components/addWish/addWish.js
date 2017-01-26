import app from '../../../client/app';
import templateUrl from './addWish.html';
import { AddWishCtrl } from './addWish.controller';

const name = 'addWish';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: AddWishCtrl,
  controllerAs: name
});