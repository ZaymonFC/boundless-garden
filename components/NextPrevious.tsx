import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { surroundingPosts } from "../data/Meta";
import { Button } from "./Button";
import Stack from "./Stack";

const ProgressionButton = ({ url, children }: { url: string; children: React.ReactNode }) => {
  return (
    <Link href={"/" + url}>
      <Button>{children}</Button>
    </Link>
  );
};

const NextPrevious = ({ currentPostId }: { currentPostId: string }) => {
  const { next, previous } = surroundingPosts(currentPostId);

  return (
    <Stack justify={"spaceBetween"}>
      {previous && (
        <ProgressionButton url={previous.url}>
          <Stack spacing="sm" direction="row" align="center">
            <ArrowLeftIcon />
            <span></span>
            {previous.meta.title}
          </Stack>
        </ProgressionButton>
      )}
      {next && (
        <ProgressionButton url={next.url}>
          <Stack spacing="sm" direction="row" align="center">
            {next.meta.title}
            <span></span>
            <ArrowRightIcon />
          </Stack>
        </ProgressionButton>
      )}
    </Stack>
  );
};

export default NextPrevious;
