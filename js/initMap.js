/**
 * Created by gooin on 2016/8/2.
 */
var map;
var layer;
var layer0;


function initCloudMap() {
    // clearMap();
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
        isBaseLayer: true// 设为底图
        // layers:"hide:7"
        
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
        isBaseLayer: true,// 设为底图
        layers:"include:0,1,2,3"
    });
//          添加图层
    map.addLayers([layer]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(0, 0), 2);
}

/**********************************河流地图******************************************/
function initRiverMap() {
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
        isBaseLayer: true,// 设为底图
        layers:"show:0,1,2,3"
    });
//          添加图层
    map.addLayers([layer]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(105.9,32.8), 4);
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
            isBaseLayer: true,
            layers:"declude:7,9"
        }
    );
    map.addLayers([layer0]);
    map.setCenter(new OpenLayers.LonLat(0, 0), 2);
}


/*******************更改按钮为地图显示按钮************************/
function asMapBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "显示云服务器地图(腾讯云)";
    btn1.onclick = function () {
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

    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "hidden";

}


/**************************交互绘制***************************/
/*** Created by gooin on 2016/8/4. **/

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
    btn1.onclick = function () {
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
/***************************地图查询****************************/

/*******************更改按钮为地图显示按钮************************/
function asQueryBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "交互点查询(云服务器)";
    btn1.onclick = function () {
        startInteractivePntQuery();
    };

    var btn2 = document.getElementById('btn2');
    btn2.value = "交互多边形查询(云服务器)";
    btn2.onclick = function () {
        startInteractivePolQuery();
    };

    var btn3 = document.getElementById('btn3');
    btn3.value = "河流显示测试";
    btn3.onclick = function () {
        initRiverMap();
    };

    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "hidden";

}


var drawLayer;
var highLtLayer;

/*******************************交互式点查询(高亮+JSON)*************************************/

function initDraw() {
//            添加一个绘制图层
    drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
    map.addLayer(drawLayer);
//          创建并添加控件  点
    drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Point);
    drawControl.featureAdded = callBack;
    map.addControl(drawControl);
}
function initHighLtLayer() {
//            添加一个用于高亮显示的图层
    highLtLayer = new OpenLayers.Layer.Vector("Highlight");
    map.addLayer(highLtLayer);
}




function callBack(feature) {
//            创建查询结构
    var queryStruct = new Zondy.Service.QueryFeatureStruct(
        {
//                        要查询的信息
            IncludeGeometry: true,
            IncludeAttribute: true,
            IncludeGraphic: true
        }
        
    );
//          	创建查询形状
    var pointObj = new Zondy.Object.PointForQuery();
//            传入OpenLayer的点的坐标
    pointObj.setByOL(feature.geometry);

//            在点击下一个点时清除之前的点
    feature.destroy();
//            创建查询参数
    var queryParm = new Zondy.Service.QueryParameter(
        {
            geometry: pointObj,
            resultFormat: "json",
            struct: queryStruct
        });
//            创建查询服务
    var queryService = new Zondy.Service.QueryDocFeature(queryParm, "world", 0, {
        ip: "127.0.0.1",
        port: "6163"
    });

//          开始查询
    queryService.query(InteractiveQuerySuccess);
}
function InteractiveQuerySuccess(data) {
    var formatData = JSON.stringify(data);
    Process(formatData, 1, "resultTable");
//            如果存在已经高亮的图层则销毁,重建要高亮显示的新图层
    if (highLtLayer) {
        highLtLayer.destroy();
    }
    initHighLtLayer();
//          初始化高亮图层
//            新建对象存储要读取的数据
    var format = new Zondy.Format.PolygonJSON();
//                读取查询到的数据并添加到要素中
    var features = format.read(data);
//              将高亮图层设为可见
    highLtLayer.setVisibility(true);//将图层设为可见
    highLtLayer.addFeatures(features);//将要素添加到图层中
}

function startInteractivePntQuery() {
    initCloudMap();
    initDraw();
    if (drawControl) {
        drawControl.activate();//激活绘图控件
    }
}




/******************交互多边形查询*******************/
function startInteractivePolQuery() {
    initRiverMap();
    initDrawPol();
    if (drawControl) {
        drawControl.activate();//激活绘图控件
    }
}

function initDrawPol() {
//            添加一个绘制图层
    drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
    map.addLayer(drawLayer);
//          创建并添加控件  点
    drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Polygon);
    drawControl.featureAdded = callBack;
    map.addControl(drawControl);
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
//               移除绘图图层
        map.removeLayer(vecLayer);
    }
//            绘图图层赋值为空
    vecLayer = null;
//            关闭绘图控件
    drawControl.deactivate();
}


