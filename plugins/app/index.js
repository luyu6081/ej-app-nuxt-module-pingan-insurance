import fs from 'fs'
import path from 'path'
import gql from 'graphql-tag'

export default {
  src: path.join(__dirname, 'template.js'),
  fileName: 'ej-app/app.js',
  options: {
    gql: filename => JSON.stringify(gql(fs.readFileSync(path.resolve(__dirname, 'graphql', filename), 'utf-8'))),
  },
}
