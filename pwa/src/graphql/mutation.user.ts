import gql from "graphql-tag";

export const createUser = gql`
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
