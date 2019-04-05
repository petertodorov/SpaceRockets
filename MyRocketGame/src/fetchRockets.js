import fetchRockets from './rocketService'
class RocketData {
    constructor(id, name, fuelFirstStage, fuelSecondStage, ) {
        this.id = id;
        this.name = name;
        this.fuelFirstStage= Number(fuelFirstStage);
        this.fuelSecondStage= Number(fuelSecondStage);
        this.totalFuel  = this.fuelFirstStage+this.fuelSecondStage;
    }
}

export default async function fetchRocketsInfo() {
    let rockets = []
    let allRockets = await fetchRockets('https://api.spacexdata.com/v2/rockets')
    allRockets.forEach(input => {
        let rocket = new RocketData(input.id,
            input.name,
            input.first_stage.fuel_amount_tons,
            input.second_stage.fuel_amount_tons
        );
        rockets.push(rocket)
    })
    return rockets;
}