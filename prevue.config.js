module.export = {
    options: {},
    plugins: [
        {
            name: 'vux-ui'
        },
        {//只在产品模式下使用
            name: 'duplicate-style',
            events: {
                done: function () {
                    console.log('done!')
                }
            }
        }
    ]
};