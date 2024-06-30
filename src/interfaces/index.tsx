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

export interface PlantSuggestion {
    id: number;
    scientific_name: string;
    description: string;
    slug_scientific_name: string;
    genus: string;
    family_name: string;
    max_size: number;
    fertilizer: string;
    watering_frecuency: string;
    pruning: string;
    soil: string;
    insecticide: string;
    tips: string;
    sun_light: string;
    watering_care: string;
    common_name: string;
    lifespan: string;
    propagation: string;
    fruit: string;
    edible: string;
    growth_rate: string;
    maintenance: string;
    temperature_max: number;
    temperature_min: number;
    specie: string;
    toxic: string;
    repotting: string;
    dormancy: string;
    growth_season: string;
    atmospheric_humidity: number;
    planting_time: string;
    harvest_time: string;
    plant_type: string;
    width: number;
    url_image: string;
}

export interface Garden {
    id: number | null;
    name: string | null;
    plants: Plant[];
}

export interface Plant {
    id: number;
    alias: string;
    creation_date: string;
    modification_date: string;
    is_favorite: boolean;
    photos: Photo[];
}

export interface Photo {
    url: string;
}

export interface GardenRequestBody {
    user_id: number;
    name: string;
    is_active: boolean;
}

export interface Plant {
    id: number
    alias: string
    creation_date: string
    modification_date: string
    planting_date: string
    description: string
    favorite: boolean
    height: number
    sun_exposure: string
    notes: string
    name_garden: string
    expo: string
    id_garden: number
    plant_catalog_family_name: string
    plant_catalog_genus: string
    plant_catalog_watering_frecuency: string
    plant_catalog_description: string
    plant_catalog_common_name: string
    plant_catalog_scientific_name: string
    images: Image[]
    plant_catalog_sun_exposure: string
    history: History[]
}

export interface Image {
    url: string
}

export interface History {
    id_plant: number
    notes: string
    height: number
    alias: string
    url_image: string
    modified_at: string
    id_diseases: number
}

export interface PlantHealth {
    is_healthy: boolean
    candidates: Candidate[]
}

export interface Candidate {
    name: string
    scientific_name_disease: string
    type: string
    common_name: string
    kingdom_taxonomy: string
    entity_id: string
    class_taxonomy: string
    genus_taxonomy: string
    order_taxonomy: string
    family_taxonomy: string
    phylum_taxonomy: string
    wiki_urls: string
}

export interface PlantRequestBody {
    alias: string
    height: number
    planting_date: string
    id_garden: number
    is_favorite: boolean
    image_url: string
    id_plant_catalog: number
    notes: string
}

export interface Photo {
    id: string
    file_path: string
    is_public: boolean
}
