import { Link, useMatch, useResolvedPath } from "react-router-dom";
export default function Navbar() {
  return (
    <navbar className="nav">
      <Link to="/" className="site-title">
        Majesty.Q
      </Link>
      <ul>
        <CustomLink to="/wepruefung">Wareneingangsprüfung</CustomLink>
        <CustomLink to="/aql">AQL</CustomLink>
        <CustomLink to="/pruefplanung">Prüfplanung</CustomLink>
        <CustomLink to="/artikel">Artikel</CustomLink>
        <CustomLink to="/department">Department</CustomLink>
        <CustomLink to="/">Home</CustomLink>
      </ul>
    </navbar>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolved = useResolvedPath(to);
  const isactive = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className={isactive === to ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
