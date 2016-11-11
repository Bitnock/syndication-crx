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

const DOM_CONTENT_LOADED = 'DOMContentLoaded'
const CLICK = 'click';

function onContentLoaded() {
  chrome.tabs.getSelected(tab => {
    chrome.storage.local.get(tab.id.toString(), result => {
      const list = document.getElementById('feeds');
      const feeds = result[tab.id];

      for (let feed of feeds) {
        const item = document.createElement('li');
        list.appendChild(item);

        const content = document.createElement('a');
        content.href = feed.href;
        item.appendChild(content);
        content.addEventListener(CLICK, event => {
          chrome.tabs.create({ url: event.currentTarget.href });
        });

        const title = document.createElement('h1');
        if (feed.title && feed.title != '') {
          title.appendChild(document.createTextNode(feed.title));
        } else {
          title.appendChild(document.createTextNode(feed.rel));
        }
        content.appendChild(title);

        const subtitle = document.createElement('h2');
        subtitle.appendChild(document.createTextNode(feed.mimetype));
        content.appendChild(subtitle);

        content.appendChild(document.createTextNode(feed.href));

        const copy = document.createElement('button');
        copy.addEventListener(CLICK, event => {
          const textArea = document.createElement('textarea');
          textArea.value = feed.href;
          content.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          content.removeChild(textArea);
          event.stopPropagation();
        });
        content.appendChild(copy);
      }
    });
  });
}

document.addEventListener(DOM_CONTENT_LOADED, onContentLoaded);
