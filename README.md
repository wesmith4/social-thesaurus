# social-thesaurus
A crowd-sourced thesaurus, with definitions from an API call.

http://social-thesaurus.herokuapp.com

## Collaborators
- Will Smith ([GitHub](https://github.com/wesmith4))
- Lily Korir ([GitHub](https://github.com/liliankorir))

## File structure

### Top-Level Files
- app.js : manages different files in our filesystem to communicate with server
- routes.js : manages user page requests and renders content
- package.json : manages dependencies

### Folders
- bin : contains server file, which establishes server connection
- migrations: contains migrations, which set up the SQL database schemas
- node_modules : the dependencies included in this app (don't edit)
- views: contains the handlebars files that render our content
- models : contains files to establish classes for SQL tables
