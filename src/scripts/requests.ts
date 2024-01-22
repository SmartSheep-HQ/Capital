const defaultCms = "https://smartsheep.studio";

export async function graphQuery(query: string, variables: any) {
  const response = await fetch(`${process.env.PUBLIC_CMS ?? defaultCms}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await response.json();
}
