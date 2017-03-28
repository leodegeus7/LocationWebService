    function myFunction() {

        var tests = JSON.parse(Get("https://fierce-bayou-36018.herokuapp.com/test"));
        if (tests["view"] === true) {
            document.getElementById('button1').value = "LIGADO";  
        } else {
            document.getElementById('button1').value = 'DESLIGADO';

        }
    }
    function loadButton1() {
        alert("oi");
        document.getElementsByName("teste").innerHTML = "teste";
        document.getElementById("teste").value = "teste";

    }
    function Get(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);
        return Httpreq.responseText;          
    }
    function changeValue() {

        var el       = document.getElementById("submit-button");
        var button1       = document.getElementById("button1");
        var button2       = document.getElementById("button2");

        var tests = JSON.parse(Get("https://fierce-bayou-36018.herokuapp.com/test"));
        if (tests["view"] === true) {
            button1.value = "ACESSO LIGADO";  
            button1.style.background='#9FF781';
            button1.innerHTML = "ACESSO Ligado";
        } else {
            button1.value = 'ACESSO DESLIGADO';
            button1.innerHTML = "ACESSO Desligado";
            button1.style.background='#FE2E2E';

        }

        if (tests["collect"] === true) {
            button2.value = "REQUISIÇÕES LIGADAS";  
            button2.style.background='#9FF781';
            button2.innerHTML = "REQUISIÇÕES Ligadas";
        } else {
            button2.value = 'REQUISIÇÕES DESLIGADAS';
            button2.innerHTML = "REQUISIÇÕES Desligadas";
            button2.style.background='#FE2E2E';
        }


        return false;
    }

    function changeButton1() {
        var button1       = document.getElementById("button1");

        var tests = JSON.parse(Get("https://fierce-bayou-36018.herokuapp.com/test"));
        if (tests["view"] === true) {
            Get("https://fierce-bayou-36018.herokuapp.com/accessOff");
            button1.value = "ACESSO DESLIGADO";  
            button1.innerHTML = "ACESSO Desligado";
            button1.style.background='#FE2E2E';
        } else {
            Get("https://fierce-bayou-36018.herokuapp.com/accessOn");
            button1.value = 'ACESSO LIGADO';
            button1.innerHTML = "ACESSO Ligado";
            button1.style.background='#9FF781';

        }

    }

    function changeButton2() {
        var button2      = document.getElementById("button2");

        var tests = JSON.parse(Get("https://fierce-bayou-36018.herokuapp.com/test"));
        if (tests["collect"] === true) {
            Get("https://fierce-bayou-36018.herokuapp.com/getOff");
            button2.value = "REQUISIÇÕES DESLIGADO";  
            button2.innerHTML = "REQUISIÇÕES Desligado";
            button2.style.background='#FE2E2E';
        } else {
            Get("https://fierce-bayou-36018.herokuapp.com/getOn");
            button2.value = 'REQUISIÇÕES LIGADO';
            button2.innerHTML = "REQUISIÇÕES Ligado";
            button2.style.background='#9FF781';

        }

    }