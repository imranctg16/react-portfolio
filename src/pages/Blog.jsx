import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { Row, useTitle } from '../components/ui';

export const day = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Blog() {
  useTitle('Writing');
  return (
    <>
      <Row rail="Writing" className="title-block">
        <h1>Writing</h1>
        <p className="lead measure">Notes on production problems and how we fixed them.</p>
      </Row>
      <Row rail={`${blogPosts.length} posts`}>
        <ul className="posts">
          {blogPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
              <div className="d">
                {day(post.date)} · {post.category} · {post.readTime}
              </div>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </Row>
    </>
  );
}
