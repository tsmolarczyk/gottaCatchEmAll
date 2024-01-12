import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";
import { PokemonDetails } from "../../src/components/pokemon-details/pokemon-details";

jest.mock("lottie-web", () => ({
  loadAnimation: jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
    destroy: jest.fn(),
  })),
}));

const fakeFetch = jest.fn((url: string): Promise<any> => {
  const pokemonData = { name: "bulbasaur" };
  if (url === "https://pokeapi.co/api/v2/pokemon/bulbasaur") {
    return Promise.resolve({
      json: () => Promise.resolve(pokemonData),
    });
  }
  return Promise.reject(new Error("Pokemon not found"));
});

const HttpClientMock = {
  fetch: fakeFetch,
} as Partial<HttpClient> as HttpClient;

const RouterMock = {
  navigateToRoute: jest.fn(),
} as Partial<Router> as Router;

describe("PokemonDetails Component", () => {
  let component;

  beforeEach(() => {
    document.getElementById = jest.fn().mockReturnValue({
      style: {},
      getContext: jest.fn().mockReturnValue({
        fillStyle: null,
      }),
    });
  });

  afterEach(() => {
    if (component) {
      component.dispose();
    }
  });

  it("should fetch pokemon data on activation", async () => {
    const pokemonDetails = new PokemonDetails(HttpClientMock, RouterMock);
    await pokemonDetails.activate({ name: "bulbasaur" });

    expect(pokemonDetails.pokemonData).toBeDefined();
    expect(pokemonDetails.pokemonData.name).toBe("bulbasaur");
  });
});
