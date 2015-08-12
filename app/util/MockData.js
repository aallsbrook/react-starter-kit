'use strict';

import newsData from '../data/example-news.json';

let data = {
  news: newsData
};

export default {
  getData: function (key) {
    return new Promise((resolve) => {
      resolve(data[key]);
    });
  }
};
