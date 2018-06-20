var acckinds = new Array('Аннулирован', 'Закрыт', '', 'Не со своего склада');
var deliverytimekey = new Array();
deliverytimekey[0]=true;
var deliverylabelkey = new Array();
deliverylabelkey[0]=false;
var flNewModeCGI=false;

var storages = new Array();
var shortstorages = new Array();
var storagesoptions = new Array(); // -1 - филиал, 0 - склад, 1 - путь
var TStream={};// аналог стрима для обработки в функциях
var TStream2={};// аналог стрима для обработки в функциях
var TStream3={};// аналог стрима для обработки в функциях
var TStream4={};// аналог стрима для обработки в функциях
var TStream5={};// аналог стрима для обработки в функциях
var TStream6={};// аналог стрима для обработки в функциях

function fnIfStr(Cond, sTrue, sFalse){   //аналог из делфи
  if (Cond) { 
    return sTrue; 
  }
  else{
    return sFalse;  
  }
}


function acclistheader() {
  var currow;
  var curcell;
  var tbl=$("#tableheader")[0];
  while (tbl.rows[0].cells.length) tbl.rows[0].deleteCell(0);
  currow=tbl.rows[0];
  curcell=currow.insertCell(-1);
  curcell.innerHTML="..."; //
//  curcell=currow.insertCell(-1);
//  curcell.innerHTML="Блок."; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Номер"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Дата"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Контрагент"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Контракт"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Склад отгрузки"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Сумма"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Вал."; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Тип отгр."; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Дата отгр."; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Время отгр."; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Оператор"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Комментарий"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="Комментарий клиенту"; //
  curcell=currow.insertCell(-1);
  curcell.innerHTML="&nbsp;"; //
  
}


function applypayinvoicefilter(clearacc=false) {
  $("#deliverieslistbtn").css("display", "none");
  $("#clientdatadiv").css("display", "none");
  $("#invoiceheaderdiv").css("display", "none");
  $("#invoicesfilterdiv").css("display", "block");
  tbl=$("#tablecontent")[0];
  while (tbl.rows.length) tbl.deleteRow(0);
  acclistheader();

  if (($("#filterfirm").val()!='') && ($("#filterselectefirm").val()=='')) {
    alert("Вы не указали контрагента");
	return false;
  }	
  if (mtrim($('#filterfromdate').val()) && !cal_check_date('filterfromdate', true)) {
	  return false;
  }
  if (mtrim($('#filtertodate').val()) && !cal_check_date('filtertodate', true)) {
    return false;
  }
  if (mtrim($('#filterdeliverydate').val()) && !cal_check_date('filterdeliverydate', true)) {
	return false;
  }
  
  if (flNewModeCGI)
    sfbaNew($('#payinvoicefilterform')[0]);
  else
    sfba($('#payinvoicefilterform')[0]);
  $("#warerestsdiv").dialog("close");
} 

function loadpayinvoice(firmid, accountid) {
  $("#labelsdiv").html("");
  $("#warerestsdiv").dialog("close");
  $("#clientdatadiv").css("display", "none");
  $("#invoiceheaderdiv input[id!='invoicefirm']").unbind();
  $("#invoiceheaderdiv input text").css("background-color", inputbgcolor);
  $("#invoiceheaderdiv select").unbind();

	$("#invoicenum").html("&lt;AUTO&gt;");
	$("#invoicedate").html("");
  $("#invoiceparent").html("");
  $("#invoicewebcomment").html("");
  //$("#invoicedeliverytype")[0].options.length=0;
	$("#invoiceheaderdiv input:hidden:not(input:button)").val("");
//  $("#toacclistbtn").val("К списку счетов");
	$("#invoiceheaderdiv input:text").val("");
	$("#invoiceheaderdiv input:text").attr("disabled", true);
	$("#invoiceheaderdiv input:checkbox").attr("checked", false);
	$("#invoiceheaderdiv input:checkbox").attr("disabled", true);
//  $("#invoiceheaderdiv select[id!='invoicecurr']").val("");
//  $("#invoicecurr").val("10");
  $("#invoiceheaderdiv select").attr("disabled", true);
//  $("#invoiceheaderdiv select[id!='invoicecurr']").filter("select[id!='invoicestorage']").empty();
 // $("#invoicedeliverytype, #invoicelabel").empty();
  $("#invoicefirm").attr("disabled", false);

	var currow;
	var curcell;
	var tbl=$("#tableheader")[0];
	while (tbl.rows[0].cells.length) tbl.rows[0].deleteCell(0);
	currow=tbl.rows[0];
  curcell=currow.insertCell(-1);
	curcell.innerHTML="<input type=checkbox onclick=\"$('.accrowcb').attr('checked', this.checked);\">";
  curcell=currow.insertCell(-1);
	curcell.innerHTML="Товар";
	curcell=currow.insertCell(-1);
	curcell.innerHTML="Заказ";
	curcell=currow.insertCell(-1);
	curcell.innerHTML="Факт";
  curcell=currow.insertCell(-1);
	curcell.innerHTML="<select id=storageforrestcheck><option></select>";
  var _options=$('#storageforrestcheck')[0].options;
  shortstorages.forEach(function(element, index, array){
    _options[_options.length]= new Option(element, index, false, false);
  });
  $("#storageforrestcheck").bind('change', function(event) {
    fnstorageforrestcheck();
  });

  curcell=currow.insertCell(-1);
	curcell.innerHTML="Ед.изм.";
	curcell=currow.insertCell(-1);
	curcell.innerHTML="Цена";
	curcell=currow.insertCell(-1);
	curcell.innerHTML="Сумма";
	curcell=currow.insertCell(-1);
	curcell.innerHTML="Описание";
	tbl=$("#tablecontent")[0];
	while (tbl.rows.length) tbl.deleteRow(0);
	$("#showinvoicelistbtn").val("К реестру счетов");
	$("#invoicesfilterdiv").css("display", "none");
	$("#invoiceheaderdiv").css("display", "block");
	$("#mainheaderwrap").css("height", "185");
  $(".accworkbtn").attr('disabled', true);
  if (accountid) {
    ec('loadinvoice', 'id='+accountid, fnIfStr(flNewModeCGI,'newbj','abj')); 
  } else if (firmid) {
//    ec("getclientfindata", "forfirmid="+firmid, "abj")
    ec('loadinvoice', 'id=-1&forfirmid='+firmid+'&contract='+$("#filtercontract").val(),fnIfStr(flNewModeCGI,'newbj','abj')); 
  } else
	set_sizes();
	
}

function payinvoiceheaderbinding() {
  $("#invoiceheaderdiv input:text[id!='invoicefirm']").bind('keyup', function(event) {
    this.style.backgroundColor=((this.value!=$(this).attr("oldval"))?coNonSavedColor:"#fff");
  });
  $("#invoiceheaderdiv input:text[id!='invoicefirm']").bind('blur', function(event) {
    if (this.value!=$(this).attr("oldval"))
      ec("saveaccheaderpart", "partid="+this.id+"&accid="+$("#invoicecode").val()+"&val="+this.value, "abj");
  });

  $("#invoiceheaderdiv select").bind('change', function(event) {
    if (this.value!=$(this).attr("oldval"))
      ec("saveaccheaderpart", "partid="+this.id+"&accid="+$("#invoicecode").val()+"&val="+this.value, "abj");
  });
  $("#invoiceprocessed").bind('click', function(event) {
    ec("saveaccheaderpart", "partid="+this.id+"&accid="+$("#invoicecode").val()+"&val="+((this.checked)?"1":"0"), "abj");
  });

  $("#invoicedeliverylabeltext").unbind();
  
  zakazfactbinding(0);
}

function zakazfactbinding(linecode_) {
  var selectors=(linecode_)?"#zakaz"+linecode_+", #fact"+linecode_:"td input[id^='zakaz'], td input[id^='fact']";
  $(selectors).bind('keyup', function(event) {
    this.style.backgroundColor=((this.value!=$(this).attr("oldval"))?coNonSavedColor:"#fff");
  });
  $(selectors).bind('blur', function(event) {
    if (this.value!=$(this).attr("oldval")) {
      var linecode=$(this).attr('lineid');
      var warecode=$(this).attr('wareid');
//      alert(((this.id.substr(0, 4)=='fact')?'fact':'zakaz'));
      ec('editlineininvoice', 'linecode='+linecode+'&forfirmid='+$('#forfirmid').val()+'&accid='+$('#invoicecode').val()+'&old='+$('#fact'+linecode).attr("oldval")
                        +'&wareqty='+this.value+'&wareid='+warecode+"&whatcol="+((this.id.substr(0, 4)=='fact')?'fact':'zakaz'), 'abj');
    }
  });
}

function setaccrowcolor(currow) {
  if ($(currow).attr('executed')=="true") {
    currow.style.color="blue";
  } else
  if ($(currow).attr('annulated')=="true") {
    currow.style.color="#808080";
  } else 
  if ($(currow).attr('blocked')=="true") {
    currow.style.color="red";
  } else 
  if ($(currow).attr('overdued')=="true") {
    currow.style.color="red";
  } else {
    currow.style.color="black";
  }
    
} 

function fillaccrowfirstcell(currow, curcell) {
  if ($(currow).attr('executed')=="true") {
    curcell.innerHTML="<img src='/images/proc.png' title='Исполнен'>";
  } else
  if ($(currow).attr('annulated')=="true") {
    curcell.innerHTML="<img src='/images/annul.png' title='Аннулирован'>";
  } else
  if ($(currow).attr('overdued')=="true") {
    curcell.innerHTML="<img src='/images/overdued.png' title='Просрочено время доставки'>";
  } else
  if ($(currow).attr('blocked')=="true") {
    curcell.innerHTML="Б";
    curcell.title="Блокирован";
  } else 
  if ($(currow).attr('processed')=="true") {
    curcell.innerHTML="&#8730;";
    curcell.title="Обработан";
  } else {
    curcell.innerHTML="&nbsp;";
  }  
}

function fillaccrowlastcell(currow, curcell) {
  var s=(($(currow).attr('annulated')=="true")?'un':'');
  curcell.innerHTML='<a class=abANew style="background-image: url(/images/'+s+'annulbtn.png); position: static; width: 16px; height: 16px; right: 16px;" href=# act="'
                    +s+'annul" onclick="setannul(this, '+$(currow).attr('code')+');" title="'+(($(currow).attr('annulated')=="true")?'Деа':'А')+'ннулировать счет"></a>';  
}

function addpayinvoicerow(_accid, _blocked, _processed, _annulated, _executed, _overdued, _accnum, _accdate, _firmid, _firmname, _contid, _ismoto, _contnum, _store, _accsum, _acccurr, _deliverytype, _deliverydate, _deliverytime, _operator, _comment, _clientcomment) {
  tbl=$("#tablecontent")[0];
  currow=tbl.insertRow(-1);
  currow.id='accrow_'+_accid;
  $(currow).addClass('lblchoice');
  $(currow).attr('code', _accid);
  $(currow).attr('blocked', _blocked);
  $(currow).attr('processed', _processed);
  $(currow).attr('annulated', _annulated);
  $(currow).attr('executed', _executed);
  $(currow).attr('overdued', _overdued);

/*
  if (_blocked || _annulated || _executed) {
    ; 
  } else {
    $(currow).bind('click', function(event) {if (event.target.tagName=='TD') loadpayinvoice('', _accid);});
  }
*/
  $(currow).bind('click', function(event) {if (event.target.tagName=='TD') loadpayinvoice('', _accid);});
  
  setaccrowcolor(currow);

  curcell=currow.insertCell(-1);
  fillaccrowfirstcell(currow, curcell);

  
/*  curcell=currow.insertCell(-1);
  if (_blocked) {
    curcell.innerHTML="&#8730;";
    curcell.title="Блокирован";
  } else {
    curcell.innerHTML="&nbsp;";
  }
*/  
  curcell=currow.insertCell(-1);
  curcell.innerHTML=_accnum; 
  
  curcell=currow.insertCell(-1);
  curcell.innerHTML=_accdate;

  curcell=currow.insertCell(-1);
  curcell.style.textAlign="left";
  curcell.innerHTML='<img onclick=\'ec("loadaccountlist", "filterselectedfirm='+_firmid+'&shortfilter=true",'+fnIfStr(flNewModeCGI,' "newbj"',' "abj"')+');\' src="/images/filter.jpg" style="cursor: pointer;" title="Выдать последние счета этого контрагента"> '
//                   +'<img onclick=\'ec("getclientfindata", "forfirmid='+_firmid+'&setfirm=true", "abj");\' src="/images/client.png" style="cursor: pointer; title="Задолженность"> '
                   +_firmname+'';

  curcell=currow.insertCell(-1);
  curcell.className="activecell";
  curcell.onclick = function(event){ec("checkcontracts", "contractid="+_contid+"&firmid="+_firmid+"&infoonly=true", fnIfStr(flNewModeCGI,' "newbj"',' "abj"'));event.stopPropagation();}
  curcell.innerHTML='<img style="width: 16px; height: 16px; position: relative; top: 3px; background-image: url(http://orders/images/'+(_ismoto?'bike':'auto')+'16.png);" src="/images/tr.gif">'
                   +_contnum;


  curcell=currow.insertCell(-1);
  curcell.innerHTML=((_store)?storages[_store]:'');

  curcell=currow.insertCell(-1);
  curcell.innerHTML=_accsum;
  curcell.style.textAlign="left";
  curcell=currow.insertCell(-1);
  curcell.innerHTML=_acccurr;
  curcell.style.textAlign="left";
  curcell=currow.insertCell(-1);
  curcell.innerHTML= ((_deliverytype)?$('#filterdeliverytype option[value="'+_deliverytype+'"]').html():'');
  curcell=currow.insertCell(-1);
  curcell.innerHTML= _deliverydate;
  curcell=currow.insertCell(-1);
  curcell.innerHTML= ((_deliverytime)?$('#filterdeliverytime option[value="'+_deliverytime+'"]').html():'');
  curcell=currow.insertCell(-1);
  curcell.innerHTML=_operator;
  curcell=currow.insertCell(-1);
  curcell.style.textAlign="left";
  curcell.style.whiteSpace="normal";
  curcell.innerHTML=_comment;  
  curcell=currow.insertCell(-1);
  curcell.style.textAlign="left";
  curcell.style.whiteSpace="normal";
  curcell.innerHTML=_clientcomment;  
  curcell=currow.insertCell(-1);
  fillaccrowlastcell(currow, curcell); 
}

/*
function createsubacc() {
  _select=$('#invoicestorage')[0];
  if (_select.options.length<2) {
    alert('Нет разрешенных складов для создания счета на недостающие.');
    return false;
  }
  if (_select.options.length==2) {
    ec('', 'id=&storage='+$(_select).find('option:not(:selected)').val(), 'abj'); 
    return false;
  }
}
*/

function showlabels() {
  if ($('#labelstbl')[0].rows.length>2) {
    $.fancybox.open($("#labelsdiv"), {"modal" : false});
  } else {
    alert('У этого контрагента нет наклеек');
  }
}

function selectdeliverylabel(code) {
  if (code!=$('#invoicedeliverylabelcode').val(""))
    ec("saveaccheaderpart", "partid=invoicedeliverylabelcode&accid="+$("#invoicecode").val()+"&val="+code, "abj");
}


function addaccline(blocked, linecode, warecode, warename, zakaz, fact, unit, price, summ, descr) {
  tbl=$("#tablecontent")[0];
  currow=tbl.insertRow(-1);
  currow.id="invrow_"+linecode;
  curcell=currow.insertCell(-1);
  curcell.innerHTML="<input type=checkbox class=\"accrowcb\" linecode=\""+linecode+"\">";
  curcell=currow.insertCell(-1);
  curcell.style.textAlign='left';
  curcell.innerHTML="<div style='width: 100%; position: relative;'><a hreh=# onclick=\"ec('showwareinsearch', 'id="+warecode+"', 'abj')\">"+warename+"</a><a id=rm"+warecode+" class='abANew rm"+warecode+"'onclick=\"checkwareqty("+warecode+", this.parentNode);\" style=\" background-image: url("+descrimageurl+"/images/rm.png); right: 0px;\" href=# title=\"Проверить наличие товара\" ></a></div>";
  curcell=currow.insertCell(-1);
  if (blocked) {
    curcell.innerHTML=zakaz;
    curcell=currow.insertCell(-1);
    curcell.innerHTML=fact;
  } else {
    curcell.innerHTML="<input class=accinputtext type=text maxlength=6 value='"+zakaz+"' oldval='"+zakaz+"' id=zakaz"+linecode+" lineid="+linecode+" wareid="+warecode+">";
    curcell=currow.insertCell(-1);
    curcell.innerHTML="<input class=accinputtext type=text maxlength=6 value='"+fact+"' oldval='"+fact+"' id=fact"+linecode+" lineid="+linecode+" wareid="+warecode+">";
  }
  curcell=currow.insertCell(-1);
  curcell.innerHTML="&nbsp;";
  curcell.style.fontWeight="bold";
  $(curcell).addClass('tdcheck');
  $(curcell).attr('warecode', warecode);
  curcell=currow.insertCell(-1);
  curcell.innerHTML=unit;
  curcell=currow.insertCell(-1);
  curcell.innerHTML=price;
  curcell=currow.insertCell(-1);
  curcell.innerHTML="<span id=summ"+linecode+"> "+summ+"</span>";
  curcell=currow.insertCell(-1);
  curcell.style.textAlign='left';
  curcell.innerHTML="<div style='width: 100%; position: relative;'>"+descr+"<a class=abANew title='Удалить строку' href='javascript: ecq(\"dellinefrominvoice\", \"linecode="+linecode+"&forfirmid=\"+$(\"#forfirmid\").val()+\"&accid=\"+$(\"#invoicecode\").val()+\"&old=\"+$(\"#fact"+linecode+"\").html()+\"&wareid="+warecode+"\", \"abj\", \"Вы действительно хотите удалить строку?\");' style='background-image: url("+descrimageurl+"/images/wdell.png);  right: 10px; '></a></div>";
}


function checkwareqty(id, form) {
  ec("getrests", "id="+id+"&forfirmid="+$("#forfirmid").val()+"&contract="+$("#contract").val(), "abj");
}

function orderwithtransferinvoice() {
  if (!$(".accrowcb:checked").length) {
    alert('Не отмечена ни одна строка');
    return false;   
  } 
  if (flNewModeCGI )
    ec('showtransinvfororder', 'from='+$("#tinvfilterfrom").val()+'&to='+$("#tinvfilterto").val()+'&only='+$("#tinvfilteronlyopen")[0].checked, 'newbj');  
  else
    ec('showtransinvfororder', 'from='+$("#tinvfilterfrom").val()+'&to='+$("#tinvfilterto").val()+'&only='+$("#tinvfilteronlyopen")[0].checked, 'abj');
}

function addtransferinvforacc(invcode, invnum, invdate, invfrom, invto, invshipmethod, invshipdate, invshiptime, invcomment, invstatus) {
  var tbl=$("#transferinvforacc")[0];
  var newrow;
  var newcell;
  newrow=tbl.insertRow(-1);
  $(newrow).attr("code", invcode);
  newrow.className="lblchoice";
  newcell=newrow.insertCell(-1);
  newcell.innerHTML="<a href="+scriptname+"/showdoc?type=54&code="+invcode+" target='_blank'>"+invnum+"</a>";

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=invdate;

  newcell=newrow.insertCell(-1);
  newcell.style.whiteSpace="nowrap";
  newcell.innerHTML=storages[invfrom];

  newcell=newrow.insertCell(-1);
  newcell.style.whiteSpace="nowrap";
  newcell.innerHTML=storages[invto];

  newcell=newrow.insertCell(-1);
  newcell.style.whiteSpace="nowrap";
  newcell.innerHTML=(invshipmethod)?$('#filterdeliverytype option[value="'+invshipmethod+'"]').html():'';

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=invshipdate;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=(invshiptime)?$('#filterdeliverytime option[value="'+invshiptime+'"]').html():'';

  newcell=newrow.insertCell(-1);
  newcell.style.textAlign="left";
  newcell.style.whiteSpace="nowrap";
  newcell.className="tinvcomment";
  newcell.innerHTML=invcomment;

  newcell=newrow.insertCell(-1);
  newcell.innerHTML=invstatus;


}

function tinvsizetune(event, ui) {
  $("#transferinvforaccdiv").width($("html").width());
  var width=(($("#transferinvforacc").width()<$("#tinvfiltertable").width())?$("#tinvfiltertable").width():$("#transferinvforacc").width())+30;
  if (width<$("html").width()) {
    $("#transferinvforaccdiv").dialog("option", "width", width);
  } else {
    $(".tinvcomment").css('white-space', 'normal');
    $("#transferinvforaccdiv").dialog("option", "width", $("html").width());
  }

  var height=21*$("#transferinvforacc")[0].rows.length+200+$('#tinvfilterdiv').height();
  if ( height>($(window).height()-50)) {
    $("#transferinvforaccdiv").dialog("option", "height", $(window).height()-50);
  }
  
  $("#transferinvforaccdiv").dialog("option", "position", "center");

  $("#transferinvforaccdiv .lblchoice").bind('click', function(event) {
    if (event.target.tagName=='TD') {
      var cells=this.cells;
      if (confirm('Вы действительно хотите добавить недостающий товар в накладную передачи №'+cells[0].firstChild.innerHTML+' от '+cells[1].innerHTML
                  +' с '+cells[2].innerHTML+' на '+cells[3].innerHTML+'?' )) {
        ec('addwarestotinv', 'accid='+$("#invoicecode").val()+'&tinv='+$(this).attr('code')+'&rows='+getcheckedrowsfromacc(), 'abj');                  
      }  
    }
  });
}


function getcheckedrowsfromacc() {
  var s='';
  $('.accrowcb:checked').each(function (i) {
    s+=((s)?',':'')+$(this).attr('linecode');
//    s+=((s)?',':'')+this.linecode;
  });
  return s;
}

function addtinv(e) {
  $("#addtinvoicediv").dialog(
                                {buttons:{"Создать":function(e){savenewtinv()}}},
                                {modal:true},
                                {title: "Создание накладной передачи"},
                                {open: function(event, ui) {addtinvtune(event, ui)}}
                              );
}



function addtinvtune(event, ui) {
  var width=$("#addtinvtbl").width()+30;
  $("#addtinvoicediv").dialog("option", "width", width);
  $('#addtinvto').val('');
  $('#addtinvfrom').val('');
  $('#addtinvdate').val('');
  $('#addtinvtime').val('');
  $('#addtinvcomment').val('Заказ');                  

}

function savenewtinv() {
  if (!$('#addtinvfrom').val()) {
    alert('Вы не задали подразделение отгрузки');
    $('#addtinvfrom')[0].focus();
    return false;
  }
  if (!$('#addtinvto').val()) {
    alert('Вы не задали подразделение приема');
    $('#addtinvto')[0].focus();
    return false;
  }
  ec('addwarestotinv', 'accid='+$("#invoicecode").val()+'&tinv=0&rows='+getcheckedrowsfromacc()
      +'&addtinvto='+$('#addtinvto').val()+'&addtinvfrom='+$('#addtinvfrom').val()+'&addtinvdat=e'+$('#addtinvdate').val()+'&addtinvtime='+$('#addtinvtime').val()+'&addtinvcomment='+$('#addtinvcomment').val(), 'abj');                  
}

function fnstorageforrestcheck() {
  var s='';
  var z;
  var f;
  var cells;
  
  $(".tdcheck").html('');
  if ($("#storageforrestcheck").val()) {
    $('#tablecontent tr').each(function (i) {
      var cells=this.cells;
      if (!isNaN(cells[2].firstChild.value) && !isNaN(cells[3].firstChild.value) && (parseFloat(cells[2].firstChild.value)>parseFloat(cells[3].firstChild.value))) {
        s+=((s)?',':'')+$(cells[4]).attr('warecode');
      }
    });
  
    if (s) {
      ec('checkrestsinstorageforacc', 'storage='+$("#storageforrestcheck").val()+'&wares='+s, 'abj');
    } else {
      alert('Факт равен заказу, нет данных для проверки');  
    }
  }
  
}

function createinvoice() {
  if (!$('#invoicedeliverydate').val() || ($('#invoicedeliverydate').val()!=$('#invoicedeliverydate').attr('oldval'))) {
    alert('Дата доставки не задана или некорректна');      
    return false;
  } 
  
  if (!$('#invoicedeliverytime').attr('disabled') && !$('#invoicedeliverytime').val()) {
    alert('Не указано время доставки');      
    return false;
  } 

  if ($('#invoicedeliverydate').val() ||  $('#invoicedeliverytime').val()) {
    var DateNow=new Date();
    var DateAcc=new Date();
    var s, pos;
    DateAcc.setSeconds(0);
    DateAcc.setMilliseconds(0);
    var timeselect=$('#invoicedeliverytime')[0];
    if (timeselect.disabled || !timeselect.value) {
      DateAcc.setHours(23);
      DateAcc.setMinutes(59);
    } else {
      //s=timeselect.options[timeselect.selectedIndex].text;
      //pos=s.indexOf(':');
      //DateAcc.setHours(parseInt(s.substring(0, pos)));
     // DateAcc.setMinutes(parseInt(s.substring(pos+1)));
       DateAcc.setHours(23);
       DateAcc.setMinutes(59);
    }
    if (s=$('#invoicedeliverydate').val()) {
      DateAcc.setDate(parseInt(s.substring(0,2)));
      DateAcc.setMonth(parseInt(s.substring(3, 5))-1);
      DateAcc.setYear(2000+parseInt(s.substring(6)));
    }
    if (DateAcc<DateNow) {
      alert('Дата/время доставки просрочены');      
      return false;
    }
    
  }   

  if (confirm('Вы действительно хотите создать расходную накладную?')) {
    if (flNewModeCGI)
      ec('saveaccheaderpart', 'partid=makeinvoice&accid='+$('#invoicecode').val()+'&val='+$('#forfirmid').val(), 'newbj');
    else
      ec('saveaccheaderpart', 'partid=makeinvoice&accid='+$('#invoicecode').val()+'&val='+$('#forfirmid').val(), 'abj');
  }
}


function setannul(el, _accid) {
  if ($(el).attr('act')=='annul') {
    $('#jqdialog').html('<input type=radio checked name=annulreason value=0>Отказ клиента<br/><input type=radio name=annulreason id=annulreason value=1>Дефицит товара');
    $('#jqdialog').dialog({
      buttons:{
        "Аннулировать": function(){ec("saveaccheaderpart", "partid=annulating&accid="+_accid+"&annul=true&reason="+$('#annulreason')[0].checked, "abj");}, 
        "Отменить": function(){$('#jqdialog').dialog("close");}
      },
      modal:true,
      title: "Аннулирование счета",
      close: function(event, ui) {$('#jqdialog').dialog('destroy')}
    })
  }  else {
    if (confirm('Вы действительно хотите деаннулировать счет?')) ec('saveaccheaderpart', "partid=annulating&accid="+_accid+"&annul=false", "abj");
  }
  
}

function getWATableAccounts(Stream1,Stream2,Stream3,Stream4,Stream5,Stream6,filterfromdate){  //возвращает  таблицу редактирования пользователей
         //console.log(descrimageurl);
         var s='';
          s=s+'<div style="display: none;">'+'\n';
            s=s+'<div id="labelsdiv"></div>'+'\n';
            s=s+'<div id="transferinvforaccdiv">';
            s=s+'<table id="tinvfiltertable">'+'\n';
            s=s+'<tr><td align=right>П/р отгрузки: </td><td><select id="tinvfilterfrom"></select></td><td><input type=checkbox id="tinvfilteronlyopen" checked> Только открытые</td></tr>'+'\n';
            s=s+'<tr><td align=right>П/р приема: </td><td><select id="tinvfilterto"></select></td><td><button onclick="orderwithtransferinvoice();">Получить</button></td></tr>'+'\n';
            s=s+'<table>'+'\n';
  
            s=s+'<table id="transferinvforacc" class="st"></table></div>'+'\n';
            s=s+'<div id="addtinvoicediv">'+'\n';
            s=s+'<table id="addtinvtbl">'+'\n';
            s=s+'<tr><td align=right>П/р отгрузки: </td><td><select id="addtinvfrom"></select></td></tr>'+'\n';
            s=s+'<tr><td align=right>П/р приема: </td><td><select id="addtinvto"></select></td></tr>'+'\n';
            s=s+'<tr><td align=right>Дата отгрузки: </td><td>'
                                  +'<input type=text id=addtinvdate name=filterdeliverydate maxlength=8 size=8 value="">'
                                  +'<img src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onClick="show_calendar(\'addtinvdate\');">'
                                  +'&nbsp;&nbsp;&nbsp;время <select id="addtinvtime"></select></td></tr>'+'\n';
            s=s+'</table>'+'\n';
            s=s+'Комментарий:<br />'+'\n';
            s=s+'<textarea id="addtinvcomment" style="width: 100%; height: 40px;"></textarea>'+'\n';
            s=s+'</div>'+'\n';
          s=s+'</div>'+'\n';
          s=s+'<div id="invoicesfilterdiv" style="width: 100%">'+'\n';
            s=s+'<h1>Для отображения счетов задайте фильтр</h1>'+'\n';
            s=s+'<form method=post id="payinvoicefilterform" onsubmit="applypayinvoicefilter(); return false;">'+'\n';
            s=s+'<div style="float: left;">'+'\n';
              s=s+'За период с <input type=text id=filterfromdate name=filterfromdate maxlength=8 size=8 value='+filterfromdate+'><img src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onClick="show_calendar(\'filterfromdate\');">';
              s=s+'по <input type=text id="filtertodate" name="filtertodate" maxlength=8 size=8 value=""><img src="//images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onClick="show_calendar(\'filtertodate\');">';
              s=s+'<br>';
              s=s+'Валюта: <select id="filtercurrency" name="filtercurrency"></select>';
  
            s=s+'</div>'+'\n'; // firstblock
  
            s=s+'<div style="float: left;">'+'\n';
            s=s+'<table>'+'\n';
              s=s+'<tr>';
                s=s+'<td>Подразделение:</td>';
                s=s+'<td><select id=filterstorage name=filterstorage style=\'width: 300px;\'></select></td>';
              s=s+'</tr>'+'\n';
              s=s+'<tr>';
                s=s+'<td>Контрагент:</td>';
                s=s+'<td><input type=text id=filterfirm name=filterfirm class=firmlist style=\'width: 294px;\' oldval=""></td>';
              s=s+'</tr>'+'\n';
  
              s=s+'<tr>';
                s=s+'<td>Контракт:</td>';
                s=s+'<td>';
                  s=s+'<input type=hidden id=filtercontract name=filtercontract value=0><span id=contractname></span>';
                  s=s+'<img id=setcontractfilter src="/images/tr.gif" onclick=\'ec("selectcontract", "contractid="+$("#filtercontract").val()+"&firmid="+$("#filterselectedfirm").val(), "newbj");'
                                        +'title="Выбрать или сменить контракт" style="width: 19px; height: 22px; cursor: pointer; margin-left: 3px; position: relative; top: 4px; background-image: url(\''+descrimageurl+'/images/combobox.png\'); display: none;" class="bgslide">';
                  s=s+'<img id=clearcontractfilter src="/images/tr.gif" onclick=\'$("#filtercontract").val(0); this.style.display="none";$("#contractname").html("Все");\' '
                                        +'title="очистить поле контракта" style="width: 16px; height: 16px; cursor: pointer; margin-left: 3px; position: relative; top: 4px; background-image: url(\''+descrimageurl+'/images/wdell.png\'); display: none;" class="bgslide">';
                s=s+'</td>';
              s=s+'</tr>'+'\n';
  
              s=s+'<tr>';
                s=s+'<td>Способ отгрузки:</td>';
                s=s+'<td><select id=filterdeliverytype name=filterdeliverytype style="width: 300px;"></select></td>';
              s=s+'</tr>'+'\n';
              s=s+'<tr>';
                s=s+'<td>Дата/время отгрузки:</td>';
                s=s+'<td>';
                s=s+'<input type=text id=filterdeliverydate name=filterdeliverydate maxlength=8 size=8 value=""><img src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onClick="show_calendar(\'filterdeliverydate\');">';
                s=s+'<select id=filterdeliverytime name=filterdeliverytime style="text-align: right;"></select>';
                s=s+'</td>';
              s=s+'</tr>'+'\n';
            s=s+'</table>'+'\n';
            s=s+'</div>'+'\n'; // secondblock
  
            s=s+'<div style="float: left;">'+'\n';
            s=s+'<table>'+'\n';
              s=s+'<tr><td><input type=checkbox id=filterexecuted name=filterexecuted>Исполненные</td><td><input type=checkbox id=filterannulated name=filterannulated>Аннулированные</td></tr>'+'\n';
              s=s+'<tr><td><input type=checkbox id=filterprocessed name=filterprocessed related=filternonprocessed checked>Обработан</td><td><input type=checkbox id=filternonprocessed name=filternonprocessed related=filterprocessed checked>Не обработан</td></tr>'+'\n';
              s=s+'<tr><td><input type=checkbox id=filterwebinvoice name=filterwebinvoice related=filternonwebinvoice checked>Web счета</td><td><input type=checkbox id=filternonwebinvoice name=filternonwebinvoice related=filterwebinvoice checked>не Web счета</td></tr>'+'\n';
              s=s+'<tr><td><input type=checkbox id=filterblocked name=filterblocked related=filternonblocked >блокированные</td><td><input type=checkbox id=filternonblocked name=filternonblocked related=filterblocked checked>не блокированные</td></tr>'+'\n';
            s=s+'</table>'+'\n';
            s=s+'</div>'+'\n'; // thirdblock
  
            s=s+'<div style="float: left;">'+'\n';
              s=s+'<input type=hidden name=filterselectedfirm id=filterselectedfirm value=""><br>'+'\n';
              s=s+'<input type=hidden name=act id=act value="loadaccountlist"><br>'+'\n';
              s=s+'<input type=button value="Создать счет" onclick=\'loadpayinvoice($("#filterselectedfirm").val(), "");\' id=createaccountbtn disabled><br>'+'\n';
              s=s+'<input type=reset value=Очистить onclick=\' clearAccountsParam();\'><br>'+'\n';
              s=s+'<input type=submit value="Применить фильтр"><br>'+'\n';
            s=s+'</div>'+'\n'; // fourthblock
  
          s=s+'</div>'+'\n';
          s=s+'</form>'+'\n';
  
          s=s+'<script>';
  
  
  
          s=s+'coNonSavedColor="'+coNonSavedColor+'";'+'\n';
  
          s=s+'inputbgcolor = $("#filterfirm").css("background-color");'+'\n';   // это для таких, как НВ, любителей разных тем в виндовс
          s=s+'$(document).ready(function() {'+'\n';
          // делаем некоторые переключатели зависимыми
          s=s+'  $(\'input[related]\').bind(\'change\', function(event) {'+'\n';
          s=s+'    var related=$(\'input[related="\'+this.id+\'"]\')[0];'+'\n';
          s=s+'    if (!this.checked && !related.checked) related.checked=true;'+'\n';
          s=s+'  });'+'\n';
  
          // Настройка автозаполнения с категориями +++
          s=s+'  $.widget("custom.catcomplete", $.ui.autocomplete, {'+'\n';
          s=s+'    _renderMenu: function(ul, items){'+'\n';
          s=s+'      var self = this,'+'\n';
          s=s+'      currentCategory = "";'+'\n';
          s=s+'      $.each( items, function(index, item){'+'\n';
          s=s+'        if(item.category != currentCategory){'+'\n';
          s=s+'          ul.append( "<li class=\'ui-autocomplete-category\'>" + item.category + "</li>" );'+'\n';
          s=s+'          currentCategory = item.category;'+'\n';
          s=s+'        }'+'\n';
          s=s+'        self._renderItem( ul, item );'+'\n';
          s=s+'      });'+'\n';
          s=s+'    }'+'\n';
          s=s+'  });'+'\n';
          // Настройка автозаполнения с категориями ---
  
          // Список складов+путей   +++
          var i;
          var Count=Stream1.arlen;
          s=s+'_select=$(\'#filterstorage\')[0];'+'\n';
          s=s+'_select.options[0]= new Option("", "", false, false);'+'\n';
          s=s+'_select1=$(\'#invoicestorage\')[0];'+'\n';
          s=s+'addtinvfrom=$(\'#addtinvfrom\')[0];'+'\n';
          s=s+'addtinvto=$(\'#addtinvto\')[0];'+'\n';
          s=s+'addtinvfrom.options[0]= new Option("", "", false, false);'+'\n';
          s=s+'addtinvto.options[0]= new Option("", "", false, false);'+'\n';
  
          s=s+'tinvfilterfrom=$("#tinvfilterfrom")[0];'+'\n';
          s=s+'tinvfilterto=$("#tinvfilterto")[0];'+'\n';
          s=s+'tinvfilterfrom.options[0]= new Option("", "", false, false);'+'\n';
          s=s+'tinvfilterto.options[0]= new Option("", "", false, false);'+'\n';
          s=s+'_select1.options[0]= new Option("", "", false, false);'+'\n';
          for (i=0; i<Count; i++){ 
            s=s+'storages['+Stream1.artable[i][0]+']="'+Stream1.artable[i][1]+'";'+'\n';
            s=s+'storagesoptions['+Stream1.artable[i][0]+']="'+fnIfStr(Stream1.artable[i][3], '1', '0')+'";'+'\n';
            if (Stream1.artable[i][2]!='') {
              s=s+'shortstorages['+Stream1.artable[i][0]+']="'+Stream1.artable[i][2]+'";'+'\n';
            }

  
            if (! Stream1.artable[i][3]) {
              s=s+'_select.options[_select.options.length]= new Option("'+Stream1.artable[i][1]+'", "'+Stream1.artable[i][0]+'", false, false);'+'\n';
              s=s+'_select1.options[_select1.options.length]= new Option("'+Stream1.artable[i][1]+'", "'+Stream1.artable[i][0]+'", false, false);'+'\n';
              s=s+'addtinvfrom.options[addtinvfrom.options.length]= new Option("'+Stream1.artable[i][1]+'", "'+Stream1.artable[i][0]+'", false, false);'+'\n';
              s=s+'tinvfilterfrom.options[tinvfilterfrom.options.length]= new Option("'+Stream1.artable[i][1]+'", "'+Stream1.artable[i][0]+'", false, false);'+'\n';
            } else {
                s=s+'tinvfilterto.options[tinvfilterto.options.length]= new Option("'+Stream1.artable[i][1]+'", "'+Stream1.artable[i][0]+'", false, false);'+'\n';
                s=s+'addtinvto.options[addtinvto.options.length]= new Option("'+Stream1.artable[i][1]+'", "'+Stream1.artable[i][0]+'", false, false);'+'\n';
              }
            i++;
          }
          // Список складов+путей  ---
          // Список филиалов  +++
          Count=Stream2.arlen;
          for (i=0; i<Count; i++){ 
            s=s+'storages['+Stream2.artable[i][0]+']="'+Stream2.artable[i][1]+'";'+'\n';
            s=s+'storagesoptions['+Stream2.artable[i][0]+']="-1";'+'\n';
          }
          // Список филиалов  ---
  
          // Данные для автозаполнения контрагентов +++
          s=s+'  firms=[';
          Count=Stream3.arlen;
          for (i=0; i<Count; i++){ 
            s=s+'{value:"'+Stream3.artable[i][0]+'", category: storages['+Stream3.artable[i][1]+'], label: "'+Stream3.artable[i][2]+'||'+Stream3.artable[i][3]+'"}';
            if (i<(Count-1)) {
              s=s+',';
            }
          }
          s=s+'];'+'\n';
          // Данные для автозаполнения контрагентов ---
          s=s+'  $("#filterfirm, #invoicefirm").catcomplete({minLength: 3, source: firms});'+'\n';
  
          s=s+'  var warerestsdiv = $("#warerestsdiv").dialog({ autoOpen: false });'+'\n';
          s=s+'  $("#warerestsdiv").dialog("option", "position", [2, 208]);'+'\n';
          s=s+'  $("#swrap").css("font-size", "12px");'+'\n';
          s=s+'  $("#btnwaretoinvoice").button();'+'\n';
  
          s=s+'drawborder("filterWrap");'+'\n';
  
          s=s+'$("#filterfirm").bind("change, keyup", function(event) {'+'\n';
          s=s+'  if (!mtrim(this.value)) {$(this).attr("oldval", mtrim(this.value));$("#filterselectedfirm").val("");}'+'\n';
          s=s+'  this.style.backgroundColor=((mtrim(this.value)==$(this).attr("oldval"))?inputbgcolor:"'+coNonSavedColor+'");'+'\n';
          s=s+'  if (mtrim(this.value)!=$(this).attr("oldval")) {$("#filterselectedfirm").val("");}'+'\n';
          s=s+'  if (!$("#filterselectedfirm").val()) {'+'\n';
          s=s+'    $("#createaccountbtn").attr("disabled", true);'+'\n';
          s=s+'    $("#filtercontract").val(0); $("#clearcontractfilter, #setcontractfilter").css("display", "none"); $("#contractname").html("");'+'\n';
          s=s+'  }'+'\n';
          s=s+'});'+'\n';
          s=s+'  $("#filterfirm").catcomplete({'+'\n';
          s=s+'   select: function(event, ui) {  '+'\n';
          s=s+'     this.style.backgroundColor=inputbgcolor;'+'\n';
          s=s+'     $("#filterselectedfirm").val(ui.item.value);'+'\n';
          s=s+'     $("#filterfirm").val(ui.item.label);'+'\n';
          s=s+'     $("#filterfirm").attr("oldval", ui.item.label);'+'\n';
          s=s+'     $("#filterfirm").css("background-color", inputbgcolor);'+'\n';
          s=s+'     $("#filterselectedfirm").val(ui.item.value);'+'\n';
          s=s+'     $("#createaccountbtn").attr("disabled", !$("#filterselectedfirm").val());'+'\n';
          s=s+'     ec("checkcontracts", "contractid=0&firmid="+ui.item.value, "newbj");'+'\n';
          s=s+'     return false;'+'\n';
          s=s+'   }'+'\n';
          s=s+'  });'+'\n';
  
          s=s+'$("#invoicefirm").bind("change, keyup", function(event) {'+'\n';
          s=s+'  this.style.backgroundColor=((mtrim(this.value)==$(this).attr("oldval"))?inputbgcolor:"'+coNonSavedColor+'");'+'\n';
          s=s+'  if (mtrim(this.value)!=$(this).attr("oldval")) {$("#forfirmid").val("");}'+'\n';
          s=s+'});'+'\n';
          s=s+'  $("#invoicefirm").catcomplete({'+'\n';
          s=s+'     select: function(event, ui) {  '+'\n';
          s=s+'     if ($("#invoicecode").val()) {'+'\n';
          s=s+'       ec("saveaccheaderpart", "partid="+this.id+"&accid="+$("#invoicecode").val()+"&val="+ui.item.value, "newbj")'+'\n';
          s=s+'     } else {'+'\n';
          s=s+'       ec("loadinvoice", "id=-1&forfirmid="+ui.item.value, "newbj");'+'\n';
          s=s+'     }'+'\n';
          s=s+'  }});'+'\n';
  
  
          s=s+'  var currencies = "";'+'\n';
          Count=Stream4.arlen;
          for (i=0; i<Count; i++){
            s=s+'  currencies+="<option value='+Stream4.artable[i][0]+'>'+Stream4.artable[i][1]+'</option>";'+'\n';
          }
          s=s+'  $("#filtercurrency").html("<option value=\'\'></option>"+currencies);'+'\n';
  
  
          // способы отгрузки
         Count=Stream5.arlen;;
          s=s+'_select=$("#filterdeliverytype")[0];'+'\n';
          s=s+'_select.options[_select.options.length]= new Option("", "", false, false);'+'\n';
          for (i=0; i<Count; i++){ // до Count, а не Count-1. Так надо!
            s=s+'_select.options[_select.options.length]= new Option("'+Stream5.artable[i][1]+'", "'+Stream5.artable[i][0]+'", false, false);'+'\n';
            s=s+'deliverytimekey['+Stream5.artable[i][0]+']='+Stream5.artable[i][2]+';'+'\n';
            s=s+'deliverylabelkey['+Stream5.artable[i][0]+']='+Stream5.artable[i][3]+';'+'\n';
          }
  
          // время отгрузки
          Count=Stream6.arlen;
          s=s+'_select=$("#filterdeliverytime")[0];'+'\n';
          s=s+'addtinvtime=$("#addtinvtime")[0];'+'\n';
          s=s+'_select.options[0]= new Option("", "", false, false);'+'\n';
          s=s+'addtinvtime.options[0]= new Option("", "", false, false);'+'\n';
         for (i=0; i<Count; i++){ // до Count, а не Count-1. Так надо!
            s=s+'_select.options[_select.options.length]= new Option("'+Stream6.artable[i][1]+'", "'+Stream6.artable[i][0]+'", false, false);'+'\n';
            s=s+'addtinvtime.options[addtinvtime.options.length]= new Option("'+Stream6.artable[i][1]+'", "'+Stream6.artable[i][0]+'", false, false);'+'\n';
         }
  
          s=s+'});'+'\n';
  
          // настройка окна со списком
          s=s+'$("#tinvforacclistdiv").dialog({buttons:{"Новая":function(e){addtinv();}}}, '+
              '{autoOpen: false}, '+
              '{modal: true}, '+
              '{title: "Выберите накладную передачи или создайте новую"}, '+
              '{open: function(event, ui) {tinvsizetune(event, ui)}}'+
              ');'+'\n';
  
          s=s+'$("#filterfromdate")[0].focus();'+'\n';
  
          // инициализация накладной передачи
          s=s+'$("#transferinvforaccdiv").dialog({buttons:{"Новая":function(e){addtinv();}}}, '+
              '{autoOpen: false}, '+
              '{modal: true}, '+
              '{title: "Выберите накладную передачи или создайте новую"}, '+
              '{open: function(event, ui) {tinvsizetune(event, ui)}}'+
              ');'+'\n';
  
          s=s+'</script>';
  
          s=s+'<div id=invoiceheaderdiv style="display: none;">';
          s=s+'Cчет № <span id=invoicenum></span> <input type=text id=invoicedate maxlength=8 size=8><img src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onclick="show_calendar(\'invoicedate\');">';
          s=s+'<input type=hidden id="invoicedeliverydate" name="invoicedeliverydate" oldval="-1">';
          s=s+'<input type=hidden id="invoicedeliverytime" name="invoicedeliverytime" >';
          s=s+'&nbsp;&nbsp;Валюта счета <span id=invoicecurr></span>';
          s=s+'&nbsp;&nbsp;Статус <span id=invoicestatus></span>';
          s=s+'&nbsp;&nbsp;&nbsp;Сумма счета: <span id=invoicesumm style="font-weight: bold; font-size: 14px;"></span>';
  
          s=s+'&nbsp;&nbsp;&nbsp;Контракт №: <span id=invoicecontract style="font-weight: bold; font-size: 14px;"></span>';
          s=s+'<img id=changeinvoicecontract src="/images/tr.gif" onclick=\'ec("selectcontract", "contractid="+$("#contract").val()+"&firmid="+$("#forfirmid").val()+"&invoiceid="+$("#invoicecode").val(), "newbj");\' '
                                +'title="Cменить контракт счета" style="width: 19px; height: 22px; cursor: pointer; margin-left: 3px; position: relative; top: 4px; background-image: url(\''+descrimageurl+'/images/combobox.png\'); display: none;" class="bgslide">';
          s=s+'<br>';
  
          s=s+'Получатель <input type=text id=invoicefirm name=invoicefirm class=firmlist style=\'width: 294px;\'>';
          s=s+'&nbsp;&nbsp;&nbsp;Склад отгрузки <select id=invoicestorage></select>';
          s=s+'<input type=hidden id=invoicecode value="">';
          s=s+'&nbsp;&nbsp;&nbsp;<input type=checkbox id=invoiceprocessed> обработан';
          s=s+'<table>';
          s=s+'<tr><td>Комментарий сотрудникам: </td><td><input size=110 maxlength=255 id=invoicemaincomment></td></tr>';
          s=s+'<tr><td>Комментарий клиенту: </td><td><input size=110 maxlength=255 id=invoiceclientcomment></td></tr>';
          s=s+'<tr><td>Комментарий Web: </td><td id=invoicewebcomment style="color: blue;"></td></tr>';
          s=s+'<tr><td>Исходный счет: </td><td id=invoiceparent></td></tr>';
          s=s+'<tr><td><a id="webarmdeliverydata" class="tablabel2" style="color: #0000FF; " onClick=" '
          + 'ec(\'fillheaderbeforeprocessing\', \'ordr=\'+$(\'#invoicecode\').val(),'+fnIfStr(flNewModeCGI,'\'newbj\'','\'abj\'')+'); $(\'#fillheaderbeforeprocessingdiv\').dialog({ title:\'Заполните параметры отгрузки товара\'}); return false;" href="#">Доставка</a></td><td ></td></tr>';
  
          s=s+'</table>';
          s=s+'<div><button onclick="applypayinvoicefilter(true);" title="К списку счетов" style="position: relative; top:-3px; font-weight: bold;">К списку счетов</button>'+'\n';
          s=s+' <button class="accworkbtn" onclick="ec(\'createsubacc\', \'id=\'+$(\'#invoicecode\').val(), \'newbj\');" title="Сформировать счет на недостающие позиции"><img src="/images/tcok_02.png"></button>'+'\n';
          s=s+' <button class="accworkbtn" onclick="ec(\'saveaccheaderpart\', \'partid=refreshprices&accid=\'+$(\'#invoicecode\').val(), \'newbj\');" title="Пересчет цен"  style="position: relative; top:-3px;">Пересчет цен</button>'+'\n';
          s=s+' <button class="accworkbtn" onclick="ec(\'saveaccheaderpart\', \'partid=recalccounts&accid=\'+$(\'#invoicecode\').val(), \'newbj\');" title="Пересчет колонки \'Факт\'"><img src="/images/tcok_03.png"></button>'+'\n';
  //        s=s+' <input type=button class="accworkbtn" onclick="" value="Превышение" title="Приравнять факт к заказу по выбранным строкам">'+'\n';
          s=s+' <button class="accworkbtn" onclick="orderwithtransferinvoice();" title="Выбрать накладную передачи и добавить в нее недостающий товар по выбранным строкам"><img src="/images/tcok_04.png"></button>'+'\n';
          s=s+' <button class="accworkbtn" onclick="loadfromexcel();" title="Загрузить из Excel"><img src="/images/src_6.gif"></button>'+'\n';
  //        s=s+' <button class="accworkbtn" onclick="if (confirm(\'Вы действительно хотите создать расходную накладную?\')) '+'ec(\'saveaccheaderpart\', \'partid=makeinvoice&accid=\'+$(\'#invoicecode\').val()+\'&val=\'+$(\'#forfirmid\').val(), \'newbj\');" title="Формирование накладной по счету"><img src="/images/tcok_01.png"></button>'+'\n';
          s=s+' <button class="accworkbtn" onclick="createinvoice()" title="Формирование накладной по счету"><img src="/images/tcok_01.png"></button>'+'\n';
          s=s+' <button id=accannulbtn onclick="" title=""><img src="/images/tr.gif" style="height: 16px; width: 16px;"></button>'+'\n';
          s=s+'</div></div>';

   $('#mainheaderwrap').html(s);
}

function clearAccountsParam(){
$("#filtercontract").val(0); 
$("#contractname").html(""); 
$("#filterselectedfirm").val("");
$("#setcontractfilter").css("display","none");
$("#clearcontractfilter").css("display","none");
}

