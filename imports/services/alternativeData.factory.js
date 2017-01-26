import app from '../../client/app';
import { Wishes } from '../api/wishes';

export default app.service('alternativeData', [function () {
  if (!localStorage) {
    console.log('Local storage not supported!');

    return {};
  }

  const owner = 'unauthorized';

  var wishes = localStorage.getItem('wishes') ? JSON.parse(localStorage.getItem('wishes')) : [];
  
  var svc = {
    addWish: (wish) => {
      let wishes = svc.getWishes();
      
      let wishObj = {
        _id: (new Date()).getTime(),
        name: wish,
        owner: owner,
        createdAt: new Date
      };

      wishes.push(wishObj);

      localStorage.setItem('wishes', JSON.stringify(wishes));

      return wishObj;
    },

    getWishes: () => {
      return wishes;
    },

    removeWish: (wishId) => {
      for (var i = 0; i < wishes.length; i ++) {
        if (wishes[i]._id == wishId) {
          wishes.splice(i, 1);
          localStorage.setItem('wishes', JSON.stringify(wishes));
          return;
        }
      }
    },

    findWish: (wishId) => {
      for (var i = 0; i < wishes.length; i ++) {
        if (wishes[i]._id == wishId) {
          return wishes[i];
        }
      }
    },

    editWish: (wishId, name) => {
      var wish = svc.findWish(wishId).name = name;
      localStorage.setItem('wishes', JSON.stringify(wishes));
    }
  };

  return svc;
}]);