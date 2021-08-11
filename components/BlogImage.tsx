import { css, cx } from "@emotion/css";
import Image from "next/image";

const blogImageStyles = css`
  border-radius: 8px;
`;

type BlogImageProps = { src: any; alt: string };
export default function BlogImage({ src, alt }: BlogImageProps) {
  return <Image src={src} alt={alt} className={cx(blogImageStyles)} />;
}
