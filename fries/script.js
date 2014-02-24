// Menu Control functions
(function(window, document){
  var menu = document.getElementById( 'menu-right' ),
      menuButton = document.getElementById( 'main-menu-button' ),
      menuTimeout,
      menuToggle = function(diffX) {
        if ((diffX < 0) && classie.has(menu, 'menu-open')) {
          classie.remove( menu, 'menu-open' );
          if(menuButton){classie.remove( menuButton, 'menu-open' );}
        } else if((diffX > 0) && !classie.has(menu, 'menu-open')) {
          classie.add( menu, 'menu-open' );
          if(menuButton){classie.add( menuButton, 'menu-open' );}
        }
      },
      el = document.body,
      ongoingTouches = new Array;

  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);

  function handleStart(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;   
    for (var i=0; i < touches.length; i++) {
      ongoingTouches.push(copyTouch(touches[i]));
    }
  }
  function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches,
      idx, diffX, diffY;
    for (var i=0; i < touches.length; i++) {
      idx = ongoingTouchIndexById(touches[i].identifier);
      diffX = Math.abs(ongoingTouches[idx].pageX - touches[i].pageX);
      diffY = Math.abs(ongoingTouches[idx].pageY - touches[i].pageY);
      if( (idx >= 0) && (diffX >= diffY) && (diffX < 241) ) {
        if (classie.has(menu, 'menu-open')) {
          menu.style.right = ( -(diffX) ).toString() +'px';
        } else {
          menu.style.right = ( diffX - 240 ).toString() +'px';
        }
        // ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record if you want to wipe history
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
  }
  function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches,
      idx, diffX;
    for (var i=0; i < touches.length; i++) {
      idx = ongoingTouchIndexById(touches[i].identifier);
      if(idx >= 0) {
        diffX = ongoingTouches[idx].pageX - touches[i].pageX;
        menuToggle(diffX);
        menu.style.right = null;
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else {
        console.log("can't figure out which touch to end");
      }
    }
  }
  function handleCancel(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (var i=0; i < touches.length; i++) {
      ongoingTouches.splice(i, 1);  // remove it; we're done
    }
  }
  function copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
  }
  function ongoingTouchIndexById(idToFind) {
    for (var i=0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
      
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
  function makeToggleClickFxn() {
    return function() {
      menuToggle();
    };
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