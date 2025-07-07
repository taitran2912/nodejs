class NewsController {
    index(rep, res) {
        res.render('news');
    }

    show(rep, res) {
        res.send('News detail page');
    }
}

module.exports = new NewsController();
