/**
 * Created by gooin on 2016/8/2.
 */
var map;
var layer;
var layer0;

function initCloudMap() {
    clearMap();
    destroyMap();
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
    map.setCenter(new OpenLayers.LonLat(0, 0), 2);
}
/**********************************本地地图******************************************/
function initLocalMap() {
    destroyMap();
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
    layer = new Zondy.Map.Doc("BaseLayer", "world", {
        ip: "127.0.0.1",
        port: "6163",//端口
        isBaseLayer: true // 设为底图
    });
//          添加图层
    map.addLayers([layer]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(0, 0), 2);
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


/*******************更改按钮为地图显示按钮************************/
function showMapBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "显示云服务器地图(腾讯云)";
    btn1.onclick=function () {
        initCloudMap();
    };

    var btn2 = document.getElementById('btn2');
    btn2.value = "显示第三方地图(Google)";
    btn2.onclick = function () {
        initOnlineMap();
    };

    var btn3 = document.getElementById('btn3');
    btn3.value = "显示本地服务器地图";
    btn3.onclick = function () {
        initLocalMap();
    };

}





/**************************交互绘制***************************/
/**
 * Created by gooin on 2016/8/4.
 */

var vecLayer;
var drawControl;

/********************************交互点绘制******************************************/

//创建一个矢量图层用于交互式绘制
function initDrawPointControl() {

//            创建图层
    vecLayer = new OpenLayers.Layer.Vector("DrawLayer");
//            添加到地图中
    map.addLayer(vecLayer);
//            创建绘制**点**工具
    drawControl = new OpenLayers.Control.DrawFeature(vecLayer, OpenLayers.Handler.Point);
//            将绘图工具添加到控件中
    map.addControl(drawControl);
}
//        开始绘制函数
function StartDrawPnt() {

    //如果绘图图层不存在
    if (vecLayer == null) {
//                初始化绘图
        initDrawPointControl();
    } else {
        clearMap();
        initDrawPointControl();
    }
    drawControl.activate();//激活绘图控件
    //激活控件
}

/********************************交互线绘制******************************************/
//创建一个矢量图层用于交互式绘制
function initDrawLineControl() {
//            创建图层
    vecLayer = new OpenLayers.Layer.Vector("DrawLayer");
//            添加到地图中
    map.addLayer(vecLayer);
//            创建绘制**线**工具
    drawControl = new OpenLayers.Control.DrawFeature(vecLayer, OpenLayers.Handler.Path);
//            将绘图工具添加到控件中
    map.addControl(drawControl);
}
//        开始绘制函数
function StartDrawLin() {

    //如果绘图图层不存在
    if (vecLayer == null) {
//                初始化绘图
        initDrawLineControl();
    } else {
        clearMap();
        initDrawLineControl();
    }

    drawControl.activate();//激活绘图控件
}
/********************************交互多边形绘制************************************/
function initDrawPolygonControl() {
//            创建图层
    vecLayer = new OpenLayers.Layer.Vector("DrawLayer");
//            添加到地图中
    map.addLayer(vecLayer);
//            创建绘制**多边形**工具
    drawControl = new OpenLayers.Control.DrawFeature(vecLayer, OpenLayers.Handler.Polygon);
//            将绘图工具添加到控件中
    map.addControl(drawControl);
}
//        开始绘制函数
function StartDrawPolygon() {

    //如果绘图图层不存在
    if (vecLayer == null) {
//                初始化绘图
        initDrawPolygonControl();
    } else {
        clearMap();
        initDrawPolygonControl();
    }

    drawControl.activate();//激活绘图控件
}

/*******************更改按钮为绘图按钮************************/
function asDrawBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "交互绘制点";
    btn1.onclick=function () {
        StartDrawPnt(); 
    };

    var btn2 = document.getElementById('btn2');
    btn2.value = "交互绘制折线";
    btn2.onclick = function () {
        StartDrawLin();
    };

    var btn3 = document.getElementById('btn3');
    btn3.value = "交互绘制多边形";
    btn3.onclick = function () {
        StartDrawPolygon();
    };

    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "";
    btn4.value = "清除绘制";
    btn4.onclick = function () {
        clearMap();
    };
}

/***************************销毁地图*******************************/
function destroyMap() {
    if (map) {
        map.destroy();
    }
}

/****************隐藏Button面板*******************/
function hideButtons() {
    var Buttons = document.getElementById('ButtonLib');
    Buttons.style.display = "none";
}
/*******************显示Button面板*****************/
function showButtons() {
    var Buttons = document.getElementById('ButtonLib');
    Buttons.style.display = "";
}

/********************清除绘制图层*********************/
function clearMap() {
    if (vecLayer) {
//                移除绘图图层
        map.removeLayer(vecLayer);
    }
//            绘图图层赋值为空
    vecLayer = null;
//            关闭绘图控件
    drawControl.deactivate();
}

