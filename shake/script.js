// Menu Control functions
(function(window, document){
  var menu = document.getElementById( 'menu-right' ),
      menuButton = document.getElementById( 'main-menu-button' ),
      menuToggle = function(bool) {
        if (bool) {
          classie.add( menu, 'menu-open' );
          if(menuButton){classie.add( menuButton, 'menu-open' );}
        } else {
          classie.remove( menu, 'menu-open' );
          if(menuButton){classie.remove( menuButton, 'menu-open' );}
        }
      };
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  } else {
    document.getElementById('title').textContent += ' | Sorry, your device does not support the device motion API.';
  }
  function deviceMotionHandler (evt) {
    var acceleration = evt.acceleration;
    if (acceleration.x < -2) {
      menuToggle(true);
    } else if (acceleration.x > 2) {
      menuToggle(false);
    }
  }
})(this, this.document);

// Classie helper function
( function( window ) {

  'use strict';

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }

  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }

  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( classie );
  } else {
    // browser global
    window.classie = classie;
  }

})( window );