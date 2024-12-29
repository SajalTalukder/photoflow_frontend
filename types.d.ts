export interface User {
  _id: string; // MongoDB ObjectId as a string
  username: string; // Required
  email: string; // Required
  password?: string; // Not returned after querying (select: false)
  profilePicture?: string; // Optional
  bio?: string; // Optional
  followers: string[]; // Array of ObjectId as strings
  following: string[]; // Array of ObjectId as strings
  posts: Post[]; // Array of ObjectId as strings
  savedPosts: string[]; // Array of ObjectId as strings
  isVerified: boolean; // Optional, defaults to false
}

interface AuthResponse {
  data: {
    status?: string;
    data: { user?: User };
    message?: string;
  };
}

export interface Comment {
  _id: string;
  text: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  createdAt: string;
}

export interface Post {
  _id: string;
  caption: string;
  image?: {
    url: string;
    publicId: string;
  };
  user: User | undefined;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  createdAt: string;
}
