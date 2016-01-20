export default {
    apply(input) {
        return input.replace(/:([a-z-]*):/g, "<span class=\"fa fa-$1\"></span>"); 
    }
};
