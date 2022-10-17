import gql from 'graphql-tag'

export const ADD_LOCATION = gql`
  mutation createArea($createAreaInput: CreateAreaInput!) {
    createArea(createAreaInput: $createAreaInput) {
      id
      name
    }
  }
`
