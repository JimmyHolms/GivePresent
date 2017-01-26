import app from './app';
import routes from './routes';

app.config(routes);

function onReady() {
  angular.bootstrap(document, ['wishingvine'], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}