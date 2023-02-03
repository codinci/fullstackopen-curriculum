import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, likes: action.payload.likes };
        }
        return blog;
      });
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    commentBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, comments: action.payload.comments };
        }
        return blog;
      });
    }
  }
});

export const { setBlogs, appendBlogs, updateBlog, deleteBlog, commentBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlogs(newBlog));
      dispatch(setNotification(`${blog.title} by ${blog.author} added`, 5, 'success'));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5, 'error'));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.createComment(id, comment);
    dispatch(commentBlog(commentedBlog));
  };
};

export default blogSlice.reducer;
