import { Send, Image, Paperclip, Smile } from "lucide-react";

export default function NewPostInput() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 shrink-0 border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="font-bold text-gray-600">EU</span>
                </div>
                <div className="flex-1">
                    <textarea
                        placeholder="No que você está pensando? Compartilhe com o grupo..."
                        className="w-full bg-gray-50 border-none rounded-xl p-4 min-h-25 focus:ring-2 focus:ring-green-500/20 resize-none text-gray-700 placeholder-gray-400"
                    />
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                <Image size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                <Smile size={20} />
                            </button>
                        </div>
                        <button className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:shadow-green-300 flex items-center gap-2">
                            <span>Publicar</span>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
