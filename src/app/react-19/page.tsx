"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import fetchData from "../fetchData";

function cacheCompat<T>(fetcher: (query: string) => Promise<T>) {
  const cache = new Map<string, Promise<T>>();
  return (query: string) => {
    const cachedOrNull = cache.get(query);
    if (cachedOrNull) {
      return cachedOrNull;
    }

    const promise = fetcher(query);
    cache.set(query, promise);
    return promise;
  };
}

const fetchDataCached = cacheCompat(fetchData);

export default function React19() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const data = use(fetchDataCached(query));

  return (
    <div>
      <h1>React 19</h1>
      <Form
        action="/react-19"
        className="border border-gray-300 rounded-md p-2 w-fit"
      >
        <input
          type="text"
          name="query"
          className="outline-none"
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </Form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
