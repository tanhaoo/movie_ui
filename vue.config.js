const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
    // webpack build externals
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
    },
    css: [],
    // https://unpkg.com/browse/vue@2.6.10/
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
    ]
}

// vue.config.js
const vueConfig = {
    configureWebpack: {
        // webpack plugins
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        // if prod, add externals
        externals: isProd ? assetsCDN.externals : {}
    },

    chainWebpack: config => {
        config.resolve.alias.set('@$', resolve('src'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })

        // if prod is on
        // assets require on cdn
        if (isProd) {
            config.plugin('html').tap(args => {
                args[0].cdn = assetsCDN
                return args
            })
        }
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars:
                // getThemeVariables({
                //     dark: true, // 开启暗黑模式
                //     compact: false, // 开启紧凑模式
                // }),
                    {
                        // less vars，customize ant design theme

                        // 'primary-color': '#F5222D',
                        // 'link-color': '#F5222D',
                        // 'border-radius-base': '2px'
                        'primary-color': '#1885d0', // 全局主色
                        'link-color': '#1890ff', // 链接色
                        'success-color': '#52c41a', // 成功色
                        'warning-color': '#faad14', // 警告色
                        'error-color': '#f5222d', // 错误色
                        'font-size-base': '14px', // 主字号
                        // 'heading-color': rgba(0, 0, 0, 0.85), // 标题色
                        // 'text-color': rgba(0, 0, 0, 0.65),// 主文本色
                        // 'text-color-secondary': rgba(0, 0, 0, 0.45), // 次文本色
                        // 'disabled-color': rgba(0, 0, 0, 0.25), // 失效色
                        'border-radius-base': '2px', // 组件/浮层圆角
                        'border-color-base': '#d9d9d9', // 边框色
                        'autoHideHeader': true,
                        'fixedHeader': true
                    },
// DO NOT REMOVE THIS LINE
                javascriptEnabled: true
            },
        }
    },

    devServer: {
        // development server port 8000
        port: 8000,
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
            '/api':
                {
                    target: 'http://127.0.0.1:3000',
                    changeOrigin:
                        true,
                    pathRewrite:
                        {
                            '^/api':
                                ''
                        }
                }
        }
    }
    ,

// disable source map in production
    productionSourceMap: false,
    lintOnSave: false,
    // babel-loader no-ignore node_modules/*
    transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
    console.log('VUE_APP_PREVIEW', true)
    // add `ThemeColorReplacer` plugin to webpack plugins
    vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
