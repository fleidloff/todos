import {markdown} from "markdown";

export default {
    apply(input) {
        return markdown.toHTML(input);
    }
};
