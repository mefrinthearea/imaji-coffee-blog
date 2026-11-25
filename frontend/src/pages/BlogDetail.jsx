import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/api';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await getPostById(id);
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (!post) return <div style={{ padding: '2rem', textAlign: 'center' }}>Post not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ 
          marginBottom: '2rem', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#8B7355',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Blog
      </button>
      
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '2rem' }}
        />
      )}
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#8B7355' }}>{post.title}</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        By {post.author} • {new Date(post.date).toLocaleDateString()}
      </p>
      <div style={{ lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </div>
    </div>
  );
}

export default BlogDetail;
