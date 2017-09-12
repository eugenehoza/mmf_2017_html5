// constants
var configName = 'questgen.cfg';
var resultFileName = process.argv[2];
var preview = "Тест по курсу HTML5.\nВажно! ЕСЛИ В ВОПРОСЕ ЕСТЬ СЛОВО 'ПРИМЕР', \
ТО В ОТВЕТЕ ДОЛЖЕН БЫТЬ КОМПИЛИРУЕМЫЙ КУСОК КОДА\nОтвет на вопрос по html типа \
<th> - описание тега и пример работы. УДАЧИ!\nфамилия, группа __________________\n";

// check
if (!resultFileName){
  console.log("Please, define ouptut file name as parameter");
  return;
}

var fs = require("fs");
var resultArr = [];
var num = 1;
// read config
var configArray = fs.readFileSync(configName).toString().split("\n");
for(var cfg in configArray){
  var meta = configArray[cfg].split("=");
  if (meta.length != 2){
    continue;
  }
  console.log("processing "+configArray[cfg]);
  resultArr.push(meta[0]);
  // meta[0] - fileName, meta[1] - count
  var questArray = fs.readFileSync(meta[0]).toString().split("\n");
  var rows = [];
  var uniqueIds = [];
  for (var i = 0 ; i < meta[1] ; i++){
    var rowNum = Math.floor(Math.random()*questArray.length);
    if (uniqueIds.indexOf(rowNum) >= 0 || questArray[rowNum].length < 2){
      i--;
      console.log("recalc question num " + rowNum);
      continue;
    }
    uniqueIds.push(rowNum);
    resultArr.push("\t"+num+" " + questArray[rowNum]);
    resultArr.push("\n\n");
    num++;
  }
  console.log("questions "+uniqueIds.join());
}

fs.writeFile(resultFileName, preview+resultArr.join(""));
