import { MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpertBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg shadow-emerald-200">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 bg-emerald-900 opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10 px-8 py-10 md:py-12 md:px-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div className="mb-6 md:mb-0 max-w-xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-50 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-emerald-400/30">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Premium Support
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Plants looking sad?
                    </h2>
                    <p className="text-emerald-50 text-lg md:text-xl font-light opacity-90">
                        Get instant advice from our certified horticultural experts. Video or chat, 24/7.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <button
                        onClick={() => navigate('/chat')}
                        className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-emerald-50 transition-all duration-300 flex items-center group cursor-pointer"
                    >
                        Chat with an Expert
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpertBanner;
