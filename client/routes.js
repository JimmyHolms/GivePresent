import { Meteor } from 'meteor/meteor';

// import '../imports/components/todoList/todoList';
import '../imports/components/welcome/welcome';
import '../imports/components/signUp/signUp';
import '../imports/components/signIn/signIn';
import '../imports/components/wishList/wishList';
import '../imports/components/addWish/addWish';
import '../imports/components/editWish/editWish';
import '../imports/components/settings/settings';
import '../imports/components/editProfile/editProfile';
import '../imports/components/changePassword/changePassword';
import '../imports/components/privacyPolicy/privacyPolicy';
import '../imports/components/terms/terms';
import '../imports/components/wishesDashboard/wishesDashboard';
import '../imports/components/friendsWishList/friendsWishList';

import '../imports/components/networkWatcher/networkWatcher';

import '../imports/directives/swipeEffect.directive';
import '../imports/services/alternativeData.factory';


export default ['$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(false);

  $stateProvider
    // .state('todo', {
    //   url: '/todo',
    //   template: '<todo-list></todo-list>'
    // })
    .state('welcome', {
      url: '/welcome',
      template: '<welcome></welcome>'
    })
    .state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>'
    })
    .state('sign-in', {
      url: '/sign-in',
      template: '<sign-in></sign-in>'
    })
    .state('wish-list', {
      url: '/wish-list',
      template: '<wish-list></wish-list>'
    })
    .state('add-wish', {
      url: '/add-wish',
      template: '<add-wish></add-wish>'
    })
    .state('edit-wish', {
      url: '/edit-wish/:id',
      template: '<edit-wish></edit-wish>'
    })
    .state('settings', {
      url: '/settings',
      template: '<settings></settings>'
    })
    .state('edit-profile', {
      url: '/edit-profile',
      template: '<edit-profile></edit-profile>'
    })
    .state('change-password', {
      url: '/change-password',
      template: '<change-password></change-password>'
    })
    .state('privacy-policy', {
      url: '/privacy-policy',
      template: '<privacy-policy></privacy-policy>'
    })
    .state('terms', {
      url: '/terms',
      template: '<terms></terms>'
    })
    .state('wishes-dashboard', {
      url: '/wishes-dashboard',
      template: '<wishes-dashboard></wishes-dashboard>'
    })
    .state('friends-wish-list', {
      url: '/friends-wish-list/:userId',
      template: '<friends-wish-list></friends-wish-list>'
    });

  var defaultPage = Meteor.userId() ? '/wishes-dashboard' : '/welcome'; 
  $urlRouterProvider.otherwise(defaultPage);
}];
