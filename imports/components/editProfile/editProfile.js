import app from '../../../client/app';
import templateUrl from './editProfile.html';
import { EditProfileCtrl } from './editProfile.controller';

const name = 'editProfile';

export default app.component(name, {
  templateUrl: templateUrl,
  controller: EditProfileCtrl,
  controllerAs: name
});