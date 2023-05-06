function $$(o){ if(typeof(o)=='object'){return o;}else{return document.getElementById(o);}}
function sleep(milliseconds) {const date = Date.now();let currentDate = null;do {currentDate = Date.now();} while (currentDate - date < milliseconds);}
function randn(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;}

var RespuestaCorrecta=3;
var minNum=1;
var maxNum=10;
var totNum=0;
var rotar=false;
var tiltangle=35;
var desordenar=false;

function IniciarPartido(){
    rotar=$('#swTilt').is(':checked');
    tiltangle = $('#swTiltPorc').val();
    desordenar=$('#swDesordenar').is(':checked');
    totNum=maxNum-(minNum-1);

    $('#DivMenu').hide();
    GenerarNum();
}

function GenerarNum(){
    $('.btn-num').removeAttr('disabled');
    $('#DivBien').hide();
    $('#DivMal').hide();
    $('#DivMain').show('slow');

    let rtilt=0;
    let b=''; var orden='';
    $('#RowNumbers').html('');
    for (let i=minNum; i<=maxNum; i++) {
        n=i;
        if (desordenar) {
            orden='order:'+randn(minNum,maxNum)+';';
        }
        if (rotar){
            rtilt= randn(tiltangle*-1,tiltangle);
        } else {
            rtilt = 0;
        }
        b='<div class="col" style="'+orden+'"><button id="btn'+n+'" class="btn btn-info btn-num"><div style="transform: rotate('+rtilt+'deg);">'+n+'</div></button></div>';
        $('#RowNumbers').append(b);
    }
    //Agrego el click a los botones
    $(".btn-num").click(function(){
        Respondio($(this).text(),this);
    });

    RespuestaCorrecta=randn(minNum,maxNum);
    // console.info ('RespuestaCorrecta: ' + RespuestaCorrecta);

    sleep(300);
    $$("ABien").pause();
    $$("ABien").load();
    $$("Audio"+RespuestaCorrecta).play();
}

function Respondio(Num,btn){
    console.info('Respondio:'+Num);
    var x = $$("Audio"+Num);
    let b='';
    x.play();
    sleep(1300);
    if (Num==RespuestaCorrecta){
        $('#winnum').html(Num);
        $('#wincant').html('');
        for (let i=minNum; i<=Num; i++) {
            b='<div class="col"><i class="fa fa-poo pe-3"></i></div>';
            $('#wincant').append(b);
        }
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
    $('#DivMenu').show();
    $('#DivBien').hide();
    $('#DivMal').hide();
    $('#DivMain').hide();

    $("#btnRepetir").click(function(){
        $$("Audio"+RespuestaCorrecta).play();
    });
    $("#btnIniciar").click(function(){
        IniciarPartido();
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