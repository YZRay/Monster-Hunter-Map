export async function Getlocation(c: string) {
    try {
        const response = await fetch(
            `https://api.mhnow.cc/api/monsterlocation/getlocation?c=${c}`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
}

export async function GetlocationList() {
    try {
        const response = await fetch(
            `https://api.mhnow.cc/api/monsterlocation/getlocationlist`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
}

export async function fetchMonsterLocation() {
    try {
        const response = await fetch(
            `https://api.mhnow.cc/api/monsterlocation/get`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
}

export async function createMonsterLocation(model: PostData) {

    const response = await fetch(
        `https://api.mhnow.cc/api/monsterlocation/create`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
    }
    );

    return response;
}

export async function createBadLocation(model: {
    uid: string,
    mlid: number
}) {
    const response = await fetch(
        `https://api.mhnow.cc/api/monsterlocation/createBadLocation`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
    });

    return response;
}