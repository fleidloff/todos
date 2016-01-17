import yuml from "./yuml";
import markdown from "./markdown";

const manipulators = {
    yuml,
    markdown
}

var f = function(input) {
    return {
        apply(manipulator) {
            return f(manipulators[manipulator].apply(input));
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
