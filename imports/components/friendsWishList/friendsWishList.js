import app from '../../../client/app';
import templateUrl from './friendsWishList.html';
import { FriendsWishListCtrl } from './friendsWishList.controller';

const name = 'friendsWishList';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: FriendsWishListCtrl,
  controllerAs: name
});