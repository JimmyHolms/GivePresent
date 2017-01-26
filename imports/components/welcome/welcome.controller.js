import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export class WelcomeCtrl {
  static get $inject () {
    return ['$scope', '$reactive', '$state'];
  }

  constructor($scope, $reactive, $state) {
    $scope.viewModel(this);
    
    $reactive(this).attach($scope);

    Accounts.onLogin(function () {
      $state.go('wishes-dashboard');
    });
  }

  signInWithFacebook() {
    if (!Meteor.status().connected) {
      return;
    }
    
    Meteor.loginWithFacebook({
      loginStyle: 'redirect',
      requestPermissions: ['user_friends', 'public_profile', 'email', 'user_birthday']
    }, function (err) {
      if (err) {
        throw new Meteor.Error('Facebook login failed');
      }
    });
  }
}