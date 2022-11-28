import Image from "next/image";
import { styled } from "../Stitches";

const BlogCaption = styled("p", {
  padding: 0,
  margin: 0,

  fontSize: "$1 !important",
  fontFamily: "$mono",
  // color: "white !important",

  textAlign: "center",
});

const BlogImagePrimitive = styled(Image, {
  borderRadius: "$4",
});

type BlogImageProps = {
  src: any;
  alt: string;
  caption: boolean | string | undefined;
  date?: string;
};

export default function BlogImage({ src, alt, caption, date }: BlogImageProps) {
  return (
    <div>
      <BlogImagePrimitive src={src} alt={alt} />
      {caption && (
        <BlogCaption>
          {caption === true ? alt : caption}
          {date && <em> {date}</em>}
        </BlogCaption>
      )}
    </div>
  );
}
