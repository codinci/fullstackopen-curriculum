import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, likes: action.payload.likes };
        }
        return blog;
      });
    }
  }
});

export const { setBlogs, appendBlogs, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlogs(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog);
    dispatch(updateBlog(updatedBlog));
  };
};

export default blogSlice.reducer;
