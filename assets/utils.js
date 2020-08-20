export const hash = (data) => {
  if (data !== '' && typeof data === 'string') {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var rev = reverse(data.charAt(i))
      arr.push(rev)
    }
    return arr.join('')
  }
  
  return data
}

export const unhash = (data) => {
  if (data !== '' && typeof data === 'string') {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var rev = reverse(data.charAt(i))
      arr.push(rev)
    }
    return arr.join('')
  }
  
  return data
}

const reverse = (character) => {
  // 62 characters
  const charset = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", 
                "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", 
                "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", 
                "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
                "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", 
                "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", 
                "8", "9" ]
  const charsetLen = charset.length;
  let index = charset.indexOf(character)
  let revIndex = (charsetLen - 1) - index

  return (index > -1) ? charset[revIndex] : character
}