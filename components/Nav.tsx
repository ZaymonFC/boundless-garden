import Link from "next/link";
import { styled } from "../Stitches";
import AtomFlower from "./AtomFlower";
import Stack from "./Stack";

const NavContainer = styled("div", {
  margin: 0,
  padding: "$5",
});

const NavHeading = styled("h1", {
  fontSize: "$5",
});

const HomeLink = ({ children }: any) => (
  <Link href="/">
    <a>{children}</a>
  </Link>
);

const Nav = () => {
  return (
    <NavContainer>
      <Stack justify={"spaceBetween"} align="center">
        <HomeLink>
          <AtomFlower small />
        </HomeLink>
        <HomeLink>
          <NavHeading>Boundless Garden</NavHeading>
        </HomeLink>
      </Stack>
    </NavContainer>
  );
};

export default Nav;
