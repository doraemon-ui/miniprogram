/**
 * @doraemon-ui/miniprogram.animation-group.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:37:59.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

var AnimateStatus;
(function(AnimateStatus) {
    AnimateStatus["ENTER"] = "enter";
    AnimateStatus["ENTERING"] = "entering";
    AnimateStatus["ENTERED"] = "entered";
    AnimateStatus["EXIT"] = "exit";
    AnimateStatus["EXITING"] = "exiting";
    AnimateStatus["EXITED"] = "exited";
    AnimateStatus["UNMOUNTED"] = "unmounted";
})(AnimateStatus || (AnimateStatus = {}));
var AnimateType;
(function(AnimateType) {
    AnimateType["TRANSITION"] = "transition";
    AnimateType["ANIMATION"] = "animation";
})(AnimateType || (AnimateType = {}));

export { AnimateStatus, AnimateType };
