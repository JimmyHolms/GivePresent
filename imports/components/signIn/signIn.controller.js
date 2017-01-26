import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export class SignInCtrl {
  static get $inject () {
    return ['$scope', '$reactive', '$state'];
  }
  
  constructor($scope, $reactive, $state) {
    this.$state = $state;
 
    $reactive(this).attach($scope);
 
    this.credentials = {
      email: null,
      password: null
    };

    this.error = null;

    this.form = {};
    
    if (Meteor.userId()) {
      $state.go('wishes-dashboard');
    } else {
      Accounts.onLogin(function () {
        $state.go('wishes-dashboard');
      });
    }
  }

  signIn() {
    if (!Meteor.status().connected) {
      return;
    }

    Meteor.loginWithPassword(this.credentials.email, this.credentials.password, this.$bindToContext((err) => {
      if (err) {
        // error
        this.error = err;
      }
    }));
  }

  signInWithFacebook() {
    if (!Meteor.status().connected) {
      return;
    }
    
    Meteor.loginWithFacebook({
      loginStyle: 'redirect',
      requestPermissions: ['user_friends', 'public_profile', 'email', 'user_birthday']
    });
  }
}