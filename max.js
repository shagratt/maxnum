function $$(o){ if(typeof(o)=='object'){return o;}else{return document.getElementById(o);}}
function sleep(milliseconds) {const date = Date.now();let currentDate = null;do {currentDate = Date.now();} while (currentDate - date < milliseconds);}

var RespuestaCorrecta=3;
function GenerarNum(){
    $('.btn-num').removeAttr('disabled');
    $('#DivBien').hide();    
    $('#DivMal').hide();
    $('#DivMain').show('slow');
    RespuestaCorrecta=Math.floor(Math.random() * 10) + 1;
    sleep(300);
    $$("ABien").pause();
    $$("ABien").load();
    $$("Audio"+RespuestaCorrecta).play();        
}

function Respondio(Num,btn){
    var x = $$("Audio"+Num); 
    x.play();
    sleep(1300);
    if (Num==RespuestaCorrecta){
        RespondioBIEN();
    } else {
        RespondioMAL();
        $(btn).attr('disabled','disabled');
    }
}

function RespondioBIEN(){
    $('#DivMain').hide();
    $('#DivBien').show('slow');
    $$("ABien").play();        
}
function RespondioMAL(){
    $('#btnReintentar').attr('disabled','disabled');
    $('#DivMain').hide();
    $('#DivMal').show('slow');
    // $$("AMal").play(); //Desactivado xq sino se entretiene perdiendo
    function PG(x){
        x++;$$('PGbar').style.width= (x) +'%';
        if (x==100){
            $('#btnReintentar').removeAttr('disabled');
        } else {
            setTimeout(PG,80,x);
        }
    }
    PG(0);

}


/* Inicializador */
$(document).ready(function() {
    GenerarNum();



    $("#btnRepetir").click(function(){
        $$("Audio"+RespuestaCorrecta).play();        
    });

    $(".btn-num").click(function(){
        Respondio($(this).text(),this);
    });
    $("#btnOtraVez").click(function(){
        GenerarNum();
    });
    $("#btnReintentar").click(function(){
        $('#DivMal').hide();   
        $('#DivMain').show('slow');
        $$('PGbar').style.width='0%';   
        $$("Audio"+RespuestaCorrecta).play();        
    });
    
    // console.info ('Start OK');
});