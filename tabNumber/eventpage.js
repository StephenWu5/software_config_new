var update = function(details) {
    var id = details.id;
    var index = details.index;
    var title = details.title;

    var flag = ":"
    // hax
    if (title && title.indexOf(flag) != -1 && title.indexOf(flag) < 4 ) { //各位,十位,(这里写4因为不可能是百位)
        title = title.substr(title.indexOf(flag)+1);
        //return;   //这一句可能解决了谷歌奔溃的问题
    }

    if(new RegExp("^http.*$").test(title) || new RegExp("^localhost.*$").test(title)){
        return
    }
    if(/^[\u3220-\uFA29]+$/.test(title)){
        return
    }
    title = (index + 1) + '' + flag + title;

    try {
        chrome.tabs.executeScript(
            id,
            {
                code : "document.title = '" + title + "';"
            }
        );
        console.log("executed: " + id);
    } catch(e) {}
};


function updateAll() {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0, tab; tab = tabs[i]; i++) {
            update(tab);
        }
    });
}

chrome.tabs.onMoved.addListener(function(id) {
    updateAll();
});

chrome.tabs.onRemoved.addListener(function(id) {
    updateAll();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    update(tab);
    updateAll();
});

updateAll();



