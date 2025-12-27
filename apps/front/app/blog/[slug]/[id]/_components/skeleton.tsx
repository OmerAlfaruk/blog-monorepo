import { Skeleton } from "@/components/ui/skeleton"

export function CommentSkeleton()  {
  return (
    <div className="p-2 shadow rounded flex flex-col gap-3">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
       <Skeleton className="h-4 w-50" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-62.5" />
        
      </div>
    </div>
    </div>
  )
}
