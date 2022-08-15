import { BD_API_DIVISION, BD_API_DIVISIONS } from "../../api";

export const getDivisions = async () => {
    try {
        const fetchedData = await fetch(BD_API_DIVISIONS);
        const fetchedDataInJSON = await fetchedData.json()

        return fetchedDataInJSON
    } catch (error: any) {
        console.log(error.message)
    }
}


export const getDistricts = async (division: string) => {
    try {
        const fetchedData = await fetch(BD_API_DIVISION + "/" + division);
        const fetchedDataInJSON = await fetchedData.json()

        return fetchedDataInJSON
    } catch (error: any) {
        console.log(error.message)
    }
}





