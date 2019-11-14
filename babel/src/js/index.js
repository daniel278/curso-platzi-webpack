import '../css/index.css';
import text from './test.js';
text();

if (module.hot) {
    module.hot.accept('./test.js', function () {
        text()
    })
};