// Drive the pointer without clicking where a hover has to be shown.
//   osascript -l JavaScript mouse.js move X Y
//   osascript -l JavaScript mouse.js click X Y [COUNT]
//   osascript -l JavaScript mouse.js drag X1 Y1 X2 Y2
//   osascript -l JavaScript mouse.js glide X1 Y1 X2 Y2 [STEPS]
ObjC.import("CoreGraphics");

const tap = $.kCGHIDEventTap;
// Without a source, WebKit takes the clicks but never starts a text selection.
const source = $.CGEventSourceCreate($.kCGEventSourceStateHIDSystemState);

function post(type, x, y, clicks) {
  const event = $.CGEventCreateMouseEvent(source, type, $.CGPointMake(x, y), $.kCGMouseButtonLeft);
  if (clicks) $.CGEventSetIntegerValueField(event, $.kCGMouseEventClickState, clicks);
  $.CGEventPost(tap, event);
}

function pause(seconds) {
  delay(seconds);
}

function run(argv) {
  const [command, ...rest] = argv;
  const n = rest.map(Number);
  switch (command) {
    case "move":
      post($.kCGEventMouseMoved, n[0], n[1]);
      break;
    case "click": {
      const count = n[2] || 1;
      // A press held for a moment: list rows act on the click that follows
      // a real press, and a zero-length one reaches only some of them.
      for (let i = 1; i <= count; i++) {
        post($.kCGEventLeftMouseDown, n[0], n[1], i);
        pause(0.07);
        post($.kCGEventLeftMouseUp, n[0], n[1], i);
        if (i < count) pause(0.05);
      }
      break;
    }
    case "drag": {
      post($.kCGEventMouseMoved, n[0], n[1]);
      pause(0.2);
      post($.kCGEventLeftMouseDown, n[0], n[1], 1);
      pause(0.15);
      const steps = 30;
      for (let i = 1; i <= steps; i++) {
        post($.kCGEventLeftMouseDragged, n[0] + ((n[2] - n[0]) * i) / steps, n[1] + ((n[3] - n[1]) * i) / steps, 1);
        pause(0.025);
      }
      pause(0.15);
      post($.kCGEventLeftMouseUp, n[2], n[3], 1);
      break;
    }
    case "glide": {
      const steps = n[4] || 40;
      for (let i = 0; i <= steps; i++) {
        post($.kCGEventMouseMoved, n[0] + ((n[2] - n[0]) * i) / steps, n[1] + ((n[3] - n[1]) * i) / steps);
        pause(0.012);
      }
      break;
    }
    case "to": {
      // to X Y: glide from wherever the pointer is, at a hand's pace.
      const here = $.CGEventGetLocation($.CGEventCreate($()));
      const distance = Math.hypot(n[0] - here.x, n[1] - here.y);
      const steps = Math.max(12, Math.round(distance / 14));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        post($.kCGEventMouseMoved, here.x + (n[0] - here.x) * ease, here.y + (n[1] - here.y) * ease);
        pause(0.01);
      }
      break;
    }
    case "rclick": {
      const down = $.CGEventCreateMouseEvent(source, $.kCGEventRightMouseDown, $.CGPointMake(n[0], n[1]), $.kCGMouseButtonRight);
      $.CGEventPost(tap, down);
      pause(0.05);
      const up = $.CGEventCreateMouseEvent(source, $.kCGEventRightMouseUp, $.CGPointMake(n[0], n[1]), $.kCGMouseButtonRight);
      $.CGEventPost(tap, up);
      break;
    }
    case "scroll": {
      // scroll X Y PIXELS: positive scrolls the page down.
      post($.kCGEventMouseMoved, n[0], n[1]);
      pause(0.1);
      const step = n[2] > 0 ? -40 : 40;
      for (let left = Math.abs(n[2]); left > 0; left -= 40) {
        const e = $.CGEventCreateScrollWheelEvent(source, $.kCGScrollEventUnitPixel, 1, step);
        $.CGEventPost(tap, e);
        pause(0.012);
      }
      break;
    }
    case "key": {
      // key CODE [cmd] [shift] [ctrl] [alt]: posted at the HID level like
      // the pointer, so a keystroke recorder sees it as typed.
      const flags = {
        cmd: $.kCGEventFlagMaskCommand,
        shift: $.kCGEventFlagMaskShift,
        ctrl: $.kCGEventFlagMaskControl,
        alt: $.kCGEventFlagMaskAlternate,
      };
      const mask = rest.slice(1).reduce((m, name) => m | flags[name], 0);
      for (const down of [true, false]) {
        const e = $.CGEventCreateKeyboardEvent(source, n[0], down);
        $.CGEventSetFlags(e, mask);
        $.CGEventPost(tap, e);
        pause(0.03);
      }
      break;
    }
    default:
      throw new Error(`unknown command: ${command}`);
  }
  return "ok";
}
