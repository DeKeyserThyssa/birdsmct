import gql from "graphql-tag";

export const GET_USER_BY_UID = gql`
    query getUserByUid($uid: String!) {
        user(uid: $uid) {
            id
            uid
            observations {
                id
                title
                description
                createdAt
                updatedAt
            }
            observationsCount
            createdAt
            updatedAt
        } 
    }`