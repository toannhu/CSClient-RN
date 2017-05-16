'use strict';

const Types = {
  GET_NONCE: 'GET_NONCE',

  GET_RECENT_POSTS: 'GET_RECENT_POSTS',
  GET_POSTS: 'GET_POSTS',
  GET_PAGE: 'GET_PAGE',
  GET_POST: 'GET_POST',
  GET_CATEGORY_POSTS: 'GET_CATEGORY_POSTS',
  GET_AUTHOR_POSTS: 'GET_AUTHOR_POSTS',
  GET_CATEGORY_INDEX: 'GET_CATEGORY_INDEX',
  CREATE_POST: 'CREATE_POST',

  RECEIVE_NONCE: 'RECEIVE_NONCE',
  RECEIVE_POST: 'RECEIVE_POST',
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  RECEIVE_PAGE: 'RECEIVE_PAGE',
  RECEIVE_RECENT_POSTS: 'RECEIVE_RECENT_POSTS',
  RECEIVE_CATEGORY_INDEX: 'RECEIVE_CATEGORY_INDEX',
  RECEIVE_ERROR: 'RECEIVE_ERROR',

  RELOAD_POSTS: 'RELOAD_POSTS',
  CLEAR_POSTS: 'CLEAR_POSTS',
  CLEAR_POST: 'CLEAR_POST',
  SET_POSTS_ARGS: 'SET_POSTS_ARGS',
};

export default Types;
