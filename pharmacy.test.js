import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("should degrade Doliprane like a normal drug", () => {
    const doliprane = new Drug("Doliprane", 2, 10);
    const pharmacy = new Pharmacy([doliprane]);

    const expectedStates = [
      { expiresIn: 1, benefit: 9 },
      { expiresIn: 0, benefit: 8 },
      { expiresIn: -1, benefit: 6 },
      { expiresIn: -2, benefit: 4 },
      { expiresIn: -3, benefit: 2 },
      { expiresIn: -4, benefit: 0 },
      { expiresIn: -5, benefit: 0 },
    ];

    expectedStates.forEach(expected => {
      pharmacy.updateBenefitValue();
      const updated = pharmacy.drugs[0];
      expect(updated.expiresIn).toBe(expected.expiresIn);
      expect(updated.benefit).toBe(expected.benefit);
    });
  });

  it("should increase Herbal Tea benefit with age and twice as fast after expiration", () => {
    const herbalTea = new Drug("Herbal Tea", 2, 10);
    const pharmacy = new Pharmacy([herbalTea]);

    const expectedStates = [
      { expiresIn: 1, benefit: 11 },
      { expiresIn: 0, benefit: 12 },
      { expiresIn: -1, benefit: 14 },
      { expiresIn: -2, benefit: 16 },
      { expiresIn: -3, benefit: 18 },
    ];

    expectedStates.forEach(expected => {
      pharmacy.updateBenefitValue();
      const updated = pharmacy.drugs[0];
      expect(updated.expiresIn).toBe(expected.expiresIn);
      expect(updated.benefit).toBe(expected.benefit);
    });
  });

  it("should increase Fervex benefit and drop to 0 after expiration", () => {
    const fervex = new Drug("Fervex", 12, 20);
    const pharmacy = new Pharmacy([fervex]);

    const expectedStates = [
      { expiresIn: 11, benefit: 21 },
      { expiresIn: 10, benefit: 22 },
      { expiresIn: 9, benefit: 24 },
      { expiresIn: 8, benefit: 26 },
      { expiresIn: 7, benefit: 28 },
      { expiresIn: 6, benefit: 30 },
      { expiresIn: 5, benefit: 32 },
      { expiresIn: 4, benefit: 35 },
      { expiresIn: 3, benefit: 38 },
      { expiresIn: 2, benefit: 41 },
      { expiresIn: 1, benefit: 44 },
      { expiresIn: 0, benefit: 47 },
      { expiresIn: -1, benefit: 0 },
    ];

    expectedStates.forEach(expected => {
      pharmacy.updateBenefitValue();
      const updated = pharmacy.drugs[0];
      expect(updated.expiresIn).toBe(expected.expiresIn);
      expect(updated.benefit).toBe(expected.benefit);
    });
  });

  it("should not change Magic Pill benefit or expiresIn over time", () => {
    const magicPill = new Drug("Magic Pill", 15, 40);
    const pharmacy = new Pharmacy([magicPill]);

    for (let day = 1; day <= 5; day++) {
      pharmacy.updateBenefitValue();
      const updated = pharmacy.drugs[0];
      expect(updated.expiresIn).toBe(15);
      expect(updated.benefit).toBe(40);
    }
  });

  it("should degrade Dafalgan benefit twice as fast as normal drugs", () => {
    const dafalgan = new Drug("Dafalgan", 2, 10);
    const pharmacy = new Pharmacy([dafalgan]);

    const expectedStates = [
      { expiresIn: 1, benefit: 8 },
      { expiresIn: 0, benefit: 6 },
      { expiresIn: -1, benefit: 2 },
      { expiresIn: -2, benefit: 0 },
      { expiresIn: -3, benefit: 0 },
    ];

    expectedStates.forEach(expected => {
      pharmacy.updateBenefitValue();
      const updated = pharmacy.drugs[0];
      expect(updated.expiresIn).toBe(expected.expiresIn);
      expect(updated.benefit).toBe(expected.benefit);
    });
  });
});
