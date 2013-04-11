function main() {
  chrome.tabs.getSelected(function(tab) {
    chrome.storage.local.get(tab.id.toString(), function(result) {
      var _list = document.getElementById('feeds');
      var feeds = result[tab.id];

      for (var i = 0; i < feeds.length; ++i) {
        var _item = document.createElement('li');

        var _block = document.createElement('a');
        _block.addEventListener("click", function(e) {
          var a = event.currentTarget;
          chrome.tabs.create({ url: a.href });
        });
        _block.href = feeds[i].href;
        _item.appendChild(_block);

        var _h1 = document.createElement('h1');
        if (feeds[i].title && feeds[i].title != "") {
          _h1.appendChild(document.createTextNode(feeds[i].title));
        } else {
          _h1.appendChild(document.createTextNode(feeds[i].rel));
        }
        _block.appendChild(_h1);

        var _h2 = document.createElement('h2');
        _h2.appendChild(document.createTextNode(feeds[i].mimetype));
        _block.appendChild(_h2);

        _block.appendChild(document.createTextNode(feeds[i].href));

        _list.appendChild(_item);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', main);
