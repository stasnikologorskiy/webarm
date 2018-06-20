// �������������� ������� ��� ������������ ���� ��������� ��������
// � ������ �������. ��� ������������� ��������� �������� ����� ����,
// ����� � �����, ����� ������� ������� ���� �������� cookie. ��� ���������
// ������������, ������� ����������� ���� ���, ��� ��� �����.
function getExpDate_(days, hours, minutes) {
    var expDate = new Date();
    if (typeof days == "number" && typeof hours == "number" && typeof hours == "number") {
        expDate.setDate(expDate.getDate() + parseInt(days));
        expDate.setHours(expDate.getHours() + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
        return expDate.toGMTString();
    }
}

// ��������������� �������, ������������ �������� getCookie()
function getCookieVal_(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

// �������� ������� ��� ����������� ��������� cookie �� �����
function getCookie1(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal_(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

// ���������� �������� cookie � ��������� �������������� ����������
function setCookie_(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

// ����������� cookie ����� ��������� ��� ���������� ����� ���������
function deleteCookie_(name,path,domain) {
    if (getCookie1(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}