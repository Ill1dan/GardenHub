import { Sun, CloudRain, Droplets } from 'lucide-react';

const WeatherCard = () => {
    return (
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-blue-50 font-semibold text-sm uppercase tracking-wider">Today's Forecast</h3>
                    <p className="text-3xl font-bold mt-1">24°C</p>
                </div>
                <Sun className="h-10 w-10 text-yellow-300 animate-pulse" />
            </div>

            <div className="space-y-2">
                <div className="flex items-center text-sm text-blue-100">
                    <Sun className="h-4 w-4 mr-2" />
                    <span>Sunny Intervals</span>
                </div>
                <div className="flex items-center text-sm text-blue-100">
                    <Droplets className="h-4 w-4 mr-2" />
                    <span>Humidity: 45%</span>
                </div>
                <div className="flex items-center text-sm text-blue-100">
                    <CloudRain className="h-4 w-4 mr-2" />
                    <span>Chance of Rain: 10%</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm font-medium text-white">
                    🌱 Great day for pruning!
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;
