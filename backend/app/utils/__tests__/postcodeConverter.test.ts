import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { postcodeConverter } from "../postcodeConverter";
const mock = new MockAdapter(axios);

describe("postcodeConverter", () => {
  afterEach(() => {
    mock.reset();
  });

  test("should return latitude and longitude for a valid postcode", async () => {
    const postcode = "SW1A 1AA";
    const mockResponse = {
      status: 200,
      result: {
        postcode: "SW1A 1AA",
        quality: 1,
        eastings: 529102,
        northings: 179888,
        country: "England",
        nhs_ha: "NHS England",
        administrative_district: "Westminster",
        administrative_county: null,
        ward: "St James's",
        parish: null,
        parliamentary_constituency: "Cities of London and Westminster",
        european_electoral_region: "London",
        region: "London",
        continent: "Europe",
        longitude: -0.141588,
        latitude: 51.501009,
      },
    };

    mock
      .onGet(`https://api.postcodes.io/postcodes/${postcode}`)
      .reply(200, mockResponse);

    const coordinates = await postcodeConverter(postcode);

    expect(coordinates).toEqual({ latitude: 51.501009, longitude: -0.141588 });
  });

  test("should return null for an invalid postcode", async () => {
    const postcode = "INVALID";

    mock.onGet(`https://api.postcodes.io/postcodes/${postcode}`).reply(404, {
      status: 404,
      error: "Postcode not found",
    });

    const coordinates = await postcodeConverter(postcode);

    expect(coordinates).toBeNull();
  });

  test("should handle API errors", async () => {
    const postcode = "SW1A 1AA";

    mock.onGet(`https://api.postcodes.io/postcodes/${postcode}`).networkError();

    const coordinates = await postcodeConverter(postcode);

    expect(coordinates).toBeNull();
  });
});
