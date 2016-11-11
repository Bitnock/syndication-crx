'use strict';

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

// The event page script listens for messages from the content script, which
// contain data about syndication feeds found on webpages. When a message is
// received, the listener callback sanitizes the data and places it in local
// storage, so other parts of the extension (eg. the page action) will have
// access to it. The event page script also prunes the data from local storage
// when it is no longer needed.

chrome.extension.onMessage.addListener((request, sender) => {
  if (request.msg === "feedsFoundInContent") {

    const feeds = request.feeds.filter(feed => {
      let a = document.createElement('a');
      a.href = feed.href;
      return (a.protocol === "http:" || a.protocol === "https:");
    });

    chrome.storage.local.set({ [sender.tab.id]: feeds }, () => {
      if (feeds.length) {
        // `show` essentially enables the page action, it does *not* make the
        // pop-up visible in the browser window
        chrome.pageAction.show(sender.tab.id);
      }
    });
  }
});

// When the tab is closed, remove the stored data about feeds from local storage
chrome.tabs.onRemoved.addListener(tabId => {
  chrome.storage.local.remove(tabId.toString());
});
