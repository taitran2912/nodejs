const handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'fa-solid fa-sort',
            desc: 'fa-solid fa-arrow-down-z-a',
            asc: 'fa-solid fa-arrow-up-a-z',
        };

        const types = {
            default: 'desc',
            desc: 'asc',
            asc: 'desc',
        };

        const icon = icons[sortType] || icons.default;
        const type = types[sortType] || types.default;

        const href = handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${href}" class="sort-btn">
                        <i class="${icon}"></i>
                        </a>`;
        return new handlebars.SafeString(output);
    },
};
