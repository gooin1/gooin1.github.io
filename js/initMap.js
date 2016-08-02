/**
 * Created by gooin on 2016/8/2.
 */
var map;
var layer;
var layer0;

function initCloudMap() {
//            创建地图容器
    map = new OpenLayers.Map("map2", {
//            添加控件
        controls: [
            new OpenLayers.Control.Navigation(), //导航
            new OpenLayers.Control.MousePosition(), //鼠标位置
            new OpenLayers.Control.LayerSwitcher(), //图层控制
            new OpenLayers.Control.OverviewMap()    //鹰眼
        ]
    });
//            添加图层
    layer = new Zondy.Map.Doc("BaseLayer", "worldJW", {

<!-------------------------云服务器ip(腾讯云)-------------------------------->
        ip: "123.206.26.105",

        port: "6163",//端口
        isBaseLayer: true // 设为底图
    });
//          添加图层
    map.addLayers([layer]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(0,0), 2);
}

function initOnlineMap() {
    destroyMap();
//            创建地图容器
    map = new OpenLayers.Map('map2',
        {
            controls: [
                new OpenLayers.Control.PanZoomBar(),//缩放面板的工具控件
                new OpenLayers.Control.LayerSwitcher(), //图层切换控件
                new OpenLayers.Control.Navigation(),    //此控件处理伴随鼠标事件的地图浏览
                new OpenLayers.Control.MousePosition()//此控件显示鼠标移动时，所在点的地理坐标
            ]
        }
    );

//    添加图层(Google)
    layer0 = new Zondy.Map.GoogleLayer("Google Map VEC",
        {
//                        添加GoogleMap的矢量图层
            layerType: Zondy.Enum.GoogleLayerType.VEC,
            isBaseLayer: true
        }
    );
    map.addLayers([layer0]);
    map.setCenter(new OpenLayers.LonLat(0, 0), 2);
}






/*****************************************************/

/***************************销毁地图*******************************/
function destroyMap() {
    if (map) {
        map.destroy();
    }
}

/****************隐藏JSON面板*******************/
function hideButtons() {
    var Buttons= document.getElementById('ButtonLib');
    Buttons.style.display = "none";
}
/*******************显示JSON面板*************************/
function showButtons() {
    var Buttons = document.getElementById('ButtonLib');
    Buttons.style.display = "";
}
