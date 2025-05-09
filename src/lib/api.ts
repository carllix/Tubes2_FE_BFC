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

  return {
    tree: {
      name: "Brick",
      children: [
        {
          name: "Clay + Fire",
          children: [
            {
              name: "Clay",
              children: [
                {
                  name: "Mud + Sand",
                  children: [
                    {
                      name: "Mud",
                      children: [
                        { name: "Water" },
                        { name: "Earth" },
                      ],
                    },
                    {
                      name: "Sand",
                      children: [
                        {
                          name: "Stone + Air",
                          children: [
                            {
                              name: "Stone",
                              children: [
                                {
                                  name: "Lava + Air",
                                  children: [
                                    {
                                      name: "Lava",
                                      children: [
                                        { name: "Earth" },
                                        { name: "Fire" },
                                      ],
                                    },
                                    { name: "Air" },
                                  ],
                                },
                              ],
                            },
                            { name: "Air" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { name: "Fire" },
          ],
        },
      ],
    },
    time: 42,
    nodes: 15,
  };
}
