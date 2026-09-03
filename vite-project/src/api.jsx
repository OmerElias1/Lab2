import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export function DemoFunction() {
    const [posts, setPosts] = useState([]);

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

    return (
        <div style={{ maxHeight: '280px', overflowY: 'auto', textAlign: 'left', paddingRight: '6px' }}>
            {posts.map((post) => (
                <div key={post.id} style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ fontSize: '13.5px', color: '#93c5fd', marginBottom: '4px', textTransform: 'capitalize' }}>{post.title}</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.4 }}>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default DemoFunction;
