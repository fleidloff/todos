export default {
    apply(input) {
        return input.replace(/::(.|[\S]*)::/g, "<span class=\"fa fa-$1\"></span>"); 
    }
};
