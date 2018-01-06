import { combineReducers } from 'redux';
import {
  REQUEST_POSTS, RECEIVE_POSTS,
  RECEIVE_CREATE_POST, RECEIVE_UPDATE_POST, RECEIVE_DELETE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_CREATE_COMMENT, RECEIVE_UPDATE_COMMENT, RECEIVE_DELETE_COMMENT,
  RECEIVE_COMMENT_UPVOTE, RECEIVE_COMMENT_DOWNVOTE,
  RECEIVE_POST, RECEIVE_POST_UPVOTE, RECEIVE_POST_DOWNVOTE,
  CHANGE_SORT_STRATEGY
} from '../actions';

const sortStrategy = (state = 'top', action) => {
  switch (action.type) {
    case CHANGE_SORT_STRATEGY:
      return action.strategy;
    default:
      return state;
  }
};

const categoryCounts = (state = { redux: 0, react: 0, udacity: 0 }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      if (action.category === 'all') {
        return {
          ...state,
          ...action.posts.reduce((counts, post) => {
            counts[post.category]++;
            return counts;
          }, { redux: 0, react: 0, udacity: 0 }),
        };
      }
      return state;
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        [action.category]: state[action.category] - 1,
      };
    default:
      return state;
  }
};

const posts = (state = {
  isFetching: false,
  items: [],
  categoryCounts: { redux: 0, react: 0, udacity: 0 },
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    case RECEIVE_CREATE_POST:
      return {
        ...state,
        items: [
          ...state.items,
          action.post
        ]
      };
    case RECEIVE_UPDATE_POST:
      return {
        ...state,
        items: state.items.map((post) => {
          if (post.id === action.post.id) {
            return action.post;
          }
          return post;
        }),
      };
    case RECEIVE_DELETE_POST:
      return {
        items: state.items.filter(post => post.id !== action.postId)
      };
    case RECEIVE_POST_UPVOTE:
      return {
        ...state,
        items: state.items.map((post) => {
          if (post.id === action.postId) {
            return {
              ...post,
              voteScore: post.voteScore + 1
            }
          }
          return post;
        })
      };
    case RECEIVE_POST_DOWNVOTE:
      return {
        ...state,
        items: state.items.map((post) => {
          if (post.id === action.postId) {
            return {
              ...post,
              voteScore: post.voteScore - 1
            }
          }
          return post;
        })
      };
    default:
      return state;
  }
};

const post = (state = {
  id: '',
  title: '',
  category: '',
  author: '',
  body: '',
  comments: [],
  voteScore: 0,
}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      const { id, title, category, author, body, timestamp, voteScore } = action.post;

      return {
        ...state,
        id,
        title,
        category,
        author,
        body,
        timestamp,
        voteScore,
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case RECEIVE_CREATE_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment),
      };
    case RECEIVE_UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.commentId) {
            return {
              ...comment,
              author: action.comment.author,
              body: action.comment.body,
            }
          }
          return comment;
        }),
      };
    case RECEIVE_DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.commentId),
      };
    case RECEIVE_POST_UPVOTE:
      return {
        ...state,
        voteScore: action.voteScore + 1,
      };
    case RECEIVE_POST_DOWNVOTE:
      return {
        ...state,
        voteScore: action.voteScore - 1,
      };
    case RECEIVE_COMMENT_UPVOTE:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.commentId) {
            return {
              ...comment,
              voteScore: comment.voteScore + 1,
            }
          }
          return comment;
        }),
      };
    case RECEIVE_COMMENT_DOWNVOTE:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.commentId) {
            return {
              ...comment,
              voteScore: comment.voteScore - 1,
            }
          }
          return comment;
        }),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sortStrategy,
  categoryCounts,
  posts,
  post
});

export default rootReducer;