import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Send, User, MoreVertical, Phone, Video, Plus } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ChatPage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [availableExperts, setAvailableExperts] = useState([]);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial load: fetch inbox or specific user if passed in state
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };

                // 1. Fetch Experts/Inbox based on role/context
                // If user is regular user, maybe fetch experts list + inbox
                // If user is gardener, fetch inbox (users who messaged them)

                // For simplicity, let's just fetch "inbox" which works for both
                // AND if we are a user, we might want to also fetch "available experts" if inbox is empty or to start new

                let inboxRes = await axios.get(`${API_BASE_URL}/api/chat/inbox`, config);
                setConversations(inboxRes.data);

                // Check if we navigated here with a specific user to chat with
                const stateUserId = location.state?.userId;
                if (stateUserId) {
                    // Check if this user is already in conversations
                    const existingConv = inboxRes.data.find(c => c.user._id === stateUserId);
                    if (existingConv) {
                        setCurrentChatUser(existingConv.user);
                    } else {
                        // Fetch that specific user details to start a fresh chat
                        // We can't easily fetch just one user with current API, sticking to what we have or adding a small endpoint?
                        // Actually, let's just use what we have in state if passed, or fetch experts
                        if (location.state?.user) {
                            setCurrentChatUser(location.state.user);
                        }
                    }
                }

                if (inboxRes.data.length > 0) {
                    // Default to first conversation
                    setCurrentChatUser(inboxRes.data[0].user);
                }

                // Always fetch experts if user is a viewer, so they can start new chats
                if (['viewer', 'user'].includes(user.role)) {
                    const expertsRes = await axios.get(`${API_BASE_URL}/api/chat/experts`, config);
                    setAvailableExperts(expertsRes.data);

                    // If no conversations yet, show expert list as default "conversation starters"
                    if (inboxRes.data.length === 0) {
                        const expertConvos = expertsRes.data.map(expert => ({
                            user: expert,
                            lastMessage: { content: 'Start a conversation!', createdAt: new Date() },
                            unreadCount: 0
                        }));
                        setConversations(expertConvos);
                        if (expertConvos.length > 0) setCurrentChatUser(expertConvos[0].user);
                    }
                }

                setLoading(false);

            } catch (error) {
                console.error("Error loading chat:", error);
                setLoading(false);
            }
        };

        if (user) {
            fetchInitialData();
        }
    }, [user, location.state]);

    // Fetch messages when currentChatUser changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentChatUser) return;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };
                const res = await axios.get(`${API_BASE_URL}/api/chat/${currentChatUser._id}`, config);
                setMessages(res.data);
                scrollToBottom();
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();

        // precise polling for demo purposes (realtime would need socket.io)
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);

    }, [currentChatUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChatUser) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };

            const res = await axios.post(`${API_BASE_URL}/api/chat`, {
                receiverId: currentChatUser._id,
                content: newMessage
            }, config);

            setMessages([...messages, res.data]);
            setNewMessage('');
            scrollToBottom();

            // Update conversation list last message preview
            setConversations(prev => prev.map(conv =>
                conv.user._id === currentChatUser._id
                    ? { ...conv, lastMessage: res.data }
                    : conv
            ));

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans">
            <Navbar />

            <div className="flex-grow max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 py-6 flex gap-6 h-[calc(100vh-80px)]">

                {/* Sidebar / Conversation List */}
                <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                        {['viewer', 'user'].includes(user.role) && (
                            <button
                                onClick={() => setShowNewChatModal(true)}
                                className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                                title="New Chat"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="flex-grow overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">Loading...</div>
                        ) : conversations.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                <p>No messages yet.</p>
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <div
                                    key={conv.user._id}
                                    onClick={() => setCurrentChatUser(conv.user)}
                                    className={`p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 flex items-center gap-3 ${currentChatUser?._id === conv.user._id ? 'bg-green-50 border-green-100' : ''}`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                            {conv.user.profilePicture ? (
                                                <img src={conv.user.profilePicture} alt={conv.user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                        {/* Online indicator could go here */}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-semibold text-gray-800 truncate">{conv.user.name}</h3>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                                {conv.lastMessage?.createdAt && new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                                            {conv.unreadCount > 0 && <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>}
                                            {conv.lastMessage?.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="hidden md:flex flex-col w-2/3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {currentChatUser ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                        {currentChatUser.profilePicture ? (
                                            <img src={currentChatUser.profilePicture} alt={currentChatUser.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-500" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{currentChatUser.name}</h3>
                                        <p className="text-xs text-green-600 font-medium">Online</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-[#f0f2f5]">
                                {messages.map((msg, index) => {
                                    const isMe = msg.sender === user._id || msg.sender?._id === user._id;
                                    return (
                                        <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-[15px] leading-relaxed relative group ${isMe
                                                    ? 'bg-green-600 text-white rounded-tr-none'
                                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                                    }`}
                                            >
                                                <p>{msg.content}</p>
                                                <span className={`text-[10px] absolute bottom-1 ${isMe ? 'right-2 text-green-100' : 'right-2 text-gray-400'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-grow px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500/50 focus:bg-white transition-all outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className={`p-3 rounded-xl transition-all shadow-md flex-shrink-0 ${newMessage.trim()
                                            ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!newMessage.trim()}
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>

                        </>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Send className="w-10 h-10 text-green-600 ml-1" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Your Messages</h3>
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>

            {/* New Chat Modal */}
            {showNewChatModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-lg text-gray-800">Start New Conversation</h3>
                            <button onClick={() => setShowNewChatModal(false)} className="text-gray-400 hover:text-gray-600">
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Available Experts</h4>
                            <div className="space-y-2">
                                {availableExperts.map(expert => (
                                    <div
                                        key={expert._id}
                                        onClick={() => {
                                            // Check if already in conversation
                                            const existing = conversations.find(c => c.user._id === expert._id);
                                            if (!existing) {
                                                // Temporarily add to list
                                                setConversations(prev => [{
                                                    user: expert,
                                                    lastMessage: { content: 'Start a conversation!', createdAt: new Date() },
                                                    unreadCount: 0
                                                }, ...prev]);
                                            }
                                            setCurrentChatUser(expert);
                                            setShowNewChatModal(false);
                                        }}
                                        className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-green-100"
                                    >
                                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                            {expert.profilePicture ? (
                                                <img src={expert.profilePicture} alt={expert.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-6 h-6 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{expert.name}</h4>
                                            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Expert</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
