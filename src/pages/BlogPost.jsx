import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blog';
import { Row, useTitle } from '../components/ui';
import { NotFound } from '../App';
import { day } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => String(p.id) === id);
  useTitle(post ? post.title : 'Page not found');
  if (!post) return <NotFound />;

  return (
    <article>
      <Row rail={<Link to="/blog">← All writing</Link>} className="title-block">
        <p className="eyebrow">
          {day(post.date)} · {post.category} · {post.readTime}
        </p>
        <h1>{post.title}</h1>
        <p className="lead measure">{post.excerpt}</p>
      </Row>
      <Row
        rail={
          <dl className="meta">
            <div>
              <dt>Tools</dt>
              <dd>{post.technologies.join(', ')}</dd>
            </div>
          </dl>
        }
      >
        <div className="article">
          <dl className="brief">
            <div>
              <dt>The problem</dt>
              <dd>{post.challenge}</dd>
            </div>
            <div>
              <dt>The fix</dt>
              <dd>{post.solution}</dd>
            </div>
            <div>
              <dt>What came of it</dt>
              <dd>
                <ul>
                  {post.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          {/* each story opens with its own title, which the page already shows */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.story.replace(/^\s*# .*\n/, '')}</ReactMarkdown>
        </div>
      </Row>
    </article>
  );
}
