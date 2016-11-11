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

// This is run in the context of a webpage. It detects syndication feeds by
// looking for <link> tags that contain common syndication formats (RSS, Atom,
// etc). If any feeds are found, the data is parsed and passed, via a message,
// to the event page script (background.js).

(function() {
  const result = document.evaluate(
      '//*[local-name()="link"][contains(@rel, "alternate")] ' +
      '[contains(@type, "rss") or contains(@type, "atom") or ' +
      'contains(@type, "rdf")]', document, null, 0, null);

  const feeds = [];
  let el;

  while (el = result.iterateNext()) {
    feeds.push({
      "href": el.href,
      "title": el.title,
      "mimetype": el.type,
      "rel": el.rel
    });
  }

  if (feeds.length > 0) {
    chrome.extension.sendMessage({
      msg: "feedsFoundInContent",
      feeds: feeds
    });
  }
})();
