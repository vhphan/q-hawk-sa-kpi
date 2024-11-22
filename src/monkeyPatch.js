// // monkeyPatch.js
//
// // Save the original addEventListener function
// const originalAddEventListener = EventTarget.prototype.addEventListener;
//
// // List of events that should not be passive
// const nonPassiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
//
// // Override the addEventListener function
// EventTarget.prototype.addEventListener = function (name, handler, opt = {}) {
//   const wrappedHandler = function(event) {
//     try {
//       handler(event);
//     } catch (e) {
//       if (e instanceof TypeError && e.message.includes('Unable to preventDefault')) {
//         console.error(`Event: ${name}, Target:`, event.target, e);
//       }
//       throw e; // Re-throw the error after logging
//     }
//   };
//
//   if (typeof opt === 'object' && opt !== null) {
//     if (nonPassiveEvents.includes(name)) {
//       opt.passive = false;
//     } else {
//       opt.passive = true;
//     }
//   } else {
//     opt = { passive: !nonPassiveEvents.includes(name) };
//   }
//   originalAddEventListener.call(this, name, wrappedHandler, opt);
// };
