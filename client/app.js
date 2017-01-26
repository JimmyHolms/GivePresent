import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';
import 'angular-sortable-view';
import ngTouch from 'angular-touch';

export default angular.module('wishingvine', [
  angularMeteor,
  uiRouter,
  'accounts.ui',
  ngFileUpload,
  'ngImgCrop',
  'angular-sortable-view',
  ngTouch
]);
