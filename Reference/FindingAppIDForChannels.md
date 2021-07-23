# Finding The APP_ID Value For the launch API

The following process can be used to find the APP_ID value for a 'channel' you want to create a hot button to launch.

1. Have that 'channel' opened and running on a TV.

2. Send the following request as a `GET` request to `http://<ip address>:8060/query/media-player` to obtain a resposne similar to the one below, in this case for the YouTube TV application:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<player error="false" state="play">
    <plugin bandwidth="38431728 bps" id="195316" name="YouTube TV"/>
    <format audio="aac_adts" captions="none" drm="none" video="mpeg4_10b"/>
    <position>46937641 ms</position>
    <is_live>false</is_live>
</player>
```

3.  From the XML response, take the value of the id field in the plugin element and put into the following `POST` request: `http://<ip address>:8060/launch/<id from step 2>`.
