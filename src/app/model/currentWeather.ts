export interface currentWeather {
    weatherId: number,
        data: {
        location: {
            name: string,
            region: string    
            country: string
        }
        currentWeather: {
            lastUpdated: string,
            tempC: number,
            windMph: number,
            precipMm: number,
            cloudCover: number,
            uv: number
        }
    }
}