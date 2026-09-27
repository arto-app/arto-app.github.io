// Read and select keyboard input sources.
//   osascript -l JavaScript input-source.js current
//   osascript -l JavaScript input-source.js enabled SOURCE_ID
//   osascript -l JavaScript input-source.js enable SOURCE_ID
//   osascript -l JavaScript input-source.js select SOURCE_ID
//
// Disabling is left to arto.py: TISDisableInputSource reports success on a
// keyboard layout and leaves it enabled.
ObjC.import("Carbon");

function id(src) {
  return ObjC.unwrap(ObjC.castRefToObject($.TISGetInputSourceProperty(src, $.kTISPropertyInputSourceID)));
}

function find(sourceId, includeDisabled) {
  const filter = $.NSDictionary.dictionaryWithObjectForKey(sourceId, ObjC.castRefToObject($.kTISPropertyInputSourceID));
  const list = ObjC.castRefToObject($.TISCreateInputSourceList(filter, includeDisabled));
  return list.count > 0 ? list.objectAtIndex(0) : null;
}

function run(argv) {
  const [command, target] = argv;
  switch (command) {
    case "current":
      return id($.TISCopyCurrentKeyboardInputSource());
    case "enabled":
      return find(target, false) ? "yes" : "no";
    case "enable":
      return String($.TISEnableInputSource(find(target, true)));
    case "select":
      $.TISSelectInputSource(find(target, false));
      return id($.TISCopyCurrentKeyboardInputSource());
    default:
      throw new Error(`unknown command: ${command}`);
  }
}
