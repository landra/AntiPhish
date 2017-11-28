if($("input[type='password']").length>0){
    //whoisRegistrantNameAjax(window.location.hostname);
    phishTankCheck(window.location.hostname);
}

function whoisRegistrantNameAjax(domain) {
    $.ajax({
        url: 'https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName='+domain+'&username=antiPhishie&password=dontPhish&outputFormat=JSON',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
        // using jQuery to find table with class "body_text" and appending it to a page
            alert(res.WhoisRecord.registrant.organization);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}

function phishTankCheck(domain) {
    $.ajax({
        url: 'https://checkurl.phishtank.com/checkurl/',
        type: 'POST',
        dataType: 'json',
        data: { "url": window.location.protocol + "//" + domain + window.location.pathname, "format": "json", "app_key": "0d584e215de2f9076f803009a4b0da6938fb725a2cfcb962f46029d7949a4c87" },
        success: function(res) {
        // using jQuery to find table with class "body_text" and appending it to a page
            console.log(JSON.stringify(res));
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}