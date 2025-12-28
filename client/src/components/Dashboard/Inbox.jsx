import { useNavigate } from 'react-router-dom';
import { User, MessageSquare } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { API_BASE_URL } from '../../config';

const Inbox = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInbox = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };
                const res = await axios.get(`${API_BASE_URL}/api/chat/inbox`, config);
                // Take only top 5 recent conversations for dashboard view
                setConversations(res.data.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error("Error loading inbox:", error);
                setLoading(false);
            }
        };

        if (user) {
            fetchInbox();
        }
    }, [user]);

    const handleChatClick = (targetUser) => {
        navigate('/chat', { state: { userId: targetUser._id, user: targetUser } });
    };

    if (loading) return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex justify-center text-gray-400">Loading inbox...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                    Recent Messages
                </h3>
                <button
                    onClick={() => navigate('/chat')}
                    className="text-sm font-semibold text-green-600 hover:green-700 hover:underline"
                >
                    View All
                </button>
            </div>

            {conversations.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p>No messages yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {conversations.map((conv) => (
                        <div
                            key={conv.user._id}
                            onClick={() => handleChatClick(conv.user)}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                        {conv.user.profilePicture ? (
                                            <img src={conv.user.profilePicture} alt={conv.user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                    {conv.unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">{conv.user.name}</h4>
                                    <p className={`text-sm max-w-[200px] truncate ${conv.unreadCount > 0 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                                        {conv.unreadCount > 0 && <span className="text-green-600 mr-1">●</span>}
                                        {conv.lastMessage.content}
                                    </p>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400">
                                {new Date(conv.lastMessage.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
                                    ? new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : new Date(conv.lastMessage.createdAt).toLocaleDateString()
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inbox;
