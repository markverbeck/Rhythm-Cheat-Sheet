
var computed = function(obj, choice){
    for (let index = 0; index < obj.length; index++) {
        if(obj[index].note === choice){
          return obj[index];
        }
    }
}

export default computed;