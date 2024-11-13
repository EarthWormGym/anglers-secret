export interface HistoricalWeather {
    weatherId: number,
        data: {
        location: {
            name: string,
            region: string    
            country: string
        }
        historicalWeather: {
            date: string,
            tempC: number,
            totalPrecipMm: number,
            uv: number
            morning: {
                cloudCover: number,
                precipMm: number,
                windMph: number,
                humidity: number
            },
            midday: {
                cloudCover: number,
                precipMm: number,
                windMph: number,
                humidity: number
            },
            evening: {
                cloudCover: number,
                precipMm: number,
                windMph: number,
                humidity: number
            }
        }
    }
}