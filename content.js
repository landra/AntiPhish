var top20Sites = getTop20Sites();

if($("input[type='password']").length>0){
    startCheckPipeline();
}

function startCheckPipeline(){
    phishTankCheck(window.location.hostname);
}

function registrantOrganizationCheck(domain, site) {
    $.ajax({
        url: 'https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName='+domain+'&username=antiPhishie&password=dontPhish&outputFormat=JSON',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            if (!res.WhoisRecord.registrant.organization.toLowerCase().includes(site.toLowerCase())){
                alert("Warning, this site has characteristics of a phishing site.  Proceed with caution.")
            }
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
            if ("valid" in res.results){
                if(res.results.verified){
                    alert("Warning! This is a known phishing site!");
                }
                else {
                    if (res.results.verified) {
                        alert("Warning! This has been reported as phishing site, but has not been verified.  Be careful.");
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}

function searchDocumentForText(text) {
    var documentContainsText = false;
    $('*').not('a').each(function(){
        if (searchElementForText($(this), text)){
            documentContainsText =  true;
        }
    });
    return documentContainsText;
}

function searchElementForText(element, text) {
    return element.clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text()
        .toLowerCase()
        .includes(text.toLowerCase());
}

function checkForOtherPhishing(){
    $.each(top20Sites, function(index, value){
        if (searchDocumentForText(value)){
            var domain = window.location.hostname;
            registrantOrganizationCheck(domain, value);
        }
    });
}

function getTop20Sites() {
    return ['facebook',
        'twitter',
        'google',
        'youtube',
        'linkedin',
        'wordpress',
        'instagram',
        'pinterest',
        'wikipedia',
        'wordpress',
        'blogspot',
        'apple',
        'adobe',
        'tumblr',
        'buydomains',
        'amazon',
        'vimeo',
        'microsoft',
        'flickr',
        'yahoo']
}