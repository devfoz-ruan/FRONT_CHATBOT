import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";

interface FeedPostProps {
    name: string;
    role: string;
    avatar?: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
}

export default function FeedPost({ name, role, avatar, content, timestamp, likes, comments }: FeedPostProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-100 to-yellow-100 flex items-center justify-center border-2 border-white shadow-sm">
                        {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span className="text-lg font-bold text-green-700">{name.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{name}</h3>
                        <p className="text-xs text-gray-500">{role} • {timestamp}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                        <Heart size={20} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium">{likes}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                        <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium">{comments}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group ml-auto">
                    <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                        <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                    </div>
                </button>
            </div>
        </div>
    );
}
