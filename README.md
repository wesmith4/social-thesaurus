# social-thesaurus
Crowd-sourced thesaurus on a web page

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
