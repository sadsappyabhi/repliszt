import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar fixed bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-sl" to="/">
          RepLiszt
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>{/* <ThemeController /> */}</li>
        </ul>
      </div>
    </div>
  );
}
