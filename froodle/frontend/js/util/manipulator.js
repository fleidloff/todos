import yuml from "./yuml";
import markdown from "./markdown";
import emoji from "./emoji"
import lineBreaks from "./lineBreaks";

const manipulators = {
    yuml,
    markdown,
    lineBreaks,
    emoji
}

var f = function(input) {
    return {
        apply(manipulator) {
            return f(manipulators[manipulator].apply(input));
        },
        applyAll() {
            return this
                .apply("yuml")
                .apply("markdown")
                .apply("lineBreaks")
                .apply("emoji")
                .text();
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
