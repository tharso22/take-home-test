export class DrugUpdater {
    constructor(drug) {
        this.drug = drug;
    }

    update() {
        this.updateBenefit();
        this.updateExpiresIn();
        if (this.drug.expiresIn < 0) {
            this.updateExpired();
        }
        this.capBenefit();
        return this.drug;
    }

    updateBenefit() {
        this.decreaseBenefit(1);
    }

    updateExpiresIn() {
        this.drug.expiresIn -= 1;
    }

    updateExpired() {
        this.decreaseBenefit(1);
    }

    increaseBenefit(amount) {
        this.drug.benefit = Math.min(50, this.drug.benefit + amount);
    }

    decreaseBenefit(amount) {
        this.drug.benefit = Math.max(0, this.drug.benefit - amount);
    }

    capBenefit() {
        this.drug.benefit = Math.max(0, Math.min(50, this.drug.benefit));
    }
}

export class HerbalTeaUpdater extends DrugUpdater {
    updateBenefit() {
        this.increaseBenefit(1);
    }

    updateExpired() {
        this.increaseBenefit(1);
    }
}

export class FervexUpdater extends DrugUpdater {
    updateBenefit() {
        if (this.drug.expiresIn > 10) {
            this.increaseBenefit(1);
        } else if (this.drug.expiresIn > 5) {
            this.increaseBenefit(2);
        } else if (this.drug.expiresIn > 0) {
            this.increaseBenefit(3);
        } else {
            this.drug.benefit = 0;
        }
    }

    updateExpired() {
        // Already handled by updateBenefit
    }
}

export class MagicPillUpdater extends DrugUpdater {
    update() {
        return this.drug;
    }
}

export class DafalganUpdater extends DrugUpdater {
    updateBenefit() {
        this.decreaseBenefit(2);
    }

    updateExpired() {
        this.decreaseBenefit(2);
    }
}

export function createDrugUpdater(drug){
    switch (drug.name) {
        case "Herbal Tea":
            return new HerbalTeaUpdater(drug);
        case "Fervex":
            return new FervexUpdater(drug);
        case "Magic Pill":
            return new MagicPillUpdater(drug);
        case "Dafalgan":
            return new DafalganUpdater(drug);
        default:
            return new DrugUpdater(drug);
    }
}
