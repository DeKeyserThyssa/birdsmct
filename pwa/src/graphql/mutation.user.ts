import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation createUser($uid: String!) {
        createUser(createUserInput: {uid: $uid}) {
            id
            uid
            observations {
                id
                name
                description
                createdAt
                updatedAt
            }
            observationsCount
            createdAt
            updatedAt
        }
    }

`
