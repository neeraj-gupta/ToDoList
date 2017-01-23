import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import Components from './components/components';
import AppComponent from './app.component';

import 'normalize.css';
import 'common/stylesheets/common.scss';
import 'angular-material/angular-material.scss';

angular
    .module('app', [
        uiRouter,
        angularMaterial,
        angularAnimate,
        Components
    ])
    .config(($locationProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider) => {
        'ngInject';

        $httpProvider.useApplyAsync(true);

        var theme = $mdThemingProvider.extendPalette('blue', {
            'default': '416fa7'
        });

        $mdThemingProvider.definePalette('theme', theme);

        $mdThemingProvider.theme('default').primaryPalette('theme').accentPalette('blue');

        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');
    })
    .component('app', AppComponent);
