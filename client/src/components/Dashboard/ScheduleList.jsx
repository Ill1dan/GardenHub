import { Calendar, MapPin, Clock } from 'lucide-react';

const ScheduleList = () => {
    const schedules = [
        {
            id: 1,
            time: '09:00 AM',
            client: 'Mrs. Robertson',
            task: 'Rose Pruning & Maintenance',
            address: '12 Oak Lane',
            status: 'Completed',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: 2,
            time: '11:30 AM',
            client: 'Greenwood Estate',
            task: 'Lawn Mowing & Edging',
            address: '45 Park Avenue',
            status: 'Upcoming',
            statusColor: 'bg-blue-100 text-blue-700'
        },
        {
            id: 3,
            time: '02:00 PM',
            client: 'City Library Garden',
            task: 'Seasonal Planting',
            address: 'Main St. Library',
            status: 'Pending',
            statusColor: 'bg-yellow-100 text-yellow-700'
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-600" />
                    Today's Schedule
                </h3>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">View Calendar</button>
            </div>

            <div className="divide-y divide-gray-50">
                {schedules.map((item) => (
                    <div key={item.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">{item.task}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.statusColor}`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {item.time} &bull; {item.client}
                        </div>

                        <div className="flex items-center text-xs text-gray-400">
                            <MapPin className="h-3 w-3 mr-2" />
                            {item.address}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleList;
