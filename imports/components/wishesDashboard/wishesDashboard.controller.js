import { Meteor } from 'meteor/meteor';
import { Wishes } from '../../api/wishes';

export class WishesDashboardCtrl {
  static get $inject () {
    return ['$scope', '$state', '$reactive', '$http'];
  }

  constructor($scope, $state, $reactive, $http) {
    $reactive(this).attach($scope);

    this.$http = $http;
    
    this.subscribe('wishes');
    this.subscribe('userData');

    if (Meteor.userId()) {
      this.helpers({
        currentUser() {
          return Meteor.user();
        },
        wishesCount() {
          return Wishes.find({
            owner: Meteor.userId()
          }).count();
        }
      });
    }
  }

  getFriendProfile(id) {
    var p = Meteor.users.find({
      '_id': id
    }).fetch()[0];

    return p ? p.profile : null;
  }

  getFriendsWishes(id) {
    return Wishes.find({
      owner: id,
      received: false
    }).count();
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
}