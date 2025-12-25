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