import { MessageCircle, Heart, Share2 } from 'lucide-react';

const CommunityPreview = ({ author, time, title, content, tags, likes, comments }) => {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center text-green-800 font-bold text-sm">
                    {author.charAt(0)}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-800">{author}</p>
                    <p className="text-xs text-gray-400">{time}</p>
                </div>
                <div className="ml-auto flex gap-1">
                    {tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <h3 className="text-gray-800 font-bold text-base mb-2 line-clamp-1 hover:text-green-700 cursor-pointer transition-colors">
                {title}
            </h3>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                {content}
            </p>

            <div className="flex items-center pt-3 border-t border-gray-50 text-gray-400 text-sm">
                <button className="flex items-center hover:text-red-500 transition mr-4 space-x-1 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span>{likes}</span>
                </button>
                <button className="flex items-center hover:text-blue-500 transition mr-4 space-x-1 cursor-pointer">
                    <MessageCircle className="h-4 w-4" />
                    <span>{comments}</span>
                </button>
                <button className="flex items-center hover:text-gray-600 transition ml-auto cursor-pointer">
                    <Share2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default CommunityPreview;
