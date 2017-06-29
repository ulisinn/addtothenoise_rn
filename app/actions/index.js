/**
 * Created by ulrichsinn on 04/19/2017.
 */

// @flow

import axios from 'axios';
import * as _ from 'lodash';
import striptags from 'striptags';


const REMOTE_LOAD_PENDING = 'REMOTE_LOAD_PENDING';
const REMOTE_LOAD_SUCCESS = 'REMOTE_LOAD_SUCCESS';
const REMOTE_LOAD_ERROR = 'REMOTE_LOAD_ERROR';
const REMOTE_DATA_READY = 'REMOTE_DATA_READY';

const INIT_PORTFOLIO = 'INIT_PORTFOLIO';

// REMOTE MESSAGES

export function remoteLoadPending() {
  return {
    type: REMOTE_LOAD_PENDING,
  };
}

export function remoteLoadError() {
  return {
    type: REMOTE_LOAD_ERROR,
  };
}

export function remoteLoadSuccess(data: any) {
  return {
    type: REMOTE_LOAD_SUCCESS,
    payload: {
      data,
    },
  };
}

// INIT_PORTFOLIO

export function initPortfolio(data: any) {
  
  return {
    type: INIT_PORTFOLIO,
    payload: {
      data,
    },
  };
}

//


export function getRemoteData(url: string) {
  //console.log('getRemoteData url', url);
  return (dispatch: Function) => {
    dispatch(remoteLoadPending());
    axios.get(url)
      .then((response) => {
        return response.data;
      })
      .then((items) => {
        const list = createPortfolioList(items.sets);
        // console.log('getRemoteData THEN', list);
        
        dispatch(initPortfolio({ portfolio: list }));
        return dispatch(remoteLoadSuccess(items));
      })
      .catch(() => {
        dispatch(remoteLoadError());
      });
  };
}

const createPortfolioList = (obj) => {
  const print = obj.print.map((d, i) => {
    return createPortfolioItem('print', d);
  });
  
  const web = obj.web.map((d, i) => {
    return createPortfolioItem('web', d);
  });
  const other = obj.other.map((d, i) => {
    return createPortfolioItem('other', d);
  });
  const music = obj.music.map((d, i) => {
    return createPortfolioItem('music', d);
  });
  const pages = obj.pages.map((d, i) => {
    return createTextItem('pages', d);
  });
  // createPortfolioItem('print', print[18]);*/
  
  // return portfolio;
  const portfolio = _.concat(print, web, other, music, pages);
  // console.log(portfolio, 'createPortfolioList pages', pages);
  
  return portfolio;
};

const getDetailImages = (arr) => {
  'use strict';
  const baseUrl = 'http://www.addtothenoise.com';
  const images = _.map(arr, (d, i) => {
    return (baseUrl + d.detailImage._default);
  });
  
  return images;
};

const createPortfolioItem = (cat, obj) => {
  const baseUrl = 'http://www.addtothenoise.com';
  const portFolioObj = {};
  _.each(obj, (v, k) => {
    'use strict';
    switch (k) {
      case '_id':
        portFolioObj['id'] = v;
        break;
      case 'title':
        portFolioObj[k] = v;
        break;
      case 'client':
        portFolioObj[k] = v;
        break;
      case 'role':
        portFolioObj[k] = v;
        break;
      case 'description':
        portFolioObj[k] = v;
        break;
      case 'backgroundColor':
        portFolioObj[k] = v;
        break;
      case 'thumbnail':
        portFolioObj[k] = (v && v.src) ? baseUrl + v.src : null;
        break;
      case 'mainImage':
        portFolioObj[k] = (v && v.src) ? baseUrl + v.src : null;
        break;
      case 'landingPageImage':
        portFolioObj[k] = (v && v.src) ? baseUrl + v.src : null;
        break;
      case 'alt':
        portFolioObj[k] = v;
        break;
      case 'displayLandingPageImage':
        portFolioObj[k] = v;
        break;
      case 'team':
        portFolioObj[k] = v;
        break;
      case 'work':
        portFolioObj['category'] = cat;
        break;
      case 'detailPages':
        portFolioObj[k] = (v && v.length > 0) ? getDetailImages(v) : null;
        break;
      case 'mpeg':
        portFolioObj[k] = (v && v.src) ? baseUrl + v.src : null;
        break;
    }
  });
  
  // return null;
  return portFolioObj;
};

const createTextItem = (cat, obj) => {
  const baseUrl = 'http://www.addtothenoise.com';
  const textObj = {};
  _.each(obj, (v, k) => {
    'use strict';
    switch (k) {
      case '_title':
        textObj['title'] = v;
        break;
      case '_id':
        textObj['id'] = v;
        break;
      case 'author_family_name':
        textObj[k] = v;
        break;
      case 'author_given_name':
        textObj[k] = v;
        break;
      case 'body':
        textObj[k] = striptags(v);
        break;
    }
    textObj['category'] = cat;
  });
  
  return textObj;
};
