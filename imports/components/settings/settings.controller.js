import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export class SettingsCtrl {
  static get $inject () {
    return ['$scope', '$reactive', '$state'];
  }
  
  constructor($scope, $reactive, $state) {
    this.$state = $state;
    
    $reactive(this).attach($scope);

    this.subscribe('users');

    this.userRegistered = !!Meteor.userId();

    this.fbConnected = !!Meteor.user().profile.fbId;

    this.autorun(this.$bindToContext(() => {
      this.fbConnected = !!Meteor.user().profile.fbId;
    }));
  }

  singOut() {
    Accounts.logout(this.$bindToContext(() => {
      this.$state.go('sign-in');
    }));
  }

  connectToFacebook() {
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

  unlinkFacebook() {
    if (!Meteor.status().connected) {
      return;
    }

    Meteor.call('users.unlinkFacebook', {}, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }
}