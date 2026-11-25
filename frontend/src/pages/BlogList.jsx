import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.posts || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#8B7355' }}>Our News</h1>
      <p style={{ marginBottom: '3rem', color: '#666' }}>Get the latest updates and deeper coffee experience from IMAJI Coffee</p>
      
      {posts.length === 0 ? (
        <p>No posts available. Create one in the admin panel!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.map((post) => (
            <Link 
              key={post._id} 
              to={`/post/${post._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                overflow: 'hidden',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h2>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    By {post.author} • {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p style={{ color: '#333', lineHeight: '1.6' }}>
                    {post.content.substring(0, 150)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
