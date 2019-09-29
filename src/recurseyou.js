const addIt = sentence => {
  return word => {
    if(word){
      return addIt(sentence + ' '+ word);
    }
    return sentence;
  }
}

const sayIt = addIt('');


console.log(sayIt('hello')('my')('name')());

