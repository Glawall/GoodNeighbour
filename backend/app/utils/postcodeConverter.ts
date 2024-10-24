import axios from "axios";

interface PostcodeResponse {
  status: number;
  result: {
    postcode: string;
    quality: number;
    eastings: number;
    northings: number;
    country: string;
    nhs_ha: string;
    administrative_district: string;
    administrative_county: string;
    ward: string;
    parish: string;
    parliamentary_constituency: string;
    european_electoral_region: string;
    region: string;
    continent: string;
    longitude: number;
    latitude: number;
  };
}

export const postcodeConverter = async (
  postcode: string
): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    const response = await axios.get<PostcodeResponse>(
      `https://api.postcodes.io/postcodes/${postcode}`
    );

    if (response.data.status === 200) {
      const { latitude, longitude } = response.data.result;
      return { latitude, longitude };
    } else {
      console.error(
        `Error: ${response.data.status} - Unable to find postcode.`
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    return null;
  }
};
