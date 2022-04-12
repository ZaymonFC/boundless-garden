import Head from "next/head";
import Emoji from "../components/Emoji";
import { Fade } from "../components/Fade";
import Nav from "../components/Nav";
import { ThreeWithStars } from "../components/ThreeWithStars";
import { styled } from "../Stitches";

const height = "100vh";

const Page = styled("div", {
  maxWidth: 720,
  marginLeft: "auto",
  marginRight: "auto",

  "&": {
    padding: "$6",
  },

  color: "rgb(241, 200, 146)",
});

const BodyText = styled("p", {
  color: "$yellow",
  fontSize: "1.2rem",
  lineHeight: "170%",
});

const ThanksForSubscribing = () => (
  <>
    <Head>
      <title>Thank You - Boundless Garden 🌸</title>
    </Head>
    <Fade>
      <div style={{ position: "relative", height: height }}>
        <ThreeWithStars />
        <main
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: height,
          }}
        >
          <Nav></Nav>
          <Page>
            <h1>
              Thanks for subscribing to Boundless.Garden{" "}
              <Emoji symbol="🌸" label="Emoji of a cherry blossom" />
            </h1>
            <BodyText>
              I appreciate having you here along for the journey. I{"'"}m just someone trying to
              figure out my life through explorations in writing, art and technology. I hope what I
              write here will resonate with others and provide guidance—or cautionary tales—as I
              progress in my personal narrative.
            </BodyText>
            <br />
            <BodyText>With compassion,</BodyText>
            <BodyText>Zan</BodyText>
            <BodyText>PS: There are more people on Earth than seconds in a lifetime.</BodyText>
          </Page>
        </main>
      </div>
    </Fade>
  </>
);

export default ThanksForSubscribing;
