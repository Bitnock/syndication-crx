'use strict';

//  Copyright (c) 2016 Christopher Kalafarski.
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

// The event page script listens for messages from the content script, which
// contain data about syndication feeds found on webpages. When a message is
// received, the listener callback sanitizes the data and places it in local
// storage, so other parts of the extension (eg. the page action) will have
// access to it. The event page script also prunes the data from local storage
// when it is no longer needed.

var _store = {};

chrome.tabs.onRemoved.addListener(tabId => { delete feedsStore[tabId]; });

chrome.extension.onMessage.addListener((feeds, sender) => {
  _store[sender.tab.id] = feeds.filter(feed => {
    const a = document.createElement('a');
    a.href = feed.href;
    return (a.protocol === 'http:' || a.protocol === 'https:');
  });

  if (_store[sender.tab.id].length) { chrome.pageAction.show(sender.tab.id); }
});
