export async function fetchRecipe(
  element: string,
  algorithm: string,
  multiple: boolean,
  maxRecipe: number
) {
  // await new Promise((res) => setTimeout(res, 1000)); // Simulasi delay
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL;
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
