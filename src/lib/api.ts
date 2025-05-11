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

//   const res = await fetch(`${baseUrl}/api/data`), {
//     method: "POST",
//       headers: {
//        'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(){
//        elementTarget: element,
//        algorithmType: algoritm,
//        multiple: multiple,
//        maxRecipe: maxRecipe ?? 0;
//       }}  
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
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/api/data`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        elementTarget: element,
        algorithmType: algorithm,
        multiple: multiple,
        maxRecipe: maxRecipe ?? 0
      })
    })
  if (!res.ok) {
    throw new Error("Gagal memuat mock tree dari file");
  }

  return res.json();
}
