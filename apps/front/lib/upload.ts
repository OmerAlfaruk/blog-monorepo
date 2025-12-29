import{createClient} from '@supabase/supabase-js'
export async function uploadThumbnail(image:File){
    const supabaseUrl=process.env.SUPABASE_URL;
    const supabaseKey=process.env.SUPABASE_API_KEY;

    const supabase = createClient(supabaseUrl!, supabaseKey!);
    
    }
    