const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middleware/SortMiddleware');

const routes = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Http logger
app.use(morgan('combined'));

// Method override
app.use(methodOverride('_method'));

// Custom middleware
app.use(sortMiddleware);

// Teamplate engine setup
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');

// Static files
app.set('views', path.join(__dirname, 'resources', 'view'));

// Routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
