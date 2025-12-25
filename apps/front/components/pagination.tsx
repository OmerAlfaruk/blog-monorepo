import { calculatePageNumber } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
    currentPage: number,
    totalPage: number,
    pagesNeighbors: number,

}
const Pagination = ({ currentPage, totalPage, pagesNeighbors }: Props) => {
    const pageNumbers = calculatePageNumber({ pageNeighbors: pagesNeighbors, currentPage: currentPage, totalPages: totalPage });
    
    return (
        <div className="flex justify-center mt-12 mb-8">
            <nav aria-label="Page navigation" className="flex items-center">
                {currentPage > 1 && (
                    <Link href={`/?page=${currentPage - 1}`} className="flex items-center justify-center w-10 h-10 mr-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                )}

                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={index} className="flex items-center justify-center w-10 h-10 mx-1 text-gray-400 bg-white cursor-not-allowed">
                                ...
                            </span>
                        );
                    }
                    return (
                        <Link
                            key={index}
                            href={`/?page=${page}`}
                            className={`flex items-center justify-center w-10 h-10 mx-1 rounded-lg border transition-colors ${
                                currentPage === page 
                                    ? "bg-sky-500 text-white border-sky-500 shadow-md" 
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600"
                            }`}
                        >
                            {page}
                        </Link>
                    );
                })}

                {currentPage < totalPage && (
                    <Link href={`/?page=${currentPage + 1}`} className="flex items-center justify-center w-10 h-10 ml-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </nav>
        </div>
    );
};
export default Pagination;
