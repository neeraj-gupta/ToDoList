import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= camelCaseName %>Component from './<%= name %>.component';

let <%= camelCaseName %>Module = angular.module('<%= camelCaseName %>', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('<%= camelCaseName %>', {
    url : '/changethisurl/<%= name %>',
    template : '<<%= tagName %>></<%= tagName %>>',
    authenticated : false
  });
})
.component('<%= camelCaseName %>', <%= camelCaseName %>Component);

export default <%= camelCaseName %>Module.name;
