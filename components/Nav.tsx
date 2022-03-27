import { css, cx } from "@emotion/css";
import Link from "next/link";
import AtomFlower from "./AtomFlower";

const navStyles = css`
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.5rem;
  }
`;

const HomeLink = ({ children }: any) => (
  <Link href="/">
    <a>{children}</a>
  </Link>
);

const Nav = () => {
  return (
    <div>
      <div className={cx(navStyles)}>
        <HomeLink>
          <AtomFlower small />
        </HomeLink>
        <HomeLink>
          <h1>Boundless Garden</h1>
        </HomeLink>
      </div>
    </div>
  );
};

export default Nav;
