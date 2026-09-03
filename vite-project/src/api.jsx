import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export function DemoFunction() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                let res = await axios.get(BASE_URL);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllPosts();
    }, []);

    function deletePost(postID) {
        axios.delete(`${BASE_URL}/${postID}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== postID));
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    function startEdit(post) {
        setEditingId(post.id);
        setEditTitle(post.title);
        setEditBody(post.body);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditTitle("");
        setEditBody("");
    }

    function saveEdit(postID) {
        axios.patch(`${BASE_URL}/${postID}`, { title: editTitle, body: editBody })
            .then(() => {
                setPosts(posts.map(post => 
                    post.id === postID 
                        ? { ...post, title: editTitle, body: editBody } 
                        : post
                ));
                setEditingId(null);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    // UPDATE: Filter posts solely by ID (converting to string for partial matching)
    const filteredPosts = posts.filter(post => 
        post.id.toString().includes(searchQuery)
    );

    const glassButtonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)', 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
        borderRadius: '8px', 
        color: 'white', 
        padding: '6px 12px', 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginRight: '10px'
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        maxWidth: '500px',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc'
    };

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <input 
                    type="text" 
                    placeholder="Search posts by ID..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={inputStyle}
                />
            </div>

            {filteredPosts.length === 0 ? (
                <p>No posts found matching your search.</p>
            ) : (
                filteredPosts.map((post) => (
                    <div key={post.id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>
                        {editingId === post.id ? (
                            <div>
                                <input 
                                    style={inputStyle}
                                    value={editTitle} 
                                    onChange={(e) => setEditTitle(e.target.value)} 
                                />
                                <textarea 
                                    style={{...inputStyle, minHeight: '80px', maxWidth: '100%'}}
                                    value={editBody} 
                                    onChange={(e) => setEditBody(e.target.value)} 
                                />
                                <button style={glassButtonStyle} onClick={() => saveEdit(post.id)}>Save</button>
                                <button style={glassButtonStyle} onClick={cancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h4>{post.id}. {post.title}</h4>
                                <p>{post.body}</p>
                                <button 
                                    style={glassButtonStyle} 
                                    onClick={() => startEdit(post)}
                                >
                                    Edit
                                </button>
                                <button 
                                    style={glassButtonStyle} 
                                    onClick={() => deletePost(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default DemoFunction;