// console.log("server file is running")
// function sum(a,b){
//     return a+b
// }
// var res=sum(4,5)
// console.log(res)
(function(){
    console.log('charu this side');
})();
function callback(){
    console.log("callback is called")
}
const a=function(b,c,callback)
{
    console.log(b+c);
    callback();
}
a(5,6,callback)





var note=require("./notes.js")
console.log(note.age)



var _ =require("lodash")
var data=["charu","ch","charu",1,2,3,2,1,4]
console.log(_.uniq(data))
console.log(_.isSymbol("@"))