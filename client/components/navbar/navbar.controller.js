'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
    },
    {
    'title': 'MQTT',
    'state': 'mqtt'
    },
    {
    'title': 'Add Device',
    'state': 'device'
    },
    {
    'title': 'Add Task',
    'state': 'task'
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

}

angular.module('webdemoApp')
  .controller('NavbarController', NavbarController);
