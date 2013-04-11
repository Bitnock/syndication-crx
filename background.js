
chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.msg == "popup") {

    var input = [];

    for (var i = 0; i < request.feeds.length; ++i) {
      var a = document.createElement('a');
      a.href = request.feeds[i].href;
      if (a.protocol == "http:" || a.protocol == "https:") {
        input.push(request.feeds[i]);
      }
    }

    if (input.length == 0) {
      return;
    }

    var feeds = {};
    feeds[sender.tab.id] = input;

    chrome.storage.local.set(feeds, function() {
      chrome.pageAction.show(sender.tab.id);
    });
  }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  chrome.storage.local.remove(tabId.toString());
});
