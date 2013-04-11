parseLinkTags();

function parseLinkTags() {
  var result = document.evaluate(
      '//*[local-name()="link"][contains(@rel, "alternate")] ' +
      '[contains(@type, "rss") or contains(@type, "atom") or ' +
      'contains(@type, "rdf")]', document, null, 0, null);

  var feeds = [];
  var item;
  var count = 0;

  while (item = result.iterateNext()) {
    feeds.push({  "href": item.href,
                  "title": item.title,
                  "mimetype": item.type,
                  "rel": item.rel });
    ++count;
  }

  if (count > 0) {
    chrome.extension.sendMessage({msg: "popup", feeds: feeds});
  }
}
