import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http';
// import '../imports/api/tasks';
import '../imports/api/images';
import '../imports/api/wishes';

Meteor.startup(() => {
  // code to run on server at startup

  // Configure facebook app ID and Secret
  // Update will not work for first use
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "1222512077761975",
    secret: "d7e36e6c8a24d47b114c67f6531a8f1e"
  });

  // Allow to update user data
  Meteor.users.allow({
    insert: function (userId, doc) {
      return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      return true;
    }
  });

  Meteor.publish('wishes', function () {
    return Wishes.find({});
  });

  Meteor.publish('userData', function () {
    return Meteor.users.find({}, {fields: {profile: 1}});
  });


  // Create method for unlinking facebook
  Meteor.methods({
    'users.unlinkFacebook': function () {
      if (Meteor.userId()) {
        Meteor.users.update({
          _id: Meteor.userId()
        }, {
          $set: {
            'services.facebook': null,
            'profile.fbFriends': null,
            'profile.fbId': null
          }
        });
      }
    }
  });


  // Handle facebook registration
  Accounts.onCreateUser(function (options, user) {
    if (user.services && user.services.facebook) {
      // if login with facebook
      user.emails = [
        {
          address: user.services.facebook.email,
          verified: true
        }
      ];

      user.profile = {
        name: user.services.facebook.name,
        picture: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large'
      };


      // get facebook friends
      HTTP.get('https://graph.facebook.com/v2.8/' + user.services.facebook.id + '/friends', {
        headers: {
          Authorization: 'Bearer ' + user.services.facebook.accessToken
        }
      }, function (error, result) {
        if (error) {
          return;
        }

        // check if user already exists
        var existingUser = Accounts.findUserByEmail(user.services.facebook.email);

        var currentUser = user;

        result.data.data.forEach(function (item) {
          item.fbId = item.id;
          var user = Meteor.users.find({
            'services.facebook.id': item.fbId
          }).fetch()[0];

          if (user && user._id) {
            item.id = user._id;

            Meteor.users.update({
              _id: item.id
            }, {
              $push: {
                'profile.fbFriends': {
                  name: existingUser ? existingUser.profile.name : currentUser.profile.name,
                  id: existingUser ? existingUser._id : currentUser._id,
                  fbId: currentUser.services.facebook.id
                }
              }
            });

          } else {
            item.id = null;
          }
        });

        var fbFriendsCollection = result.data.data;

        HTTP.get('https://graph.facebook.com/v2.8/' + user.services.facebook.id + '?fields=birthday', {
          headers: {
            Authorization: 'Bearer ' + user.services.facebook.accessToken
          }
        }, function (error, result) {
          if (error) {
            return;
          }


          if (existingUser) {
            // add facebook service for existing user
            Meteor.users.update({
              _id: existingUser._id
            }, {
              $set: {
                'services.facebook': user.services.facebook,
                'profile.fbFriends': fbFriendsCollection,
                'profile.birthday': result.data.birthday,
                'profile.fbId': user.services.facebook.id,
                'profile.name': user.profile.name,
                'profile.picture': user.profile.picture
              }
            });

            // remove recently created user
            Meteor.users.remove({
              _id: currentUser._id
            });

          } else {
            // update data of recently created user
            Meteor.users.update({
              'services.facebook.id': user.services.facebook.id
            }, {
              $set: {
                'profile.fbFriends': fbFriendsCollection,
                'profile.birthday': result.data.birthday,
                'profile.fbId': user.services.facebook.id
              }
            });
          }
        });
        
      });
    } else if (user.services && user.services.password) {
      user.profile = options.profile;
    }

    return user;
  });
});
