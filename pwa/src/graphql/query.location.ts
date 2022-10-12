import gql from 'graphql-tag'

export const LOCATIONS = gql`
  query areas {
    areas {
      id
      name
      surface {
        type
        coordinates
      }
    }
  }
`
