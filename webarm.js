var pcEmplID_list_Rep30=15;
var pcEmplSaleDirectorAuto=3;
var pcEmplSaleDirectorMoto=4;
var pcTestingSending1=20;
var pcTestingSending2=21;
var pcTestingSending3=22;
var pcEmpl_list_UnBlock=27;
var pcEmpl_list_TmpBlock=25;
var pcEmpl_list_FinalBlock=26;
var pcVINmailFilial_list=60;
var pcVINmailFirmClass_list=61;
var pcVINmailEmpl_list=62;
var pcVINmailFirmTypes_list=63;
var pcPriceLoadFirmClasses=70;
var flFirmLimits=false;
var flMotulPLsys=false;




var brw_height;           // ширина клиентской части браузера
var brw_width;            // высота клиентской части браузера
var scriptname ='';
var DeltaDate = new Date();
var searchwinheight=390; // высота окна поиска
var unitwidth = 44;
var pricewidth = 80;
var zakazwidth = 44;
var restwidth = 60;
var maxwarenamewidth = 500;
var left_block_expand=1; // левая колонка развернута(1) или свернута (0)
var manufactureselect='';
var curmod='';
var curmotomodelname='';
var curmotonodename='';
var curmotomodelcode='';
var curmotonodecode='';
var curmotoattrgroupname='';
var automofelinfolists = new Array();
var curmotoattrgroupname='';

var selbyattrmotoobj = null;
var selbymodelmotoobj = null;

var CurrNodeInSearch = -1;
var CurrTemplInSearch = '';

var selectTreeColor='#CC0000';
var NodeWithModel = null;
var flNewModeCGI=false;

var modelbywarename='';
var filtersuff='';
var attributestr='';
var one_line=false;

isWA=true;
var forfirmid=0;
var forfirmcurrid=0;

var arrpodborLamp = [];  //массив для ламп в подборе
var TStream={};// аналог стрима для обработки в функциях
var TStream_={};// аналог стрима для обработки в функциях
const cLeftBracket  = '<';
const      cRightBracket = '>';
const      cLeftSigns    = '$$$';
const      cRightSigns   = '^^^';


function tinyserialize(text, editorname) {
  text=replacestr(text, String.fromCharCode(10), ' ');
  text=replacestr(text, String.fromCharCode(13), ' ');
  $('#'+editorname).attr('value', text);
  text=$('#'+editorname).serialize();
  text=text.substring(editorname.length+1);

//alert(text);
  return text;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function removeHTMLTags(text) {
  strInputCode = text.replace(/&(lt|gt);/g, function (strMatch, p1){
          return (p1 == "lt")? "<" : ">";
  });
  var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
  return strTagStrippedText;
}

function set_sizes(synqtype) {
  synqtype=(synqtype==undefined)?0:synqtype;
  var ttop=$("#mainheaderwrap").height();
  if (!ttop) $("#mainheaderwrap").css('padding-top', 0);
  var d=parseInt($("#mainheaderwrap").css('padding-top'));
  ttop+=(isNaN(d)?0:d);
//  $("#tcdbackground").css('top', ttop+$("#tht").height()
  $("#tcdbackground").css('top', $("#tht").height()
                           +((document.getElementById("WSRwrapper") && ($("#WSRwrapper").css('display')=="block"))?($("#WSRwrapper").height()+20):0)

                         );
  curdiv=document.getElementById('tablecontentdiv');
  outdiv=document.getElementById('maindiv');
  if (curdiv && outdiv) {
    curdiv.style.width=parseInt(outdiv.style.width)+'px';
    var d=parseInt($("#thw").css('padding-top'));
    curdiv.style.top=(ttop+$("#thw").height()+(isNaN(d)?0:d)
                         +((document.getElementById("WSRwrapper") && ($("#WSRwrapper").css('display')=="block"))?($("#WSRwrapper").height()+25):0)
//                         +$("#tableheader").height()+$("#mainheaderwrap").height()
                         +$("#tableheader").height()+12-9
                      )+'px';
  }

  $("#WSRtablecontent").width($("#WSRcontentdiv").width()-16-5);
  $("#WSRtableheader").width($("#WSRcontentdiv").width()-5);

  if (((page=="accountsreestr") && ($("#tablecontent tr").length>50)) || (synqtype==3)) {
    synqcols3();
  } else {
    synqcols();
  }
}


function synqcols() {

  var header=document.getElementById("tableheader");
  var content=document.getElementById("tablecontent");
  var content2=document.getElementById("tablecontent2");
  var newrow;

  if (header && content && content2 && header.rows[0]) {
    content.style.tableLayout="auto";
    newrow=content2.insertRow(-1);
    for (i=0; i<header.rows[0].cells.length; i++) {
      newrow.insertCell(-1);
      newrow.cells[i].innerHTML=header.rows[0].cells[i].innerHTML;
    }

content.style.width=($('#tablecontentdiv').width()-16)+"px";

    for (j=0; j<content.rows.length; j++) {
      newrow=content2.insertRow(-1);
      for (i=0; i<content.rows[j].cells.length; i++) {
        newrow.insertCell(-1);
        newrow.cells[i].innerHTML=content.rows[j].cells[i].innerHTML;
      }
    }
    
    $('#tablecontent2').width($('#tablecontent').width());

    for (i=0; i<header.rows[0].cells.length; i++) {
      $(header.rows[0].cells[i]).width($(content2.rows[0].cells[i]).width()+(((i+1)==header.rows[0].cells.length)?16:0));
    }

    for (j=0; j<content.rows.length; j++) {
     for (i=0; i<content.rows[j].cells.length; i++) {
        $(content.rows[j].cells[i]).width($(content2.rows[0].cells[i]).width());
      }
    }

    for (i=0; content2.rows.length; i++) {
      content2.deleteRow(0);
    }

  }
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function synqcols1() {
  var header=document.getElementById("tableheader");
  var content=document.getElementById("tablecontent");
  var newrow;
  var widthes = new Array();

  if (header && content && header.rows[0]) {
    content.style.tableLayout="auto";
    newrow=content.insertRow(-1);
    for (i=0; i<header.rows[0].cells.length; i++) {
      newrow.insertCell(-1);
      newrow.cells[i].innerHTML=header.rows[0].cells[i].innerHTML;
    }
    
//$('#tablecontent td').css('white-space', 'normal');
    
    for (i=0; i<header.rows[0].cells.length; i++) {
	  widthes[i]=$(content.rows[0].cells[i]).width()+(((i+1)==header.rows[0].cells.length)?16:0);
      $(header.rows[0].cells[i]).width(widthes[i]);
    }

    content.style.tableLayout="fixed";
    //if (document.documentElement.clientWidth<($('#tablecontentdiv').width()-16)){
   //   header.style.tableLayout="fixed"; //!!!!!!
   // }
    
   
    for (j=0; j<content.rows.length; j++) {
     for (i=0; i<content.rows[j].cells.length; i++) {
        $(content.rows[j].cells[i]).width(widthes[i]-(((i+1)==header.rows[0].cells.length)?16:0));
      }
    }
    content.deleteRow(content.rows.length-1);
    $("#tablecontent").width($("#tableheader").width()-16);
   // $("#tableheader").width($("#tablecontent").width());
    header.style.tableLayout="fixed";
    content.style.tableLayout="fixed";
   
   //content.style.tableLayout="auto";
  //header.style.tableLayout="auto";
   }
}


function synqcols2(header, content) {
         var newrow;
         var content2=document.createElement('table');
         content2.style.width='100%';
  insertAfter(content.parentNode, content2, content);

         if (header && content && content2 && header.rows[0]) {
                  newrow=content2.insertRow(-1);
           for (i=0; i<header.rows[0].cells.length; i++) {
      newrow.insertCell(-1);
      newrow.cells[i].innerHTML=header.rows[0].cells[i].innerHTML;
           }

           for (j=0; j<content.rows.length; j++) {
                    newrow=content2.insertRow(-1);
             for (i=0; i<content.rows[j].cells.length; i++) {
        newrow.insertCell(-1);
        newrow.cells[i].innerHTML=content.rows[j].cells[i].innerHTML;
             }
           }

           for (i=0; i<header.rows[0].cells.length; i++) {
      $(header.rows[0].cells[i]).width($(content2.rows[0].cells[i]).width()+(((i+1)==header.rows[0].cells.length)?16:0));
           }

           for (j=0; j<content.rows.length; j++) {
             for (i=0; i<content.rows[j].cells.length; i++) {
        $(content.rows[j].cells[i]).width($(content2.rows[0].cells[i]).width());
             }
           }

           for (i=0; content2.rows.length; i++) {
      content2.deleteRow(0);
           }

         }
         content2.parentNode.removeChild(content2);
}


function synqcols3() {
  var header=document.getElementById("tableheader");
  var content=document.getElementById("tablecontent");
  var newrow;
  var widthes = new Array();

  if (header && content && header.rows[0]) {
    content.style.tableLayout="auto";
    newrow=content.insertRow(-1);
    for (i=0; i<header.rows[0].cells.length; i++) {
      newrow.insertCell(-1);
      newrow.cells[i].innerHTML=header.rows[0].cells[i].innerHTML;
    }

$('#tablecontent td').css('white-space', 'normal');
content.style.width=($('#tablecontentdiv').width()-16)+"px";//!!
header.style.width=($('#tablecontentdiv').width()-16)+"px";//!!
    for (i=0; i<header.rows[0].cells.length; i++) {
	    widthes[i]=$(content.rows[0].cells[i]).width()+(((i+1)==header.rows[0].cells.length)?16:0);
      $(header.rows[0].cells[i]).width(widthes[i]);
    }

    newrow.style.visibility="hidden"; 
    header.style.tableLayout="fixed";
    content.style.tableLayout="fixed";
  }
}

function initFunc() {
  set_sizes();
  //ec('checklinks23loaded', '', 'anbj');
  one_line=(getCookie1('one_line_mode')=='true');
  demanddopdescr=(!one_line) && (page=="accountsreestr") && ($("#forfirmid").length>0) && ($("#forfirmid").val()>0);
//  setInterval(function(){ec('checklinks23loaded', '', 'anbj')},3000000);
}

// ecg - execute command GET
function ecg(command, data, action) {
//alert(scriptname+"/"+action+'?'+"act="+command+"&"+data);
  document.getElementById("jobframe").src=scriptname+"/"+action+'?'+"act="+command+"&"+data;
}

function ecfull(command, data, action, type, asynq, question) {
  if ((!question) || confirm(question)) {
    $.ajax({
      url: scriptname+"/"+action,
      type: type,
      asynq: asynq,
      data: "act="+command+"&"+data,
  //    complete: function(obj, stat) {alert(obj.responseText);},
      dataType: "script"
    });
  }
}

function pause(ms) {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < ms);
}

//function waul(Row, Code, Login, Pass, FIO, DPRT, GBL, GBLO, r2, r4, r6, r7, r8, r9, r10, Plug) {
function waul(Row, Code, Login, DPRT, GBL, Blocked) {
  var newcell;
  var newrow=document.getElementById("tablecontent").insertRow(Row);
  newrow.id='tr'+Code;
  if (altrow) newrow.className='altrow';
  altrow=!altrow;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=Code;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=Login;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=empl[Code];

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=dprt[DPRT];
  if (newcell.innerHTML=='undefined') newcell.innerHTML='&nbsp;';


  newcell=newrow.insertCell(-1);
  newcell.innerHTML=GBL;
  newcell=newrow.insertCell(-1);
  if (flNewModeCGI){
    newcell.innerHTML='<input type=button onClick="ec(\'aewausers\', \'id='+Code+'\', \'newbj\');" value="Редактировать">'
              +'<input type=button class="blockbtn" onClick="ec(\'blockuser\', \'id='+Code+'&command=\'+$(this).attr(\'command\'), \'newbj\');" value="'+(Blocked?'Разб':'Б')+'локировать" command="'+(Blocked?'unblock':'block')+'">';
  }
  else{
   newcell.innerHTML='<input type=button onClick="ec(\'aewausers\', \'id='+Code+'\', \'abj\');" value="Редактировать">'
                 +'<input type=button class="blockbtn" onClick="ec(\'blockuser\', \'id='+Code+'&command=\'+$(this).attr(\'command\'), \'abj\');" value="'+(Blocked?'Разб':'Б')+'локировать" command="'+(Blocked?'unblock':'block')+'">';
 }
}


//function ablr() AddBrandLinksRows {
function ablr(Row, GBCode, TDCode) {
  var newcell;
  var newrow=document.getElementById("tablecontent").insertRow(Row);
  newrow.id='tr'+GBCode+'_'+TDCode;
  if (altrow) newrow.className='altrow';
  altrow=!altrow;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=GBBrands[GBCode];
  newcell.name='gb_'+GBCode;
  newcell.className='gb_'+GBCode;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=TDBrands[TDCode];
  newcell.name='td_'+TDCode;
  newcell.className='td_'+TDCode;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML='<a class=abgslide title="Удалить оригинальный номер" href="#" onClick=\'ecq("delbrandlink", "GBCode='+GBCode+'&TDCode='+TDCode+'", "abj", "Вы действительно хотите удалить связку ?");\' '+
         'style="background-image: url('+descrimageurl+'/images/wdell.png); position: static;"></a>';
} // ablr(


function tfgbb(GBCode) {
         s='';
  for (var i=1; i<arguments.length; i++) {
            if (i>1) s+=',';
            s+=TDBrands[arguments[i]]
  }
  $(".gb_"+GBCode+"").attr('title', 'Этому бренду в TecDoc соответствуют: '+s);
} // tfgbb(

//function tfgbb() AddBrandLinksRows {
function tftdb(TDCode) {
         s='';
  for (var i=1; i<arguments.length; i++) {
            if (i>1) s+=',';
            s+=GBBrands[arguments[i]]
  }
  $(".td_"+TDCode+"").attr('title', 'Этому бренду в GrossBee соответствуют: '+s);
} // tfgbb(


function anrep1() {
         if (cal_check_date('fromdate', true) && cal_check_date('todate', true)) {
                  document.getElementById('jobframe').src=scriptname+"/anrep1?"+$.param($("#fromdate"))+"&"+$.param($("#todate"));
         }
}



function StrToDate(data) {
  y=data.substring(6,8);
  m=data.substring(3,5);
  d=data.substring(0,2);
  if (y.substring(0, 1)=='0') y=y.substring(1, 10);
  if (m.substring(0, 1)=='0') m=m.substring(1, 10);
  if (d.substring(0, 1)=='0') d=d.substring(1, 10);

  return new Date(2000+parseInt(y),parseInt(m)-1, d);
}

function print_date(data) {
//alert(data);
  var year=''+data.getFullYear();
  var month=''+(data.getMonth()+1);
  var day=parseInt(data.getDate());
  var s=(day<10)?'0'+day:day;
  return s+'.'+((month<10)?('0'+(month)):(month))+'.'+year.substring(2,4);
}

function setperiod(period) {
  var today=new Date();
  var begin=new Date();
  if (!period) {
    var day=today.getDay();
    period=(day?day:7);
  }
  begin.setDate(today.getDate()+1-parseInt(period));
  $('#todate').attr('value', print_date(today));
  $('#fromdate').attr('value', print_date(begin));
}

function getfirmsasgoogle(input) {
  var s=input.value;
  if (s.length>2) {
    ec('getfirmlist', 'templ='+s+'&inputid='+input.id, 'newbj');
  } else {
    $("#fagd").css("display","none");
  }
}
// сохраняет значение в куки
// svtc - SaveValueToCookies
function svtc(_name, _value) {
  setCookie_(_name, _value, getExpDate_(3600,0,0),'/',0,0);
}

/* ++++++++++++++++++++++++++++++ все по поиску +++++++++++++++++++++++++++++ */

// csrw CloseSearchResultWindow - закрвть окно результатов поиска
function csrw() {
  $('#WSRwrapper').css('display', "none");
  $('#searchslider').css('display', "none");
//  if ($('#WSRtableheader')[0].rows.length) $('#WSRtableheader')[0].deleteRow(0);
  set_sizes();
}

// управляет отображением окна вывода результатов поиска
function ssr() {
  $("#WSRwrapper").css("display", "block");
  $("#WSRtablecontent").width($("#WSRcontentdiv").width()-16-5);
  $("#WSRtableheader").width($("#WSRcontentdiv").width()-5);
  $("#WSRcontentdiv").height(($("#WSRtablecontent").height()>searchwinheight)?searchwinheight:$("#WSRtablecontent").height()+(($.browser.msie)?10:0));
//  swsrw($("#maindiv").width()-16);
//  Text2Title(document.getElementById('WSRtablecontent'));
  Text2Title(document.getElementById('WSRtableheader'));
//  document.getElementById("tablecontentdiv").style.height=$("#tablecontentdiv").height()-$("#WSRwrapper").height()+10+'px';
//  $("#tcdbackground").css('top', parseInt($("#tcdbackground").css('top'))+($("#WSRwrapper").height())-10);
  set_sizes(left_block_expand);
  $("#searchslider").css("display", "block");
  $("#searchslider").css("top", $("#WSRcontentdiv").height()+getsliderdelta()+"px");
}

function getsliderdelta() {
  return $("#WSRtableheader").height()+$("#WSRwrapper h1").height()+parseInt($("#WSRwrapper").css('padding-top'))+parseInt($("#WSRwrapper").css('margin-bottom'));
}

function dragsearchslider(event, ui){
   var delta=getsliderdelta();
   var pos=0;
  // если пытаемся поднять слайдер так, что высота контентдива становится меньше, чем высота первой строки, то увеличиваем до высоты первой строки
  if ((ui.position.top-delta)<$("#WSRtablecontent tr:first").height()) {
    pos=$("#WSRtablecontent tr:first").height();
  }

  // если пытаемся опустить слайдер так, что высота контентдива становится больше, чем высота таблицы поиска, то уменьшаем до высоты таблицы поиска
  else if ((ui.position.top-delta)>($("#WSRtablecontent").height())) {
    pos=$("#WSRtablecontent").height();
  } else

  // если пытаемся опустить слайдер так, что нижняя часть вообще исчезает, то поднимаем до приемлемой величины
  if ((ui.position.top+20)>($("#maindiv").height())) {
    pos=$("#maindiv").height()-20-searchposdelta;
  }
  else {
    pos=ui.position.top-delta;
  }
  $("#WSRcontentdiv").height(pos);
  searchwinheight=pos;
  ui.position.top=$("#WSRcontentdiv").height()+delta;
  set_sizes(left_block_expand);
}

// swsrw SetWareSearchResultWidth - установить ширину колонок для результатов поиска
function swsrw(w) {
//  $("#WSRcontentdiv").height(($("#WSRtablecontent").height()>searchwinheight)?searchwinheight:$("#WSRtablecontent").height()+10+(($.browser.msie)?10:0));
/*
  var dw=0;
         if ($("#WSRtablecontent").height()>searchwinheight) {
           $("#WSRcontentdiv").height(searchwinheight);
           $("#WSRcontentdiv").css('overflow-y', 'scroll');
         } else {
           $("#WSRcontentdiv").height($("#WSRtablecontent").height()+10+(($.browser.msie)?10:0));
           $("#WSRcontentdiv").css('overflow-y', 'hidden');
           var dw=16;
         }
  w-=11;
//  w-=(($.browser.webkit)?14:0);
         w-=parseInt($("#WSRtablecontent").css('margin-left'));
  var table=document.getElementById("WSRtablecontent");
  var header=document.getElementById("WSRtableheader");
  if (table && header && table.rows[0]) {
//    table.style.width=w+(($.browser.webkit)?14:0)+'px';
//    header.style.width=w+16+(($.browser.webkit)?14:0)+'px';

    var warenamewidth=Math.round((w-unitwidth-pricewidth)/2);
    if (warenamewidth>maxwarenamewidth) warenamewidth=maxwarenamewidth;
var d=0;
    header.rows[0].cells[0].style.width=warenamewidth-d+'px';
    header.rows[0].cells[1].style.width=unitwidth-d+'px';
    header.rows[0].cells[2].style.width=pricewidth-d+'px';
    header.rows[0].cells[3].style.width=(w-unitwidth-pricewidth-warenamewidth+16+(($.browser.webkit)?14:0))+'px';

    for (j=0; j<table.rows.length; j++) {
      if (table.rows[j].id.substr(0,2)=='tr') {
        table.rows[j].cells[0].style.width=warenamewidth-d+'px';
        table.rows[j].cells[1].style.width=unitwidth-d+'px';
        table.rows[j].cells[2].style.width=pricewidth-d+'px';
        td=table.rows[j].cells[3];
        td.style.width=(w+dw-warenamewidth-unitwidth-pricewidth+(($.browser.webkit)?14:0))+'px';
        if (td.firstChild.tagName=='DIV') td.firstChild.style.width=td.style.width;
      }
    }
  }
*/
}

/* ------------------------------ все по поиску ----------------------------- */




// перекидывает текст ячейки в title, чтобы не влезающий в ячейку текст увидеть через hint
function Text2Title(table) {
  var s='';
  if (table) {
    for (i=0;i<table.rows.length;i++) {
      for (j=0;j<table.rows[i].cells.length;j++) {
               if (table.rows[i].cells[j]) { //если ячейка существует
          if (!(table.rows[i].cells[j].title)) { // и у нее нет title
            table.rows[i].cells[j].title=(table.rows[i].cells[j].innerText==null)?table.rows[i].cells[j].textContent:table.rows[i].cells[j].innerText;
            if (!table.rows[i].cells[j].innerHTML) table.rows[i].cells[j].innerHTML='&nbsp;';
          } else if (table.rows[i].cells[j].title=='f') {
                   table.rows[i].cells[j].title='Счет не обработан'
          } else if (table.rows[i].cells[j].title=='t') {
                   table.rows[i].cells[j].title='Счет обработан'
          }
        }
      }
    }
  }
}

function getbrandslink() {
         var s='';
         s+='<form action=abj onsubmit="return sfba(this);"><input type=hidden name=act value=addbrandlink>';
         s+='Бренд&nbsp;GrossBee:&nbsp;<select name=gbcode id=gbcode>'+GBBrandsstr+'</select>&nbsp;&nbsp;Бренд&nbsp;TecDoc:&nbsp;<select name=tdcode id=tdcode>'+TDBrandsstr+'</select>';
         s+='<input type=submit value="Добавить">';

         s+='</form>';
         sw(s, false);
}

/* +++ деревооооооо +++ */

// сворачивает/разворачивает ветку дерева
function UnHide( eThis ){
    if( eThis.innerHTML.charCodeAt(0) == 9658 ){
        eThis.innerHTML = '&#9660;'
        eThis.parentNode.parentNode.parentNode.className = '';
    }else{
        eThis.innerHTML = '&#9658;'
        eThis.parentNode.parentNode.parentNode.className = 'cl';
    }
    return false;
}

// сворачивает/разворачивает ветку дерева для Qjuery
function UnHideQv( ePrev,eThis){
    if (ePrev.length){
      if ( ePrev.html().charCodeAt(0) == 9658 ){
        ePrev.html('&#9660;');
        ePrev.parent().parent().parent().attr("class","");
      }else{
        ePrev.html('&#9658;');
        ePrev.parent().parent().parent().attr("class","cl");
      }
    }
    else{
      ec("getwareforproduct", "id="+eThis.id.substr(4), "pabj") ;
    }
    return false;
}

// добавляет узел в дерево
function addbranch(_id, _master, _name, _sysname, _vis, _mainnode, _isend) {
  var li;
  var ul=document.getElementById("tv_ul_"+_master);
  if (!ul) {
    li=document.getElementById("tv_li_"+_master);
    if (li) {
      ul=document.createElement("UL");
      ul.id="tv_ul_"+_master;
      li.appendChild(ul);
    } else {
             alert('Не найдена мастер-ветка с кодом '+_master);
             return false;
    }
  }

  var li=document.createElement("LI");
  li.innerHTML='<div><p><a id=tv_a1_'+_id+' href="#"></a>'+
               '<input type=checkbox code="'+_id+'" id=tv_cb_'+_id+((_vis)?' checked':'')+' onclick="ec(\'changenodevisibility\', \'id='+_id+'&sys='+((page=='TNAManagePageAuto')?1:2)+'&vis=\'+this.checked, \'difdict\');" title="Видимость">'+
               '<a href="#" id=tv_a2_'+_id+' code="'+_id+'" title="'+_sysname+'" mainnode="'+_mainnode+'" isend="'+_isend+'">'+_name+'</a>'+
               '<img id=smnp_'+_id+' src="/images/forward_4423.png" align=middle onclick="setmainode('+_id+');" '+((_isend && (_id==_mainnode))?'':'style="visibility: hidden;"')+'></p></div>';
  li.className='cl';
  li.id="tv_li_"+_id;
  ul.appendChild(li);
  return true;
}

function addbranchNew(_id, _master, _name, _sysname, _vis, _mainnode, _isend) {
  var li;
  var ul=document.getElementById("tv_ul_"+_master);
  if (!ul) {
    li=document.getElementById("tv_li_"+_master);
    if (li) {
      ul=document.createElement("UL");
      ul.id="tv_ul_"+_master;
      li.appendChild(ul);
    } else {
             alert('Не найдена мастер-ветка с кодом '+_master);
             return false;
    }
  }

  var li=document.createElement("LI");
  li.innerHTML='<div><p><a id=tv_a1_'+_id+' href="#"></a>'+
               '<input type=checkbox code="'+_id+'" id=tv_cb_'+_id+((_vis)?' checked':'')+' onclick="ec(\'changenodevisibility\', \'id='+_id+'&sys='+((page=='TNAManagePageAuto')?1:2)+'&vis=\'+this.checked, \'newbj\');" title="Видимость">'+
               '<a href="#" id=tv_a2_'+_id+' code="'+_id+'" title="'+_sysname+'" mainnode="'+_mainnode+'" isend="'+_isend+'">'+_name+'</a>'+
               '<img id=smnp_'+_id+' src="/images/forward_4423.png" align=middle onclick="setmainode('+_id+');" '+((_isend && (_id==_mainnode))?'':'style="visibility: hidden;"')+'></p></div>';
  li.className='cl';
  li.id="tv_li_"+_id;
  ul.appendChild(li);
  return true;
}


// добавляет узел в дерево для подбора
function addbranchsel(_id, _master, _name, _qty, _pref, _drawfilter, _motul,_model_id,_contract,haswares) {
  var li;
  var ul=document.getElementById(_pref+"_ul_"+_master);
  //console.log(ul);
  if (!ul) {
    li=document.getElementById(_pref+"_li_"+_master);
    if (li) {
      ul=document.createElement("UL");
      ul.id=_pref+"_ul_"+_master;
      li.appendChild(ul);
    } else {
             alert('Не найдена мастер-ветка с кодом '+_master+'('+_pref+"_ul_"+_master+')');
             return false;
    }
  }

  var li=document.createElement("LI");
  li.innerHTML='<div><p><a id='+_pref+'_a1_'+_id+' href="#"></a><a href="#" code='+_id+' id='+_pref+'_a2_'+_id+((_qty)?' title="Кол-во, необходимое для модели - '+_qty+'"':'')
               +' >'+_name+((_qty)?' ['+_qty+']':'')+'</a>'
//               +((_drawfilter)?' <img code='+_id+' id='+_pref+'_filimg_'+_id+' src="/images/filter.jpg" align=middle style="position: relative; top: -4px; cursor: pointer;">':'')
               +((_drawfilter)?(' <img id='+_pref+'_filimg_'+_id+' code='+_id+' title="Выбор места установки" src="'+descrimageurl+'/images/filter.png" align=middle style="position: relative; top: -4px; cursor:pointer;">'):'') 
               +'</p></div>';
  li.className='cl';
  li.id=_pref+"_li_"+_id;
  ul.appendChild(li);
  return true;
}

// rep52
function all(_id, _master, _name,_wtype) {
  var li;
  var ul=document.getElementById(pref+"_ul_"+_master);
  if (!ul) {
    li=document.getElementById(pref+"_li_"+_master);
    if (li) {
      ul=document.createElement("UL");
      ul.id=pref+"_ul_"+_master;
      li.appendChild(ul);
    } else {
             alert('Не найдена мастер-ветка с кодом '+_master+'('+pref+"_ul_"+_master+')');
             return false;
    }
  }
  var li=document.createElement("LI");

  li.innerHTML='<div><p><a id='+pref+'_a1_'+_id+' href="#"></a><a href="#" class="nodetd" code='+_id+' id='+pref+'_a2_'+_id+' master="'+_master+'"'+((_wtype)?' nodes="'+_wtype+'"':'')+ '>'+_name+'</a>'
               +'</p></div>';
  li.className='cl';
  li.id=pref+"_li_"+_id;
  ul.appendChild(li);
  return true;
}

// rep52
function type(_id, _master, _name) {
  var tbl=document.getElementById(tblid);
  var row=tbl.insertRow(-1);
      row.style.display='none';
	  $(row).attr("code",_id);
	  $(row).attr("master",_master);
  var newcell=row.insertCell(-1);
      newcell.title= 'Удалить узел';
	  newcell.code=_id;
      newcell.innerHTML ='<input type=checkbox code="'+_id+'" master="'+_master+'" title="Выбор">';
  var newcell=row.insertCell(-1);
      newcell.innerHTML =' <a code='+_id+' id='+_id+' master="'+_master+'" >'+_name+'</a>';
}


// добавляет бренд в дерево
function addbrand(_id, _master, _name) {
  var li=document.createElement("LI");
  li.innerHTML='<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a><a href="#" id=ali_'+_id+'>'+_name+'</a></p></div>';
  li.className='cl';
  lastbrand=document.createElement("UL");
  li.appendChild(lastbrand);
  document.getElementById("ulmain").appendChild(li);
}

// добавляет группу в дерево
function addgroup(_id, _name) {
  var li=document.createElement("LI");
  li.innerHTML='<div><p><a href="#" id=ali_'+_id+'>'+_name+'</a></p></div>';
  lastbrand.appendChild(li);
}

/* --- деревооооооо --- */


function addmanufrow(_id, _name, _top, _candel, _sys, _vis) {
  var row=tbl.insertRow(-1);

  row.id='manuftr'+_id;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (_top) newcell.style.fontWeight='bold';

  var s='';

  if (flNewModeCGI) {
    if (!_candel) s+='<a class="abgslide" style="background-image: url(/images/'+descrimageurl+'wdell.png); right: 0px; top: 0px;" '
      +'onclick="ecq(\'delmanufacturer\', \'id='+_id+'&sys='+_sys+'\', \'newbj\', \'Вы действительно хотите удалить производителя '+_name+'?\');" href="#" title="Удалить производителя"></a>';
  
    s+='<a class="abgslide" style="background-image: url(/images/wedit.png); right: 16px; top: 0px;" '
      +'onclick="aemanufacturerNew('+_id+', \''+_name+'\', '+_top+', '+_sys+', $(\'#vismanuf_'+_id+'\')[0].checked);" href="#" title="Изменить наименование производителя"></a>';

    newcell.innerHTML='<div style="position: relative; width: 100%;">'
               +'<input type=checkbox id=vismanuf_'+_id+' '+((_vis)?'checked':'')+' onclick=\'ec("editmanufacturer", "id='+_id+'&sys='+_sys+'&_name='+_name+'&_top='+((_top)?"on":"")+'&_vis="+((this.checked)?"on":""), "newbj");\'>'
               +'<span><a href="#" onclick=\'ec("loadmodelline", "id='+_id+'&sys='+_sys+'&top=1", "newbj");\'>'+_name+'</a></span>'+s+'</div>';
  }
  else{
    if (!_candel) s+='<a class="abgslide" style="background-image: url(/images/'+descrimageurl+'wdell.png); right: 0px; top: 0px;" '
      +'onclick="ecq(\'delmanufacturer\', \'id='+_id+'&sys='+_sys+'\', \'difdict\', \'Вы действительно хотите удалить производителя '+_name+'?\');" href="#" title="Удалить производителя"></a>';
  
    s+='<a class="abgslide" style="background-image: url(/images/wedit.png); right: 16px; top: 0px;" '
      +'onclick="aemanufacturer('+_id+', \''+_name+'\', '+_top+', '+_sys+', $(\'#vismanuf_'+_id+'\')[0].checked);" href="#" title="Изменить наименование производителя"></a>';

    newcell.innerHTML='<div style="position: relative; width: 100%;">'
                   +'<input type=checkbox id=vismanuf_'+_id+' '+((_vis)?'checked':'')+' onclick=\'ec("editmanufacturer", "id='+_id+'&sys='+_sys+'&_name='+_name+'&_top='+((_top)?"on":"")+'&_vis="+((this.checked)?"on":""), "difdict");\'>'
                   +'<span><a href="#" onclick=\'ec("loadmodelline", "id='+_id+'&sys='+_sys+'&top=1", "difdict");\'>'+_name+'</a></span>'+s+'</div>';
  }
}

function aemanufacturer(_id, _name, _top, _sys, _vis) {
  var s='';
  s+='<div>';
  s+='<form  onsubmit="return sfba(this);" method=post action="'+scriptname+'/difdict">';
  s+='<input type=hidden name=act value='+((_id)?'edit':'add')+'manufacturer>';
  s+='<input type=hidden name=id value='+_id+'>';
  s+='<input type=hidden name=sys value='+_sys+'>';
  s+='Наименование: <input type=text name=_name value="'+_name+'"><br />';
  s+='Топ-признак: <input type=checkbox name=_top '+((_top)?'checked':'')+'>&nbsp;';
  s+='Видимость: <input type=checkbox name=_vis '+((_vis)?'checked':'')+'><br />';
  s+='<center><input type=submit value="'+((_id)?'Сохранить изменения':'Добавить производителя')+'">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></center>';
  s+='</form>';
  s+='</div>';
  sw(s, false);
}

function aemanufacturerNew(_id, _name, _top, _sys, _vis) {
  var s='';
  s+='<div>';
  s+='<form  onsubmit="return sfba(this);" method=post action="'+scriptname+'/newbj">';
  s+='<input type=hidden name=act value='+((_id)?'edit':'add')+'manufacturer>';
  s+='<input type=hidden name=id value='+_id+'>';
  s+='<input type=hidden name=sys value='+_sys+'>';
  s+='Наименование: <input type=text name=_name value="'+_name+'"><br />';
  s+='Топ-признак: <input type=checkbox name=_top '+((_top)?'checked':'')+'>&nbsp;';
  s+='Видимость: <input type=checkbox name=_vis '+((_vis)?'checked':'')+'><br />';
  s+='<center><input type=submit value="'+((_id)?'Сохранить изменения':'Добавить производителя')+'">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></center>';
  s+='</form>';
  s+='</div>';
  sw(s, false);
}

function addmodellinerow(_id, _name, _vis, _top, _sys, _title, byear, bmonth, eyear, emonth, _candel, pid) {
  var row=tbl.insertRow(-1);
  row.id='modellinetr'+_id;
  row.name=_id;
  row.className=(altrow?'lblchoice':'lblchoice altrow');
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (_top) newcell.style.fontWeight='bold';

  var s='';
 if (flNewModeCGI) {
     if (!_candel) s+='<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wdell.png); right: 0px; top: 0px;" '
       +'onclick="ecq(\'delmodelline\', \'id='+_id+'&sys='+_sys+'\', \'newbj\', \'Вы действительно хотите удалить модельный ряд '+_name+'?\');" href="#" title="Удалить модельный ряд"></a>';
   
     s+='<a class="abgslide" style="background-image: url(/images/wedit.png); right: 16px; top: 0px;" '
       +'onclick="aemodellineNew('+_id+','+pid+', '+_sys+', \''+_name+'\', '+_top+');" href="#" title="Редактировать модельный ряд"></a>';
   
   //alert(' onclick=\'ec("editmodelline", "id='+_id+'&pid=&sys='+_sys+'&_name='+_name+'&_top='+((_top)?"on":"")+'&_vis="+((this.checked)?"on":""), "difdict");\'>');
   
     newcell.innerHTML='<div style="position: relative; width: 100%;">'
                      +'<input type=checkbox id=vismodline_'+_id+' '+((_vis)?'checked':'')+' onclick=\'ec("editmodelline", "id='+_id+'&pid=&sys='+_sys+'&_name='+_name+'&byear='+byear+'&bmonth='+bmonth+'&eyear='+eyear+'&emonth='+emonth+'&_top='+((_top)?"on":"")+'&_vis="+((this.checked)?"on":""), "newbj");\'>'
                      +'<span><a href="#" onclick=\'ec("loadmodels", "id='+_id+'&sys='+_sys+'&top=1", "newbj");\'>'+_name+_title+'</a></span>'+s+'</div>';
 }
 else{
    if (!_candel) s+='<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wdell.png); right: 0px; top: 0px;" '
      +'onclick="ecq(\'delmodelline\', \'id='+_id+'&sys='+_sys+'\', \'difdict\', \'Вы действительно хотите удалить модельный ряд '+_name+'?\');" href="#" title="Удалить модельный ряд"></a>';
  
    s+='<a class="abgslide" style="background-image: url(/images/wedit.png); right: 16px; top: 0px;" '
      +'onclick="aemodelline('+_id+','+pid+', '+_sys+', \''+_name+'\', '+_top+');" href="#" title="Редактировать модельный ряд"></a>';
  
  //alert(' onclick=\'ec("editmodelline", "id='+_id+'&pid=&sys='+_sys+'&_name='+_name+'&_top='+((_top)?"on":"")+'&_vis="+((this.checked)?"on":""), "difdict");\'>');
  
    newcell.innerHTML='<div style="position: relative; width: 100%;">'
                     +'<input type=checkbox id=vismodline_'+_id+' '+((_vis)?'checked':'')+' onclick=\'ec("editmodelline", "id='+_id+'&pid=&sys='+_sys+'&_name='+_name+'&byear='+byear+'&bmonth='+bmonth+'&eyear='+eyear+'&emonth='+emonth+'&_top='+((_top)?"on":"")+'&_vis="+((this.checked)?"on":""), "difdict");\'>'
                     +'<span><a href="#" onclick=\'ec("loadmodels", "id='+_id+'&sys='+_sys+'&top=1", "difdict");\'>'+_name+_title+'</a></span>'+s+'</div>';
 }
//alert(newcell.innerHTML);
  modelline[parseInt(_id)]=[byear, bmonth, eyear, emonth, _vis, _top];
}

function aemodelline(_id, _pid, _sys, _name, _top, _vis) {
  var s='';
  var s1, s2, byear, bmonth, eyear, emonth;

  byear=bmonth=eyear=emonth='';

  if (_id) {
    byear=((modelline[_id][0])?modelline[_id][0]:"");
    bmonth=((modelline[_id][1])?modelline[_id][1]:"");
    eyear=((modelline[_id][2])?modelline[_id][2]:"");
    emonth=((modelline[_id][3])?modelline[_id][3]:"");
    _vis=((modelline[_id][4])?modelline[_id][4]:"");
    _top=((modelline[_id][5])?modelline[_id][5]:"");
  }

  s+='<div>';
  s+='<form  onsubmit="return sfba(this);" method=post action="'+scriptname+'/difdict">';
  s+='<input type=hidden name=act value='+((_id)?'edit':'add')+'modelline>';
  s+='<input type=hidden name=id value='+_id+'>';
  s+='<input type=hidden name=pid value='+_pid+'>';
  s+='<input type=hidden name=sys value='+_sys+'>';
  s+='Наименование: <input type=text name=_name value="'+_name+'"><br />';
  s+='Топ-признак: <input type=checkbox name=_top '+((_top)?'checked':'')+'>&nbsp;';
  s+='Видимость: <input type=checkbox name=_vis '+((_vis)?'checked':'')+'><br />';
  s+='<table>';
  s+='<tr><td></td><td>Год</td><td>Месяц</td></tr>';
  s+='<tr><td>Начало выпуска</td><td><input type=text name=byear value="'+byear+'" maxlength=4 size=4></td><td><input type=text name=bmonth value="'+bmonth+'" maxlength=2 size=2></td></tr>';
  s+='<tr><td>Конец выпуска</td><td><input type=text name=eyear value="'+eyear+'" maxlength=4 size=4></td><td><input type=text name=emonth value="'+emonth+'" maxlength=2 size=2></td></tr>';
  s+='</table>';

  s+='<center><input type=submit value="'+((_id)?'Сохранить изменения':'Добавить модельный ряд')+'">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></center>';
  s+='</form>';
  s+='</div>';
  sw(s, false);
}

function aemodellineNew(_id, _pid, _sys, _name, _top, _vis) {
  var s='';
  var s1, s2, byear, bmonth, eyear, emonth;

  byear=bmonth=eyear=emonth='';

  if (_id) {
    byear=((modelline[_id][0])?modelline[_id][0]:"");
    bmonth=((modelline[_id][1])?modelline[_id][1]:"");
    eyear=((modelline[_id][2])?modelline[_id][2]:"");
    emonth=((modelline[_id][3])?modelline[_id][3]:"");
    _vis=((modelline[_id][4])?modelline[_id][4]:"");
    _top=((modelline[_id][5])?modelline[_id][5]:"");
  }

  s+='<div>';
  s+='<form  onsubmit="return sfba(this);" method=post action="'+scriptname+'/newbj">';
  s+='<input type=hidden name=act value='+((_id)?'edit':'add')+'modelline>';
  s+='<input type=hidden name=id value='+_id+'>';
  s+='<input type=hidden name=pid value='+_pid+'>';
  s+='<input type=hidden name=sys value='+_sys+'>';
  s+='Наименование: <input type=text name=_name value="'+_name+'"><br />';
  s+='Топ-признак: <input type=checkbox name=_top '+((_top)?'checked':'')+'>&nbsp;';
  s+='Видимость: <input type=checkbox name=_vis '+((_vis)?'checked':'')+'><br />';
  s+='<table>';
  s+='<tr><td></td><td>Год</td><td>Месяц</td></tr>';
  s+='<tr><td>Начало выпуска</td><td><input type=text name=byear value="'+byear+'" maxlength=4 size=4></td><td><input type=text name=bmonth value="'+bmonth+'" maxlength=2 size=2></td></tr>';
  s+='<tr><td>Конец выпуска</td><td><input type=text name=eyear value="'+eyear+'" maxlength=4 size=4></td><td><input type=text name=emonth value="'+emonth+'" maxlength=2 size=2></td></tr>';
  s+='</table>';

  s+='<center><input type=submit value="'+((_id)?'Сохранить изменения':'Добавить модельный ряд')+'">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></center>';
  s+='</form>';
  s+='</div>';
  sw(s, false);
}

function addfirmrow(_id, _uppername, _name, _prefix,_limit) {
  var row=tbl.insertRow(-1);

  row.id='firmtr'+_id;
  row.name=_id;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML='<a href="#" onclick=\'ec("loadpersons", "id='+_id+'", "mppactions");\'>'+_uppername+'</a>';

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML='<a href="#" onclick=\'ec("loadpersons", "id='+_id+'", "mppactions");\'>'+_name+'</a>';
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=_limit;
}

function addfirmrowNew(_id, _uppername, _name, _prefix,_limit) {
  var row=tbl.insertRow(-1);

  row.id='firmtr'+_id;
  row.name=_id;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML='<a href="#" onclick=\'ec("loadpersons", "id='+_id+'", "newbj");\'>'+_uppername+'</a>';

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML='<a href="#" onclick=\'ec("loadpersons", "id='+_id+'", "newbj");\'>'+_name+'</a>';

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=_prefix;
  
  if (flFirmLimits){
    newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.style.color="red";
    newcell.innerHTML=_limit;
  }
}

function addpersonrow(_id, _pid, _super, _name, _post, _phone, _email, _login, _blocked, _showunblockbutton,listbtn) {
  var row=tbl.insertRow(-1);

  row.id='persontr'+_id;
  row.name=_id;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  newcell.style.width='19px';
//  var s=((_super)?'1':(((_name && _post && _email) || _login)?'2':'3'));
  var s=((_super)?'1':(((_name && _email))?'2':'3'));
  var s1='<img src="/images/user'+s+'.png"';
  switch (s) {
    case '1':
      s1+=' title="Главный пользователь"';
      break
    case '2':
      s1+=' title="Сделать пользователя главным"';
      if (_login) {
        s1+=' onclick=\'ec("makesuper", "id='+_id+'&pid='+_pid+'", "mppactions");\' style="cursor: pointer;"';
      } else {
        var s2='';
        s2+='<form  onsubmit=\\"return sfba(this);\\" method=\\"post\\" action=\\"'+scriptname+'/mppactions\\">';
        s2+='<input type=hidden name=\\"act\\" value=makesuper>';
        s2+='<input type=hidden name=\\"id\\" value='+_id+'>';
        s2+='<input type=hidden name=\\"pid\\" value='+_pid+'>';
        s2+='Введите логин пользователя: <input type=text name=\\"_login\\"><input type=\\"submit\\" value=\\"Назначить\\">';
        s2+='</form>';
        s1+=' onclick=\'sw("'+s2+'", false);\' style="cursor: pointer;"';
      }
      s1+=' style="cursor: pointer;"';
      break
    case '3':
      s1+=' title="Нельзя ввести в систему пользователя, если у него не указаны имя или email"';
      s1+=' onclick=\'alert("Нельзя ввести в систему пользователя, если у него не указаны имя или email");\'';
  }

  newcell.innerHTML=s1+'>';

/*
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  newcell.style.width='16px';
  if (_login) newcell.innerHTML='<img src="/images/key.png"'+
                                ' onclick=\'ecq("changepass", "id='+_id+'&pid='+_pid+'", "mppactions", "Вы действительно хотите сменить пароль пользователя '+_login+'?");\' style="cursor: pointer;"'+
                                'title="Сменить пароль">';
*/

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=_name;
  newcell.innerHTML=(_name)?_name:"<span style='color: red;' title='Отсутствует имя! Контактному лицу без имени нельзя присвоить логин!' >Отсутствует имя!</span>";

  newcell=row.insertCell(-1);
  if (_blocked) {
    if (_showunblockbutton) {
      newcell.innerHTML="<input type=button id=unblockbtn"+_id+" value='Разблокировать' onclick=\"ecfull('unblockwebuser', 'id="+_id+"', 'difdict', 'post', true, 'Вы действительно хотите разблокировать пользователя?');\">";
    } else {
      newcell.innerHTML="Заблокирован";
    }
  }
  
  newcell=row.insertCell(-1);
  if ((listbtn)  && (_blocked)){
    s1='<button class="blocks-history-btn" onclick="ec(\'getlisthistoryblocks\',\'emplid='+_id+'\',\'newbj\');" title="История блокировок" >'+
       '  <img src="/images/tr.gif" style="height: 16px; width: 16px; background-image: url(\'/images/wnew.png\'); right: 16px;\">'+
       '</button>';
    newcell.innerHTML=s1;
   
  }
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=_post;
  newcell.innerHTML=(_post)?_post:"<span style='color: red;' title='Отсутствует должность! Контактному лицу без должности нельзя присвоить логин!' >Отсутствует должность!</span>";

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=_phone;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=_email;
  newcell.innerHTML=(_email)?_email:"<span style='color: red;' title='Отсутствует email! Без email клиент не может полноценно работать в СВК!' >Отсутствует email!</span>";

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=_login;
}

function addtraidpointrow( _name, _adr) {
  var row=tbl.insertRow(-1);
  row.className=(altrow?'altrow':'');
  altrow=!altrow;
  var newcell;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.style.verticalAlign='middle';
  newcell.style.width='300px';
  newcell.innerHTML=_name;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.style.verticalAlign='middle';
  newcell.innerHTML=_adr;
}

function addcontractrow(Name,LegalFirmName,PayType,dprtName,sCred,DebtSum,OrderSum,Status,RedSum,VioletSum,ContComments,ContBegDate,ContEndDate,ProfDebtAll,rowspan,is_united) {
  var row=tbl.insertRow(-1);
  row.className=(altrow?'altrow':'');
  altrow=!altrow;
  var newcell;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=Name;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=LegalFirmName;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=PayType;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=dprtName;
  
  if (is_united==1){
    newcell=row.insertCell(-1);
    newcell.style.textAlign='center';
    newcell.style.verticalAlign='middle';
    //newcell.style.width='19px';
    newcell.innerHTML=sCred;
    newcell.rowSpan=rowspan;
  }

  
 if (is_united==1){
   newcell=row.insertCell(-1);
   newcell.style.textAlign='center';
   newcell.style.verticalAlign='middle';
   //newcell.style.width='19px';
   newcell.innerHTML=ProfDebtAll;
   newcell.rowSpan=rowspan;
 }

  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=DebtSum;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=OrderSum;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=Status;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=RedSum;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=VioletSum;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML=ContComments;
  
  if (ContBegDate !=' '){
    newcell=row.insertCell(-1);
    newcell.style.textAlign='center';
    newcell.style.verticalAlign='middle';
    //newcell.style.width='19px';
    newcell.innerHTML=ContBegDate;
  
    newcell=row.insertCell(-1);
    newcell.style.textAlign='center';
    newcell.style.verticalAlign='middle';
    //newcell.style.width='19px';
    newcell.innerHTML=ContEndDate;
  }
  
  
}


function addcontractrowHeader() {
  var tbl_header=$("#contactstableheader")[0];
  while (tbl_header.rows.length) tbl_header.deleteRow(0);
  var row=tbl_header.insertRow(-1);
  row.className=('header');
  var newcell;
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="№";
  newcell.title="Номер контракта";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Юр. лицо";

 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Форма оплаты";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Склад отгрузки";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Кред.условия";
  newcell.title="Сумма кредита / Отсрочка";
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Общий долг";
  newcell.title="Долг по профилю";
   
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Долг/переплата";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Резерв";
  newcell.title="Сумма резерва, у.е";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Статус";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Просрочено";
  newcell.title="Сумма просроченных платежей, у.е";
 
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Истекает срок";
  newcell.title="Сумма платежей, по которым истекает срок, у.е";

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Комментарий"; 
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Дата начала"; 
  
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  //newcell.style.width='19px';
  newcell.innerHTML="Дата окончания"; 
  

}

function addpersonrowNew(_id, _pid, _super, _name, _post, _phone, _email, _login, _blocked, _showunblockbutton) {
  var row=tbl.insertRow(-1);

  row.id='persontr'+_id;
  row.name=_id;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  newcell.style.width='19px';
//  var s=((_super)?'1':(((_name && _post && _email) || _login)?'2':'3'));
  var s=((_super)?'1':(((_name && _post && _email))?'2':'3'));
  var s1='<img src="/images/user'+s+'.png"';
  switch (s) {
    case '1':
      s1+=' title="Главный пользователь"';
      break
    case '2':
      s1+=' title="Сделать пользователя главным"';
      if (_login) {
        s1+=' onclick=\'ec("makesuper", "id='+_id+'&pid='+_pid+'", "newbj");\' style="cursor: pointer;"';
      } else {
        var s2='';
        s2+='<form  onsubmit=\\"return sfba(this);\\" method=\\"post\\" action=\\"'+scriptname+'/newbj\\">';
        s2+='<input type=hidden name=\\"act\\" value=makesuper>';
        s2+='<input type=hidden name=\\"id\\" value='+_id+'>';
        s2+='<input type=hidden name=\\"pid\\" value='+_pid+'>';
        s2+='Введите логин пользователя: <input type=text name=\\"_login\\"><input type=\\"submit\\" value=\\"Назначить\\">';
        s2+='</form>';
        s1+=' onclick=\'sw("'+s2+'", false);\' style="cursor: pointer;"';
      }
      s1+=' style="cursor: pointer;"';
      break
    case '3':
      s1+=' title="Нельзя ввести в систему пользователя, если у него не указаны имя, должность или email"';
      s1+=' onclick=\'alert("Нельзя ввести в систему пользователя, если у него не указаны имя и должность");\'';
  }

  newcell.innerHTML=s1+'>';

/*
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.style.verticalAlign='middle';
  newcell.style.width='16px';
  if (_login) newcell.innerHTML='<img src="/images/key.png"'+
                                ' onclick=\'ecq("changepass", "id='+_id+'&pid='+_pid+'", "mppactions", "Вы действительно хотите сменить пароль пользователя '+_login+'?");\' style="cursor: pointer;"'+
                                'title="Сменить пароль">';
*/

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=_name;
  newcell.innerHTML=(_name)?_name:"<span style='color: red;' title='Отсутствует имя! Контактному лицу без имени нельзя присвоить логин!' >Отсутствует имя!</span>";

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=_post;
  newcell.innerHTML=(_post)?_post:"<span style='color: red;' title='Отсутствует должность! Контактному лицу без должности нельзя присвоить логин!' >Отсутствует должность!</span>";

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=_phone;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=_email;
  newcell.innerHTML=(_email)?_email:"<span style='color: red;' title='Отсутствует email! Без email клиент не может полноценно работать в СВК!' >Отсутствует email!</span>";

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=_login;

  newcell=row.insertCell(-1);
  if (_blocked) {
    if (_showunblockbutton) {
      newcell.innerHTML="<input type=button id=unblockbtn"+_id+" value='Разблокировать' onclick=\"ecfull('unblockwebuser', 'id="+_id+"', 'difdict', 'post', true, 'Вы действительно хотите разблокировать пользователя?');\">";
    } else {
      newcell.innerHTML="Заблокирован";
    }
  }

}



function addregordrow(OREGCODE,
          OREGFIRMNAME,
          OREGREGION,
          OREGMAINUSERFIO,
          OREGMAINUSERPOST,
          OREGLOGIN,
          OREGCLIENT,
          OREGADDRESS,
          OREGPHONES,
          OREGEMAIL,
          OREGTYPE,
          OREGSTATE,
          OREGPROCESSINGTIME,
          OREGCOMMENT,
          OREGDPRTCODE,
          OREGUSERCODE,
          OREGUSERNAME,
          OREGCREATETIME
) {
  var types=new Array('СТО', 'магазин', 'стол заказов', 'другой');
  var comment='';
  comment+='Организация: <i>'+OREGFIRMNAME+'</i><br />';
  comment+='Регион: <i>'+OREGREGION+'</i><br />';
  comment+='ФИО главного пользователя: <i>'+OREGMAINUSERFIO+'</i><br />';
  comment+='Должность главного пользователя: <i>'+OREGMAINUSERPOST+'</i><br />';
  comment+='Желаемый логин: <i>'+OREGLOGIN+'</i><br />';
  comment+='Является ли клиентом Компании: <i>'+((OREGCLIENT)?'Да':'Нет')+'</i><br />';
  comment+='Адрес: <i>'+OREGADDRESS+'</i><br />';
  comment+='Телефон: <i>'+OREGPHONES+'</i><br />';
  comment+='Email: <i>'+OREGEMAIL+'</i><br />';
  comment+='Тип '+types[OREGTYPE]+'</i><br />';
  if (OREGSTATE==0) {
    comment+='Состояние заявки: Не обработана</i><br />';
  } else
  if (OREGSTATE==1) {
    comment+='Состояние заявки: Выполнена</i><br />';
  } else
  if (OREGSTATE==2) {
    comment+='Состояние заявки: Аннулирована</i><br />';
  }
  comment+='Комментарий: <i>'+OREGCOMMENT+'</i><br />';
  if ($('#dprtopt'+OREGDPRTCODE)[0]) {
    comment+='Филиал: <i>'+$('#dprtopt'+OREGDPRTCODE).html()+'</i><br />';
  } else {
    comment+='Филиал: <i>'+OREGDPRTCODE+'</i><br />';
  }
  comment+='Дата создания: <i>'+OREGCREATETIME+'</i><br />';



  var row=tbl.insertRow(-1);

  row.id='regordertr'+OREGCODE;
  row.name=OREGCODE;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.innerHTML=OREGCREATETIME;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  if (OREGSTATE==0) {
    newcell.innerHTML='<a class=ahint title="Не обработана">'+OREGSTATE+'</a>';
  } else
  if (OREGSTATE==1) {
    newcell.innerHTML='<a class=ahint title="Выполнена">'+OREGSTATE+'</a>';
  } else
  if (OREGSTATE==2) {
    newcell.innerHTML='<a class=ahint title="Аннулирована">'+OREGSTATE+'</a>';
  }

  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  if (OREGSTATE==0) {
    newcell.innerHTML='<a class="abgslide" style="background-image: url(\'/images/wplus.png\'); position: static; float:left; display: block;" onclick="procregord(\''+OREGCODE+'\', \''+OREGLOGIN+'\');" href="#" title="Выполнить заявку"></a>'
                     +'<a class="abgslide" style="background-image: url(\''+descrimageurl+'/images/wdell.png\'); position: static; float:left; display: block;" onclick="annregord (\''+OREGCODE+'\');" href="#" title="Аннулировать заявку"></a>';
  } else {
    newcell.innerHTML='&nbsp;';
  }



  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
//  newcell.innerHTML=OREGDPRTCODE;
  if ($('#dprtopt'+OREGDPRTCODE)[0]) {
    newcell.innerHTML=$('#dprtopt'+OREGDPRTCODE).html();
  } else {
    newcell.innerHTML=OREGDPRTCODE;
  }

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML='<a class="ahint" style="cursor: pointer;" onclick="sw(\''+comment+'\', false);">'+OREGFIRMNAME+'</a>';
  newcell.firstChild.title=comment;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (OREGREGION.length>15) {
    newcell.innerHTML='<a class=ahint title="'+OREGREGION+'">'+OREGREGION.substr(0,12)+'...</a>';
  } else {
    newcell.innerHTML=OREGREGION;
  }
/*
  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=OREGMAINUSERFIO;

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.innerHTML=OREGMAINUSERPOST;
*/
  newcell=row.insertCell(-1);
  newcell.style.textAlign='center';
  newcell.innerHTML=''+((OREGCLIENT)?'<img src="/favicon.png">':'');

  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (OREGADDRESS.length>30) {
    newcell.innerHTML='<a class=ahint title="'+OREGADDRESS+'">'+OREGADDRESS.substr(0,27)+'...</a>';
  } else {
    newcell.innerHTML=OREGADDRESS;
  }
/*
  newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (OREGPHONES.length>20) {
    newcell.innerHTML='<a class=ahint title="'+OREGPHONES+'">'+OREGPHONES.substr(0,17)+'...</a>';
  } else {
    newcell.innerHTML=OREGPHONES;
  }
*/
}

function annregord(id) {
  var s=prompt('Пожалуйста, укажите причину аннуляции');
  if (s) {
    ec('annregord', 'id='+id+'&reason='+s,  fnIfStr(flNewModeCGI,'newbj','mppactions'));
  }
}

function procregord(id, login) {
  if ($("#selfirm")[0].disabled)  ec('getfirmlist', 'selfirm=selfirm&selperson=selperson&settrigger=1', 'newbj');
  $("#divtabl1 input[name^='id']").val(id);
  $("#selpersonlogin").val(login);
  $("#selfirm").val('');
  $("#selfirmhidden").val('');
  $("#divtabl1").dialog("open");
  $("#selperson")[0].options.length=0;;

/*
  var s='';
  s+='<div id=divtabl1>';
  s+='<form onsubmit="return sfba(this);" method=post action="'+scriptname+'/mppactions">';
  s+='<input type=hidden name=act value=confirmregord>';
  s+='<input type=hidden name=id value='+id+'><table>';
  s+='<table id=tabl1 style="position: relative; font-size: 11px;">';

  s+='<tr>';
  s+='  <td style="text-align: right;">Логин: </td>';
  s+='  <td><input type=text maxlength=20 name=login id=selpersonlogin value="'+login+'"></td>';
  s+='</tr>';

  s+='<tr>';
  s+='  <td style="text-align: right;">Контрагент: </td>';
//  s+='  <td><SELECT style="width: 400px;" name=firm id=selfirm onchange="$(\'#selperson\')[0].options.length=0; ec(\'getpersonlist\', \'pid=\'+this.value+\'&selperson=selperson\', \'mppactions\');"></select>';
  s+='  <td><SELECT style="width: 400px;" name=firm id=selfirm ></select>';
  s+='</tr>';

  s+='<tr>';
  s+='  <td style="text-align: right;">Должн. лицо: </td>';
  s+='  <td><SELECT style="width: 400px;" name=person id=selperson></select>';
  s+='</tr>';

  s+='<tr>';
  s+='  <td style="text-align: center;" colspan=2><input type=submit value="Выполнить заявку">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></td>';
  s+='</tr>';

  s+='</table>';
  s+='</form>';
  s+='</div>';

  sw(s, false);
  ec('getfirmlist', 'selfirm=selfirm&selperson=selperson&settrigger=1', 'mppactions');
*/
}


function aeregzone(_id) {
  var s='';

  s+='<div>';
  if (flNewModeCGI){
   s+='<form  onsubmit="return sfbaNew(this);" method=post action="'+scriptname+'/newbj">'; 
  }
  else{
    s+='<form  onsubmit="return sfba(this);" method=post action="'+scriptname+'/mppactions">';
  }
  s+='<input type=hidden name=act value='+((_id)?'edit':'add')+'regzone>';
  s+='<input type=hidden name=id value='+_id+'><table>';
  s+='<tr><td style="text-align: right">Наименование: </td><td><input type=text name=_name value="'+((_id)?($('#regzone'+_id)[0].cells[0].firstChild.firstChild.innerHTML):'')+'" size=30><td></tr>';
  s+='<tr><td style="text-align: right">E-mail: </td><td><input type=text name=_email value="'+((_id)?$('#regzone'+_id)[0].cells[1].innerHTML:'')+'" size=30><td></tr>';
  s+='<tr><td style="text-align: right">Филиал: </td><td><select name=_dprt id=_dprt>'+dprtstr+'</select><td></tr>';
  s+='<tr><td style="text-align: center" colspan=2><input type=submit value="'+((_id)?'Сохранить изменения':'Добавить область')+'">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"><td></tr>';
  s+='</table>';
  s+='</div>';
  s+='</form>';
  sw(s, false);
  if (_id)  {
    document.getElementById('_dprt').value=document.getElementById('hspan'+_id).innerHTML;
  }
}

function addmodelrow(_id, _candel, _name, _vis, _top, _title, ordnum, sitemodelid) {
  var row=tbl.insertRow(-1);

  row.id='modeltr'+_id;
  row.name=_id;
  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (_top) newcell.style.fontWeight='bold';

  var s='';

  if (_candel) s+='<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wdell.png); right: 0px; top: 0px;" '
    +'onclick="ecq(\'delmodel\', \'id='+_id+'&pid=\'+$(\'#addmodel\').attr(\'name\'), \'difdict\', \'Вы действительно хотите удалить модель '+_name+'?\');" href="#" title="Удалить модель"></a>';

  s+='<a class="abgslide" style="background-image: url(/images/wedit.png); right: 16px; top: 0px;" '
    +'onclick="d'+((page=='prDirModelPageAuto')?'a':'m')+'mw(\''+_id+'\', '+ordnum+', '+sitemodelid+');" href="#" title="Редактировать модель"></a>';

  newcell.innerHTML='<div style="position: relative; width: 100%;"><input type=checkbox id=vismodel_'+_id+' '+((_vis)?'checked':'')
                   +' onclick=\'ec("setmodelvis", "id='+_id+'&vis="+this.checked, "difdict");\''
                   +'><span>'+_name+'</span>'+_title+s+'</div>';
}

function addmodelrowforselect(_id, _candel, _name, _vis, _top, _title, _objdiv, _treediv, _pref, _codeformotosite) {
  var row=tbl.insertRow(-1);
  var pow = power; 
  var eng = engines;
  row.id='modeltr'+_id;
  row.name=_id;
  row.className=(altrow?'lblchoice':'lblchoice altrow');
  altrow=!altrow;
    
  if (_pref) {
    row.onclick=function(){showmodtree(_id, _objdiv, _treediv, _pref);};
  }  
  else 
    {
    row.onclick=function(){
      $("#repnode").css("display","block");
    var id = _id;
    $('#modelauto').attr("code", _id);
    $('#dop_model').attr("value", _id);
    $('#modelauto').html('<img src="/images/more.png" style="cursor: pointer;" onclick="ec(\'loadmodeldatatext\', \'model='+_id+'\', \'abj\');">'+'  '+_name+'&nbsp;'
    +_title+'&nbsp;'+pow+' лс'+'&nbsp;'+eng); 
    $('#divmodeltable').dialog('close');
  
    }
  }
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    if (_top) newcell.style.fontWeight='bold';
  
    var s='';
  
    if ((_pref=='sel_auto') || !(_pref) || (_pref=='sel_cv') || (_pref=='sel_ax')) {
        s+='<img src="/images/more.png" style="cursor: pointer;" onclick="ec(\'loadmodeldatatext\', \'model='+_id+'\', \'abj\'); event.stopPropagation();">&nbsp;'
        s+=_name;
        newcell.innerHTML=s;
  
        newcell=row.insertCell(-1);
        newcell.style.textAlign='left';
        if (_top) newcell.style.fontWeight='bold';
        newcell.innerHTML=_title;
        if ((_pref=='sel_auto') || !(_pref) || (_pref=='sel_cv')){
          newcell=row.insertCell(-1);
          newcell.style.textAlign='center';
          if (_top) newcell.style.fontWeight='bold';
          newcell.innerHTML=power+' лс';
      
          if (tonna){
            newcell=row.insertCell(-1);
            newcell.style.textAlign='center';
            newcell.innerHTML=tonna;
          } 
          newcell=row.insertCell(-1);
          newcell.style.textAlign='left';
          if (_top) newcell.style.fontWeight='bold';
          newcell.innerHTML=engines;
        }
        if (_pref=='sel_ax'){
          newcell=row.insertCell(-1);
          newcell.style.textAlign='center';
          if (_top) newcell.style.fontWeight='bold';
          newcell.innerHTML=power;
 
          newcell=row.insertCell(-1);
          newcell.style.textAlign='left';
          if (_top) newcell.style.fontWeight='bold';
          newcell.innerHTML=engines;
        }
    } else {
      if (_codeformotosite) {
        //s+='<a href="http://ride.ua/models/model/id/'+_codeformotosite+'" target=_blank title="Эта модель на сайте ride.ua"><img src="/images/rideico.png"></a>'
         s+='<img src="/images/tr.gif" style="width: 16px;">'
      } else (
        s+='<img src="/images/tr.gif" style="width: 16px;">'
      )
      s+=' <a href=# onclick="showmodtree('+_id+', \''+_objdiv+'\', \''+_treediv+'\', \''+_pref+'\');">'+_name+_title+'</a>';
      newcell.innerHTML=s;
    }

}


function semw(_id) {
  var s='';

  s+='<div>';
  s+='<form  onsubmit="return sfba(this);" method=post action="'+scriptname+'/difdict">';
  s+='<input type=hidden name=act value="aemodel">';
  s+='<input type=hidden name=id value='+_id+'><table>';
  s+='<tr><td style="text-align: right">Наименование: </td><td><input type=text name=_name value="'+((_id)?($('#regzone'+_id)[0].cells[0].firstChild.firstChild.innerHTML):'')+'" size=30><td></tr>';
  s+='<tr><td style="text-align: right">E-mail: </td><td><input type=text name=_email value="'+((_id)?$('#regzone'+_id)[0].cells[1].innerHTML:'')+'" size=30><td></tr>';
  s+='<tr><td style="text-align: right">Филиал: </td><td><select name=_dprt id=_dprt>'+dprtstr+'</select><td></tr>';
  s+='<tr><td style="text-align: center" colspan=2><input type=submit value="'+((_id)?'Сохранить изменения':'Добавить область')+'">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"><td></tr>';
  s+='</table>';
  s+='</div>';
  s+='</form>';
  sw(s, false);
}
/*
function selbymod() {
  $('#selbymodeldiv').fancybox({'modal': false, 'padding': 0});
}*/

// DrawMotoModelWindow
function dmmw(id, ordnum, sitenum) {
  var s='';
  ordnum=((ordnum === undefined)?0:ordnum);
  sitenum=((sitenum === undefined)?0:sitenum);

  s+='<div><form onsubmit="return sfba(this);" method=post action="'+scriptname+'/difdict">';
  s+='<input type=hidden id=modact name=act value=aemodel>';
  s+='<input type=hidden name=id value="'+id+'">';
  s+='<input type=hidden name=pid value='+$('#addmodel').attr('name')+'>';
  s+='<input type=hidden name=sys value=2>';
  s+='Наименование: <input type=text id=modname name=_name maxlength=100 size=40 value=""><br />';
  s+='Топ-признак: <input type=checkbox id=modtop name=_top >&nbsp;';
  s+='Видимость: <input type=checkbox id=modvis name=_vis><br />';
  s+='Порядковый номер: <input type=text size=4 maxlength=4 id=ordnum name=ordnum value="'+ordnum+'"><br />';
  //s+='Код для сайта: <input type=text size=6 maxlength=6 id=sitenum name=sitenum value="'+sitenum+'"><br />';
  s+='<center><input type=submit value="Сохранить изменения">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></center>';
  s+='';
  s+='</form></div>';
  sw(s, false);
  if (id) {
    $("#modname").attr('value', $("#modeltr"+id+" td div span").html());
    $("#modtop").attr('checked', ($("#modeltr"+id+" td div span").css("font-weight")=='bold') || ($("#modeltr"+id+" td div span").css("font-weight")=='700'));
    $("#modvis").attr('checked', $("#vismodel_"+id).attr("checked"));
  }
}

// DrawAutoModelWindow
function damw(id) {
  var s='';
  s+='<div style="width: 650px;"><form onsubmit="return sfba(this);" method=post action="'+scriptname+'/difdict">';
  s+='<input type=hidden id=modact name=act value=aemodel>';
  s+='<input type=hidden name=id value="'+id+'">';
  s+='<input type=hidden name=pid value='+$('#addmodel').attr('name')+'>';
  s+='<input type=hidden name=sys value=1>';
  s+='Наименование: <input type=text id=modname name=_name maxlength=100 size=40 value=""><br />';
  s+='Топ-признак: <input type=checkbox id=modtop name=_top >&nbsp;';
  s+='Видимость: <input type=checkbox id=modvis name=_vis><br />';
  s+='Порядковый номер: <input type=text size=4 maxlength=4 id=ordnum name=ordnum><br />';
  s+='<table>';
  s+='<tr><td></td><td>Год</td><td>Месяц</td></tr>';
  s+='<tr><td>Начало выпуска</td><td><input type=text name=byear id=byear value="" maxlength=4 size=4></td><td><input type=text id=bmonth name=bmonth value="" maxlength=2 size=2></td></tr>';
  s+='<tr><td>Конец выпуска</td> <td><input type=text name=eyear id=eyear value="" maxlength=4 size=4></td><td><input type=text id=emonth name=emonth value="" maxlength=2 size=2></td></tr>';
  s+='</table>';
  s+='<table>';
  s+='  <tr>';
  s+='    <td align=right>Мощность кВт</td>';
  s+='    <td><input type=text id=powerkvt name=powerkvt></td>';
  s+='  </tr>';
  s+='  <tr>';
  s+='    <td align=right>Мощность ЛС</td>';
  s+='    <td><input type=text id=powerls name=powerls></td>';
  s+='  </tr>';
  s+='  <tr>';
  s+='    <td align=right>Тех. обьем куб.см.</td>';
  s+='    <td><input type=text id=techvol name=techvol></td>';
  s+='  </tr>';
  s+='  <tr>';
  s+='    <td align=right>Количество цилиндров</td>';
  s+='    <td><input type=text id=cylqty name=cylqty></td>';
  s+='  </tr>';
  s+='  <tr>';
  s+='    <td align=right>Кол-во клапанов на камеру сгорания</td>';
  s+='    <td><input type=text id=clapqty name=clapqty></td>';
  s+='  </tr>';

  var i=0;

  s+='  <tr>';
  s+='    <td align=right>Тип кузова</td>';
  s+='    <td><select name=bodyid id=bodyid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Тип привода</td>';
  s+='    <td><select name=driveid id=driveid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'></select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Тип двигателя</td>';
  s+='    <td><select name=enginetypeid id=enginetypeid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Тип топлива</td>';
  s+='    <td><select name=fuelid id=fuelid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Система впрыска</td>';
  s+='    <td><select name=fuelsupid id=fuelsupid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Тип тормозной системы</td>';
  s+='    <td><select name=brakeid id=brakeid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Тормозная система</td>';
  s+='    <td><select name=brakesysid id=brakesysid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Тип катализатора</td>';
  s+='    <td><select name=catalystid id=catalystid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';
  i++;
  s+='  <tr>';
  s+='    <td align=right>Вид коробки передач</td>';
  s+='    <td><select name=transboxid id=transboxid >'+(((automofelinfolists.length>i) && automofelinfolists[i])?automofelinfolists[i]:'')+'</select></td>';
  s+='  </tr>';

  i++;
  s+='  <tr>';
  s+='    <td align=center colspan=2 id=engmarks></td>';
  s+='  </tr>';
  s+='</table>';

  s+='<center><input type=submit value="Сохранить изменения">&nbsp;<input type=button value="Закрыть" onclick="$.fancybox.close();"></center>';
  s+='';
  s+='</form></div>';
  sw(s, false);
  if (!automofelinfolists.length) {
    ec('automodelinfolists', 'id='+id, 'difdict');
  } else {
    if (id) {
      ec('loadmodeldata', 'id='+id, 'difdict');
    }
  }

}

/*
// SendErrorMessage - послать сообщение об ошибке от пользователя ответственному
function sem(a, emt, cwc, ana) {
  var ss='';
  var s='<div style="width: 520px;"><form action="'+scriptname+'/difdict" onsubmit="return sfba(this);">';

  s+='<input type=hidden name=act value="senderrormessage">';
  s+='<input type=hidden name=emt value="'+emt+'">';
  s+='<input type=hidden name=warecode value="'+((emt==5)?ana:cwc)+'">';
  if ((emt==1) || (emt==6)) {
    s+='<input type=hidden name=modelcode value="'+curmotomodelcode+'">';
    s+='<input type=hidden name=nodecode value="'+curmotonodecode+'">';
    ss='Tовар <b>'+$('#tr'+cwc+' td div span a').html()+'</b> не должен находится в узле <b>'+curmotonodename+'</b> '+((emt==1)?'модели':'двигателя')+' <b>'+curmotomodelname+'</b> потому что';
    s+=ss;
  } else
  if (emt==2) {
    var s1='';
    var vals=$("select[name^='attr'][value!='0']");
    if (vals.length) {
      for (i=0; i<vals.length; i++) {
        s1+=((s1)?", ":"");
        s1+="<b>"+vals[i].parentNode.parentNode.firstChild.innerHTML+"</b>"+' - <span style="color: blue;">'+$(vals[i]).find('option[value='+vals[i].value+']').html()+"</span>";
      }
    }
    ss='Tовар <b>'+$('#tr'+cwc+' td div span a').html()+'</b> не должен появляться в результатах поиска по группе <b>'+curmotoattrgroupname+'</b> и значениям '+s1+' потому что';
    s+=ss;
  } else
  if (emt==3) {
    s+='<input type=hidden name=analogcode value="'+ana+'">';
//    ss='Tовар <b>'+a.previousSibling.firstChild.innerHTML+'</b> не может быть аналогом товара <b>'+$('#tr'+cwc+' td div span a').html()+'</b> потому что';
    ss='Tовар <b>'+a.parentNode.firstChild.innerHTML+'</b> не может быть аналогом товара <b>'+$('#tr'+cwc+' td div span a').html()+'</b> потому что';
    s+=ss;
  } else
  if (emt==5) {
    s+='<input type=hidden name=ornumcode value="'+cwc+'">';
    //ss='Tовар <b>'+a.previousSibling.firstChild.innerHTML+'</b> не может соответствовать оригинальному номеру <b>'+$('#tron'+cwc+' td div span').html()+'</b> потому что';
    ss='Tовар <b>'+a.parentNode.firstChild.innerHTML+'</b> не может соответствовать оригинальному номеру <b>'+$('#tron'+cwc+' td div span').html()+'</b> потому что';
    s+=ss;
  }
  s+='<br /><TEXTAREA name=errtext  style="width: 500px;" rows=3></TEXTAREA>';
  s+='<input type=hidden name=attributestr id=attributestr>';
  s+='<center><input type=submit value="Отправить сообщение"></center>';
  s+='</form></div>';

  sw(s, false);
  $('#attributestr').val(attributestr);

}

function reloadpage() {
  s=document.location.href;
  document.location.href=s.substring(0, s.indexOf('#'));
}
*/

function search_node() {
  var s='';

var len = 0;
var currid = 0;

  var secondcircle=false;
  s=mtrim($('#nodesearch1').attr('value'));
//alert(s);

//  alert ('CurrTemplInSearch='+CurrTemplInSearch+'  s='+s+'  if='+(CurrTemplInSearch!=s));

  if (CurrTemplInSearch!=s) {
    CurrTemplInSearch=s;
    CurrNodeInSearch=-1;
  }

  len=$("a[id^='tv_a2_']").length;
  f=CurrTemplInSearch.toLowerCase();
  f=CurrTemplInSearch;

//  alert('Двигатель - '+'Двигатель'.indexOf('вига'));

  for (i=(CurrNodeInSearch+1); (i<len)&&($("a[id^='tv_a2_']")[i].innerHTML.indexOf(f)==-1); i++) {}

  if (len==i) {
    alert('Текст "'+CurrTemplInSearch+'" в наваниях узлов не найден.');
    return false;
  }
  CurrNodeInSearch=i;

  foundedNode=nextNode=$("a[id^='tv_a2_']")[i];
  $("a[id^='tv_a2_']").css('color', '#000');
  nextNode.style.color=selectTreeColor;

  while (nextNode && (nextNode=nextNode.parentNode.parentNode.parentNode.parentNode).tagName=='UL') {
    if ($("#tv_a1_"+nextNode.id.substr(6))[0] && $("#tv_a1_"+nextNode.id.substr(6))[0].innerHTML.charCodeAt(0) == 9658 ) {
      $("#tv_a1_"+nextNode.id.substr(6)).trigger('click');
    }
    nextNode=$("#tv_a2_"+nextNode.id.substr(6))[0];
  }

  $("#treediv").scrollTop($(foundedNode).offset().top-$("#tv_ul_0").offset().top);
  //document.title=(len+' - '+i+' - '+$("a[id^='tv_a2_']")[i].innerHTML+' divheight='+$("#treediv ul").height());
//  $("a[id^='tv_a2_']").each(function (i) {
//    f+=this.innerHTML+'<br />';
//  });

//  sw(f);

  return false;
}


function search_node2(nodepref, treediv, nodesearch) {
  var s='';
  var preflen=nodepref.length+4;

var len = 0;
var currid = 0;


  s=mtrim($('#'+nodesearch).attr('value')).toLowerCase();


  if (CurrTemplInSearch!=s) {
    CurrTemplInSearch=s;
    CurrNodeInSearch=-1;
  }

  len=$("a[id^='"+nodepref+"_a2_']").length;

//  alert('Двигатель - '+'Двигатель'.indexOf('вига'));

  for (i=(CurrNodeInSearch+1); (i<len)&&($("a[id^='"+nodepref+"_a2_']")[i].innerHTML.toLowerCase().indexOf(CurrTemplInSearch)==-1); i++) {}

  if (len==i) {
    alert('Текст "'+CurrTemplInSearch+'" в названиях узлов не найден.');
    CurrNodeInSearch=-1;
    return false;
  }
  CurrNodeInSearch=i;

  foundedNode=nextNode=$("a[id^='"+nodepref+"_a2_']")[i];
  $("a[id^='"+nodepref+"_a2_']").css('color', '#000');
  nextNode.style.color=selectTreeColor;

  $("a[id^='"+nodepref+"_a1_']").each(function (i) {
    if ($(this)[0].innerHTML.charCodeAt(0) != 9658 ) {
      $(this).trigger('click');
    }
  });


  while (nextNode && (nextNode=nextNode.parentNode.parentNode.parentNode.parentNode).tagName=='UL') {
    if ($("#"+nodepref+"_a1_"+nextNode.id.substr(preflen))[0] && $("#"+nodepref+"_a1_"+nextNode.id.substr(preflen))[0].innerHTML.charCodeAt(0) == 9658 ) {
      $("#"+nodepref+"_a1_"+nextNode.id.substr(preflen)).trigger('click');
    }
    nextNode=$("#"+nodepref+"_a2_"+nextNode.id.substr(preflen))[0];
  }

  $("#"+treediv).scrollTop($(foundedNode).offset().top-$("#"+nodepref+"_ul_0").offset().top);
  //document.title=(len+' - '+i+' - '+$("a[id^='"+nodepref+"_a2_']")[i].innerHTML+' divheight='+$("#"+treediv+" ul").height());
//  $("a[id^='tv_a2_']").each(function (i) {
//    f+=this.innerHTML+'<br />';
//  });

//  sw(f);

  return false;
}


// добавляет импорт/экспорт в список процессов
function addoperation(_time, _impex, _userid, _optid, _username, _percent, _text) {
  row=tbl_.insertRow(-1);
  row.className=(altrow?'altrow':'');

  var newcell=row.insertCell(-1);
//  newcell.style.textAlign='left';
  newcell.innerHTML=_time;

  newcell=row.insertCell(-1);
  newcell.innerHTML=_username;

  newcell=row.insertCell(-1);
  newcell.innerHTML='<img src=/images/'+((_impex==3)?'ex':'im')+'port.png>'+_text;

  newcell=row.insertCell(-1);
  newcell.innerHTML=_percent;

  newcell=row.insertCell(-1);
  newcell.innerHTML='<input type=button value="Прервать" onClick=\'ec("breakoperation", "opid='+_optid+'", "difdict");\'>';
}

// загружает модельный ряд, но сначала чистит окошко
function loadmodellinelist(list, tablename, modellinelistname, sys) {
  var tbl=$('#'+tablename)[0];
  $(tbl).empty();
  $('#'+modellinelistname).empty();

  if (list.value!=-1) ec("loadmodellinelist", "id="+list.value+"&select="+modellinelistname+"&sys="+sys,fnIfStr(flNewModeCGI,"newbj","difdict"));
}

// рисует строку таблицы с двигателями
function drawenginesrow(Code, Name, Capacity, kW, HP, Cylinder) {
  var list=$("#listautoengine")[0];
  list.options[list.options.length]= new Option(Name+" . . . "+Capacity+' . . . '+kW+' . . . '+HP+' . . . '+Cylinder, Code, false, false);
/*
  var tbl=$('#enginetableauto')[0];
  var row=tbl.insertRow(-1);
  var cell;

  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var s='';
    s+='<img src="/images/more.png" style="cursor: pointer;" onclick="ec(\'showengineoptions\', \'engineid='+Code+'\', \'difdict\');">&nbsp;';
    s+='<a href=# onclick="showmodtree('+Code+', \''+_objdiv+'\', \''+_treediv+'\', \''+_pref+'\');">'+Name+'</a>';
//    s+=Name;
  cell=row.insertCell(-1);
  cell.innerHTML=s;
  cell.style.textAlign='left';
  cell.style.width='125px';

  cell=row.insertCell(-1);
  cell.innerHTML=Capacity;
  cell.style.width='57px';

  cell=row.insertCell(-1);
  cell.innerHTML=kW;
  cell.style.width='74px';

  cell=row.insertCell(-1);
  cell.innerHTML=HP;
  cell.style.width='74px';

  cell=row.insertCell(-1);
  cell.innerHTML=Cylinder;
  cell.style.width='132px';
*/
}

function shownewsaedialog(wide) {
  var s='';
  if (wide) {
    s=s+'<div  id=newseditdiv style="position: relative; width: 95%; height: 350px;">';//680
  } else {
    s=s+'<div id=newseditdiv style="position: relative; width: 510px; height: 280px;">';//510
  }
  s=s+'<h1 id=divtitle>Добавить новость</h1>';
  s=s+fnIfStr(flNewModeCGI,'<form onSubmit="return sfbaNew(this);" action="'+scriptname+'/newbj">', '<form onSubmit="return sfba(this);" action="'+scriptname+'/difdict">');
  s=s+'<fieldset style="position: relative; width: 480px;">';
  s=s+'<input type=hidden id=act name=act value="aeactionnews">';
  s=s+'<input type=hidden id=newsid name=newsid>';
  s=s+'<input type=checkbox id=forauto name=forauto>Для авто<br />';
  s=s+'<input type=checkbox id=formoto name=formoto>Для мото<br />';
  s=s+'<input type=checkbox id=inframe name=inframe title="Поставьте отметку, если содержание новости должно отображаться во всплывающем окне">В окне<br />';
  s=s+'<table>';
  s=s+'<tr><td>Начало: </td><td><input type=text id=fromdate name=fromdate maxlength=8 size=8><img src="/images/calendar.png" style="cursor: pointer; margin: -3px 2px; width: 17px; height: 17px;" onclick="show_calendar(\'fromdate\');"></td></tr>';
  s=s+'<tr><td>Окончание: </td><td><input type=text id=todate name=todate maxlength=8 size=8><img src="/images/calendar.png" style="cursor: pointer; margin: -3px 2px; width: 17px; height: 17px;" onclick="show_calendar(\'todate\');"></td></tr>';
  s=s+'<tr><td>Приоритет: </td><td><input type=text id=priority name=priority maxlength=12 size=8 value=0 title="Числовое значение, определяющее порядок сортировки новостей. Чем больше - тем выше. Для новинок товаров задавать значение 0." style="text-align: right;"></td></tr>';
  s=s+'<tr><td>Название: </td><td><input type=text id=caption name=caption maxlength=60 size=60 title="Не длиннее 150 символов"></td></tr>';
  s=s+'<tr><td>Ссылка: </td><td><input type=text id=link name=link maxlength=150 size=60></td></tr>';
  s=s+'</table>';

  s=s+'<center><input id=newssubmit type=submit value="Добавить">&nbsp;&nbsp;&nbsp;<input type=reset value="Отменить изменения "></center>';

  s=s+'</fieldset>';
  s=s+'</form>';
  s=s+'<div class=imgloaddiv style="margin-top: 24px; display: none;"><form method="POST" enctype="multipart/form-data" '+
                   'onSubmit="'+
                   'if ($(\'#ffile\').attr(\'value\')==\'\') { alert(\'Вы не указали файл\'); $(\'#ffile\')[0].focus();} '+
                   'return sendfile(this);">'+
                   '<input type=hidden name=act value=saveimgforaction><input type=hidden name=userid id=imguserid value="">'+
                   '<input type=hidden name=newsid id=imgnewsid value="">'+
                   'Выберите файл изображения для загрузки:<br /><input type="file" id="ffile" name="ffile" size="40">'+
                   '<input type=submit value="Отправить на сервер"></form>'+
                   '</div>';

  s=s+'<img id=newsimg style="position: absolute; right: 0px; bottom: 32px; display: none; max-width: 300px; max-height: 160px;">';

  s=s+'</div>';
  //sw(s);
 $('#conteinernewseditdiv').html(s);
 $('#conteinernewseditdiv').dialog('open');
}

function setmainode(_to) {
  if (curnode) {
    $('#mainnodename').html($('#tv_a2_'+_to).attr('title'));
    $('#mainnodecode').val(_to);
  } else {
    alert('Не задан узел для редактирования');
  }
}

function editsysoption(_id, _type) {
  var s='';

  s+='<center>';
  if (_type==4) {
    s+='<input id=sysoptionnewvalue size=8 maxlength=8 type=text value="'+$('#so_td'+_id).html()+'"><img src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onClick="show_calendar(\'sysoptionnewvalue\');">';
  } else {
    s+='<input id=sysoptionnewvalue type=text value="'+$('#so_td'+_id).html()+'">';
  }
  if (flNewModeCGI){
    s+='<br/><input type=button value="Сохранить" onclick="ec(\'savesysoption\', \'id='+_id+'&value=\'+$(\'#sysoptionnewvalue\').val(), \'newbj\');"></center>';
  }
  else{
    s+='<br/><input type=button value="Сохранить" onclick="ec(\'savesysoption\', \'id='+_id+'&value=\'+$(\'#sysoptionnewvalue\').val(), \'difdict\');"></center>';
  }
  
  sw(s, false);
}

function checkconstrolerights(_role, _type) {
  if ((_type==0) && !$('#cbrc_0_'+_role)[0].checked) $('#cbrc_1_'+_role)[0].checked=false;
  if ((_type==1) && $('#cbrc_1_'+_role)[0].checked) $('#cbrc_0_'+_role)[0].checked=true;
}

function saveconstroles(_const) {
  var s='';
  var code='';
  $("input[id^='cbrc_0_']").each(function (i) {
    code=this.id.substring('cbrc_0_'.length);
    s+='|'+code+'-'+(($('#cbrc_0_'+code)[0].checked?($('#cbrc_1_'+code)[0].checked?2:1):0));
  });
  ec('saveconstroles', 'id='+_const+'&roles='+s, 'difdict');
}

function add_criteria() {
  tbl=$('#criteriatbl')[0];
  var critnamenew=$('#critname').val();
  var critvaluenew=$('#critvalue').val();
  var rowcritname='';
  var rowcritvalue='';
  for (i=0; i<tbl.rows.length; i++) {
    rowcritname=tbl.rows[i].cells[0].innerHTML.substr(0, tbl.rows[i].cells[0].innerHTML.length-7);
    rowcritvalue=tbl.rows[i].cells[1].innerHTML;
    if (rowcritname>critnamenew) {
      break;
    } else if (rowcritname==critnamenew) {
      if (rowcritvalue>critvaluenew) {
        break;
      } else if (rowcritvalue==critvaluenew) {
        alert('Пара "'+critnamenew+'"="'+critvaluenew+'" уже есть в списке');
        return false;
      }
    }
  }
  var tr=tbl.insertRow(i);
  tr.insertCell(-1);
  tr.insertCell(-1);
  tr.insertCell(-1);
  tr.cells[0].innerHTML=critnamenew+':&nbsp;';
  tr.cells[0].style.textAlign='right';
  tr.cells[1].innerHTML=critvaluenew;

  for (i=0; $('#trport_'+i).length; i++) {}
  tr.id='trport_'+i;
  tr.cells[2].innerHTML='<div style="width: 32px; height: 16px;position: relative;">'
                       +'<a class=abANew href=# onClick="editcondition('+i+');" style="background-image: url('+descrimageurl+'/images/wedit.png); display: block; padding: 0; "></a>'
                       +'<a class=abANew href=# onClick="delcondition('+i+');" style="background-image: url('+descrimageurl+'/images/wdell.png); display: block; padding: 0; position: absolute; right: 0;"></a>'
                       +'</div>';

  $('#uiSavePortion').button("enable");
  if ($('#btnSaveCriteria').attr("rowcode")) {
    var i=$('#trport_'+$('#btnSaveCriteria').attr("rowcode"))[0].rowIndex;
    tbl.deleteRow(i);
//    $.fancybox().close();
    $('#addcoudiv').dialog('close');
  }
}

function delcondition(rowcode) {
  tbl=$('#criteriatbl')[0];
  var i=$('#trport_'+rowcode)[0].rowIndex;
  tbl.deleteRow(i);
  $('#uiSavePortion').button("enable");
}

function editcondition(rowcode) {
  row=$('#trport_'+rowcode)[0];
  $('#critname').val('');
  $('#btnSaveCriteria').val('Сохранить изменения');
  $('#btnSaveCriteria').attr("rowcode", rowcode);
  $('#critname').val(row.cells[0].innerHTML.substr(0, row.cells[0].innerHTML.length-7));
  $('#critvalue').val(row.cells[1].innerHTML);
  $('#critname')[0].onchange();
//  $.fancybox.open($('#addcoudiv'), {'modal' : true, 'padding': 10});
  $('#addcoudiv').dialog('open');
}

function saveportion() {
  var tbl=$('#criteriatbl')[0];
  if (!tbl.rows.length) {
    alert('Нельзя сохранить блок без содержимого');
    return false;
  }
  var s='';

  s+='model='+$('#inp_modelid').val()+'&node='+$('#inp_nodeid').val()+'&ware='+$('#inp_wareid').val()+'&code='+$('#blocknum').val();

  for (var i=0; i<tbl.rows.length; i++) {
    s+='&crit'+i+'='+tbl.rows[i].cells[0].innerHTML.substr(0, tbl.rows[i].cells[0].innerHTML.length-7);
    s+='&val'+i+'='+tbl.rows[i].cells[1].innerHTML;
  }
  ec('saveportion', s, 'difdict');
}

function saveportionNew() {
  var tbl=$('#criteriatbl')[0];
  if (!tbl.rows.length) {
    alert('Нельзя сохранить блок без содержимого');
    return false;
  }
  var s='';

  s+='model='+$('#inp_modelid').val()+'&node='+$('#inp_nodeid').val()+'&ware='+$('#inp_wareid').val()+'&code='+$('#blocknum').val();

  for (var i=0; i<tbl.rows.length; i++) {
    s+='&crit'+i+'='+tbl.rows[i].cells[0].innerHTML.substr(0, tbl.rows[i].cells[0].innerHTML.length-7);
    s+='&val'+i+'='+tbl.rows[i].cells[1].innerHTML;
  }
  ec('saveportion', s, 'newbj');
}



function sendfile(form) {
  startLoadingAnimation();
  var formData = new FormData(form);
  $.ajax({
      url: scriptname+"/af",  //Server script to process data
      type: 'POST',
/*
      xhr: function() {  // Custom XMLHttpRequest
          var myXhr = $.ajaxSettings.xhr();
          if(myXhr.upload){ // Check if upload property exists
              myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
          }
          return myXhr;
      },
      //Ajax events
      beforeSend: beforeSendHandler,
      success: completeHandler,
      error: errorHandler,
*/
      complete: function(obj, stat) {
        stopLoadingAnimation();
      },
      // Form data
      data: formData,
      dataType: "script",
      //Options to tell jQuery not to process data or worry about content-type.
      cache: false,
      contentType: false,
      processData: false
  });
  return false;
}

function artti(Code, WName, Plan, Qty, Unit) {
  var newcell;
  var newrow=document.getElementById("tablecontent").insertRow(-1);

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=WName;
  newcell.style.textAlign='left';

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=Plan;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=Qty;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=Unit;
  newcell.style.textAlign='left';
}

function addnotifyfirtotbl() {
  if (!$('#notiffirms').attr('code')) {
    return false;
  }
  if ($('#individualclientstbl tr').length>41) {
    alert('Больше нельзя добавлять контрагентов в список');
    return false;
  }

  if ($('#individualclientstbl tr[code="'+$('#notiffirms').attr('code')+'"]').length) {
    alert('Такой клиент уже есть в списке');
    return false;
  }  
  var newrow=$('#individualclientstbl')[0].insertRow(-1);
  $(newrow).attr('code', $('#notiffirms').attr('code'));
  var newcell=newrow.insertCell(-1);
  newcell.innerHTML=$('#notiffirms').attr('firmname');
  newcell.style.textAlign='left';
  
  newcell=newrow.insertCell(-1);
  newcell.innerHTML='<a class="abgslide" style="position: static; background-image: url(\''+descrimageurl+'/images/wdell.png\');" href="#" title="Удалить" onclick="delrowbycode(\'individualclientstbl\', '+$('#notiffirms').attr('code')+', true);">';
  newcell.style.width='16px';
  zebratable($('#individualclientstbl')[0]);
}

function savenotification() {
  if (!$('#fromdate').val()) {
    if (confirm('Вы не указали дату начала действия уведомления. Задать ее сейчас?')) show_calendar('fromdate');
    return false;
  }
  if (!$('#todate').val()) {
    if (confirm('Вы не указали дату окончания действия уведомления. Задать ее сейчас?')) show_calendar('todate');
    return false;
  }
if (!$('#notiftext').val()) {
    alert('Вы не задали текст уведомления.');
    $('#notiftext').focus();
    return false;
  }

  var s1;
  var s='code='+$('#aenotificationdiv').attr('code');
  s+='&fromdate='+$('#fromdate').val();
  s+='&todate='+$('#todate').val();
  s1=$('#clienttype').val();
  s+='&clienttype='+(s1==null?'':s1);
  s1=$('#clientcategory').val();
  s+='&clientcategory='+(s1==null?'':s1);
  s1=$('#clientfilial').val();
  s+='&clientfilial='+(s1==null?'':s1);
  s+='&individualclientsmethod='+$('#individualclientsmethod').val();
  s+='&auto='+($('#clientauto')[0].checked?'true':'false');
  s+='&moto='+($('#clientmoto')[0].checked?'true':'false');

  s+='&firms=';
  $("#individualclientstbl tr").each(function (i) {
    if (i) s+=',';
    s+=$(this).attr('code');
  });
  s+='&notiftext='+paramsencode($('#notiftext').val());
  if (flNewModeCGI) {
    ec('savenotification', s, 'newbj');
  }
  else{
    ec('savenotification', s, 'difdict');
  }
}

function clearnotifydlg() {
  $('#fromdate').val('');
  $('#todate').val('');
  $('#notiftext').val('');
  $('#clienttype').val('');
  $('#clientcategory').val('');
  $('#clientfilial').val('');
  $("#individualclientstbl").empty();
  $('#individualclientsmethod').val('0');
  $('#aenotificationdiv').attr('code', '');
  $('#clientauto')[0].checked=true;
  $('#clientmoto')[0].checked=true;
  $('#notiffirms').val('');
}

function aenotifyrow(_code, _from, _to, _text, _who, _when, _total, _notifiedfirms, _notifiedclients) {
  var newrow=$('#tablecontent tr[code="'+_code+'"]');
  var newcell;
  if (!newrow.length) {
    newrow=document.getElementById("tablecontent").insertRow(-1);
    $(newrow).attr('code', _code);

    newcell=newrow.insertCell(-1); //_from
    newcell=newrow.insertCell(-1); //_to
    newcell=newrow.insertCell(-1); //_tex
    newcell.style.textAlign='left';
    newcell=newrow.insertCell(-1); //_who;
    newcell=newrow.insertCell(-1); //_when
    newcell=newrow.insertCell(-1); //_total
    newcell=newrow.insertCell(-1); //=_notifiedfirms
    newcell=newrow.insertCell(-1); //_notifiedclients
    newcell=newrow.insertCell(-1);
    $(newcell).width(92);
    
    if (flNewModeCGI) {
      newcell.innerHTML='<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать уведомление" onclick="ec(\'showNotificationWA\', \'code=' +_code+'\', \'newbj\');"></a>'
                    +'<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wdell.png); position: static; float: left;" href="#" title="Удалить уведомление"       onclick="ecq(\'savenotification\', \'code=-'+_code+'&todate=01.01.14&fromdate=01.01.14\', \'newbj\', \'Вы действительно хотите удалить уведомление?\');"></a>'
                    +'<button style="width:60px;" onclick=\'ec("shownotification", "notifcode='+_code+'", "newbj");\'>Тест</button>';
    }
    else{
      newcell.innerHTML='<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать уведомление" onclick="ec(\'shownotification\', \'code=' +_code+'\', \'difdict\');"></a>'
                     +'<a class="abgslide" style="background-image: url('+descrimageurl+'/images/wdell.png); position: static; float: left;" href="#" title="Удалить уведомление"       onclick="ecq(\'savenotification\', \'code=-'+_code+'&todate=01.01.14&fromdate=01.01.14\', \'difdict\', \'Вы действительно хотите удалить уведомление?\');"></a>'
                     +'<button style="width:60px;" onclick=\'ec("shownotification", "notifcode='+_code+'", "abj");\'>Тест</button>';
    }
  } else {
    newrow=newrow[0];  
  }

  newrow.cells[0].innerHTML=_from;

  newrow.cells[1].innerHTML=_to;

  
  var now=new Date;
  var begin=new Date(2000+parseInt(_from.substr(6,2)), parseInt(_from.substr(3,2))-1, parseInt(_from.substr(0,2))); 
  var end=new Date(2000+parseInt(_to.substr(6,2)), parseInt(_to.substr(3,2))-1, parseInt(_to.substr(0,2)), 23, 59, 59, 999);
  var color='red';
//  if ((begin<now) && (end<now)) color='red'; 
  if ((begin<now) && (end>now)) color='green'; 
  if ((begin>now) && (end>now)) color='blue'; 
  newrow.cells[2].innerHTML=_text;
  newrow.cells[2].style.color=color;

  newrow.cells[3].innerHTML=_who;

  newrow.cells[4].innerHTML=_when;

  newrow.cells[5].innerHTML=_total;

  newrow.cells[6].innerHTML=_notifiedfirms;

  newrow.cells[7].innerHTML=_notifiedclients;
} 





$(document).ready(function(){
  $('#aaformdiv').dialog({
    autoOpen: false,
    show: 'fade',
    draggable: true,
    resize: true,
    hide: 'fade',
//    zIndex: '1010',
//    width: winwidth,
//    title: wintitle,
    buttons: {
      "Войти" : function() {
        $('#aaformdiv form')[0].onsubmit();
      },
      "Закрыть окно" : function() {
        $(this).dialog("close");
      }
    }
  });
 
});

function getreport(){ 
  var exptype= $("#exptype").attr("value");
  if ((exptype=='54')||(exptype=='78') || (exptype=='52')) {  //vv
    var s='';
    $("#repnode a").each(function (i) {
	  if (i && $(this).attr("code")) {
	    s+='{'+$(this).attr("code")+',';
		s+=$(this).attr("nodes")+',';
		s+='}';
	  }
    }); 
	$("#dop_nodes").attr("value",s);
    var s='';
    $("#repmanuf a").each(function (i) {
	  if (i && $(this).attr("code")) {
	    s+=$(this).attr("code")+',';
	  }
    });
	$("#dop_manuf").attr("value",s);
	((exptype=='54')||(exptype=='78')) ? $("#dop_manuf").attr("value",$("#dop_manufauto").attr("value")) : $("#dop_manuf").attr("value",s);   //vv
    var s='';
    $("#repbrand a").each(function (i) {
	  if (i && $(this).attr("code")){
	    s+=$(this).attr("code")+',';
	  }
    }); 
	$("#dop_brands").attr("value",s);
    var s='';	
    $("#modellinetable input:checkbox:checked").each(function() {
      //if ($(this).attr("checked")=="checked"){
	  //if (this.checked){
	  if ( $(this).attr("code")){
	    s+=$(this).attr("code")+','; 
	  }
    });
  ((exptype=='54')||(exptype=='78')) ? $("#dop_modlineauto").attr("value",s) : $("#dop_modlineauto").attr("value",$("#dop_modlinelistauto").attr("value"));	//vv
  }
   $("#jobframe")[0].src=scriptname+"/ifbj?act=getbasestamp&="+$("#exportform").serialize();
}

// sfba -  send formbyajax
function sfbaNew(form, thread) { //для новой системы работы CGI
//alert('$(form).serialize()');
  if (!thread) thread="newbj";
  startLoadingAnimation();
  $.ajax({
    url: ((form.action)?form.action:scriptname+"/"+thread),
    type: "post",
    data: $(form).serialize(),
    complete: function(obj, stat) {
      stopLoadingAnimation();
      //if (command=='senderrormessage') alert(obj.responseText);
    },
    dataType: "script"
  });
  return false;
}


function openbrandeditwindow(tr) {
  var title='Редактирование бренда '+tr.cells[0].innerHTML;
  var text='';
  text+='<form id=branddetailsform action="'+scriptname+fnIfStr(flNewModeCGI,'/newbj','/abj')+'">';
  text+='<input type=hidden name=act value="savebranddetails">';
  text+='<input type=hidden name=code value="'+$(tr).attr("code")+'">';
  text+='<table>';
  text+='<tr><td>Сокращение:</td><td><input type=text name=brandshort id=brandshort value="'+tr.cells[1].innerHTML+'"></td></tr>';
  text+='<tr><td>Имя файла (как в Excel):</td><td><input type=text name=brandwww id=brandwww value="'+$(tr.cells[2]).attr("value")+'">'
      +'<a class=abANew href=# onClick=\'$("#brandaddrwww").val("www.vladislav.ua/brand/"+$("#brandwww").val());\' style="background-image: url('+descrimageurl+'/images/wdown.png); display: inline-block; position: static; padding: 0; "></a>'
      +'</td></tr>';
  var link=$(tr.cells[3]).find('a');
  link=(link.length?link[0].innerHTML:'');
  text+='<tr><td style="white-space: nowrap">Ссылка для перехода: http://</td><td><input style="width: 400px;" type=text name=brandaddrwww id=brandaddrwww value="'+link+'"></td></tr>';
  text+='<tr><td>Не показывать в прайсе</td><td><input type=checkbox name=hideinprice id=hideinprice'+(($(tr.cells[4]).attr("value")=="true")?" checked":"")+'></td></tr>';
  text+='<tr><td>Не показывать рисунки TD</td><td><input type=checkbox name="hidepintTD" id=hideinprice'+(($(tr.cells[5]).attr("value")=="true")?" checked":"")+'></td></tr>';
  text+='</table>';
  text+='</form>';

  $('#jqdialog').html(text);
  $('#jqdialog').dialog({
    modal:true,
    width: "auto",
    title: title,
//    zIndex: 1100,
//    open: function(event, ui) {$("#branddetailsform").bind("submit", function() { alert("!!!"); return sfba(this); });},
    close: function(event, ui) {$('#jqdialog').dialog('destroy')},
    buttons: {
      "Сохранить" : function() {
        if (flNewModeCGI){
          sfbaNew($("#branddetailsform")[0]);
        }
        else{
          sfba($("#branddetailsform")[0]);
        }
      },
      "Закрыть окно" : function() {
        $(this).dialog("close");
      }
    }
  })
} 

function openbrandeditwindowNew(tr) {
  var title='Редактирование бренда '+tr.cells[0].innerHTML;
  var text='';
  text+='<form id=branddetailsform action="'+scriptname+'/newbj">';
  text+='<input type=hidden name=act value="savebranddetails">';
  text+='<input type=hidden name=code value="'+$(tr).attr("code")+'">';
  text+='<table>';
  text+='<tr><td>Сокращение:</td><td><input type=text name=brandshort id=brandshort value="'+tr.cells[1].innerHTML+'"></td></tr>';
  text+='<tr><td>Имя файла (как в Excel):</td><td><input type=text name=brandwww id=brandwww value="'+$(tr.cells[2]).attr("value")+'">'
      +'<a class=abANew href=# onClick=\'$("#brandaddrwww").val("www.vladislav.ua/brand/"+$("#brandwww").val());\' style="background-image: url('+descrimageurl+'/images/wdown.png); display: inline-block; position: static; padding: 0; "></a>'
      +'</td></tr>';
  var link=$(tr.cells[3]).find('a');
  link=(link.length?link[0].innerHTML:'');
  text+='<tr><td style="white-space: nowrap">Ссылка для перехода: http://</td><td><input style="width: 400px;" type=text name=brandaddrwww id=brandaddrwww value="'+link+'"></td></tr>';
  text+='<tr><td>Не показывать в прайсе</td><td><input type=checkbox name=hideinprice id=hideinprice'+(($(tr.cells[4]).attr("value")=="true")?" checked":"")+'></td></tr>';
  text+='<tr><td>Не показывать рисунки TD</td><td><input type=checkbox name="hidepintTD" id=hidepintTD'+(($(tr.cells[5]).attr("value")=="true")?" checked":"")+'></td></tr>';
  text+='</table>';
  text+='</form>';

  $('#jqdialog').html(text);
  $('#jqdialog').dialog({
    modal:true,
    width: "auto",
    title: title,
//    zIndex: 1100,
//    open: function(event, ui) {$("#branddetailsform").bind("submit", function() { alert("!!!"); return sfba(this); });},
    close: function(event, ui) {$('#jqdialog').dialog('destroy')},
    buttons: {
      "Сохранить" : function() {
        sfbaNew($("#branddetailsform")[0]);
      },
      "Закрыть окно" : function() {
        $(this).dialog("close");
      }
    }
  })
} 

function addmodellinerowrep(_id, _name, _vis, _top, _sys, _title, byear, bmonth, eyear, emonth, _candel, pid) {
  var row=tbl.insertRow(-1);
  row.id='modellinetr'+_id;
  row.name=_id;
  row.className=(altrow?'lblchoice':'lblchoice altrow');//??
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  if (_top) newcell.style.fontWeight='bold';

  var s='';

  newcell.innerHTML='<div style="position: relative; width: 100%;">'
                   +'<input type=checkbox id=vismodline_'+_id+' '+((_vis)?'checked':'')+' code='+_id+' >'
                   +'<span><a href="#" >'+_name+_title+'</a></span>'
				   +'</div>';
}

function addImageFileList(FileName,wareid,FileNameShort,FileType) { //функцция добавления имен файлов в список загрузки товаров вебарм
 var tbl=document.getElementById('filenamestablecontent');
  if (tbl) {
    var countCols=tbl.rows.length+1;
    var newrow = tbl.insertRow(-1);
    newrow.id=FileName+'_'+countCols;
    //console.log(FileType);
    var newcell=newrow.insertCell(-1);   
    newcell.style.align = 'right';
    newcell.innerHTML=countCols+'.';
  
   newcell=newrow.insertCell(-1);   
   newcell.style.align = 'center';
   if (FileType!='JPEG'){ 
    s = '<a onclick=\' $("#viewimagewareimg").attr("src","'+descrimageurl+'/wareimages/'+FileName+'"); $("#viewimagewarediv").dialog("open");  \' class="imagelabel"  style="color: #FF0000;" title="Показать картинку в отдельном окне" href="#" style="">'+FileName+' (Файл испорчен)</a>';
   }
   else{
     s = '<a onclick=\' $("#viewimagewareimg").attr("src","'+descrimageurl+'/wareimages/'+FileName+'"); $("#viewimagewarediv").dialog("open");  \' class="imagelabel" title="Показать картинку в отдельном окне" href="#" style="">'+FileName+'</a>';
   }
   newcell.innerHTML=s;
   s = '<a id="linkdelfileimage" class="abgslide" onclick=\'ecq("delwareimg","editor=tinyeditor&wareid='+wareid+'&filename='+FileNameShort+'","difdict","Вы действительно хотите удалить изображение?");\' class="abA" title="Удалить файл из списка" href="#" style="position: static;background-image: url(/images/wdell.png);"></a>';
   newcell=newrow.insertCell(-1);   
   newcell.innerHTML=s;
 }
}

//----------------------------------------------------блок переписанных функций цги
//======================================== переводит опр.наборы символов в < и >
function fnDeCodeBracketsInWeb(S){
  var Result=S.replace( cLeftSigns, cLeftBracket);
  Result=Result.replace(cRightSigns, cRightBracket);
  return Result.replace('#$&', '"');

}

// готовит строку сообщения к выводу в виде HTML
function GetHTMLSafeString(s, ReplaceAmp){
  if (ReplaceAmp === undefined) {
    ReplaceAmp = false;
  }
  s=s.replace('<', '&lt;');
  s=s.replace('>', '&gt;');
  s=s.replace('"', '&quot;');
  s=s.replace('\'', '&#0039;');
  s=s.replace('\r\n', '<br>');
  s=s.replace('\r', '<br>');
  s=s.replace('\n', '<br>');
  s=s.replace('#$&', '"');
  if (ReplaceAmp) {  s=s.replace('&', '&amp;');}
 return fnDeCodeBracketsInWeb(s);
}

function getWAHeaderNewsManage(){  //возвращает заголок таблицы новостей
 s='<table id="tableheader" class="st" cellspacing="0">';  
 s=s+'<tr>';
 s=s+'<td title="Видимая">Вид</td>';
 s=s+'<td>Авто</td>';
 s=s+'<td>Moтo</td>';
 s=s+'<td>Начало</td>';
 s=s+'<td>Окончание</td>';
 s=s+'<td>Название</td>';
 s=s+'<td>Ссылка</td>';
 s=s+'<td>Редакт.</td>';
 s=s+'<td>Дата ред.</td>';
 s=s+'<td>Кол-во кликов</td>';
 s=s+'<td><input type=button value="Добавить" onclick="shownewsaedialog();"></td>';
 s=s+'</tr>'+'\n';
  s=s+'</table>';
 return s;
}

function getWAHeadeSysOptions(){  //возвращает заголок таблицы новостей
 s='<table id="tableheader" class="st" cellspacing="0">';  
 s=s+'<tr>';
 s=s+'<td>Код</td>';
 s=s+'<td>Группа</td>';
 s=s+'<td>Наименование</td>';
 s=s+'<td>Значение</td>';
 s=s+'<td>&nbsp;</td>';
 s=s+'<td>Редактировал</td>';
 s=s+'<td>Дата ред.</td>';
 s=s+'</tr>'+'\n';
  s=s+'</table>';
 return s;
}

function getWABodyNewsManage(Stream,url){  //возвращает тело таблицы новостей
 
 var s='<table id="tablecontent" class="st" cellspacing="0">'+'\n';
 var i,j,Code;
 var Pict,Link;
 j=Stream.arlen;
 for (i=1; i<j; i++){ 
   Code=Stream.artable[i][0];
   if (flNewModeCGI){
     s=s+'<tr  onclick="ec(\'editactionnews\', \'id='+(Code)+'\', \'newbj\');" id="newsln"' +Code+' class="lblchoice'+fnIfStr((i % 2)==0, ' altrow', '')+'" >'+'\n';
   }
   else{
     s=s+'<tr  onclick="ec(\'editactionnews\', \'id='+(Code)+'\', \'difdict\');" id="newsln"' +Code+' class="lblchoice'+fnIfStr((i % 2)==0, ' altrow', '')+'" >'+'\n';
   }
   
   s=s+'  <td><img src="/images/acckind'+fnIfStr(Boolean(Stream.artable[i][1]), '1', '0')+'.gif"></td>'+'\n';
   s=s+'  <td><img src="/images/acckind'+fnIfStr(Boolean(Stream.artable[i][2]), '1', '0')+'.gif"></td>'+'\n';
   s=s+'  <td><img src="/images/acckind'+fnIfStr(Boolean(Stream.artable[i][3]), '1', '0')+'.gif"></td>'+'\n';
   s=s+'  <td>'+(Stream.artable[i][4])+'</td>'+'\n';
   s=s+'  <td>'+(Stream.artable[i][5])+'</td>'+'\n';

   s=s+'  <td>'+GetHTMLSafeString(Stream.artable[i][6])+'</td>'+'\n';
   Pict=Stream.artable[i][7]; // картинка
   Link=Stream.artable[i][8]; // ссылка
   s=s+'  <td style="text-align: left;"><a class=atooltip href="'+Link+'" title="<img src='+Stream.artable[i][9]+'>">'+Link+'</td>'+'\n';  //vv
   s=s+'  <td>'+(Stream.artable[i][10])+'</td>'+'\n';
   s=s+'  <td>'+(Stream.artable[i][11])+'</td>'+'\n';
   s=s+'  <td>'+(Stream.artable[i][12])+'</td>'+'\n';
   s=s+'  <td>'+
     '<a class="abgslide" style="background-image: url('+url+'/images/wedit.png); position: static; float: left;" '
     +'href="#" title="Редактировать новость" onclick="ec(\'editactionnews\', \'id='+(Code)+'\','+fnIfStr(flNewModeCGI, '\'newbj\'', '\'difdict\'')+' ); event.stopPropagation(); return false; "></a>'
     +'<a class="abgslide" style="background-image: url('+url+'/images/wdell.png); position: static; float: left;" '
     +'href="#" title="Удалить новость" onclick="ec(\'delactionnews\', \'id='+(Code)+'\','+fnIfStr(flNewModeCGI, '\'newbj\'', '\'difdict\'')+');event.stopPropagation();  return false;"></a>'
     +'</td>'+'\n';
   s=s+'</tr>'+'\n';
 }
  s=s+'</table>'+'\n';
  s=s+' <table class=st cellspacing=0 id="tablecontent2"></table>'+'\n';
 $('#tableheaderdiv').html(getWAHeaderNewsManage());
 $('#tablecontentdiv').html(s);
 synqcols();
}

function getWABodySysOptions(Stream,CanManaged){  //возвращает тело таблицы системных настроек
 var s='<table id="tablecontent" class="st" cellspacing="0">'+'\n';
 var i,j,Code;
 var ConstType,CanEdited;
 j=Stream.arlen;
 for (i=0; i<j; i++){ 
   Code=Stream.artable[i][0];
   CanEdited=Stream.artable[i][5];
   ConstType=Stream.artable[i][4];
   s=s+'<tr id="so_ln'+Code+'" class="lblchoice'+fnIfStr((i % 2)==0, ' altrow', '')+'" >'+'\n';
   s=s+'  <td>'+Code+'</td>'+'\n';
   s=s+'  <td>'+(Stream.artable[i][1])+'</td>'+'\n';
   s=s+'  <td style="text-align: left;">'+(Stream.artable[i][2])+'</td>'+'\n';
   s=s+'  <td id="so_td'+Code+'" style="text-align: left; white-space: normal;" >'+(Stream.artable[i][3])+'</td>'+'\n'; 
   s=s+'   <td><div style="width: 35px; height: 19px; position: relative;">';  
   if (CanEdited) {
     s=s+'<a class="abgslide" style="background-image: url(/images/wedit.png); left: 0px;" href="#" title="Изменить значение"';  

     switch(Code){
       case pcEmplID_list_Rep30:
       case pcEmplSaleDirectorAuto:
       case pcEmplSaleDirectorMoto:
       case pcTestingSending1:
       case pcTestingSending2: 
       case pcTestingSending3:
       case pcEmpl_list_UnBlock: 
       case pcEmpl_list_TmpBlock: 
       case pcEmpl_list_FinalBlock: 
       case pcVINmailFilial_list:
       case pcVINmailFirmClass_list: 
       case pcVINmailEmpl_list: 
       case pcVINmailFirmTypes_list:
       case pcPriceLoadFirmClasses:
              if (flNewModeCGI){
                 s=s+' onclick="ec(\'editsysoption\', \'id='+Code+'\', \'newbj\');">';
              }
              else{
                 s=s+' onclick="ec(\'editsysoption\', \'id='+Code+'\', \'difdict\');">';
              }
              break;
       default:
         s=s+' onclick="editsysoption(\''+Code+'\', \''+ConstType+'\');">';
     }
     s=s+'</a>';
   }
   if (CanManaged){
     s=s+'<a class="abgslide" style="background-image: url(/images/user1.png);  width: 19px; height: 19px; right: 0px;" ';
     if (flNewModeCGI){
      s=s+'href="#" title="Назначить разрешения" onclick="ec(\'showconstroles\', \'id='+Code+'\', \'newbj\');"></a>';
     }
     else{
      s=s+'href="#" title="Назначить разрешения" onclick="ec(\'showconstroles\', \'id='+Code+'\', \'difdict\');"></a>'; 
     }
   } 
  s=s+'</div></td>'+'\n'; 
  s=s+'  <td style="text-align: left;">'+(Stream.artable[i][6])+'</td>'+'\n';
  s=s+'  <td style="text-align: left;">'+(Stream.artable[i][7])+'</td>'+'\n';
  s=s+'</tr>'+'\n';
 }
 s=s+'</table>'+'\n';
 s=s+' <table class=st cellspacing=0 id="tablecontent2"></table>'+'\n';
 $('#tableheaderdiv').html(getWAHeadeSysOptions());
 $('#tablecontentdiv').html(s);
 synqcols();
}

function getWATableEditUsers(Stream1,Stream2,ScriptName,NewId){  //возвращает  таблицу редактирования пользователей
  
  var s;
  s='<form action="'+ScriptName+fnIfStr(flNewModeCGI,'/newbj','/abj')+'" onSubmit="'+fnIfStr(flNewModeCGI,'return sfbaNew(this);','return sfba(this);')+'"><input type=hidden name=act value=savewausers><input type=hidden name=id value="'+NewId+'"><div>';
  s=s+'<h1 style="margin-top:0;">'+fnIfStr(NewId==-1, 'Добавить пользователя', 'Изменить данные пользователя')+'</h1>';
  s=s+'<table style="font-size: 12px;">';
  s=s+'<tr><td class="b r">Логин: </td><td><input type=text id=login name=login maxlength=20 size=20></td></tr>';
  s=s+'<tr><td class="b r">Пароль: </td><td><input type=text id=pass name=pass maxlength=20 size=20></td></tr>';
  s=s+'<tr><td class="b r">Сотрудник: </td><td><select id=code name=code>';
  var i;
  var iMaxBrand=Stream1.arlen;
  for (i=0; i<=iMaxBrand; i++){ 
   s=s+'<option value='+Stream1.artable[i][i]+'>'+Stream1.artable[i][i+1]+'</option>';
   i++;
  }
  s=s+'</select></td></tr>';
  var s2;
  var s1='<option value=""></option>';
  iMaxBrand=Stream2.arlen;
  for (i=0; i<=iMaxBrand; i++){ 
     s2=Stream2.artable[i];
     s1=s1+'<option value='+s2+'>'+s2+'</option>';
  }

   s=s+'<tr><td class="b r">Подразделение: </td><td><select id=dprt name=dprt>';
   s=s+'</select></td></tr>';

   s=s+'<tr><td class="b r">Логин&nbsp;GrossBee&nbsp;осн.: </td><td><select id=gbuser name=gbuser>'+s1;
   s=s+'</select></td></tr>';

   s=s+'<tr><td class="b r">Логин&nbsp;GrossBee&nbsp;отч.: </td><td><select id=gbuserreport name=gbuserreport>'+s1;
   s=s+'</select></td></tr>';
   s=s+'<tr><td class="b r" title="Запрет доступа к webarm не из сети Компании">Запрет внешних IP:</td><td><input type=checkbox name="disableoutipcheck" id="disableoutipcheck">';
   s=s+'</td></tr>';

   s=s+'<tr><td colspan=2 class="b">';
   s=s+'Права пользователя:';
   s=s+'</td></tr>';

   s=s+'<tr><td id=tdroles colspan=2 style="height: 200px;">';
   s=s+'<tr><td colspan=2 align=center>';
   s=s+'<input type=submit value="Сохранить">&nbsp;<input type=button value="Выйти" onclick="$.fancybox.close();">';
   s=s+'</td></tr>';
   s=s+'</table>';
   s=s+'</div></form>';


   return s;
}

function showFormHeaderChange(foldername_,id_,vieworder_,signvisible_,role_){
 var s='';   
 s=s+'<table><tr>';
 s=s+'<td><span id="captiontopic">Название раздела:</span></td><td><div id="captiontopicdiv" folder_="'+foldername_+'" iconname_="" idnode_="'+id_+'"><input type=text size="80" name="captiontopic" value=""></div></td><tr>';
 s=s+'<tr><td><span id="epigraf">Общий текст:</span></td><td><div id="epigrafdiv"><input type=text size="80" name="epigraf" value=""></div></td></tr>';
 s=s+'<tr><td><span id="vieworder">Порядок: </span></td><td><div id="vieworderdiv" oldvalue_="'+vieworder_+'"><input type=number style="width: 40px;" onkeydown = "javascript: return ( ((event.keyCode>47)&&(event.keyCode<58)) || (event.keyCode==8) || (event.keyCode==46))" name="vieworder" value=""></div></td>';
 s=s+'<tr><td><span id="signvisible">Признак видимости: </span></td><td><div id="signvisiblediv" oldvalue_="'+signvisible_+'"><input type=checkbox  onChange="setOldValSignVisible(this);" name="signvisible" value=""></div></td>';
 s=s+'</tr></table>';
 s=s+'<div class="" ><form method="POST" enctype="multipart/form-data" '+
                   'onSubmit="'+
                   'if ($(\'#ffileinfo\').attr(\'value\')==\'\') { jqswMessageError(\'Вы не указали файл\'); $(\'#ffileinfo\')[0].focus(); return false;} '+
                   ' return sendfile(this);">'+
                   '<input type=hidden name="act" value="saveimgforaccordion">'+
                   '<input type=hidden id="filename_" name="filename_" value="">'+
                   '<input type=hidden name="folder" id="folder" value="'+foldername_+'">'+
                   '<input type=hidden name="role" id="role" value="'+role_+'">'+
                   'Выберите файл изображения для загрузки:<br /><input type="file" id="ffileinfo" name="ffileinfo" size="40">'+
                   '<input type=submit value="Отправить на сервер"></form>'+
                   '</div>';
  s=s+'<img id="iconimg"  src="">';
  s=s+'</div>';
  jqswInfoAccordion("Редактирование атрибутов раздела",''+s+'',"center",1,role_);
  ec('fillattrinfofilewindow', "foldername="+foldername_+"&id="+id_+"&vieworder="+vieworder_+"&signvisible="+signvisible_+"&role="+role_, 'abj');
}

function showFormHeaderCreate(role){
 var s='';   
 s=s+'<table><tr>';
 s=s+'<td><span id="captiontopic">Название раздела:</span></td><td><div id="captiontopicdiv" folder_="" iconname_="" idnode_=""><input type=text size="80" name="captiontopic" value=""></div></td><tr>';
 s=s+'<tr><td><span id="epigraf">Общий текст:</span></td><td><div id="epigrafdiv"><input type=text size="80" name="epigraf" value=""></div></td></tr>';
 s=s+'<tr><td><span id="vieworder">Порядок: </span></td><td><div id="vieworderdiv" oldvalue_="-1"><input type=number style="width: 40px;" onkeydown = "javascript: return ( ((event.keyCode>47)&&(event.keyCode<58)) || (event.keyCode==8) || (event.keyCode==46))" name="vieworder" value=""></div></td>';
 s=s+'<tr><td><span id="signvisible">Признак видимости: </span></td><td><div id="signvisiblediv" oldvalue_="0"><input type=checkbox  onChange="setOldValSignVisible(this);" name="signvisible" value=""></div></td>';
 s=s+'</tr></table>';
 s=s+'<div class="" ><form method="POST" enctype="multipart/form-data" '+
                   'onSubmit="'+
                   'if ($(\'#ffileinfo\').attr(\'value\')==\'\') { jqswMessageError(\'Вы не указали файл\'); $(\'#ffileinfo\')[0].focus(); return false;} '+
                   ' return sendfile(this);">'+
                   '<input type=hidden name="act" value="saveimgforaccordion">'+
                   '<input type=hidden id="filename_" name="filename_" value="">'+
                   '<input type=hidden name="folder" id="folder" value="">'+
                   'Выберите файл изображения для загрузки:<br /><input type="file" id="ffileinfo" name="ffileinfo" size="40">'+
                   '<input type=submit value="Отправить на сервер"></form>'+
                   '</div>';
  s=s+'<img id="iconimg"  src="">';
  s=s+'</div>';
  jqswInfoAccordion("Создание атрибутов раздела",''+s+'',"center",2,''+role+'');
  $("#signvisiblediv input").prop("checked","");

}

function jqswInfoAccordion(title_,text,pos_,mode,role) { //просто для баянов редактирования
  $('#jqdialoginfo').html('<div style="align: center; vertical-align: center;">'+text+'</div>');
  $('#jqdialoginfo').dialog({
    show: "fade",
    hide: "fade",
    modal: true,
    position:pos_,
    title: title_,
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialoginfo').dialog('destroy');},
    buttons: {"Сохранить" :function() {saveAccordionParametr(mode,role); $('#jqdialoginfo').dialog('destroy');},
              "Закрыть" : function()  {$('#jqdialoginfo').dialog('destroy');} }
  });
     $('#jqdialoginfo').dialog('open');
   setTimeout(setPositionInfoDialoginfo, 1000);
}



function saveAccordionParametr(mode,role){
  //console.log(role);
  if ($("#captiontopicdiv input").val()!=''){
    if (mode==1)
      ec('attrinfofilewindowtoinifile','captiontopic='+$("#captiontopicdiv input").val()+'&epigraf='+$("#epigrafdiv input").val()+'&iconimg='+$("#captiontopicdiv").attr("iconname_")+'&foldername='+$("#captiontopicdiv").attr("folder_")+'&vieworder='+$("#vieworderdiv input").val()+'&vieworderold='+$("#vieworderdiv").attr("oldvalue_")+'&signvisible='+$("#signvisiblediv").attr("oldvalue_")+'&role='+role);
    if (mode==2)
      ec('attrinfofilewindowtocreateinifile','captiontopic='+$("#captiontopicdiv input").val()+'&epigraf='+$("#epigrafdiv input").val()+'&iconimg='+$("#captiontopicdiv").attr("iconname_")+'&vieworder='+$("#vieworderdiv input").val()+'&vieworderold='+$("#vieworderdiv").attr("oldvalue_")+'&signvisible='+$("#signvisiblediv").attr("oldvalue_")+'&role='+role);
  }
  else{
    jqswMessageErrorNew('Не заполнено Название раздела.');
  }
}

function setOldValSignVisible(el){
  if ($(el).prop("checked")){
    $("#signvisiblediv").attr("oldvalue_","1");
  }
  else{
   $("#signvisiblediv").attr("oldvalue_","0");
  }
}

// добавляет узел в дерево файлов Информации в дерево
function addNodeInfo(_id, _name,_icon,_vieworder,_visible,_itemCount,_role) {
  var li=document.createElement("LI");
  li.innerHTML='<div title="Порядковый номер отображения: '+_vieworder+'" taborder_="'+_vieworder+'"><p><a href="#" style="" class="sc" id="sc'+_id+'"' +
  'onclick="return UnHide(this)">&#9658;</a><img id="iconimgheader"  src="'+descrimageurl+'/images/mainmenu/'+_icon+'">'+
  '<a style="" onclick="showFormHeaderChange(\''+_name+'\',\''+_id+'\',\''+_vieworder+'\',\''+_visible+'\',\''+_role+'\');" href="#" id=ali_'+_id+'>'+_name+'</a>'+
  '<img class="abgslideinfo"  style="background-image: url(/images/wplus.png);"  title="Добавить подраздел" '+
  'onclick="editinfofile(\''+_role+'\',\'noname\', \'TinyEditInfoFilesDIV\', \'tinyeditorinfo\',\''+_name+'\',\'\','+_id+','+_itemCount+');">'+
  '<a  class="abgslide" style=" display:inline;  background-image: url(/images/wdell.png);  width: 10px;  float: left;  height: 13px; margin-left: 20px; top: 3px;" href="#" title="Удалить весь раздел"'+
  ' onclick="if (confirm(\'Вы действительно хотите удалить весь раздел?\')){ ec(\'delinfocatalog\',\'foldername='+_name+'&id='+_id+'&role='+_role+'\'); }"></a></p></div>';
  li.className='cl';
  li.id='li_'+_id+'_'+_role;
  lastbrand=document.createElement("UL");
  lastbrand.id='ul_'+_id;
  li.appendChild(lastbrand);
  document.getElementById("ulmain-"+_role).appendChild(li);
}

// добавляет группу в дерево файлов Информации
function addfilenamegroup(_id, _name,_header,dirname,num,_role) {
  var li=document.createElement("LI");
  li.innerHTML='<div title="Порядковый номер отображения: '+num+'" id="div'+_id+'_'+_role+'"><p><a href="#" style="float: left;" id="ali'+_id+'"'+
  'onclick="editinfofile(\''+_role+'\',\''+_name+'\', \'TinyEditInfoFilesDIV\', \'tinyeditorinfo\',\''+dirname+'\',\''+_header+'\',\''+_id+'\',\''+num+'\');" >'+_header+'</a>'+
  '<a  class="abgslide" style=" position: static;  background-image: url(/images/wdell.png);  width: 10px;  float: left;  height: 13px;" href="#" title="Удалить файл из списка" '+
  'onclick="if (confirm(\'Вы действительно хотите удалить файл раздела?\')){ ec(\'delinfofile\',\'foldername='+dirname+'&filename='+_name+'&id='+_id+'&role='+_role+'\'); }"></a></p></div>';
  lastbrand.appendChild(li);
}

function addfilenamegroupLI(_id,_header, _name,dirname,num) {
  var li=document.createElement("LI");
  li.innerHTML='<div title="Порядковый номер отображения: '+num+'" id="div'+_id+'"><p><a href="#" style="float: left;" id="ali'+_id+'" onclick="editinfofile(\''+_name+'\', \'TinyEditInfoFilesDIV\', \'tinyeditorinfo\',\''+dirname+'\',\''+_header+'\',\''+_id+'\',\''+num+'\');" >'+_header+'</a><a  class="abgslide" style=" position: static;  background-image: url(/images/wdell.png);  width: 10px;  float: left;  height: 13px;" href="#" title="Удалить файл из списка" onclick="if (confirm(\'Вы действительно хотите удалить файл раздела?\')){ ec(\'delinfofile\',\'foldername='+dirname+'&filename='+_name+'&id='+_id+'\'); }"></a></p></div>';
  lastbrand.appendChild(li);
  document.getElementById("ul_"+_id).appendChild(li);
}

function editfilenamegroupLI(_id,_header, _name,dirname,num) {
  var li=document.getElementById("ali"+_id);
  if (_header !=''){
    li.innerHTML=_header;
    li.onclick=function(){ editinfofile(_name, "TinyEditInfoFilesDIV", "tinyeditorinfo",dirname,_header,+_id,num); };
  }
  else{
   li.innerHTML='<нет заголовка>';
   li.onclick=function(){ editinfofile(_name, "TinyEditInfoFilesDIV", "tinyeditorinfo",dirname,"<нет заголовка>",+_id,num); };
  }
}

function editinfofile(_role,filename_, divname, editorname,dirname,header,_id,_itemCount,num) { //TinyEditor для файлов Информации
  $('#'+divname).css('display', 'block');
  $('#'+divname).width(parseInt($(window).width()*0.9));
  $('#'+divname).css('left', parseInt($(window).width()*0.05)); 
  $('#'+divname).height(parseInt($(window).height()*0.95));
  $('#'+divname).css('top', parseInt($(window).height()*0.05));

  $('#'+divname+' #tinyeditorinfo_tbl').width($('#'+divname).width()-20);
  $('#'+divname+' #tinyeditorinfo_tbl').css('left', 10);
  $('#'+divname+' #tinyeditorinfo_tbl').css('top', 40);
  var h=parseInt($(window).height()*0.9)-$('#'+divname+' .mceToolbar').height()-$('#'+divname+' .mceStatusbar').height()-$('#'+divname+' #tebottompanel').height()-24;
  $('#'+divname+' .mceIframeContainer').height(h);
  $('#'+divname+' .mceIframeContainer iframe').height(h);
  $('#'+divname+' .mceIframeContainer iframe').width($('#'+divname+'').width()-20);
  //if (mode==0){
    ec('getinfofileforedit', 'filename='+filename_+'&editor='+editorname+'&dirname='+dirname+'&header='+header+'&id='+_id+'&itemcount='+_itemCount+'&role='+_role, 'abj');
  //}
}

function synqcolsForShowDoc(div,header_table,content_table,count) {
 if ($(div).length){
   var header=document.getElementById(header_table);
   var content=document.getElementById(content_table);
   var content2=document.getElementById("tablecontent2");
   var newrow;
   $(div).width($("#maindiv").width()-10);
    content.style.width=($(div).width()-16)+"px";
    for (j=0; j<content.rows.length; j++) {
      $(content.rows[j].cells[0]).width("");
      for (i=1; i<content.rows[j].cells.length; i++) {
        $(content.rows[j].cells[i]).width("65px");
      }
    }
    for (j=0; j<header.rows.length; j++) {
      $(header.rows[j].cells[0]).width($(content.rows[j].cells[0]).width()+"px");
      for (i=1; i<header.rows[j].cells.length; i++) {
        $(header.rows[j].cells[i]).width("65px");
      }
    } 

 } 
}



function synqcolsForMPP(div,header_table,content_table,count) {
 if ($(div).length){
   var header=document.getElementById(header_table);
   var content=document.getElementById(content_table);
   var content2=document.getElementById("tablecontent2");
   var newrow;
   var header=document.getElementById(header_table);
   var content=document.getElementById(content_table);
   var content2=document.getElementById("tablecontent2");
   var newrow;

   if (header && content && content2 && header.rows[0]) {
     content.style.tableLayout="auto";
     newrow=content2.insertRow(-1);
     for (i=0; i<header.rows[0].cells.length; i++) {
       newrow.insertCell(-1);
       newrow.cells[i].innerHTML=header.rows[0].cells[i].innerHTML;
     }

     content.style.width=($(div).width()-16)+"px";
      
     if (count !==undefined){
       for (j=0; j<count; j++) {
         newrow=content2.insertRow(-1);
         for (i=0; i<content.rows[j].cells.length; i++) {
           newrow.insertCell(-1);
           newrow.cells[i].innerHTML=content.rows[j].cells[i].innerHTML;
         }
       }
     } 
     else{
       for (j=0; j<content.rows.length; j++) {
         newrow=content2.insertRow(-1);
         for (i=0; i<content.rows[j].cells.length; i++) {
           newrow.insertCell(-1);
           newrow.cells[i].innerHTML=content.rows[j].cells[i].innerHTML;
         }
       }
     }
   
     $('#tablecontent2').width($(div).width());

     for (i=0; i<header.rows[0].cells.length; i++) {
       $(header.rows[0].cells[i]).width($(content2.rows[0].cells[i]).width()+(((i+1)==header.rows[0].cells.length)?16:0));
     }
      
      
     if (count !==undefined){
       for (j=0; j<count; j++) {
         for (i=0; i<content.rows[j].cells.length; i++) {
            $(content.rows[j].cells[i]).width($(content2.rows[0].cells[i]).width());
         }
         for (j=count; j<content.rows.length; j++) {
           $(content.rows[j].cells[0]).width($(content2.rows[0].cells[0]).width());
           $(content.rows[j].cells[1]).width('');
         }

       }
     }
     else{
       for (j=0; j<content.rows.length; j++) {
         for (i=0; i<content.rows[j].cells.length; i++) {
            $(content.rows[j].cells[i]).width($(content2.rows[0].cells[i]).width());
          }
        }
      }

      for (i=0; content2.rows.length; i++) {
        content2.deleteRow(0);
      }
    }
  }
}

function synqcolsForMPPContractsBlock() {
   if ($("#firmsdiv").length){
    var header=document.getElementById("contactstableheader");
    var content=document.getElementById("contactstable");
    var content2=document.getElementById("tablecontent2");
    var newrow;

    if (header && content && content2 && header.rows[0]) {
      content.style.tableLayout="auto";
      newrow=content2.insertRow(-1);
      for (i=0; i<header.rows[0].cells.length; i++) {
        newrow.insertCell(-1);
        newrow.cells[i].innerHTML=header.rows[0].cells[i].innerHTML;
      }

      content.style.width=($('#contactsdiv').width()-16)+"px";
  
      for (j=0; j<content.rows.length; j++) {
        if (content.rows[j].cells.length==header.rows[0].cells.length){
          newrow=content2.insertRow(-1);
          for (i=0; i<content.rows[j].cells.length; i++) {
            newrow.insertCell(-1);
            newrow.cells[i].innerHTML=content.rows[j].cells[i].innerHTML;
          }
        }
      }
    
      $('#tablecontent2').width($('#contactstable').width());

      for (i=0; i<header.rows[0].cells.length; i++) {
        $(header.rows[0].cells[i]).width($(content2.rows[0].cells[i]).width()+(((i+1)==header.rows[0].cells.length)?16:0));
      }

      for (j=0; j<content.rows.length; j++) {
        if (content.rows[j].cells.length==header.rows[0].cells.length){
          for (i=0; i<content.rows[j].cells.length; i++) {
            $(content.rows[j].cells[i]).width($(content2.rows[0].cells[i]).width());
          }
        }
        else{
          for (i=0; i<content.rows[j].cells.length; i++) {
            if (i>3){
              $(content.rows[j].cells[i]).width($(content2.rows[0].cells[i+2]).width());
            }  
          }
        }
      }

      for (i=0; content2.rows.length; i++) {
        content2.deleteRow(0);
      }
    }
  }
}

function fillHeaderForMPPDocuments(){
  var tbl=document.getElementById("documentstableheader");
  if (tbl.rows.length<1){
    var newrow,newcell;
    newrow = tbl.insertRow(-1);
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Дата';
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Счет';
   
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Накладная';
  
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Сумма';
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Контракт';
  }
  tbl=document.getElementById("documentstable");
  if (tbl.rows.length>0){
    for (i=0; tbl.rows.length; i++) {
      tbl.deleteRow(0);
    }
  }
}

function fillBodyForMPPDocuments(){
  if (TStream.artable.length>0){
    var tbl=document.getElementById("documentstable");
    for (i=0; tbl.rows.length; i++) {
      tbl.deleteRow(0);
    }
    var newrow,newcell;
    for (j=0; j< TStream.arlen; j++){
      newrow = tbl.insertRow(-1);
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = TStream.artable[j].AccDate;
    
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = '<a "target="_blank" onclick="window.open(\''+scriptname+'/universal?act=showdoc&type=99&code='+TStream.artable[j].AccCode+'&isorders=false&emplid='+TStream.artable[j].Empl+'\');">'+TStream.artable[j].AccNum+'</a>';
      
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = '<a "target="_blank" onclick="window.open(\''+scriptname+'/universal?act=showdoc&type=102&code='+TStream.artable[j].InvoiceCode+'&isorders=false&emplid='+TStream.artable[j].Empl+'\');">'+TStream.artable[j].InvoiceNum+'</a>';
      
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = TStream.artable[j].AccSum+' '+TStream.artable[j].AccCurrency;
      
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = TStream.artable[j].ContractNum;
    }
 }
}

function fillBodyForGBAccount(){
 if (TStream.artable.length>0){
   var tbl=document.getElementById("tablecontent");
   for (i=0; tbl.rows.length; i++) {
     tbl.deleteRow(0);
   }
   var newrow,newcell;
   for (j=0; j< TStream.arlen; j++){
     newrow = tbl.insertRow(-1);
     newcell=newrow.insertCell(-1);
     $(newcell).css("text-align","left");
     newcell.innerHTML ='<span title="'+TStream.artable[j].WareTitle+'">'+TStream.artable[j].WareName+'</span>';
   
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Order;
     
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Acc;
     
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Ed;
     
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Price;
     
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Sum;
   }
   newrow = tbl.insertRow(-1);
   newcell=newrow.insertCell(-1);
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","left");
   newcell.innerHTML =' Итого на сумму:';
   newcell=newrow.insertCell(-1);
   newcell.id="sumcell";
   newcell.colSpan=5;
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","right").css("border-right-width","2px");
   newcell.innerHTML = TStream.TotalQty;

   newrow = tbl.insertRow(-1);
   newcell=newrow.insertCell(-1);
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","left");
   newcell.innerHTML ='Итого '+TStream.BallsName+': ';
   newcell=newrow.insertCell(-1);
   newcell.colSpan=5;
   newcell.id="sumcell-unit";
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","right").css("border-right-width","2px");
   newcell.innerHTML = TStream.BallsQty;
   $("#acc-firmname").text(TStream.FirmName);
 }
}

function fillBodyForGBOutInvoice(){
 if (TStream.artable.length>0){
   var tbl=document.getElementById("tablecontent");
   for (i=0; tbl.rows.length; i++) {
     tbl.deleteRow(0);
   }
   var newrow,newcell;
   for (j=0; j< TStream.arlen; j++){
     newrow = tbl.insertRow(-1);
     newcell=newrow.insertCell(-1);
     $(newcell).css("text-align","left");
     newcell.innerHTML ='<span title="'+TStream.artable[j].WareTitle+'">'+TStream.artable[j].WareName+'</span>';
   
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Qv;
 
     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Ed;

     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Price;

     newcell=newrow.insertCell(-1);
     newcell.innerHTML = TStream.artable[j].Sum;
   }
   newrow = tbl.insertRow(-1);
   newcell=newrow.insertCell(-1);
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","left");
   newcell.innerHTML =' Итого на сумму:';
   newcell=newrow.insertCell(-1);
   newcell.id="sumcell";
   newcell.colSpan=4;
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","right").css("border-right-width","2px");
   newcell.innerHTML = TStream.TotalQty;

   newrow = tbl.insertRow(-1);
   newcell=newrow.insertCell(-1);
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","left");
   newcell.innerHTML ='Итого '+TStream.BallsName+': ';
   newcell=newrow.insertCell(-1);
   newcell.colSpan=4;
   newcell.id="sumcell-unit";
   $(newcell).css("font-weight","bold").css("font-style","italic").css("text-align","right").css("border-right-width","2px");
   newcell.innerHTML = TStream.BallsQty;
   $("#gboutinvoice-firmname").text(TStream.FirmName);
 }
}


function fillAnyHeader(){
   if (arrTableHeaderColName[0].length>0){
    var tbl=document.getElementById("tableheader");
    var newrow,newcell;
    newrow = tbl.insertRow(-1); 
    for (j=0; j< arrTableHeaderColName[0].length; j++){
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = arrTableHeaderColName[0][j];
      if (j>0){
        $(newcell).css("width","45px"); 
      }
    }
  }  
}

function set_sizesWA(left_block_expand){ // изменение размеров ВЕБАРМ
  if (page=="mpp"){
    synqcolsForMPPContractsBlock();
    //synqcolsForMPP("#contactsdiv","contactstableheader","contactstable");
    synqcolsForMPP("#documentsdiv","documentstableheader","documentstable");
  }
   if (page=="showdoc_acc"){
     if (TStream.artable.length !==undefined){
       synqcolsForShowDoc("#tablecontentdiv","tableheader","tablecontent",TStream.artable.length);
     }
   }
   if (page=="showdoc_gbinvoice"){
     if (TStream.artable !==undefined){
       synqcolsForShowDoc("#tablecontentdiv","tableheader","tablecontent",TStream.artable.length);
     }
  }
}

function fillHeaderForMotulSiteAction(){
  var tbl=document.getElementById("tableheader-action");
  if (tbl.rows.length<1){
    var newrow,newcell;
    newrow = tbl.insertRow(-1);
    
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Заголовок акции';
   
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Дата начала';
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Дата окончания';
   
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'HTML-текст';
    
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Связанные продукты';
    
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Связанные CIPHER';
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = '<input value="Добавить" onclick="editActionMotulRecord(-1,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'add\');" type="button">';

  }
}

function fillHeaderForMotulSiteInfo(){
  var tbl=document.getElementById("tableheader-info");
  if (tbl.rows.length<1){
    var newrow,newcell;
    newrow = tbl.insertRow(-1);
    
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Заголовок акции';
   
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'HTML-текст';
    
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = '';

  }
}

function fillBodyForMotulSiteAction(){
 if (TStream.arrMotulAction.length>0){
   var tbl=document.getElementById("tablecontent-action");
   for (i=0; tbl.rows.length; i++) {
     tbl.deleteRow(0);
   }
   var newrow,newcell;
   for (j=0; j< TStream.arrMotulAction.length; j++){
     newrow = tbl.insertRow(-1);
     newrow.id ="tr-motul-action-"+TStream.arrMotulAction[j].ActionCode;
     $(newrow).attr("cur-num",j);
     $(newrow).attr("action-code",TStream.arrMotulAction[j].ActionCode);
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","header");
     newcell.innerHTML ='<span >'+TStream.arrMotulAction[j].ActionHeader+'</span>';
   
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","beg-date");
     newcell.innerHTML = TStream.arrMotulAction[j].ActionBeginDate;
 
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","end-date");
     newcell.innerHTML = TStream.arrMotulAction[j].ActionEndDate;

     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","html-file");
     newcell.innerHTML = '......';

     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","isplex");
     if (TStream.arrMotulAction[j].IsPlex){
       newcell.innerHTML ='<img src="/images/acckind1.gif">';
     }
     else{
       newcell.innerHTML ='<img src="/images/acckind0.gif">';
     }
     
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","ischex");
     if (TStream.arrMotulAction[j].IsChex){
       newcell.innerHTML ='<img src="/images/acckind1.gif">';
     }
     else{
       newcell.innerHTML ='<img src="/images/acckind0.gif">';
     }
     
      newcell=newrow.insertCell(-1);
      $(newcell).attr("class","action");
      newcell.innerHTML ='<a class="abgslide edit" cur-num="'+j+'" action-code="'+TStream.arrMotulAction[j].ActionCode+'" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать акцию" onclick="editActionMotulRecord(this,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'edit\'); event.stopPropagation(); return false;"></a>'
                         +'<a class="abgslide del" style="background-image: url('+descrimageurl+'/images/wdell.png); position: static; float: left;" href="#" title="Удалить акцию" onclick="if (confirm(\'Вы действительно хотите удалить акцию?\')){ ec(\'motulsitemanage\',\'action-code='+TStream.arrMotulAction[j].ActionCode+'&kindofoperation=12\',\'newbj\');}"></a>';
   }
  }
}

function fillHeaderForMotulSiteWares(){
  var tbl=document.getElementById("tableheader-wares");
  if (tbl.rows.length<1){
    var newrow,newcell;
    newrow = tbl.insertRow(-1);
    
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Наименование продукта';
   
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Картинка продукта';
  
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = 'Заголовок связанной акции';
    
    if (flMotulPLsys){
      newcell=newrow.insertCell(-1);
      newcell.innerHTML = 'Направление';  
    }

    newcell=newrow.insertCell(-1);
    newcell.innerHTML = '<input value="Добавить" title="Добавить продукт" onclick="editWareMotulRecord(-1,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'add\');" type="button">';
  }
}

function fillBodyForMotulSiteWares(){
 if (TStream.arrMotulWares.length>0){
   var tbl=document.getElementById("tablecontent-wares");
   for (i=0; tbl.rows.length; i++) {
     tbl.deleteRow(0);
   }
   var newrow,newcell;
   for (j=0; j< TStream.arrMotulWares.length; j++){
     newrow = tbl.insertRow(-1);
     newrow.id ="tr-motul-wares-"+TStream.arrMotulWares[j].WareCode;
     $(newrow).attr("cur-num",j);
     $(newrow).attr("ware-code",TStream.arrMotulWares[j].WareCode);
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","name");
     newcell.innerHTML ='<span >'+TStream.arrMotulWares[j].WareName+'</span>';
   
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","image");
     if (TStream.arrMotulWares[j].ImageSize==0){
       newcell.innerHTML='....';
     }
     else{
      newcell.innerHTML='<img class="ware-image-site-motul" src="data:image/png;base64,'+TStream.arrMotulWares[j].Image+'" >'; 
     }
     
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","with-action");
     $(newcell).attr("action-code",TStream.arrMotulWares[j].ActionCode);
     newcell.innerHTML = TStream.arrMotulWares[j].ActionHeader;
     
     if (flMotulPLsys){
       newcell=newrow.insertCell(-1);
       $(newcell).attr("class","dirrect");
       $(newcell).attr("dirrect-code",TStream.arrMotulWares[j].SysCode);
       newcell.innerHTML = TStream.arrMotulWares[j].SysName;
    }

     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","action");
     newcell.innerHTML ='<a class="abgslide edit" cur-num="'+j+'" ware-code="'+TStream.arrMotulWares[j].WareCode+'" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать продукт" onclick="editWareMotulRecord(this,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'edit\'); event.stopPropagation(); return false;"></a>'
                         +'<a class="abgslide del" style="background-image: url('+descrimageurl+'/images/wdell.png); position: static; float: left;" href="#" title="Удалить продукт" onclick="if (confirm(\'Вы действительно хотите удалить продукт?\')) {ec(\'motulsitemanage\',\'ware-code='+TStream.arrMotulWares[j].WareCode+'&kindofoperation=15\',\'newbj\');}"></a>';
   }
  }
}

function fillBodyForMotulSiteInfo(){
 if (TStream.arrMotulInfo.length>0){
   var tbl=document.getElementById("tablecontent-info");
   for (i=0; tbl.rows.length; i++) {
     tbl.deleteRow(0);
   }
   var newrow,newcell;
   for (j=0; j< TStream.arrMotulInfo.length; j++){
     newrow = tbl.insertRow(-1);
     newrow.id ="tr-motul-info-"+TStream.arrMotulInfo[j].ActionCode;
     $(newrow).attr("cur-num",j);
     $(newrow).attr("action-code",TStream.arrMotulInfo[j].ActionCode);
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","header");
     newcell.innerHTML ='<span >'+TStream.arrMotulInfo[j].ActionHeader+'</span>';

     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","html-file");
     newcell.innerHTML = '......';

     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","action");
     newcell.innerHTML ='<a class="abgslide edit" cur-num="'+j+'" info-code="'+TStream.arrMotulAction[j].ActionCode+'" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать информацию" onclick="editInfoMotulRecord(this,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'edit\'); event.stopPropagation(); return false;"></a>';
   }
  }
}


function editActionMotulRecord(elem,divname,editorname,act){
  if (TStream.arrMotulAction.length){
    $('#'+divname).css('display', 'block');
    $("#tinyeditorinfo_parent").css("display","block");
    $("#action-header-caption").text("Заголовок акции:");
    $('#'+divname).width(parseInt(window.screen.width*0.9));
    $('#'+divname).css('left', parseInt(document.documentElement.clientWidth*0.05));
    $('#'+divname).height(parseInt(document.documentElement.clientHeight*0.9));
    $('#'+divname).css('top', parseInt(document.documentElement.clientHeight*0.05));
    $("div.wareinfoimgdiv").css("height",$("#"+divname).height()-10+"px");
    $("div.current-ware-image-div").css("height",$("#"+divname).height()-95+"px");
    $("div.wareinfoimgdiv").css("display","none");
    $("#join-action-select").css("display","none");
    $("span.action-join-span").css("display","none");
    $('#tebottompanel').removeClass('ware-edit');
    
    $('#'+divname+' #tinyeditorinfo_tbl').width($('#'+divname).width()-20-300);
    $('#'+divname+' #tinyeditorinfo_tbl').css('left', 10);
    var h=parseInt(document.documentElement.clientHeight*0.9)-$('#'+divname+' .mceToolbar').height()-$('#'+divname+' .mceStatusbar').height()-$('#'+divname+' #tebottompanel').height()-$('#header-action-div').height()-24;
    $('#'+divname+' .mceIframeContainer').height(h);
    $('#'+divname+' .mceIframeContainer iframe').height(h);
    $('#'+divname+' .mceIframeContainer iframe').width($('#'+divname+'').width()-20-300);
    //$("#TinyEditActionFilesDIV table.mceLayout").css("width","100%");
    $('#header-action-date-div').css('display','inline-block');
    $('#header-action-div span.action-check-span').css('display','inline');
    $('#action-is-plex').css('display','inline');
    $('#action-is-chex').css('display','inline');
    $('#ware-code').val('');
    $('#join-action-header').val('');
    $('#join-action-code').val('');
    $('#ware-code-for-image').val('');

    if (act=='edit'){
      var num=$(elem).attr("cur-num");
      $("#kindofoperation").val(11);
      $('#action-code').val(TStream.arrMotulAction[num].ActionCode);
      $('#num-action-record').val(num);
      $('#header-action-div input').val(TStream.arrMotulAction[num].ActionHeader);
      $('#action-fromdate').val(TStream.arrMotulAction[num].ActionBeginDate);
      $('#action-todate').val(TStream.arrMotulAction[num].ActionEndDate);
      if (TStream.arrMotulAction[num].IsPlex){
        $('#action-is-plex').attr('checked',true);
      }
      else{
        $('#action-is-plex').attr('checked',false);
      }
      if (TStream.arrMotulAction[num].IsChex){
        $('#action-is-chex').attr('checked',true);
      }
      else{
        $('#action-is-chex').attr('checked',false);
      }
      tinyMCE.get(editorname).setContent(TStream.arrMotulAction[num].ActionMemoText);
    }
    if (act=='add'){
      $("#kindofoperation").val(10);
      $('#action-code').val('');
      $('#ware-code').val('');
      $('#num-action-record').val('');
      $('#header-action-div input').val('');
      $('#action-fromdate').val('');
      $('#action-todate').val('');
      $('#action-is-chex').attr('checked',false);
      $('#action-is-chex').attr('checked',false);
      tinyMCE.get(editorname).setContent('');

    }
  }
}

function editInfoMotulRecord(elem,divname,editorname,act){
  if (TStream.arrMotulInfo.length){
    $('#'+divname).css('display', 'block');
    $("#tinyeditorinfo_parent").css("display","block");
    $("#action-header-caption").text("Заголовок акции:");
    $('#'+divname).width(parseInt(window.screen.width*0.9));
    $('#'+divname).css('left', parseInt(document.documentElement.clientWidth*0.05));
    $('#'+divname).height(parseInt(document.documentElement.clientHeight*0.9));
    $('#'+divname).css('top', parseInt(document.documentElement.clientHeight*0.05));
    $("div.wareinfoimgdiv").css("height",$("#"+divname).height()-10+"px");
    $("div.current-ware-image-div").css("height",$("#"+divname).height()-95+"px");
    $("div.wareinfoimgdiv").css("display","none");
    $("#join-action-select").css("display","none");
    $("span.action-join-span").css("display","none");
    $('#tebottompanel').removeClass('ware-edit');
 
    $('#'+divname+' #tinyeditorinfo_tbl').width($('#'+divname).width()-20-300);
    $('#'+divname+' #tinyeditorinfo_tbl').css('left', 10);
    //$('#'+divname+' #tinyeditorinfo_tbl').css('top', 10);
    var h=parseInt(document.documentElement.clientHeight*0.9)-$('#'+divname+' .mceToolbar').height()-$('#'+divname+' .mceStatusbar').height()-$('#'+divname+' #tebottompanel').height()-$('#header-action-div').height()-24;
    $('#'+divname+' .mceIframeContainer').height(h);
    $('#'+divname+' .mceIframeContainer iframe').height(h);
    $('#'+divname+' .mceIframeContainer iframe').width($('#'+divname+'').width()-20-300);
   // $("#TinyEditActionFilesDIV table.mceLayout").css("width","100%");
    if (act=='edit'){
      var num=$(elem).attr("cur-num");
      $("#kindofoperation").val(11);
      $('#action-code').val(TStream.arrMotulInfo[num].ActionCode);
      $('#num-action-record').val(num);
      $('#header-action-date-div').css('display','none');
      $('#header-action-div span.action-check-span').css('display','none');
      $('#header-action-div input').val(TStream.arrMotulInfo[num].ActionHeader);
      $('#action-fromdate').val('');
      $('#ware-code').val('');
      $('#join-action-header').val('');
      $('#join-action-code').val('');
      $('#ware-code-for-image').val('');
      $('#action-todate').val('');
      $('#action-is-plex').attr('checked',false);
      $('#action-is-plex').css('display','none');
      $('#action-is-chex').attr('checked',false);
      $('#action-is-chex').css('display','none');
      tinyMCE.get(editorname).setContent(TStream.arrMotulInfo[num].ActionMemoText);
    }
  }
}

function editWareMotulRecord(elem,divname,editorname,act){
  if (TStream.arrMotulWares.length){
    $('#'+divname).css('display', 'block');
    $("#tinyeditorinfo_parent").css("display","none");
    $("#action-header-caption").text("Наименование продукта:");
    $('#'+divname).width(parseInt(window.screen.width*0.6));
    $('#'+divname).css('left', parseInt(document.documentElement.clientWidth*0.2));
    $('#'+divname).height(parseInt(document.documentElement.clientHeight*0.8));
    $('#'+divname).css('top', parseInt(document.documentElement.clientHeight*0.05));
    $("div.wareinfoimgdiv").css("height",$("#"+divname).height()-10+"px");
    $("div.current-ware-image-div").css("height",$("#"+divname).height()-95+"px");

    $('#'+divname+' #tinyeditorinfo_tbl').width($('#'+divname).width()-20-300);
    $('#'+divname+' #tinyeditorinfo_tbl').css('left', 10);
    //$('#'+divname+' #tinyeditorinfo_tbl').css('top', 10);
    var h=parseInt(document.documentElement.clientHeight*0.9)-$('#'+divname+' .mceToolbar').height()-$('#'+divname+' .mceStatusbar').height()-$('#'+divname+' #tebottompanel').height()-$('#header-action-div').height()-24-233;
    $('#'+divname+' .mceIframeContainer').height(h);
    $('#'+divname+' .mceIframeContainer iframe').height(h);
    $('#'+divname+' .mceIframeContainer iframe').width($('#'+divname+'').width()-20-300);
    $('#tebottompanel').addClass('ware-edit');
    $("#join-action-select").empty();
    $("#join-action-select").append($('<option value="0"></option>'));
    for (j=0; j< TStream.arrMotulAction.length; j++){
      if (TStream.arrMotulAction[j].IsAct){
        $("#join-action-select").append( $('<option value="'+TStream.arrMotulAction[j].ActionCode+'">'+TStream.arrMotulAction[j].ActionHeader+'</option>'));
      }
    }
    if (flMotulPLsys){
      $("#direct-choice-select").empty();
      $("#direct-choice-select").append($('<option value="0"></option>'));
      $("#direct-choice-select").append( $('<option value="1">Авто</option>'));
      $("#direct-choice-select").append( $('<option value="2">Мото</option>'));
      $("#direct-choice-select").append( $('<option value="4">Грузовики</option>'));
    }

    if (act=='edit'){
      $("div.wareinfoimgdiv").css("display","block");
      $("#join-action-select").css("display","inline");
      $("span.action-join-span").css("display","inline");
      var num=$(elem).attr("cur-num");
      if (TStream.arrMotulWares[num].ActionCode !=0){
        $("#join-action-select [value='"+TStream.arrMotulWares[num].ActionCode+"']").attr("selected", "selected");
      }
      else{
         $("#join-action-select [value='0']").attr("selected", "selected");
      }
      if (TStream.arrMotulWares[num].Image !=''){
        $("div.current-ware-image-div #current-ware-image").attr("src","data:image/png;base64,"+TStream.arrMotulWares[num].Image);
      }
      else{
        $("div.current-ware-image-div #current-ware-image").attr("src","");
      }
      $("#kindofoperation").val(14);
      $('#action-code').val('');
      $('#join-action-header').val(TStream.arrMotulWares[num].ActionHeader);
      $('#join-action-code').val(TStream.arrMotulWares[num].ActionCode);
      $('#num-action-record').val(num);
      $('#header-action-date-div').css('display','none');
      $('#header-action-div span.action-check-span').css('display','none');
      $('#header-action-div input').val(TStream.arrMotulWares[num].WareName);
      $('#action-fromdate').val('');
      $('#ware-code').val(TStream.arrMotulWares[num].WareCode);
      $('#ware-code-for-image').val(TStream.arrMotulWares[num].WareCode);
      $('#action-todate').val('');
     if (flMotulPLsys){
       $('#direct-choice-code').val(TStream.arrMotulWares[num].SysCode);
       if (TStream.arrMotulWares[num].SysCode !=0){
         $("#direct-choice-select [value='"+TStream.arrMotulWares[num].SysCode+"']").attr("selected", "selected");
       }
       else{
          $("#direct-choice-select [value='0']").attr("selected", "selected");
       }
      }
      $('#action-is-plex').attr('checked',false);
      $('#action-is-plex').css('display','none');
      $('#action-is-chex').attr('checked',false);
      $('#action-is-chex').css('display','none');
      tinyMCE.get(editorname).setContent('');
    }
    if (act=='add'){
      $("div.wareinfoimgdiv").css("display","none");
      $("#join-action-select").css("display","none");
      $("span.action-join-span").css("display","none");
      $("div.current-ware-image-div #current-ware-image").attr("src","");
      $("#kindofoperation").val(13);
      $('#action-code').val('');
      $('#join-action-header').val('');
      $('#join-action-code').val('');
      $('#num-action-record').val('');
      $('#ware-code-for-image').val('');
      if (flMotulPLsys){
        $('#direct-choice-code').val('');
      }
      $('#header-action-date-div').css('display','none');
      $('#header-action-div span.action-check-span').css('display','none');
      $('#header-action-div input').val('');
      $('#action-fromdate').val('');
      $('#ware-code').val('');
      $('#action-todate').val('');
      $('#action-is-plex').attr('checked',false);
      $('#action-is-plex').css('display','none');
      $('#action-is-chex').attr('checked',false);
      $('#action-is-chex').css('display','none');
      tinyMCE.get(editorname).setContent('');
    }
  }
}

function delForActionMotulSitePage(num){
  var tbl= document.getElementById('tablecontent-action'); 
  var tr=$("table#tablecontent-action tr#tr-motul-action-"+num);
  TStream.arrMotulAction.splice(tr.attr("cur-num"), 1);
  tbl.deleteRow(tr.index());
  if (TStream.arrMotulAction.length>0){
    synqcolsForMPP("#tablecontentdiv-action","tableheader-action","tablecontent-action",TStream.arrMotulAction.length);
    for (i=0; i<tbl.rows.length; i++) {
      for (j=0; j<TStream.arrMotulAction.length; j++) {
        if (TStream.arrMotulAction[j].ActionCode==$(tbl.rows[i]).attr("action-code")){
          $(tbl.rows[i]).attr("cur-num",j);
        }
      }  
    }  
  }
}

function delForWaresMotulSitePage(num){
 var tbl= document.getElementById('tablecontent-wares'); 
 var tr=$("table#tablecontent-wares tr#tr-motul-wares-"+num);
 TStream.arrMotulWares.splice(tr.attr("cur-num"), 1);
 tbl.deleteRow(tr.index());
 if (TStream.arrMotulWares.length>0){
   synqcolsForMPP("#tablecontentdiv-wares","tableheader-wares","tablecontent-wares",TStream.arrMotulWares.length);
   for (i=0; i<tbl.rows.length; i++) {
     for (j=0; j<TStream.arrMotulWares.length; j++) {
       if (TStream.arrMotulWares[j].WareCode==$(tbl.rows[i]).attr("ware-code")){
         $(tbl.rows[i]).attr("cur-num",j);
       }
     }  
   }  
 }
}


function editRowForMotulSiteActionTable(num){
  var tr=$("#tr-motul-action-"+TStream.arrMotulAction[num].ActionCode);
  tr.find("td.header").html('<span >'+TStream.arrMotulAction[num].ActionHeader+'</span>');
  tr.find("td.beg-date").html(TStream.arrMotulAction[num].ActionBeginDate);
  tr.find("td.end-date").html(TStream.arrMotulAction[num].ActionEndDate);

}

function editRowForMotulSiteInfoTable(num){
  var tr=$("#tr-motul-info-"+TStream.arrMotulInfo[num].ActionCode);
  tr.find("td.header").html('<span >'+TStream.arrMotulInfo[num].ActionHeader+'</span>');
}

function editRowForMotulSiteWaresTable(num){
  var tr=$("#tr-motul-wares-"+TStream.arrMotulWares[num].WareCode);
  tr.find("td.name").html('<span >'+TStream.arrMotulWares[num].WareName+'</span>');
  tr.find("td.with-action").html(TStream.arrMotulWares[num].ActionHeader);
  if (flMotulPLsys){
    tr.find("td.dirrect").html(TStream.arrMotulWares[num].SysName);
    tr.find("td.dirrect").attr("dirrect-code",TStream.arrMotulWares[num].SysCode);
  }
}

function addRowForMotulSiteActionTable(num){
  var tbl= document.getElementById('tablecontent-action'); 
  var newrow,newcell;
  newrow = tbl.insertRow(-1);
  newrow.id ="tr-motul-action-"+TStream.arrMotulAction[num].ActionCode;
  $(newrow).attr("cur-num",j);
  $(newrow).attr("action-code",TStream.arrMotulAction[num].ActionCode);
  newcell=newrow.insertCell(-1);
  $(newcell).attr("class","header");
  newcell.innerHTML ='<span >'+TStream.arrMotulAction[num].ActionHeader+'</span>';

  newcell=newrow.insertCell(-1);
  $(newcell).attr("class","beg-date");
  newcell.innerHTML = TStream.arrMotulAction[num].ActionBeginDate;

  newcell=newrow.insertCell(-1);
  $(newcell).attr("class","end-date");
  newcell.innerHTML = TStream.arrMotulAction[num].ActionEndDate;

  newcell=newrow.insertCell(-1);
  $(newcell).attr("class","html-file");
  newcell.innerHTML = '......';

  newcell=newrow.insertCell(-1);
  $(newcell).attr("class","isplex");
  if (TStream.arrMotulAction[num].IsPlex){
    newcell.innerHTML ='<img src="/images/acckind1.gif">';
  }
  else{
    newcell.innerHTML ='<img src="/images/acckind0.gif">';
  }
  
  newcell=newrow.insertCell(-1);
  $(newcell).attr("class","ischex");
  if (TStream.arrMotulAction[num].IsChex){
    newcell.innerHTML ='<img src="/images/acckind1.gif">';
  }
  else{
    newcell.innerHTML ='<img src="/images/acckind0.gif">';
  }
  
   newcell=newrow.insertCell(-1);
   $(newcell).attr("class","action");
   newcell.innerHTML ='<a class="abgslide edit" cur-num="'+num+'" action-code="'+TStream.arrMotulAction[num].ActionCode+'" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать акцию" onclick="editActionMotulRecord(this,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'edit\'); event.stopPropagation(); return false;"></a>'
                      +'<a class="abgslide del" style="background-image: url('+descrimageurl+'/images/wdell.png); position: static; float: left;" href="#" title="Удалить акцию" onclick="if (confirm(\'Вы действительно хотите удалить акцию?\')) {ec(\'motulsitemanage\',\'action-code='+TStream.arrMotulAction[num].ActionCode+'&kindofoperation=12\',\'newbj\');}"></a>';

}

function addRowForMotulSiteWaresTable(num){
 var tbl=document.getElementById("tablecontent-wares");
 var newrow,newcell;
 newrow = tbl.insertRow(-1);
 newrow.id ="tr-motul-wares-"+TStream.arrMotulWares[num].WareCode;
     $(newrow).attr("cur-num",num);
     $(newrow).attr("ware-code",TStream.arrMotulWares[num].WareCode);
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","name");
     newcell.innerHTML ='<span >'+TStream.arrMotulWares[num].WareName+'</span>';
   
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","image");
     newcell.innerHTML='<img>'; 
     
     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","with-action");
     $(newcell).attr("action-code",TStream.arrMotulWares[num].ActionCode);
     newcell.innerHTML = TStream.arrMotulWares[num].ActionHeader;
  
    if (flMotulPLsys){
       newcell=newrow.insertCell(-1);
       $(newcell).attr("class","dirrect");
       $(newcell).attr("dirrect-code",TStream.arrMotulWares[num].SysCode);
       newcell.innerHTML = TStream.arrMotulWares[num].SysName;
    }

     newcell=newrow.insertCell(-1);
     $(newcell).attr("class","action");
     newcell.innerHTML ='<a class="abgslide edit" cur-num="'+num+'" ware-code="'+TStream.arrMotulWares[num].WareCode+'" style="background-image: url('+descrimageurl+'/images/wedit.png); position: static; float: left;" href="#" title="Редактировать продукт" onclick="editWareMotulRecord(this,\'TinyEditActionFilesDIV\',\'tinyeditorinfo\',\'edit\'); event.stopPropagation(); return false;"></a>'
                        +'<a class="abgslide del" style="background-image: url('+descrimageurl+'/images/wdell.png); position: static; float: left;" href="#" title="Удалить продукт" onclick="if (confirm(\'Вы действительно хотите удалить продукт?\')) {ec(\'motulsitemanage\',\'ware-code='+TStream.arrMotulWares[num].WareCode+'&kindofoperation=15\',\'newbj\');}"></a>';

    
    $("div.wareinfoimgdiv").css("display","block");
    $("#join-action-select").css("display","inline");
    $("span.action-join-span").css("display","inline");
    $("#kindofoperation").val(14);
    $('#ware-code-for-image').val(TStream.arrMotulWares[num].WareCode);
    $('#ware-code').val(TStream.arrMotulWares[num].WareCode);
    $('#num-action-record').val(num);
}

function prepwareactionfiles() {
  var action_code=document.getElementById('action-code');
  var s=tinyMCE.get('tinyeditorinfo').getContent(); 
  while (s.indexOf('\n')>0){
   s=s.replace('\n',' ');
  }
  $('#tinyeditorinfo').attr('value', s);

  if (($("#kindofoperation").val() !=13)  && ($("#kindofoperation").val() !=14)){
    var el=document.getElementById('action-header-caption');
    el=el.nextElementSibling;
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('Вы не указали заголовок акции.');
       el.focus();
       return false;
    }

    if (($(action_code).val() !=1) && ($(action_code).val() !=2)){
      el=document.getElementById('action-fromdate');
      //el.value=mtrim(el.value);
      if (!el.value) {
        jqswMessageError('Вы не указали дату начала акции.');
        el.focus();
        return false;
      }

     el=document.getElementById('action-todate');
     //el.value=mtrim(el.value);
     if (!el.value) {
       jqswMessageError('Вы не указали дату окончания акции.');
       el.focus();
       return false;
     }
    }

    el=document.getElementById('tinyeditorinfo');
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('Вы не указали HTML-текст акции.');
       el.focus();
       return false;
    }
  }
  else{
    var el=document.getElementById('action-header-caption');
    el=el.nextElementSibling;
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('Вы не указали название товара.');
       el.focus();
       return false;
    }

  }
  return true;
}

function changeMotulJoinWaresAction(){
  $('#join-action-code').val($("#join-action-select option:selected").val());
  $('#join-action-header').val($("#join-action-select option:selected").text());
}

function changeMotulJoinWaresDirect(){
  $('#direct-choice-code').val($("#direct-choice-select option:selected").val());
}

function fillTableBlocksHistory(){
  if (TStream.arlen>0){
    var s='<table class="list-history-blocks-table st">';
    var  altrow=true;  
    for (j=0; j<TStream.arlen; j++){
      s+='<tr '+fnIfStr((j>1),(altrow?'class="altrow"':''),'')+' >';
      s+='  <td '+fnIfStr((j>1),'class="left"','')+'">'+TStream.artable[j].BlockInfo+'</td>';  
      s+='</tr>';
      altrow=!altrow;
    }  
    s+='</table>';
    jqswtext('Просмотр',s);
  }
}
