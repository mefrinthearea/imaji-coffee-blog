const API_URL = 'http://localhost:5000/api';

export const getPosts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/posts?${queryString}`);
  return response.json();
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  return response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  return response.json();
};

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
