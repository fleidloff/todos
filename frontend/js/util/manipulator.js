import yuml from "./yuml";
import markdown from "./markdown";
import emoji from "./emoji"

const manipulators = {
    yuml,
    markdown,
    emoji
}

var f = function(input) {
    return {
        apply(manipulator) {
            return f(manipulators[manipulator].apply(input));
        },
        applyAll() {
            return this.apply("yuml").apply("markdown").apply("emoji").text();
        },
        text() {
            return input;
        }
    }
};

export default {
    input(input) {
        return f(input);
    }
};
