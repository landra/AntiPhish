if($("input[type='password']").length>0){
    whoisRegistrantNameAjax(window.location.hostname);
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