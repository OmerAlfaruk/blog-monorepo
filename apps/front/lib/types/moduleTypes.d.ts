

export type User ={
  id       :number;
  email    : String;  
  name      :String;
  bio       :String|null;
  password  :String;
  avatar ?   :String;
 
  
  createdAt :Date
  updatedAt :DateTime 
}


export type Post={ 
  id      :  number    ;  
  title    : string;
  slug      :string ;
  content   :string;
  thumbnail :string;
  published :boolean;
  tags      :Tag[]  ;  
  likes     :like[];

  author:User;
 

  createdAt :Date;
  updatedAt :Date;

  _count: {
    comments: number;
    likes: number;
  };
}

export type CommentEntity= {
  id       : Int     
  content   :String
  postId    :Int
  post      :Post    
  authorId  :Int
  author    :User     
  createdAt :Date;
  updatedAt :Date;}


  export type CommentFormState={
    data: {
      content?: string;
  
    };
    error: {
      content?: string[];
    };
    message: string;
  }|undefined

export type Tag ={
  id  :  Int ;   
  name  :String ;

}

export type like ={
  id    :  Int ; 
  userId : Int;
  postId  :Int;
  user    :User ; 
  post    :Post;  

}


