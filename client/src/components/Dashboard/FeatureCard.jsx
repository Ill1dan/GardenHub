import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 border border-transparent hover:border-green-100 cursor-pointer relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="h-24 w-24 text-green-500 transform rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <Icon className="h-6 w-6 text-green-600" />
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center text-green-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    <span>Explore now</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
