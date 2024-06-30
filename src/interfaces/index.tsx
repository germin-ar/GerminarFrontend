export interface PlantCaracts {
    id: string
    language: string
    candidates: Candidate[]
    image: Image
    health: Health
}

export interface Candidate {
    score: number
    specie: Specie
    plant_data: PlantData
}

export interface Specie {
    scientific_name: string
    genus_name: string
    family_name: string
    common_names: string[]
}

export interface PlantData {
    id: number
    description: string
    height: number
    fertilizer: string
    watering: string
    soil: string
    sun_exposure: string
    insecticide: string
    temperature_max: number
    temperature_min: number
    tips: string
    harvest_time: string
    growth_season: string
    planting_time: string
    pruning: string
}

export interface Image {
    uuid: string
    url: string
}

export interface Health {
    is_healty: boolean
}