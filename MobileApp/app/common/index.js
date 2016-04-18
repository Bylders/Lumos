angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

var SERVER_ADDRESS = "192.168.1.14:5000";
var acTemp = 0;

$(document).ready(function(){
    if(localStorage.getItem("SERVER_ADDRESS") == "undefined")
    localStorage.setItem("SERVER_ADDRESS",SERVER_ADDRESS);
    else SERVER_ADDRESS = localStorage.getItem("SERVER_ADDRESS");
    $("#temperature_val").html(acTemp+" °C");
    $("#btn-ac-dec").click(function(){
        acTemp -= 1
        showMax();
    });
    $("#btn-ac-inc").click(function(){
        acTemp += 1
        showMax();
    });
    $("#btn-ac-sync").click(function(){

    });
    syncTemp();
});

function syncHardware()
{
    $.get("http://"+SERVER_ADDRESS+'/getDeviceStatuses',function(data)
    {
        for(i=0;i<15;i++)
        {
            if(data[str(i)]) $("#"+str(i)).prop("checked",true);
            else $("#"+str(i)).prop("checked",false);
        }
    },"json");
    setTimeout(syncHardware,10000);
}

function syncTemp()
{
    $.get("http://"+SERVER_ADDRESS+'/getTemperature',function(data)
    {
        acTemp = parseFloat(data);
        showMax();    
    });
    $.get("http://"+SERVER_ADDRESS+'/getOptimalTemperature',function(data)
    {
        $("#optimal_temperature_val").innerHTML("Optimal Temperature: "+data);
        showMax();
    });

    setTimeout(syncTemp,5000);
}

function showMax()
{
        //alert(SERVER_ADDRESS+'/setTemperature?val='+acTemp.toString());
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
        
        $.get("http://"+SERVER_ADDRESS+'/setTemperature?val='+acTemp.toString());
  //  },'json');
    // $.get(SERVER_ADDRESS+'/getOptimalTemp',function(data,status){
    //     acTemp = data['temperature'];
    //     $("#temperature_val").html(acTemp+" °C");
    // });
//    setTimeout(showMax, 300);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}