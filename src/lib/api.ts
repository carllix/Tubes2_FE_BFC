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
  mode: string,
  maxRecipe: number
) {
  // Simulasi delay API
  await new Promise((res) => setTimeout(res, 1000));

  // Mock data tree untuk testing
  return {
    tree: {
      name: "Brick",
      children: [
        {
          name: "Mud",
          children: [{ name: "Water" }, { name: "Earth" }],
        },
        { name: "Fire" },
      ],
    },
    time: 32,
    nodes: 5,
  };
}
