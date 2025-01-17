import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import connectToDatabase from './configDatabase.js';
import routes from './routes/index.js';

const app = express();

await connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve('src/public')));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

routes(app);

app.listen(3000, () => {
    console.log('App listening at http://localhost:3000');
});
