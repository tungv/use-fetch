"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchData from "../fetchData";
import Form from "next/form";

interface DataType {
  result: string;
}

export default function Conventional() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetchData(query).then((data) => setData(data));
  }, [query]);

  return (
    <div>
      <h1>Conventional</h1>
      <Form
        action="/conventional"
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
