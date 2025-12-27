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
  