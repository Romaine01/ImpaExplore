import { Link } from 'react-router-dom';
export function Static({title,children}:{title:string;children:React.ReactNode}) { return <article className="prose-page"><Link to="/">ImpaExplore</Link><h1>{title}</h1><p>{children}</p><div className="next-action"><Link to="/destinations">Explore destinations</Link><span> · </span><Link to="/guides">Meet local guides</Link></div></article>; }
