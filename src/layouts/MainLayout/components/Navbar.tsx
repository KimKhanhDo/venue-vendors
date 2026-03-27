import { Link as LinkScroll } from 'react-scroll';

const Navbar = () => {
  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex gap-10">
          <li>
            <LinkScroll
              to="how-it-works"
              smooth={true}
              duration={600}
              offset={-80}
              className="nav-link text-md cursor-pointer"
            >
              How It Works
            </LinkScroll>
          </li>
          <li>
            <LinkScroll
              to="blogs"
              smooth={true}
              duration={600}
              offset={-80}
              className="nav-link text-md cursor-pointer"
            >
              Blogs
            </LinkScroll>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
