import { createDrugUpdater } from "./drugUpdaters";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (let i = 0; i < this.drugs.length; i++) {
      const updater = createDrugUpdater(this.drugs[i]);
      this.drugs[i] = updater.update();
    }
    return this.drugs;
  }
}
