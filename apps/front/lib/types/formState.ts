export type CommentFormState={
    data: {
      content?: string;
      postId?:number
  
    };
    error: {
      content?: string[];
      postId?:string[]
    };
    message?:string,
 ok?:boolean,
 open?:boolean
  }|undefined


  export type SigUpFormState={

  data:{
  name?:string,
  email?:string,
  password?:string,
 
  };
 error:{
  name?:string[],
  email?:string[],
  password?:string[],


 }

 message:string

}|undefined;

export type SigInFormState={

  data:{
  email?:string,
  password?:string,
 
  };
 error:{
 
  email?:string[],
  password?:string[],


 }

 message:string

}|undefined;
  


export type PostFormState={
  data?:{
    title?:string;
    content?:string;
    thumbnail?:File|null;
    tags?:string;
    isPublished?:string;
  },
  error?:{
    title?:string[];
    content?:string[];
    thumbnail?:string[];
    tags?:string[];
    isPublished?:string[];
  },
  message?:string,
  ok?:boolean,
 
  


}  |undefined