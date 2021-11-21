const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rulesForStyles = {
    test: /\.css$/,
    use: ['style-loader','css-loader'] //el archivo pasa por 2 loaders, stuyle-loader: interpreta los estilos css, lueto el css-loader: entiende los input de archivos dentro de css
}

const ruleForJavaScript = {
        test:/\.js$/,    //aca le decimos que archivos son los que no etniende webpack
        loader: 'babel-loader',  //todos estos archivos deben pasar por un LOADER este caso es BABEL
        options: {//aca elegimos qeu configuracion le pasamos de en babel loader
            presets: [

                //para pasarle preset hay que en un array pasarle 
                //En primer lugar 1° el preset que queremos cargar
                //En segunod lugar las opciones que queremos cargar (runtime)
                [
                    '@babel/preset-react', //en babel le decimos que configuracion de babel queremos usar
                    //Opciones para cargar
                    { 
                        //para quitar la linea "import React from 'react" de todos los archivos
                        // Con RUNTIME,, Cuando BABEL detecta que necesita REACT lo va importar directamente sin necesidad de la linea
                        runtime: 'automatic' // por defecto es 'classic'
                    }
                ]
        
            ]  
        }
};

//ponemos una regla indicando que archivos no esta entendiendo WEBPACK
const rules = [ruleForJavaScript, rulesForStyles];


module.exports= (env, argv) => {
    const {mode} = argv // aca toma el mode del build del script del package.json
    const isProduction = mode=='production' // aca define si es o no de PRODUCCION cuando el mode es "produccion"
    return {
        // entry: './src/index.js',

        // OUTPUT: Configuro WEBPACK para que tolo lo exporte a la carpeta "build".
        // Si no hago esto, por defecto envia todo a la carpeta "dist"
        // Luego puedo borrar la carpeta dis que no la voy a usar.
        output: {
            // suichea entre DESARROLLO o PRODUCCION
            filename: isProduction //
            ? '[name].[contenthash].js'  // si es produccion el magic-string, el hash se agrega al nombre del archivo
            : 'main.js', // si no es de produccion uso esto!

            path: path.resolve(__dirname, 'build') 
        },
    
        //Aca generamos el HTML automaticamente
        plugins: [
            new HtmlWebpackPlugin({template:'src/index.html'})
        ],

        //Aca agregamos todos los LOADER que necesitamos (BABEL y CSS)
        module: {rules},

        //Aca agregamos configuracion al webpack dev server
        devServer:{
            open: true, //abre automaticamente el navegador
            port: 3000, // podemos definir el puerto que querramos
            // overlay: true, //nos comente que error hay al momento de compilar
            compress: true
        },

        //Aca agregamos para tener un mejor rastreo de los ERRORES
        devtool: 'source-map'
    } 
}




// PRIMER EJEMPLO (TODO JUNTO)   ********************************************

/*

module.exports= { 
    // entry: './src/index.js',

    // Configuro WEBPACK para que tolo lo exporte a la carpeta "build".
    // Si no hago esto, por defecto envia todo a la carpeta "dist"
    // Luego puedo borrar la carpeta dis que no la voy a usar.
    output: {
        path: path.resolve(__dirname, 'build')
    },

    //Incorporamos BABEL para que WEBPACK pueda interpretar codigo

    module: {
        rules:[  //ponemos una regla indicando que archivos no esta entendiendo WEBPACK
            {
                test:/\.js$/,    //aca le decimos que archivos son los que no etniende webpack
                loader: 'babel-loader',  //todos estos archivos deben pasar por un LOADER este caso es BABEL
                options: {//aca elegimos qeu configuracion le pasamos de en babel loader
                    presets: [

                        //para pasarle preset hay que en un array pasarle 
                        //En primer lugar 1° el preset que queremos cargar
                        //En segunod lugar las opciones que queremos cargar (runtime)
                        [
                            '@babel/preset-react', //en babel le decimos que configuracion de babel queremos usar
                            //Opciones para cargar
                            { 
                                //para quitar la linea "import React from 'react" de todos los archivos
                                // Con RUNTIME,, Cuando BABEL detecta que necesita REACT lo va importar directamente sin necesidad de la linea
                                runtime: 'automatic' // por defecto es 'classic'
                            }
                        ]
                
                    ]  
                }
            }
        ]
    }
}

*/