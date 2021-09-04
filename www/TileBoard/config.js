/*
 This is an example configuration file.

 COPY OR RENAME THIS FILE TO config.js.

 Make sure you use real IDs from your HA entities.
*/

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}


var CONFIG = {
    customTheme: CUSTOM_THEMES[getQueryVariable('theme')], // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
    transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
    entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
    tileSize: 130,
    tileMargin: 6,
    serverUrl: location.protocol + '//' + location.host,
    wsUrl: (location.protocol === 'http:' ? 'ws' : 'wss') + '://' + location.host + '/api/websocket',
    authToken: null, // optional long-lived token (CAUTION: only if TileBoard is not exposed to the internet)
    //googleApiKey: "XXXXXXXXXX", // Required if you are using Google Maps for device tracker
    //mapboxToken: "XXXXXXXXXX", // Required if you are using Mapbox for device tracker
    debug: false, // Prints entities and state change info to the console.
    pingConnection: true, //ping connection to prevent silent disconnections
    locale: 'zh-cn', // locale for date and number formats - available locales: it, de, es, fr, pt, ru, nl, pl, en-gb, en-us (default). See readme on adding custom locales.
    // next fields are optional
    events: [
        {
            command: 'play_sound',
            action: function (e) {
                window.playSound(e.url);
            }
        },
        {
            command: 'refresh_page',
            action: function (e) {
                location.reload()
            }
        },
        {
            command: 'screen_saver',
            action: function (e) {
                window.showScreensaver()
            }
        },
    ],
    timeFormat: 24,
    menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
    hideScrollbar: false, // horizontal scrollbar
    groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // HORIZONTALLY, VERTICALLY, GRID
    onReady: function () { },

    header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
        styles: {
            margin: '10px 130px 0',
            fontSize: '28px'
        },
        right: [

            {
                type: HEADER_ITEMS.WEATHER,
                styles: {
                    margin: '30px 0 0 0'
                },
                icon: '&weather.wo_de_jia.state',
                icons: {
                    'clear-day': 'clear',
                    'clear-night': 'nt-clear',
                    'cloudy': 'cloudy',
                    'exceptional': 'unknown',
                    'fog': 'fog',
                    'hail': 'sleet',
                    'lightning': 'chancestorms',
                    'lightning-rainy': 'tstorms',
                    'partly-cloudy-day': 'partlycloudy',
                    'partlycloudy': 'partlycloudy',
                    'partly-cloudy-night': 'nt-partlycloudy',
                    'pouring': 'rain',
                    'snowy': 'snow',
                    'snowy-rainy': 'sleet',
                    'rainy': 'sleet',
                    'wind': 'unknown',
                    'windy': 'unknown',
                    'windy-variant': 'unknown'
                },
                states: {
                    "clear-night": "夜间晴朗",
                    "cloudy": "阴",
                    "exceptional": "特殊",
                    "fog": "雾",
                    "hail": "冰雹",
                    "lightning": "雷电",
                    "lightning-rainy": "雷阵雨",
                    "partlycloudy": "多云",
                    "pouring": "暴雨",
                    "rainy": "雨",
                    "snowy": "雪",
                    "snowy-rainy": "雨夹雪",
                    "sunny": "晴",
                    "windy": "有风",
                    "windy-variant": "有风"
                },
                fields: {
                    temperature: '&weather.wo_de_jia.attributes.temperature',
                    temperatureUnit: '°C',
                }
            }
        ],
        left: [
            {
                type: HEADER_ITEMS.DATETIME,
                dateFormat: 'EEEE, dd LLLL', //https://docs.angularjs.org/api/ng/filter/date
            },
            // {
            //    type: HEADER_ITEMS.DATE,
            //    dateFormat: 'EEEE, LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
            // },
            // {
            //    type: HEADER_ITEMS.TIME,
            // },
        ]
    },

    screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
        timeout: 300, // after 5 mins of inactive
        slidesTimeout: 10, // 10s for one slide
        styles: { fontSize: '40px' },
        leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
        slides: [
            {
                bg: '/local/image/homebg.jpeg',
                rightTop: [ // put text to the 2nd slide
                    {
                        type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                        html: '欢迎来到 <b>我的智慧家庭</b>',
                        styles: { fontSize: '40px' }
                    }
                ]
            },
            { bg: '/local/TileBoard/images/bg1.jpeg' },
            { bg: '/local/TileBoard/images/bg2.png' },
            { bg: '/local/TileBoard/images/bg3.jpg' },
            {
                bg: '/local/TileBoard/images/bg5.jpg'
            }
        ]
    },

    pages: [
        {
            title: 'Main page',
            bg: 'images/bg1.jpeg',
            icon: 'mdi-home-outline', // home icon
            groups: [
                {
                    title: '生活信息 - 媒体中心',
                    width: 3,
                    height: 3,
                    items: [
                        {
                            // please read README.md for more information
                            // this is just an example
                            position: [0, 0],
                            height: 2, // 1 for compact
                            //classes: ['-compact'],
                            type: TYPES.WEATHER,
                            id: 'weather.wo_de_jia',
                            // state: function () {return 'Clear, night'},
                            icon: '&weather.wo_de_jia.state',
                            title: '上海',
                            icons: {
                                'clear-day': 'clear',
                                'clear-night': 'nt-clear',
                                'cloudy': 'cloudy',
                                'exceptional': 'unknown',
                                'fog': 'fog',
                                'hail': 'sleet',
                                'lightning': 'chancestorms',
                                'lightning-rainy': 'tstorms',
                                'partly-cloudy-day': 'partlycloudy',
                                'partlycloudy': 'partlycloudy',
                                'partly-cloudy-night': 'nt-partlycloudy',
                                'pouring': 'rain',
                                'snowy': 'snow',
                                'snowy-rainy': 'sleet',
                                'rainy': 'sleet',
                                'wind': 'unknown',
                                'windy': 'unknown',
                                'windy-variant': 'unknown'
                            },
                            states: {
                                "clear-night": "夜间晴朗",
                                "cloudy": "阴",
                                "exceptional": "特殊",
                                "fog": "雾",
                                "hail": "冰雹",
                                "lightning": "雷电",
                                "lightning-rainy": "雷阵雨",
                                "partlycloudy": "多云",
                                "pouring": "暴雨",
                                "rainy": "雨",
                                "snowy": "雪",
                                "snowy-rainy": "雨夹雪",
                                "sunny": "晴",
                                "windy": "有风",
                                "windy-variant": "有风"
                            },
                            fields: {
                                temperature: '&weather.wo_de_jia.attributes.temperature',
                                temperatureUnit: '°C',
                                humidity: '&weather.wo_de_jia.attributes.humidity',
                                humidityUnit: '%',
                            }
                        },
                        {
                            position: [1, 0],
                            width: 2,
                            type: TYPES.TEXT_LIST,
                            id: {}, // using empty object for an unknown id
                            state: false, // disable state element
                            list: [
                                {
                                    title: 'Sun.sun state',
                                    icon: 'mdi-weather-sunny',
                                    value: '&sun.sun.state'
                                },
                                {
                                    title: 'Custom',
                                    icon: 'mdi-clock-outline',
                                    value: 'value'
                                }
                            ]
                        },
                        {
                            position: [1, 1],
                            width: 2,
                            type: TYPES.TEXT_LIST,
                            id: {}, // using empty object for an unknown id
                            state: false, // disable state element
                            list: [
                                {
                                    title: 'Sun.sun state',
                                    icon: 'mdi-weather-sunny',
                                    value: '&sun.sun.state'
                                },
                                {
                                    title: 'Custom',
                                    icon: 'mdi-clock-outline',
                                    value: 'value'
                                }
                            ]
                        },
                        {
                            position: [0, 2],
                            width: 3,
                            id: 'media_player.yun_yin_le',
                            type: TYPES.MEDIA_PLAYER,
                            hideSource: false,
                            hideMuteButton: true,
                            state: false,
                            //state: '@attributes.media_title',
                            title: '@attributes.media_title',
                            // bgSuffix: '@attributes.entity_picture',
                        },
                    ]
                },

                {
                    title: '客厅',
                    width: 1,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            type: TYPES.SWITCH,
                            id: 'input_boolean.ce_shi',
                            states: {
                                on: "开",
                                off: "关"
                            },
                            icons: {
                                on: "mdi-lightbulb-on",
                                off: "mdi-lightbulb",
                            }
                        },
                    ]

                },

                {
                    title: '设置',
                    width: 4,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            type: TYPES.CUSTOM,
                            title: '屏幕保护',
                            id: {},
                            icon: 'mdi-monitor',
                            state: '',
                            action: function (item, entity) {
                                window.showScreensaver()
                            }
                        },
                        {
                            position: [0, 1],
                            type: TYPES.CUSTOM,
                            title: '刷新页面',
                            id: {},
                            icon: 'mdi-refresh',
                            state: '',
                            action: function (item, entity) {
                                window.Noty.addObject({ title: 'HomeAssistant', message: '重新加载页面', lifetime: 3, type: 'success' })
                                location.reload()
                            }
                        },

                        {
                            position: [0, 2],
                            type: TYPES.CUSTOM,
                            title: '默认主题',
                            state: 'COMPACT',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                location.search = '?theme=COMPACT'
                            }
                        },
                        // 第一行
                        {
                            position: [1, 0],
                            type: TYPES.CUSTOM,
                            title: '透明主题',
                            state: 'TRANSPARENT',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                location.search = '?theme=TRANSPARENT'
                            }
                        },
                        // 第二行
                        {
                            position: [1, 1],
                            type: TYPES.CUSTOM,
                            title: 'WIN95主题',
                            state: 'WIN95',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                location.search = '?theme=WIN95'
                            }
                        },
                        // 第三行
                        {
                            position: [1, 2],
                            type: TYPES.CUSTOM,
                            title: '苹果主题',
                            state: 'HOMEKIT',
                            id: {},
                            icon: 'mdi-palette-outline',
                            action: function (item, entity) {
                                location.search = '?theme=HOMEKIT'
                            }
                        },
                        {
                            position: [2, 0],
                            type: TYPES.CUSTOM,
                            title: '全屏显示',
                            id: {},
                            icon: 'mdi-fullscreen',
                            state: '',
                            action: function (item, entity) {
                                document.documentElement.requestFullscreen()
                            }
                        },
                        {
                            position: [2, 1],
                            type: TYPES.CUSTOM,
                            title: '退出全屏',
                            id: {},
                            icon: 'mdi-fullscreen-exit',
                            state: '',
                            action: function (item, entity) {
                                document.exitFullscreen()
                            }
                        },
                    ]
                },

            ]
        },
        {
            title: 'Second page',
            bg: 'images/bg2.png',
            icon: 'mdi-numeric-2-box-outline',
            groups: [
                {
                    title: '',
                    width: 4,
                    height: 3,
                    items: [
                        {
                            position: [0, 0],
                            width: 2,
                            title: 'Short instruction',
                            type: TYPES.TEXT_LIST,
                            id: {}, // using empty object for an unknown id
                            state: false, // disable state element
                            list: [
                                {
                                    title: 'Read',
                                    icon: 'mdi-numeric-1-box-outline',
                                    value: 'README.md'
                                },
                                {
                                    title: 'Ask on forum',
                                    icon: 'mdi-numeric-2-box-outline',
                                    value: 'home-assistant.io'
                                },
                                {
                                    title: 'Open an issue',
                                    icon: 'mdi-numeric-3-box-outline',
                                    value: 'github.com'
                                },
                            ]
                        },
                        {
                            position: [2, 0],
                            width: 2,
                            title: 'System Status',
                            type: TYPES.TEXT_LIST,
                            id: {}, // using empty object for an unknown id
                            state: false, // disable state element
                            list: [
                                {
                                    title: 'Free Memory',
                                    icon: 'mdi-memory',
                                    value: function () {
                                        // var freeMemory = this.parseFieldValue('&sensor.memory_free.state')
                                        var freeMemory = 15.444  // Just an example.
                                        return this.$scope.filterNumber(freeMemory, 1) + ' GB';
                                    }
                                },
                            ]
                        },

                        {
                            position: [0, 1.5],
                            width: 1.5,
                            height: 1.5,
                            title: 'My Gauge Title',
                            subtitle: '',
                            type: TYPES.GAUGE,
                            // id: 'sensor.my_sample_sensor', // Assign the sensor you want to display on the gauge
                            id: { state: 11111 }, // Remove after choosing to actual sensor ID
                            value: function (item, entity) {
                                return entity.state;
                            },
                            settings: {
                                size: 200, // Defaults to 50% of either height or width, whichever is smaller
                                type: 'full', // Options are: 'full', 'semi', and 'arch'. Defaults to 'full'
                                min: 0, // Defaults to 0
                                max: 25000, // Defaults to 100
                                cap: 'round', // Options are: 'round', 'butt'. Defaults to 'butt'
                                thick: 8, // Defaults to 6
                                label: 'My Gauge', // Defaults to undefined
                                append: '@attributes.unit_of_measurement', // Defaults to undefined
                                prepend: '$', // Defaults to undefined
                                duration: 1500, // Defaults to 1500ms
                                thresholds: { 0: { color: 'green' }, 80: { color: 'red' } }, // Defaults to undefined
                                labelOnly: false, // Defaults to false
                                foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Defaults to rgba(0, 0, 0, 0.1)
                                fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
                            },
                        },
                    ]
                },
            ]
        }
    ],
}
