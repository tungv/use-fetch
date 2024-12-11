"use client";

export default async function fetchData(query: string) {
  console.log("fetchData", query);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { result: `server response = ${query}` };
}
