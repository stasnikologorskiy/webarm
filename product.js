var lastbrand;
var tabnum=1;
var artname='';
//var flNewModeCGI=false;

function fnIfStr(Cond, sTrue, sFalse){   //аналог из делфи
   if (Cond) { 
     return sTrue; 
   }
   else{
     return sFalse;  
   }
 }


// добавляет бренд в дерево
function addbrand(_id, _name) {
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



// добавляет строку с товаром в результат поиска
function addwaretosearchlist(_wareid, _brandid, _groupid, _warename, im, descr, border) {  row=tbl_.insertRow(-1);

  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.title=_warename+','+$('#ali_'+_brandid).html()+','+$('#ali_'+_groupid).html();
  var s='';
  s+='<a href="#" id="srware_'+_wareid+'">'+_warename+'</a>';
  if (im>-1) {
      s+='<a class=signs href="#" onclick="editwareinfo('+_wareid+',\''+ _warename+'\', \'TinyEditDIV\', \'tinyeditor\');">'
        +'<img id=wareimg_'+_wareid+' src="/images/'+(im?'':'no')+'image.gif" style="right: 16px;'+((border)?'border: 2px solid red;':'')+'">'
        +'<img id=waredescr_'+_wareid+' src="/images/'+(descr?'':'no')+'descr.gif" style="right: 0px;">'
        +'</a>';
  }
  newcell.innerHTML=s;
}

// добавляет строку с товаром в результат поиска для последующего добавления в аналоги
function addwaretosearchlist1(_anaid, _brand, _group, _ananame) {
  row=tbl_.insertRow(-1);

  row.className=(altrow?'altrow':'');
  row.id=((tbl_.id=="tecdocanalogsforaddtable")?'tranatd_':'trana_')+_anaid;
  altrow=!altrow;

  var newcell=row.insertCell(-1);
  newcell.style.textAlign='left';
  newcell.title=_brand+','+_group;
  newcell.innerHTML='<div style="position: relative; width: 100%;"><span>'+_ananame+'</span>'+
       '<a class=abgslide title="Добавить товар в аналоги" href="#" '+
       'onClick=\'ec("addwaretoanalogs", "wareid='+$('#addornumbyhand').attr('name')+'&anaid='+_anaid+'&sourceid='+((tbl_.id=="tecdocanalogsforaddtable")?'3':'2')+
       '", "pabj");\' style="background-image: url(/images/wplus.png); right: 0px; top: 0px;"></a>'+
       '</div>';
}

// добавляет строку с товаром в таблицу оригинальных номеров - аналогов для последующего добавления в оригинальные номера
function addgbornumsforadd(_wareid, _brand, _group, _warename) {
  row=tbl_.insertRow(-1);

  row.className=(altrow?'altrow':'');
  row.id='ornumgb_'+_wareid;
  altrow=!altrow;

  if (_wareid) {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.title=_brand+','+_group;
    newcell.innerHTML='<div style="position: relative; width: 100%;"><span>'+_warename+'</span>'+
         '<a class=abgslide title="Добавить в оригинальные номера" href="#" onClick=\'addornum($("#addornumbyhand").attr("name"), -5, 2, "'+_warename+'", '+_wareid+');\' '+
         ' style="background-image: url(/images/wplus.png); right: 0px; top: 0px;"></a>'+
         '</div>';
  } else {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='Для этого товара не найдено аналогов-ориг.номеров';
  }
}

// добавляет оригинальный номер в список оригинальных номеров
function addorignum(_numid, _manufid, _sourceid, _num, _manufname) {  row=tbl_.insertRow(-1);
  row.className=(altrow?'altrow':'');
  row.id="trornum_"+_numid;

  if (_numid) {
    if ($("#"+tbl_.id+" #trornum_0")[0]) tbl_.deleteRow(0);
    altrow=!altrow;

    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='<img src="/images/src_'+_sourceid+'.gif" />'+_manufname/*manufacturerauto[_manufid]*/;

    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.title='Источник - '+sourceofdata[_sourceid];
    var s='';
    if (tbl_.id=='orignumstable') {
      if ((_sourceid==3) || (_sourceid==5) || (_sourceid==7) || (_sourceid==8) ) {
         s='<a class=abgslide title="Пометить оригинальный номер как неправильный" href="#" onClick=\'ecq("markornum", "wareid='+$('#addornumbyhand').attr('name')+
           '&numid='+_numid+'&wrong=4&srcid='+_sourceid+
           '", '+fnIfStr(flNewModeCGI,'"newbj"','"difdict"')+', "Вы действительно пометить оригинальный номер '+_num+' как неправильный?");\' '+
           'style="background-image: url(/images/skull_16.png); right: 0px; top: 0px;"></a>';
      } else {
        s='<a class=abgslide title="Удалить оригинальный номер" href="#" onClick=\'ecq("delornum", "wareid='+$('#addornumbyhand').attr('name')+
          '&numid='+_numid+
          '", '+fnIfStr(flNewModeCGI,'"newbj"','"pabj"')+', "Вы действительно хотите удалить оригинальный номер '+_num+'?");\' '+
          'style="background-image: url(/images/wdell.png); right: 0px; top: 0px;"></a>';
      }
    } else if (tbl_.id=='wrongoetable') {
      s='<a class=abgslide title="Пометить оригинальный номер как правильный" href="#" onClick=\'ecq("markornum", "wareid='+$('#addornumbyhand').attr('name')+
        '&numid='+_numid+'&wrong=5&srcid='+_sourceid+
        '",'+fnIfStr(flNewModeCGI,'"newbj"','"difdict"')+', "Вы действительно пометить оригинальный номер '+_num+' как правильный?");\' '+
        'style="background-image: url(/images/ankh_16.png); right: 0px; top: 0px;"></a>'
    }

    newcell.innerHTML='<div style="position: relative; width: 100%;"><a href="#" id="ornum_'+_numid+'">'+_num+'</a>'+s+'</div>';
  } else {    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='У этого товара нет оригинальных номеров';
  }
}


// добавляет аналог в список "новых" аналогов
function addanalog(_analogid, _sourceid, _warname, _fbdel) {
  row=tbl_.insertRow(-1);
  row.id="tranalog_"+_analogid;

  row.className=(altrow?'altrow':'');
  altrow=!altrow;

  if (_analogid) {
    if ($("#tranalog_0")[0]) tbl_.deleteRow(0);
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.title='Источник - '+sourceofdata[_sourceid];
    newcell.innerHTML='<div style="position: relative; width: 100%;"><a href="#" id="analognew_'+_analogid+'">'+_warname+'</a>'+((_fbdel==0)?
         '<a class=abgslide title="Удалить аналог" href="#" onClick=\'ecq("delanalognew", "wareid='+$('#addornumbyhand').attr('name')+'&anaid='+_analogid+
         '", "pabj", "Вы действительно хотите удалить аналог '+_warname+'?");\' '+
         'style="background-image: url(/images/wdell.png); right: 0px; top: 0px;"></a>':'')+
         '</div>';
  } else {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='У этого товара нет аналогов';
  }
}


// выводит окно для добавления однонанправленного аналога вручную
function addODanalog() {  var content='';
  var width=300;
  content+='<div style="width: '+width+'px;">';
  content+='Введите наименование товара, к которому Вы хотите добавить выбранный товар как односторонний аналог<br />';
  content+='<input type=text id=odanalogtext value="" style="width: '+(width-5)+'px;">';
  content+="<input type=button value=\"Добавить\" onclick=\"ec('addodanalog', 'id="+$('#addornumbyhand').attr('name')+"&odanalogtext='+$('#odanalogtext').val(), 'difdict');\">";
  content+='</div>';
  sw(content, false);
}

// выводит окно для добавления оригинального номера вручную
function addornum(_wareid, _manufid, _sourceid, _num, _rownum) {  var content='';
  content+='<form action="'+scriptname+'/pabj" onSubmit="return sfba(this);">';
  content+='<select name=manufacturerid>';
  content+='<option value="-5"> </option>';
  content+=manufactureselect;
  content+='</select>';
  content+='<input type=text name=ornumtext value="'+_num+'">';
  content+='<input type=hidden name=ornumsource value="'+_sourceid+'">';
  content+='<input type=hidden name=ornumware value="'+_wareid+'">';
  content+='<input type=hidden name=act value="addornum">';
  content+='<input type=hidden name=rownum value="'+_rownum+'">';
  content+='<input type=submit value="Добавить">';
  content+='</form>';
  sw(content, false);
  //$.fancybox.open($('#addorignumbyhanddiv'), {'modal' : false, 'padding': 0});
}

function tabvis(tabnum_) {  if ($('#workareaWrap').hasClass('noactive')) return false;
  if ($('#waredetdiv'+tabnum_+' > h1').html()) {    tabvis_old(tabnum_);  } else {   if (flNewModeCGI){
    ec("getorignumandanalogs", "id="+$('#addornumbyhand').attr('name')+'&newware=0&tab='+tabnum_, "newbj");   }    else{
     ec("getorignumandanalogs", "id="+$('#addornumbyhand').attr('name')+'&newware=0&tab='+tabnum_, "pabj");   }  }  checkListWaresForFind ();}function clearwaredopinfo() {  $('.tabdiv > h1').html(''); // очищаем заголовки  $('#workareaWrap').addClass('noactive');  //tab1  var tbl_=document.getElementById('orignumstable');
  while (tbl_.rows.length) tbl_.deleteRow(0);
  tbl_=document.getElementById('wrongoetable');
  while (tbl_.rows.length) tbl_.deleteRow(0);
  //tab2  tbl_=document.getElementById('gbanalogtable');
  while (tbl_.rows.length) tbl_.deleteRow(0);
  //tab3  tbl_=document.getElementById('onanalogtable');
  while (tbl_.rows.length) tbl_.deleteRow(0);
  //tab4  var tbl_=document.getElementById('onediractanalogstable');
  while (tbl_.rows.length) tbl_.deleteRow(0);
  tbl_=document.getElementById('wrongonediractanalogstable');
  while (tbl_.rows.length) tbl_.deleteRow(0);
  //tab  //tab}function tabvis_old(tabnum_) {  if ($('#workareaWrap').hasClass('noactive')) return false;
	tabnum=tabnum_;  $('#workareaheader').css('backgroundPosition', '0 '+((tabnum-1)*-33)+'px');
  $('#tab'+tabnum)[0].blur();
  $('.tablabel').removeClass('tlactive');
  $('#tab'+tabnum).addClass('tlactive');

  $('#workareaWrap .tabdiv').css('display', 'none');
  $('#waredetdiv'+tabnum).css('display', 'block');
}

function getansandornumsfromtecdoc() {//	 alert($("#addornumbyhand").attr("name"));
  ec("getansandornumsfromtecdoc", "id="+$("#addornumbyhand").attr("name"));
}



function addorignumTD(_rownum, _manufid, _ornum, allowtoadd) {
  row=tbl_.insertRow(-1);

  row.className=(altrow?'altrow':'');
  row.id='trornumtd_'+_rownum;
  altrow=!altrow;

  if (_rownum) {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML=manufacturerauto[_manufid];

    newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    s='<div style="position: relative; width: 100%;"><span>'+_ornum+'</span>';
    if (allowtoadd) {
       s+='<a class=abgslide title="Добавить оригинальный номер" href="#" onClick=\'ec("addornum", "ornumware='+$('#addornumbyhand').attr('name')+
         '&manufacturerid='+_manufid+'&ornumtext='+_ornum+'&ornumsource=3'+'&rownum='+_rownum+
         '", "pabj");\' style="background-image: url(/images/wplus.png); right: 0px; top: 0px;"></a>';
    }
    s+='</div>';
    newcell.innerHTML=s;
  } else {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='В базе TecDoc не найдены оригинальные номера для этого товара';
  }
}
// добавляет строку с артиклем TecDoc  для последующего добавления в аналоги
function addtecdocarticlesasanalogs(_rownum, _name, _desc, _brend) {
  row=tbl_.insertRow(-1);

  row.className=(altrow?'altrow':'');
  row.id='tranalogtd_'+_rownum;
  altrow=!altrow;

  if (_rownum) {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='<span>'+_name+'</span>';

    newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML=_desc;

    newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML=_brend;

    newcell=row.insertCell(-1);
    newcell.style.width='16px';
    newcell.innerHTML='<a class="abgslide1" title="Найти соответствие в GrossBee для добавление в аналоги" href="#" onClick=\'ec("addanfromtd", "ornumware='+$('#addornumbyhand').attr('name')+
         '&tdid='+_rownum+'", "pabj");\' style="background-image: url(/images/wplus.png); right: 0px; top: 0px;"></a>';
  } else {
    var newcell=row.insertCell(-1);
    newcell.style.textAlign='left';
    newcell.innerHTML='В базе TecDoc не найдены аналоги для этого товара';
  }

}

function editwareinfo(wareid,warename, divname, editorname) {
//  vals=$("select[name^='attr'][value!='0']");

  $('.mark').removeClass('mark');
  $($('#srware_'+wareid)[0].parentNode).addClass('mark');

  $('#'+divname).css('display', 'block');
  $('#'+divname).width(parseInt($(window).width()*0.9));
  $('#'+divname).css('left', parseInt($(window).width()*0.05));
  $('#'+divname).height(parseInt($(window).height()*0.9));
  $('#'+divname).css('top', parseInt($(window).height()*0.05));
  $('#'+divname+' .wareinfoimgdiv').height(parseInt($(window).height()*0.9)-$('#'+divname+' .mceStatusbar').height());

  $('#'+divname+' #tinyeditor_tbl').width($('#'+divname).width()-20-300);
  $('#'+divname+' #tinyeditor_tbl').css('left', 10);
  $('#'+divname+' #tinyeditor_tbl').css('top', 10);
  var h=parseInt($(window).height()*0.9)-$('#'+divname+' .mceToolbar').height()-$('#'+divname+' .mceStatusbar').height()-$('#'+divname+' #tebottompanel').height()-24;
  $('#'+divname+' .mceIframeContainer').height(h);
  $('#'+divname+' .mceIframeContainer iframe').height(h);
  $('#'+divname+' .mceIframeContainer iframe').width($('#'+divname+'').width()-20-300);
  //$('#tesavebtn').attr('name', wareid);
  $('#'+divname+' #id').attr('value', wareid);
  $('#wareid').attr('value', wareid);

  ec('getwareinfoforedit', 'id='+wareid+'&editor='+editorname+'&warename='+warename, 'difdict');
}


function prepwareinfo() {
  $('#tinyeditor').attr('value', tinyMCE.get('tinyeditor').getContent());
  return true;
}

function prepwareinfofiles() {
  $('#tinyeditorinfo').attr('value', tinyMCE.get('tinyeditorinfo').getContent());
  return true;
}

function addsource(obj, srccode) {
  var img=$( "<img src='/images/src_"+srccode+".gif' />");
  img.css('position', 'absolute');
  img.css('left', '0px');
  img.css('top', '0px');
  img.attr('title', sourceofdata[srccode]);
  $(obj).append(img);
}

function addhandleODA(obj, analog, srccode, right_) {
  var a=$( "<a href=# class=abANew />");
  a.css('position', 'absolute');
  a.css('right', '0px');
  a.css('top', '0px');
  a.css("background-image", "url('"+descrimageurl+"/images/"+((right_)?(((srccode==3) || (srccode==5) || (srccode==7))?'skull_16.png':'wdell.png'):'skull_16.png')+"')");
  a.attr('title', ((right_)?(((srccode==3) || (srccode==5) || (srccode==7))?'Пометить аналог как неправильный':'Удалить аналог'):'Снять пометку о неправильности'));
  a.bind('click', function(event) {
    ecq('markonedirectanalog', 'id='+$('#addornumbyhand').attr('name')+'&analog='+analog+'&code='+((right_)?(((srccode==3) || (srccode==5) || (srccode==7))?'4':'3'):'5')+'&src='+srccode, 'difdict', 'Вы действительно хотите '+((right_)?(((srccode==3) || (srccode==5) || (srccode==7))?'пометить аналог как неправильный':'удалить аналог'):'пометить аналог как правильный')+'?');
  });
  $(obj).append(a);
}

function checkListWaresForFind (){
  var arr= $("div [class='finddescrdiv']");
  var wd,wds,kids;
  arr.each(function(i,elem) {
    kids = $(this).children();
    wd = parseInt($(this).width());
    kids.each(function(i,elem) {
        if ($(this).hasClass("brandspan")) {wds=parseInt($(this).width());}
        if ($(this).hasClass("finddescrspan")) {
          $(this).width(wd-165-wds);
       }  
     });
  });
  
}

