const url = "https://api.mhnow.cc";

export async function Getlocation(c: string) {
    try {
        const response = await fetch(
            `${url}/api/monsterlocation/getlocation?c=${c}`
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
            `${url}/api/monsterlocation/getlocationlist`
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
            `${url}/api/monsterlocation/get`
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
        `${url}/api/monsterlocation/create`, {
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

export async function createBadLocation(model: ReportLocationModel) {
    const response = await fetch(
        `${url}/api/monsterlocation/createBadLocation`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
    });

    return response;
}

export async function createGoodLocation(model: ReportLocationModel) {
    const response = await fetch(
        `${url}/api/monsterlocation/createGoodLocation`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
    });

    return response;
}