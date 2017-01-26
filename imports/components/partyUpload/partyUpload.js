import app from '../../../client/app';
import templateUrl from './partyUpload.html';
import { PartyUploadCtrl } from './partyUpload.controller';

const name = 'partyUpload';

// create a module
export default app.component(name, {
  templateUrl: templateUrl,
  controller: PartyUploadCtrl,
  controllerAs: name,
  bindings: {
    files: '=?'
  }
});