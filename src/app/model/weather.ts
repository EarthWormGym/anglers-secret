export interface weather {
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
            tempF: number,
            windMph: number,
            windKph: number,
        }
    }
}