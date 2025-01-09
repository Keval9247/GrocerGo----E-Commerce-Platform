import React from 'react';
import { Loader, Loader2Icon, LucideLoader2, LucideLoaderCircle, LucideLoaderPinwheel, RefreshCcw } from 'lucide-react';

const Loading = () => {
    return (
        // <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
        <div class="fixed bg-gray-400 inset-0 bg-opacity-60 z-50 h-full w-full flex items-center justify-center">
            <div class="flex items-center gap-3">
                <svg class="animate-spin h-8 w-8 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <span class="text-xl mr-4 text-white font-semibold">Loading, please wait...</span>
            </div>
        </div>
    );
};

export default Loading;
