import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Droplets, Scissors, Trash2, Sprout, Sun, CheckCircle, Clock, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const PlantCarePage = () => {
    const { user } = useContext(AuthContext);
    const [myPlants, setMyPlants] = useState([]);
    const [allPlants, setAllPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPlantToAdd, setSelectedPlantToAdd] = useState(null);
    const [schedule, setSchedule] = useState([]);

    // Fetch user's plants
    const fetchUserPlants = async () => {
        try {
            const token = localStorage.getItem('token');
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${API_BASE_URL}/api/user-plants`, configHeaders);
            setMyPlants(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user plants:', error);
            setLoading(false);
        }
    };

    // Calculate schedule based on plants
    useEffect(() => {
        if (myPlants.length > 0) {
            const newSchedule = [];

            myPlants.forEach(plant => {
                const activities = [
                    { type: 'water', interval: plant.custom_water_days || 7, last: plant.last_watered, icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { type: 'fertilize', interval: plant.custom_fertilize_days || 14, last: plant.last_fertilized, icon: Sprout, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { type: 'prune', interval: plant.custom_prune_days || 30, last: plant.last_pruned, icon: Scissors, color: 'text-rose-600', bg: 'bg-rose-100' }
                ];

                activities.forEach(act => {
                    const lastDate = new Date(act.last || plant.createdAt);
                    const nextDate = new Date(lastDate);
                    nextDate.setDate(lastDate.getDate() + act.interval);

                    const today = new Date();
                    const diffTime = nextDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    newSchedule.push({
                        ...act,
                        plantId: plant._id,
                        plantName: plant.plant_id.name,
                        plantImage: plant.plant_id.image,
                        dueDate: nextDate,
                        daysUntil: diffDays
                    });
                });
            });

            // Sort by due date (ascending)
            newSchedule.sort((a, b) => a.daysUntil - b.daysUntil);
            setSchedule(newSchedule);
        } else {
            setSchedule([]);
        }
    }, [myPlants]);


    // Fetch all available plants for the modal
    const fetchAllPlants = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/plants`);
            setAllPlants(response.data);
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserPlants();
            fetchAllPlants();
        }
    }, [user]);

    const handleAddPlant = async () => {
        if (!selectedPlantToAdd) return;

        try {
            const token = localStorage.getItem('token');
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const plantData = {
                plant_id: selectedPlantToAdd._id,
                custom_water_days: 7,
                custom_fertilize_days: 14,
                custom_prune_days: 30
            };

            await axios.post(`${API_BASE_URL}/api/user-plants`, plantData, configHeaders);
            fetchUserPlants();
            setShowAddModal(false);
            setSelectedPlantToAdd(null);
        } catch (error) {
            console.error('Error adding plant:', error);
            alert('Failed to add plant');
        }
    };

    const handleRemovePlant = async (id) => {
        if (!window.confirm('Are you sure you want to remove this plant?')) return;
        try {
            const token = localStorage.getItem('token');
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${API_BASE_URL}/api/user-plants/${id}`, configHeaders);
            setMyPlants(myPlants.filter(plant => plant._id !== id));
        } catch (error) {
            console.error('Error removing plant:', error);
            alert('Failed to remove plant');
        }
    };

    const handleLogActivity = async (plantId, activityType) => {
        try {
            const token = localStorage.getItem('token');
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.patch(`${API_BASE_URL}/api/user-plants/${plantId}/activity`, { activityType }, configHeaders);

            // Refresh plants to recalculate schedule
            fetchUserPlants();
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 tracking-tight">
                            My Garden
                        </h1>
                        <p className="mt-2 text-gray-600 text-lg">
                            Manage your personal plant collection and care schedules.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Plant
                    </button>
                </div>

                {/* Schedule Section */}
                {schedule.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <Calendar className="w-6 h-6 text-green-600 mr-2" />
                            <h2 className="text-2xl font-bold text-gray-900">Today's Care Schedule</h2>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {schedule.slice(0, 6).map((task, index) => (
                                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100/50 hover:bg-white hover:shadow-md transition-all">
                                        <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                                            <img src={task.plantImage} alt={task.plantName} className="w-full h-full object-cover rounded-xl" />
                                            <div className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-white ${task.color}`}>
                                                <task.icon className="w-3 h-3 fill-current" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate">{task.plantName}</h4>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span className={task.daysUntil <= 0 ? "text-red-500 font-medium" : "text-gray-500"}>
                                                    {task.daysUntil <= 0 ? 'Due Today' : `In ${task.daysUntil} days`}
                                                </span>
                                                <span className="mx-1">•</span>
                                                <span className="capitalize">{task.type}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleLogActivity(task.plantId, task.type)}
                                            className="ml-3 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all cursor-pointer"
                                            title="Mark as Done"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {schedule.length > 6 && (
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
                                    + {schedule.length - 6} more tasks upcoming
                                </div>
                            )}
                        </div>
                    </section>
                )}


                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : myPlants.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <Sprout className="mx-auto h-16 w-16 text-green-200 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900">Your garden is empty</h3>
                        <p className="mt-2 text-gray-500">Start adding plants to track their care.</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="mt-6 text-green-600 hover:text-green-700 font-medium hover:underline cursor-pointer"
                        >
                            Add your first plant
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myPlants.map((userPlant) => (
                            <div key={userPlant._id} className="group relative bg-white/80 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 z-0 pointer-events-none"></div>

                                {/* Image Section */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    {userPlant.plant_id.image ? (
                                        <img
                                            src={userPlant.plant_id.image}
                                            alt={userPlant.plant_id.name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-green-50 flex items-center justify-center">
                                            <Sprout className="w-16 h-16 text-green-200" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold">{userPlant.plant_id.name}</h3>
                                        <p className="text-sm text-green-200">{userPlant.plant_id.type}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemovePlant(userPlant._id)}
                                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="relative z-10 p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50">
                                            <div className="flex items-center text-blue-800 mb-1">
                                                <Droplets className="w-4 h-4 mr-2" />
                                                <span className="font-semibold">Water</span>
                                            </div>
                                            <p className="text-blue-600 text-xs">Every {userPlant.custom_water_days || '7'} days</p>
                                        </div>
                                        <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100/50">
                                            <div className="flex items-center text-amber-800 mb-1">
                                                <Sun className="w-4 h-4 mr-2" />
                                                <span className="font-semibold">Sunlight</span>
                                            </div>
                                            <p className="text-amber-600 text-xs">{userPlant.plant_id.sunlight}</p>
                                        </div>
                                        <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100/50">
                                            <div className="flex items-center text-purple-800 mb-1">
                                                <Sprout className="w-4 h-4 mr-2" />
                                                <span className="font-semibold">Fertilize</span>
                                            </div>
                                            <p className="text-purple-600 text-xs">Every {userPlant.custom_fertilize_days || '14'} days</p>
                                        </div>
                                        <div className="bg-rose-50/50 p-3 rounded-2xl border border-rose-100/50">
                                            <div className="flex items-center text-rose-800 mb-1">
                                                <Scissors className="w-4 h-4 mr-2" />
                                                <span className="font-semibold">Prune</span>
                                            </div>
                                            <p className="text-rose-600 text-xs">Every {userPlant.custom_prune_days || '30'} days</p>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-gray-100">
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Next Water: Today</span>
                                            <span
                                                onClick={() => handleLogActivity(userPlant._id, 'water')}
                                                className="text-green-600 font-medium cursor-pointer hover:underline"
                                            >
                                                Log Activity
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Add Plant Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-black/30 backdrop-blur-md" aria-hidden="true" onClick={() => setShowAddModal(false)}></div>

                        <div className="relative inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                            Add a New Plant
                                        </h3>
                                        <div className="mt-4">
                                            <p className="mb-4 text-sm text-gray-500">Select a plant to add to your collection:</p>

                                            {allPlants.length === 0 ? (
                                                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-xl">
                                                    <p>No plants available to add.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2 overflow-y-auto max-h-60">
                                                    {allPlants.map(plant => (
                                                        <div
                                                            key={plant._id}
                                                            onClick={() => setSelectedPlantToAdd(plant)}
                                                            className={`p-3 rounded-xl border cursor-pointer flex items-center transition-all ${selectedPlantToAdd?._id === plant._id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                                        >
                                                            <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-200 rounded-lg shrink-0">
                                                                {plant.image ? <img src={plant.image} alt={plant.name} className="object-cover w-full h-full" /> : <Sprout className="w-full h-full p-2 text-gray-400" />}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{plant.name}</p>
                                                                <p className="text-xs text-gray-500">{plant.type}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleAddPlant}
                                    disabled={!selectedPlantToAdd}
                                    className={`w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm ${!selectedPlantToAdd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    Add Plant
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="w-full inline-flex justify-center mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 shadow-sm rounded-xl px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default PlantCarePage;

