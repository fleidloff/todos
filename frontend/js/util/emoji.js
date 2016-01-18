export default {
    apply(input) {
        return input.replace(/:(.*):/g, "<span class=\"fa fa-$1\"></span>"); 
    }
};
