//  Copyright (c) 2013 Christopher Kalafarski.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.

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
