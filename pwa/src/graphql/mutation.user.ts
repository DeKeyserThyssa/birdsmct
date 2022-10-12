import gql from "graphql-tag";

export const createUser = gql`
    mutation createUser($uid: String!) {
        createUser(createUserInput{uid: $uid}) {
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
    }

`
