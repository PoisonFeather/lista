let items= [];
var input;
let url;
let array = [];
let p;
var ide=Math.floor(Math.random()*10);
let inputs;
let adaugate = [];
var ide;
let arr_id = [];
let count=0;
function preload(){
  url=loadStrings("test.txt");
}

function setup(){
  noCanvas();
  noLoop();
  input= createInput();
  input.changed(newtext);
  var string = JSON.stringify(url);
  let prod;

  for(var i=0;i<string.length;i++){
    let c = string.charAt(i);
    //console.log(c);
    if(c!=' ' && c!='[' && c!=']' && c!='"' && c!=''){
      if(c=="_"){
        c=" ";
      }
      prod+=c;
    }else{
        if(prod==undefined || prod=="undefined"){
          //console.log("undefined");
          prod="";
      }
        if(prod!=""){
          ide=ID();
          arr_id.push(ide);
          var div=document.createElement("li");
          div.setAttribute("id",ide);
          var content=document.createTextNode(prod);
          div.appendChild(content);
          var currentDiv=document.getElementById("lista");
          document.body.insertBefore(div,currentDiv);
          prod="";
        }
      }
    }
    for(let j=0;j<=arr_id.length;j++){
      let li_id=arr_id[j];
      document.getElementById(li_id).onclick = function() {hello(li_id)};
    }
}

function hello(ids){
  var text=document.getElementById(ids).innerText;
  let text_;
  if(confirm("Scoate "+text+ " din lista?")){
    for(let i=0;i<=text.length;i++){
      let ca=text.charAt(i);
      //console.log(ca);
      if(text_==undefined || text_=="undefined"){
        //console.log("undefined");
        text_="";
    }

      if(ca==" "){
        ca="_";
      }
      text_+=ca;
    }
    text="del "+text_;
    //console.log(text_);
    sendToPhp("phpfile.php",text,"REM");
    document.getElementById(ids).style.fontFamily="sans-serif";
    document.getElementById(ids).style.color="grey";

    //location.reload();
  }else{
    console.log("aborted");
  }

}

function newtext(){
  inputs = input.value();
  let ci;
  let das="";
  for(let i=0;i<=inputs.length;i++){
      ci=inputs.charAt(i);
      if(ci==" "){
        ci="_";
        das=das+ci;
      }
      else{
        das+=ci;
      }
  }
  console.log(das);
  createP(inputs);
  adaugate.push(inputs,ide);
  items.push(das);
  input.value('');
  var Jsons = JSON.stringify(items);
  sendToPhp("phpfile.php",Jsons,"ADD");
  items = [];
  inputs = 0;

}

function sendToPhp(file,data,header){
  var request = new XMLHttpRequest();
  request.open("POST",file,true);
  request.setRequestHeader(header, "application/json");
  request.send(data);
}

var ID=function(){
  return '_'+Math.random().toString(36).substr(2,9);
}
