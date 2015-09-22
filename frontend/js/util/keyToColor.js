function shadeColor(color, percent) {  
  var num = parseInt(color,16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
  return (0x1000000 + (R<245?R<10?10:R:245)*0x10000 + (G<245?G<10?10:G:245)*0x100 + (B<245?B<10?10:B:245)).toString(16).slice(1);
}

function hashCode(str) { // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
} 

function intToRGB(i){
  var c = (i & 0x00FFFFFF)
  .toString(16)
  .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function keyToColor(key) {
    return "#" + shadeColor(intToRGB(hashCode(key)), 33); 
}

module.exports = keyToColor;
