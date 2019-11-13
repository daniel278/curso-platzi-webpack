//Path lo utilizo mas adelante, sirve para decirle a webpack donde buscar
const path = require('path');
//Plugin, crea un archivo css, se le indica la ubicacion del css y el use[{loader}]
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Plugin, crea un archivo html, se le indica atributos de Html
const HtmlWebpackPlugin = require('html-webpack-plugin');

//es donde esta el codigo principal
module.exports = {
    //Donde busca el archivo original, para despues por el output devolver
    entry: 
    {
        //__dirname le dice a path que busque en la carpeta donde esta este webpack.config
        //las comas sustituyen a los '/', es una buena practica
        home: path.resolve(__dirname, 'src', 'js', 'index.js'),
    },
    //solo hay 2 modos, development o production
    mode: 'development',
    output: 
    {
        //[name] coje el valor que le pasamos en entry, en este caso es home
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    //como agregamos loaders
    module: {
        rules: [
            {   
                //copie y pegue
                test: /\.css$/i,
                //Debemos hacer esto para declarar los loaders, en este caso tenemos el caso especial del plugin
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                //debido al loader css-loader
                'css-loader'
                ]
            }
        ]
    },
    //como agregamos plugins
    plugins: [
        //new = cree un archivo html
        new HtmlWebpackPlugin({
            //le pasamos atributos html
            title: 'Plugins'
        }),
        //new = cree un archivo css
        new MiniCssExtractPlugin({
            //donde va a quedar el nuevo archivo css, coje el css que tenga el archivo js
            filename: 'css/[name].css'
        })
    ]
}