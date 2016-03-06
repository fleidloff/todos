export default {
    apply(input) {
        return input.replace(/:br:/g, "<br />"); 
    }
};
