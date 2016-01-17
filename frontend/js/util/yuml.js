const yumlMeRoot = "http://yuml.me/diagram/scruffy;scale:180/class/";
function yumlMeLink(match, capture) {
    const b = `![yuml.me diagram](${yumlMeRoot}${encodeURIComponent(capture.replace(/(?:\r\n|\r|\n)/g, ",")).replace(/\(/g, "%28").replace(/\)/g, "%29")}.png)`;
    return b;
} 

export default {
    apply(input) {
        return input.replace(/<YUML>((<|>|\*|.|\n)*)<\/YUML>/g, yumlMeLink); 
    }
};
