import app from '../../../client/app';
import templateUrl from './wishList.html';
import { WishListCtrl } from './wishList.controller';

const name = 'wishList';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: WishListCtrl,
  controllerAs: name
});