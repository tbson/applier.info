export default () => {
    return new Promise(resolve => {
        require.ensure([], () => {
            window.jQuery = require('jquery');
            require('react-summernote/dist/react-summernote.css');
            require('bootstrap/dist/css/bootstrap.min.css');
            resolve({
                ReactSummernote: require('react-summernote')
            });
        });
    });
};
