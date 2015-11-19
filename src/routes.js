/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Wrapper = require('./pages/wrapper'),
    Quoteslist = require('./pages/quoteslist');

module.exports = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Quoteslist} />
    </Route>
);
