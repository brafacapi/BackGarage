require('./helpers/database').connect();
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀Server ready at http://localhost:${port}`);
});