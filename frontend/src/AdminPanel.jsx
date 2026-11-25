import React, { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from './services/api';

function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentPost) {
        await updatePost(currentPost._id, formData);
      } else {
        await createPost(formData);
      }
      setFormData({ title: '', content: '', author: '', image: '' });
      setIsEditing(false);
      setCurrentPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      image: post.image || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#8B7355' }}>Admin Panel</h1>
      
      {/* Form */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px', marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Author *</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Content *</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows="10"
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit"
              style={{ 
                padding: '0.75rem 1.5rem', 
                backgroundColor: '#8B7355',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            
            {isEditing && (
              <button 
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPost(null);
                  setFormData({ title: '', content: '', author: '', image: '' });
                }}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Posts List */}
      <h2 style={{ marginBottom: '1.5rem' }}>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Create your first post above!</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {posts.map((post) => (
            <div 
              key={post._id}
              style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  By {post.author} • {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
