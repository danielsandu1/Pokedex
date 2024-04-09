import { convertHeightToMeters, convertWeightToKilograms } from "./utils";

describe("convertHeightToMeters", () => {
  it("converts height from decimetres to meters", () => {
    const heightInDecimetres = 150;
    const expectedHeightInMeters = "15 m";
    const convertedHeight = convertHeightToMeters(heightInDecimetres);
    expect(convertedHeight).toEqual(expectedHeightInMeters);
  });
});

describe("convertWeightToKilograms", () => {
  it("converts weight from hectograms to kilograms", () => {
    const weightInHectograms = 250;
    const expectedWeightInKilograms = "25 kg";
    const convertedWeight = convertWeightToKilograms(weightInHectograms);
    expect(convertedWeight).toEqual(expectedWeightInKilograms);
  });
});
