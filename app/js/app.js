const http = require('http');
const settings = require('electron-settings');
const prompt = require('electron-prompt');


function clickKey(code, key){
    http.get('http://hd1.freebox.fr/pub/remote_control?code='+code+'&key=' + key, function(response){
      console.log(response);
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

function askCode(){
    var code = settings.get('code');
    prompt({
        title: 'Paramètres',
        label: 'Code télécommande',
        value: code,
        inputAttrs: {
            type: 'string'
        }
    })
    .then((code) => {
        if(code){
            settings.set('code', code);
        }
    })
    .catch(console.error);
}


if( ! settings.has('code')){
    askCode();
}

var keys = document.querySelectorAll(".key");

for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', function(event) {
        clickKey(settings.get('code'), this.dataset["key"]);
    });
}

document.getElementById("settings").addEventListener('click', function(event) {
    askCode();
});