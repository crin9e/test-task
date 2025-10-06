# test-task
## The app shows cocktail recipes that it gets from the API
### core features
- uses RTQ for API calls and response caching
- creates dynamic routes based on the cocktail list
- uses liquid markup
- lazy-loads images
- uses Quality Gates with Husky: can't commit changes unless 
  * the code is linted,
  * strictly type-checked,
  * all the tests are successful
### stack info:
 - TypeScript, React
 - Redux Toolkit Query
 - Vite
 - eslint, prettier
 - SCSS
 - autoprefixer for vendor tags
 - Vitest, React-testing-library
