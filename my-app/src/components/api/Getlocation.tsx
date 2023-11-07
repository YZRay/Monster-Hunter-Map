export async function Getlocation(c: string) {
  try {
    const response = await fetch(
      `https://api.mhnow.cc/api/monsterlocation/getlocation?c=${c}`
    );
    console.log(`https://api.mhnow.cc/api/monsterlocation/getlocation?c=${c}`);
    console.log(c);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}
