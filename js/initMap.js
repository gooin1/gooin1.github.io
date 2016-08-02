/**
 * Created by gooin on 2016/8/2.
 */
var map;
var layer;

function init() {
//            创建地图容器
    map = new OpenLayers.Map("map2", {
//            添加控件
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.OverviewMap()
        ]
    });

    layer = new Zondy.Map.Doc("BaseLayer", "worldJW", {
        ip: "123.206.26.105",
        port: "6163",
        isBaseLayer: true
    });
//          添加图层
    map.addLayers([layer]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(0,0), 2);
}
