import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonCard from "@/components/PokemonCard";

const imgUrl = "https://someurl.com/pikachu.png";

describe("PokemonCard component", () => {
  const mockData = {
    name: "Pikachu",
    height: 60,
    weight: 100,
    sprites: {
      front_default: imgUrl,
    },
    types: [{ type: { name: "Electric" } }],
  };

  test("renders Pokemon name, type, height, and weight", () => {
    render(<PokemonCard key={1} pokemon={mockData} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Electric")).toBeInTheDocument();
    expect(screen.getByText("Height: 6 m | Weight: 10 kg")).toBeInTheDocument();
  });

  test("renders Pokemon image with correct alt attributes", () => {
    render(<PokemonCard key={1} pokemon={mockData} />);

    const image = screen.getByAltText("Pikachu");
    expect(image).toBeInTheDocument();
  });
});
