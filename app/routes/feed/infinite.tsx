import { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pageSearchParam = url.searchParams.get("page") ?? "1";

  const data = await fetch(
    `https://picsum.photos/v2/list?${new URLSearchParams([
      ["page", pageSearchParam],
    ])}&limit=5`
  );

  return data;
};
