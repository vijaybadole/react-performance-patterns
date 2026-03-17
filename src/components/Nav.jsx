import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    ⚡ React Performance Patterns
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/web-vitals" className="nav-link">
                            Web Vitals Monitor
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/debouncing-throttling" className="nav-link">
                            Debouncing & Throttling
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/memoization" className="nav-link">
                            Memoization
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/lazy-loading" className="nav-link">
                            Lazy Loading
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/image-optimization" className="nav-link">
                            Image Optimization
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/virtual-lists" className="nav-link">
                            Virtual Lists
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
