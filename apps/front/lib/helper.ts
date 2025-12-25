import { DEFAULT_PAGE_SIZE } from "./constants"

export function  trasformTakeSkip({page,pageSize}:{
    page?:number,
    pageSize?:number
}){


    return {
        skip:(((page??1)-1) * (pageSize??DEFAULT_PAGE_SIZE)),
        take:pageSize??DEFAULT_PAGE_SIZE
    }
}

export function calculatePageNumber({
    pageNeighbors,totalPages,currentPage
}:{totalPages: number, pageNeighbors: number, currentPage: number}) {

    const totalNumber=pageNeighbors*2+3;
    const totalBlocks=totalNumber+2;
    
    if(totalPages<=totalBlocks){
        // Show all pages if total pages is small
        return Array.from({length:totalPages},(_,i)=>i+1);
    }
    
    // Show pages with ellipsis
    const startPage=Math.max(2,currentPage-pageNeighbors);
    const endPage=Math.min(totalPages-1,currentPage+pageNeighbors);

    let pages:(number|string)[]=Array.from({length:endPage-startPage+1},(_,i)=>startPage+i);
    
    // Add ellipsis and first page if needed
    if(startPage>2){
        pages=[1, '...', ...pages];
    } else {
        pages=[1, ...pages];
    }
    
    // Add ellipsis and last page if needed
    if(endPage<totalPages-1){
        pages=[...pages, '...', totalPages];
    } else if(endPage<totalPages) {
        pages=[...pages, totalPages];
    }
    
    return pages;
}