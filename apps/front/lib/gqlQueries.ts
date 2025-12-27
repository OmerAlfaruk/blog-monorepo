import gql from "graphql-tag"
export const GET_POSTS = gql`
query posts($skip:Float,$take:Float){
posts(skip:$skip,take:$take)
{
id
title
content
thumbnail
slug
createdAt
}
postCount

}`

export const GET_POSTS_BY_ID =gql`
query getpostById($id:Int!){
getpostById(id:$id){
id
title
content
thumbnail
slug
createdAt
author{id
    name}
}
}
`


export const CREATE_USER_MUTATION=gql`
mutation createUser($input:CreateUserInput!){
    createUser(createUserInput:$input){
        id
    
    }
}

`

export const SIGNIN_USER_MUTATION=gql`
mutation signInUser($input:SignInInput!){
    SignIn(SignInInput:$input){
        id
        name
        avatar
        accessToken
    
    }
}`

export const GET_COMMENTS=gql`
query getPostCommets($postId:Int!, $skip:Int, $take:Int){
    getPostCommets(postId:$postId, skip:$skip, take:$take){
        id
        content
        createdAt
        author{
            name
            avatar
        }
    }
    postCommentCount(postId:$postId)
}`


export const CREATE_COMMENT=gql`
mutation createComment($input:CreateCommentInput!){
    createComment(createCommentInput:$input){
        id
        content
    }
}`