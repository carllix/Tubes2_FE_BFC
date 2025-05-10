// export async function fetchRecipe(
//   element: string,
//   algorithm: string,
//   mode: string,
//   maxRecipe?: number
// ) {
//   const baseUrl =
//     process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

//   const params = new URLSearchParams({
//     element,
//     algorithm,
//     mode,
//     maxRecipe: maxRecipe.toString(),
//   });

//   const res = await fetch(`${baseUrl}/search?${params.toString()}`);
//   if (!res.ok) throw new Error("Gagal mengambil data dari backend");
//   return res.json();
// }

export async function fetchRecipe(
  element: string,
  algorithm: string,
  multiple: boolean,
  maxRecipe: number
) {
  await new Promise((res) => setTimeout(res, 1000)); // Simulasi delay

  const res = await fetch("/test/result_tree(1).json");
  if (!res.ok) {
    throw new Error("Gagal memuat mock tree dari file");
  }

  const tree = await res.json();

  return {
    tree,
    time: 100,
    nodes: 100,
  };
}
