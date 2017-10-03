log("hello from console2");

var x;
var str1 = "str variable 1";
log(str1);
var str2 = 'str variable 2';
log(str2);

var n = 0;
log(n);
var ndot = 0.1;
log(ndot);

var bool1 = true;
log(bool1);
bool1 = false;
log(bool1);


var x = 0;
log(x);

var y = null;
log(y);

var array = [1,2,"3", null, undefined, false];
log(array);

var obj = {a:{aa:[1,2,3], bb:4},b:2,c:3};

obj.f = func();

log(obj);

log(obj.a);

log(obj["a"]);

obj.d = false;
log(obj);
// log(obj.d)
// log(func().a.aa);


function func() {
  function func2 () {
    return obj;
  }
  return func2();
}




function log(v){
    console.log(v);
    console.log(typeof v);
}
