angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

var SERVER_ADDRESS = "192.168.1.14:5000";
var acTemp = 0;

$(document).ready(function(){
$("#temperature_val").html(acTemp+" °C");    
    $(".btn-ac-dec").click(function(){
        acTemp -= 1
        $("#temperature_val").html(acTemp+" °C");
        //$.post('/actempmon',{'temp':acTemp.toString()});
    });
    $(".btn-ac-inc").click(function(){
        acTemp += 1
        $("#temperature_val").html(acTemp+" °C");
        //$.post('/actempmon',{'temp':acTemp.toString()});    
    });
    showMax();
});
function showMax()
{
	$.get("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=44db6a862fba0b067b1930da0d769e98", function(data, status){
        acTemp = Number((data["main"]["temp"] - 273.16).toFixed(2));
        var low = 0,high = 50;
        var temp = acTemp;
        var R = 0,B = 0;
        if(temp<low) B = 255;
        else if(temp>high) R = 255;
        else {
        	R = Math.round((temp-low)*255.0/(high-low));
        	B = Math.round((high-temp)*255.0/(high-low));
        }
        $("#temperature_val").css({"color":rgbToHex(R,0,B)});
        $("#temperature_val").html(acTemp+" °C");
    },'json');
    // $.get('/atmg',function(data,status){
    //     acTemp = data['temp'];
    //     $("#acTempBox").html(acTemp+" °C");
    // });
    setTimeout(showMax, 300);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}