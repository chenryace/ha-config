# ha-config
我的HomeAssistant配置

[![hacs_badge](https://img.shields.io/badge/Home-Assistant-%23049cdb)](https://www.home-assistant.io/)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

![visit](https://visitor-badge.glitch.me/badge?page_id=shaonianzhentan.ha-config&left_text=visit)
![forks](https://img.shields.io/github/forks/shaonianzhentan/ha-config)
![stars](https://img.shields.io/github/stars/shaonianzhentan/ha-config)

#### 关注我的微信订阅号，了解更多HomeAssistant相关知识
<img src="https://github.com/shaonianzhentan/ha-docs/raw/master/docs/img/wechat-channel.png" height="160" alt="HomeAssistant家庭助理" title="HomeAssistant家庭助理" />

## 快速安装

Docker管理
```bash
sudo docker run -itd --net="host" --restart=always --name="portainer" -v /var/run/docker.sock:/var/run/docker.sock -v ~/portainer:/data portainer/portainer-ce:latest
```
HomeAssistant
```bash
sudo docker run -itd --net="host" --restart=always --name="ha" --privileged=true -v ~/homeassistant:/config -e TZ="Asia/Shanghai" homeassistant/home-assistant:latest
```
webssh2
```bash
sudo docker run -itd --net="host" --restart=always --name="ssh" --privileged=true ilteoood/webssh2:latest
```
HomeKit服务
```bash
sudo docker run -itd --net="host" --restart=always --name="homebridge" -v ~/homebridge:/homebridge oznu/homebridge:latest
```
ESPHome
```bash
sudo docker run -itd --net="host" --restart=always --name="esphome" -v ~/esphome:/config esphome/esphome
```
Nodejs
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```bash
# 安装pm2
npm i pm2 -g
# 安装node-RED
sudo npm install -g --unsafe-perm node-red
# 启动程序
sudo pm2 start node-red
# 保存配置
sudo pm2 save
# 开机启动
sudo pm2 startup
```

## 升级
```bash
sudo docker pull homeassistant/home-assistant:latest
```
```bash
sudo docker pull oznu/homebridge:latest
```

## HomeBridge
- https://github.com/homebridge/homebridge
- https://github.com/SeydX/homebridge-camera-ui
- https://github.com/bwp91/homebridge-ewelink
- https://github.com/kiwi-cam/homebridge-broadlink-rm
- https://github.com/arachnetech/homebridge-mqttthing

## Nginx配置
```nginx
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''   close;
}

upstream homeassistant { 
  server 127.0.0.1:8123;
}

upstream webssh { 
  server 127.0.0.1:2222;
}

upstream nodered {
  server 127.0.0.1:1880;
}

upstream portainer {
  server 127.0.0.1:9000;
}

upstream aria2c {
  server 127.0.0.1:6800;
}

server {

    listen 80;
    listen 443 ssl;
    server_name raspberry.local;
    ssl_certificate      ssl/server.crt;
    ssl_certificate_key  ssl/server.key;

    location / {
        proxy_pass  http://homeassistant;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /ssh/ {
        proxy_pass http://webssh;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /node-red/ {
        proxy_pass http://nodered;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /docker-portainer/ {
        proxy_pass http://portainer/;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /jsonrpc {
        proxy_pass http://aria2c;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /html/ {
        root /var/www;
    }

}
```

## 其他项目
- https://code.videolan.org/videolan/LibVLCSharp