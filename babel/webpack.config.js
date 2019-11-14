//Path lo utilizo mas adelante, sirve para decirle a webpack donde buscar
const path = require('path');
//Plugin, crea un archivo css, se le indica la ubicacion del css y el use[{loader}]
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Plugin, crea un archivo html, se le indica atributos de Html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Para ejecutar el plugin de HotModuleReplacement
const webpack = require('webpack');

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
    //asi se 'activa' el plugin HotModuleReplacement
    //devServer: {
        //hot: true, //configuracion
        //open: true  //abre una nueva pestaña cuando corremos el comando
    //},
    //como agregamos loaders
    module: {
        rules: [
            {
                //Babel es un compilador de codigo de javascript, se podria decir que 
                //coje codigo de javascript moderno y lo compila en javascript viejo
                //es importante el atributo exclude para que no compile los modulos de node
                //seria una verdadera molestia si los compilara
                test: /\.js$/i,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {   
                //copie y pegue
                test: /\.css$/i, //identifica el tipo de archivo que deben ser transformados, con use identifica
                //                 los louders que se van a utilizar
                //Debemos hacer esto para declarar los loaders, en este caso tenemos el caso especial del plugin
                use: [//{
                    //loader: MiniCssExtractPlugin.loader
                //},
                'style-loader',
                //debido al loader css-loader
                'css-loader'
                ]
            }
        ]
    },
    //como agregamos plugins
    //¿Caracteristicas de un plugin? : Permite cargar un directorio completo
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        //new = cree un archivo html
        new HtmlWebpackPlugin({
            //le pasamos atributos html
            title: 'webpack'
        })
        //new = cree un archivo css
        //new MiniCssExtractPlugin({ //Lo quito porque para HotModuleReplacement es mejor, es mas rapido
                                        //inyectar el css que crear un nuevo archivo css
            //donde va a quedar el nuevo archivo css, coje el css que tenga el archivo js
          //  filename: 'css/[name].css'
        //})
    ]
}