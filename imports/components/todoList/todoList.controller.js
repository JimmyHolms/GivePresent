import { Tasks } from '../../api/tasks';
import { Meteor } from 'meteor/meteor';

export class TodoListCtrl {
  static get $inject () {
    return ['$scope'];
  }

  constructor($scope) {
    $scope.viewModel(this);
 
    this.helpers({
      tasks() {
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      },
      currentUser() {
        return Meteor.user();
      }
    });
  }

  addTask(newTask) {
    // Insert a task into the collection
    Tasks.insert({
      text: newTask,
      createdAt: new Date,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
 
    // Clear form
    this.newTask = '';
  }

  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      }
    });
  }

  removeTask(task) {
    Tasks.remove(task._id);
  }
}