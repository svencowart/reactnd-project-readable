import fetch from 'cross-fetch';
import uuidv1 from 'uuid';
import { api, headers } from './configs';

/*
 * Sort Strategy
 */
export const CHANGE_SORT_STRATEGY = 'CHANGE_SORT_STRATEGY';
export const changeSortStrategy = strategy => ({
  type: CHANGE_SORT_STRATEGY,
  strategy,
});

/*
 * Posts
 */
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const requestPosts = category => ({
  type: REQUEST_POSTS,
  category,
});
export const receivePosts = (category, json) => ({
  type: RECEIVE_POSTS,
  category,
  posts: json,
});
export const fetchPosts = category => dispatch => {
  dispatch(requestPosts(category));
  if (category !== 'all') {
    return fetch(`${api}/${category}/posts`, { headers })
      .then(res => res.json())
      .then(json => dispatch(receivePosts(category, json)));
  } else {
    return fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .then(json => dispatch(receivePosts(category, json)));
  }
};

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const requestPost = postId => ({
  type: REQUEST_POST,
  postId
});
export const receivePost = (postId, json) => ({
  type: RECEIVE_POST,
  postId,
  post: json
});
export const fetchPost = postId => dispatch => {
  dispatch(requestPost(postId));
  return fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(json => dispatch(receivePost(postId, json)));
};

export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVE_CREATE_POST = 'RECEIVE_CREATE_POST';
export const requestCreatePost = post => ({
  type: REQUEST_CREATE_POST,
  post
});
export const receiveCreatePost = post => ({
  type: RECEIVE_CREATE_POST,
  post
});
export const createPost = post => dispatch => {
  dispatch(requestCreatePost(post));
  return fetch(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      ...post,
      id: uuidv1(),
      timestamp: Math.floor(Date.now()),
    }),
  }).then(res => res.json())
    .then(json => dispatch(receiveCreatePost(json)));
};

export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST';
export const RECEIVE_UPDATE_POST = 'RECEIVE_UPDATE_POST';
export const requestUpdatePost = (postId, post) => ({
  type: REQUEST_UPDATE_POST,
  postId,
  post,
});
export const receiveUpdatePost = (postId, post) => ({
  type: RECEIVE_UPDATE_POST,
  postId,
  post,
});
export const updatePost = (postId, postUpdates) => dispatch => {
  dispatch(requestUpdatePost(postId, postUpdates));
  return fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(postUpdates),
  }).then(res => res.json())
    .then(json => dispatch(receiveUpdatePost(postId, json)));
};

export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const requestDeletePost = (postId, category) => ({
  type: REQUEST_DELETE_POST,
  postId,
  category,
});
export const receiveDeletePost = (postId, category) => ({
  type: RECEIVE_DELETE_POST,
  postId,
  category,
});
export const deletePost = post => dispatch => {
  dispatch(requestDeletePost(post.id, post.category));
  return fetch(`${api}/posts/${post.id}`, {
    headers,
    method: 'DELETE',
  }).then(res => res.json())
    .then(json => dispatch(receiveDeletePost(post.id, post.category)));
};

/*
 * Comments
 */
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const requestComments = postId => ({
  type: REQUEST_COMMENTS,
  postId
});
export const receiveComments = (postId, json) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments: json
});
export const fetchComments = postId => dispatch => {
  dispatch(requestComments(postId));
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(json => dispatch(receiveComments(postId, json)));
};

export const REQUEST_CREATE_COMMENT = 'REQUEST_CREATE_COMMENT';
export const RECEIVE_CREATE_COMMENT = 'RECEIVE_CREATE_COMMENT';
export const requestCreateComment = comment => ({
  type: REQUEST_CREATE_COMMENT,
  comment
});
export const receiveCreateComment = comment => ({
  type: RECEIVE_CREATE_COMMENT,
  comment
});
export const createComment = comment => dispatch => {
  dispatch(requestCreateComment(comment));
  return fetch(`${api}/comments`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      ...comment,
      id: uuidv1(),
      timestamp: Math.floor(Date.now()),
    }),
  }).then(res => res.json())
    .then(json => dispatch(receiveCreateComment(json)));
};

export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT';
export const RECEIVE_UPDATE_COMMENT = 'RECEIVE_UPDATE_COMMENT';
export const requestUpdateComment = (commentId, comment) => ({
  type: REQUEST_UPDATE_COMMENT,
  commentId,
  comment,
});
export const receiveUpdateComment = (commentId, comment) => ({
  type: RECEIVE_UPDATE_COMMENT,
  commentId,
  comment,
});
export const updateComment = (commentId, commentUpdates) => dispatch => {
  dispatch(requestUpdateComment(commentId, commentUpdates));
  return fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(commentUpdates),
  }).then(res => res.json())
    .then(json => dispatch(receiveUpdateComment(commentId, json)));
};

export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT';
export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT';
export const requestDeleteComment = commentId => ({
  type: REQUEST_DELETE_COMMENT,
  commentId
});
export const receiveDeleteComment = commentId => ({
  type: RECEIVE_DELETE_COMMENT,
  commentId
});
export const deleteComment = comment => dispatch => {
  dispatch(requestDeleteComment(comment.id));
  return fetch(`${api}/comments/${comment.id}`, {
    headers,
    method: 'DELETE',
  }).then(res => res.json())
    .then(json => dispatch(receiveDeleteComment(comment.id)));
};

/*
 * Voting
 */
export const REQUEST_POST_UPVOTE = 'REQUEST_POST_UPVOTE';
export const RECEIVE_POST_UPVOTE = 'RECEIVE_POST_UPVOTE';
export const requestPostUpvote = (postId, voteScore) => ({
  type: REQUEST_POST_UPVOTE,
  postId,
  voteScore,
});
export const receivePostUpvote = (postId, voteScore) => ({
  type: RECEIVE_POST_UPVOTE,
  postId,
  voteScore,
});
export const upvotePost = (postId, voteScore) => dispatch => {
  dispatch(requestPostUpvote(postId, voteScore));
  return fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: 'upVote'
    })
  }).then(res => res.json())
    .then(json => dispatch(receivePostUpvote(postId, voteScore)));
};
export const REQUEST_POST_DOWNVOTE = 'REQUEST_POST_DOWNVOTE';
export const RECEIVE_POST_DOWNVOTE = 'RECEIVE_POST_DOWNVOTE';
export const requestPostDownvote = (postId, voteScore) => ({
  type: REQUEST_POST_DOWNVOTE,
  postId,
  voteScore,
});
export const receivePostDownvote = (postId, voteScore) => ({
  type: RECEIVE_POST_DOWNVOTE,
  postId,
  voteScore,
});
export const downvotePost = (postId, voteScore) => dispatch => {
  dispatch(requestPostDownvote(postId, voteScore));
  return fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: 'downVote'
    })
  }).then(res => res.json())
    .then(json => dispatch(receivePostDownvote(postId, voteScore)));
};

export const REQUEST_COMMENT_UPVOTE = 'REQUEST_COMMENT_UPVOTE';
export const RECEIVE_COMMENT_UPVOTE = 'RECEIVE_COMMENT_UPVOTE';
export const requestCommentUpvote = (commentId, voteScore) => ({
  type: REQUEST_COMMENT_UPVOTE,
  commentId,
  voteScore,
});
export const receiveCommentUpvote = (commentId, voteScore) => ({
  type: RECEIVE_COMMENT_UPVOTE,
  commentId,
  voteScore,
});
export const upvoteComment = (commentId, voteScore) => dispatch => {
  dispatch(requestCommentUpvote(commentId, voteScore));
  return fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: 'upVote'
    })
  }).then(res => res.json())
    .then(json => dispatch(receiveCommentUpvote(commentId, voteScore)));
};
export const REQUEST_COMMENT_DOWNVOTE = 'REQUEST_COMMENT_DOWNVOTE';
export const RECEIVE_COMMENT_DOWNVOTE = 'RECEIVE_COMMENT_DOWNVOTE';
export const requestCommentDownvote = (commentId, voteScore) => ({
  type: REQUEST_COMMENT_DOWNVOTE,
  commentId,
  voteScore,
});
export const receiveCommentDownvote = (commentId, voteScore) => ({
  type: RECEIVE_COMMENT_DOWNVOTE,
  commentId,
  voteScore,
});
export const downvoteComment = (commentId, voteScore) => dispatch => {
  dispatch(requestCommentDownvote(commentId, voteScore));
  return fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: 'downVote'
    })
  }).then(res => res.json())
    .then(json => dispatch(receiveCommentDownvote(commentId, voteScore)));
};

