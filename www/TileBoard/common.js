var tileboard = {
    // 天气信息
    weather: {
        'clear-day': { name: '晴天', icon: 'clear' },
        'clear-night': { name: '夜间晴朗', icon: 'nt-clear' },
        'cloudy': { name: '阴', icon: 'cloudy' },
        'exceptional': { name: '特殊', icon: 'unknown' },
        'fog': { name: '雾', icon: 'fog' },
        'hail': { name: '冰雹', icon: 'sleet' },
        'lightning': { name: '雷电', icon: 'chancestorms' },
        'lightning-rainy': { name: '雷阵雨', icon: 'tstorms' },
        'partlycloudy': { name: '多云', icon: 'partlycloudy' },
        'partly-cloudy-day': { name: '多云', icon: 'partlycloudy' },
        'partly-cloudy-night': { name: '夜间多云', icon: 'nt-partlycloudy' },
        'pouring': { name: '暴雨', icon: 'rain' },
        'snowy': { name: '雪', icon: 'snow' },
        'snowy-rainy': { name: '雨夹雪', icon: 'sleet' },
        'sunny': { name: '晴', icon: 'sunny' },
        'rainy': { name: '雨', icon: 'sleet' },
        'wind': { name: '微风', icon: 'unknown' },
        'windy': { name: '风', icon: 'unknown' },
        'windy-variant': { name: '大风', icon: 'unknown' }
    },
    audio: {

    },
    // 参数设置
    search: function (key, value) {
        var queryString = {}
        var vars = location.search.substring(1).split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            queryString[pair[0]] = pair[1]
        }
        if (value) {
            queryString[key] = value
            var arr = []
            for (var k in queryString) {
                arr.push(k + '=' + queryString[k])
            }
            location.search = '?' + arr.join('&')
        } else {
            return queryString[key]
        }
    },
    // 参数跳转

    // 音乐播放器

    // 视频播放器
    recognition: function () {

    },
    speak: function (text) {
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(text);
        var voices = synth.getVoices();
        utterThis.voice = voices[0];
        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis);
    }
}

// 天气信息
var weatherIcon = {}
var weatherName = {}
for (var k in tileboard.weather) {
    var weather = tileboard.weather[k]
    weatherIcon[k] = weather.icon
    weatherName[k] = weather.name
}