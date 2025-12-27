import { calculatePageNumber } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    currentPage: number;
    totalPages: number;
    pageNeighbors?: number;
    setCurrentPage: (page: number) => void;
    className?: string;
};

export default function CommentPagination({
    currentPage,
    totalPages,
    pageNeighbors = 2,
    setCurrentPage,
    className
}: Props) {
    const pageNumbers = calculatePageNumber({ pageNeighbors, totalPages, currentPage });
    const handleClick = (page: number|string) => {
        if(typeof page === 'number' && page > 0 && page <= totalPages){
            setCurrentPage(page);
        }
    }
 if (totalPages <= 1) {
        return null;
    }
    return (
        
        <div className={cn("flex items-center justify-center gap-1 mt-6", className)}>
            {currentPage > 1 && (
                <button
                    onClick={() => handleClick(currentPage - 1)}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
            )}
           
            
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={index} className="flex items-center justify-center w-10 h-10 text-gray-400 cursor-not-allowed">
                            ...
                        </span>
                    );
                }
                return (
                    <button
                        key={index}
                        onClick={() => handleClick(page as number)}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-lg border transition-colors",
                            currentPage === page
                                ? "bg-sky-500 text-white border-sky-500 shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600"
                        )}
                    >
                        {page}
                    </button>
                );
            })}
            
            {currentPage < totalPages && (
                <button 
                    onClick={() => handleClick(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}