!(function ($) {
    var FORCE_BEGIN = "webkitmouseforcewillbegin"
    var FORCE_DOWN = "webkitmouseforcedown"
    var FORCE_UP = "webkitmouseforceup"
    var FORCE_CHANGE = "webkitmouseforcechanged"
    var obj = $("#forceclick")
    var output = $("#forcelog")
    var is_force_down = false;
    var force = 0.0;

    function handle_mouse_down (e) {
        e.preventDefault()
        if (obj.attr("mouse-down") !== undefined) {
            return
        }
        obj.attr("mouse-down", true)
    }

    function handle_mouse_up () {
        obj.removeAttr("mouse-down")
    }

    function handle_force_down (e) {
        e.stopPropagation()
        if (obj.attr("force-down") !== undefined) {
            return
        }
        obj.attr("force-down", true)
    }

    function handle_force_up () {
        obj.removeAttr("force-down")
    }

    function handle_force_change (e) {
        force = e.originalEvent["webkitForce"]
        setTimeout(update_force.bind(force), 10)
    }

    function update_force () {
        var is_force = !!obj.attr("force-down")
        var padding = Math.max(10, 15 * force) | 0
        output.html("Pressed = " + is_force + "<br>force = " + (((force * 100) | 0) / 100))
        obj.css({ "padding": padding + "px"})
    }

    function handle_force_begin (e) {
    }

    function handle_force_end (e) {
        obj.removeAttr("force-down")
        obj.removeAttr("mouse-down")
    }

    obj.on("mousedown", handle_mouse_down)
    obj.on("mouseup", handle_mouse_up)
    obj.on(FORCE_BEGIN, handle_force_begin)
    obj.on(FORCE_DOWN, handle_force_down)
    obj.on(FORCE_UP, handle_force_up)
    obj.on(FORCE_CHANGE, handle_force_change)
}(jQuery))