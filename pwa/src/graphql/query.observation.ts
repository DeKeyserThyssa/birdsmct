import gql from 'graphql-tag'

export const OBSERVATIONS = gql`
  query observations {
    observations {
      id
      name
      bird {
        id
        name
      }
      area {
        id
        name
      }
      userId
      createdAt
    }
  }
`

export const OBSERVATION_INSERT_DATA = gql`
  query insertData {
    birds {
      id
      name
    }

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
