import { useCallback, useEffect, useState } from "react";
import {
  LinksFunction,
  LoaderFunction,
  useCatch,
  useFetcher,
  useLoaderData,
} from "remix";

import Grid from "~/components/Grid";
import Card from "~/components/Card";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import { Image } from "~/types/Image";
import stylesUrl from "../styles/index.css";

let PAGE_NUMBER = 1;

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

type LoaderData = Array<Image>;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pageSearchParam = url.searchParams.get("page") ?? PAGE_NUMBER;
  const data = await fetch(
    `https://picsum.photos/v2/list?${new URLSearchParams([
      ["page", pageSearchParam.toString()],
    ])}`
  );
  return data;
};

export default function Index() {
  const data = useLoaderData();
  let fetcher = useFetcher();
  const [images, setImages] = useState(data);

  useEffect(() => {
    if (fetcher.data) {
      setImages((prevData: LoaderData) => [...prevData, ...fetcher.data]);
    }
  }, [fetcher.data, setImages]);

  const incrementPage = useCallback(() => {
    PAGE_NUMBER += 1;
    fetcher.submit(new URLSearchParams(`page=${PAGE_NUMBER}`));
  }, []);

  const infiniteScrollRef = useInfiniteScroll(incrementPage);

  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>infinite scroll</span>
        </h1>
        <Grid data={images}>
          <div ref={infiniteScrollRef}>
            <Card />
          </div>
        </Grid>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <div>{/* render an "unexpected error" message */}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();
  return <div>{/* render the error for 400-status level responses */}</div>;
}
