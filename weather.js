const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const https=require("https");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var query=req.body.city;
  var appid="0f197a559b4cd0d7f6a06150b21e014d";
  var unit=req.body.temp;
  var url="https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q="+query+"&units="+unit;
  https.get(url,function(response){
    response.on("data",function(data){
      var weatherData=JSON.parse(data);
      var temp=weatherData.main.temp;
      var desc=weatherData.weather[0].description;
      var icon=weatherData.weather[0].icon;
      res.write("<p>The description of the weather is "+desc+"</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
      res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png></img>");
      res.send();
    });
  });

});



app.listen(3000,function(){
  console.log("Server started at port 3000.");
});
