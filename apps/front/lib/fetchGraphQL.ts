import { BACKEND_URL } from "./constants"
import { getSession } from "./session";

export const fetchGraphQl=async (query:string,variables={}, retries=5)=>{
    for(let i = 0; i < retries; i++) {
        try {
            const response=await fetch(`${BACKEND_URL}/graphql`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    query,
                    variables
                })
            })
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('GraphQL HTTP Error:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result=await response.json();
            
            if(result.errors){
                console.error("GraphQL errors:", result.errors)
                throw new Error("Failed to fetch the Data from GraphQL")
            }

            return result.data;
        } catch (error: any) {
            if (i === retries - 1) throw error;
            console.log(`Retry ${i + 1}/${retries} after error:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        }
    }
}


export const authFetchGraphQl=async (query:string,variables={}, retries=5)=>{
    const session=await getSession()
    for(let i = 0; i < retries; i++) {
        try {
            const response=await fetch(`${BACKEND_URL}/graphql`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${session?.accessToken}`, 
                },
                body:JSON.stringify({
                    query,
                    variables
                })
            })
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('GraphQL HTTP Error:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result=await response.json();
            
            if(result.errors){
                console.error("GraphQL errors:", result.errors)
                throw new Error("Failed to fetch the Data from GraphQL")
            }

            return result.data;
        } catch (error: any) {
            if (i === retries - 1) throw error;
            console.log(`Retry ${i + 1}/${retries} after error:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        }
    }
}