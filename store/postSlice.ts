import { Post, Comment } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // Add new post to the beginning
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    likeOrDislikePost: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const post = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      if (post) {
        if (post.likes.includes(action.payload.userId)) {
          post.likes = post.likes.filter((id) => id !== action.payload.userId); // Unlike
        } else {
          post.likes.push(action.payload.userId); // Like
        }
      }
    },
    addComment: (
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) => {
      const post = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
  },
});

export const { setPosts, addPost, deletePost, likeOrDislikePost, addComment } =
  postSlice.actions;

export default postSlice.reducer;
