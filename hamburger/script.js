// Menu Control functions
(function(window, document){
  var menu = document.getElementById( 'menu-right' ),
      menuTogglers = document.getElementsByClassName( 'menu-toggle-button' ),
      menuButton = document.getElementById( 'main-menu-button' ),
      menuTimeout,
      menuToggle = function() {
        for(i=0;i<menuTogglers.length;i++){
          classie.toggle( menuTogglers[i], 'active' );
        }
        classie.toggle( menu, 'menu-open' );
        if(menuButton){classie.toggle( menuButton, 'menu-open' );}
      };
  if(menuButton){
    menu.onmouseout = function () {
      menuTimeout = window.setTimeout(menuToggle, 500);
    };
    menu.onmouseover = function(){
      window.clearTimeout(menuTimeout);
    };
    menuButton.onclick = function(){
      menuToggle();
    };
  }
  function makeToggleClickFxn() {
    return function() {
      menuToggle();
    };
  }
  for(i=0;i<menuTogglers.length;i++){
    menuTogglers[i].onclick = makeToggleClickFxn();
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