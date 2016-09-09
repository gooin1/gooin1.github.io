/**
 * Created by gooin on 2016/8/2.
 */
var map;
var layer;
var layer0;


function initCloudMap() {
    clearJSON();
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
    clearJSON();
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
        layers: "include:0,1,2,3"
    });
//          添加图层
    map.addLayers([layer]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(0, 0), 2);
}

/**********************************河流地图******************************************/

/**
 * 本地
 */
function initLocalRiverMap() {
    destroyMap();
    clearJSON();
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
    layer = new Zondy.Map.Doc("底图图层", "world", {
        ip: "127.0.0.1",
        port: "6163",//端口
        isBaseLayer: true,// 设为底图
        layers: "exclude:7"
    });
    //河流图层
    layer1 = new Zondy.Map.Doc("无河流图层", "world", {
        ip: "127.0.0.1",
        port: "6163",//端口
        isBaseLayer: true,// 设为底图
        layers: "exclude:2,7"//设置显示河流图层索引号
    });

//          添加图层到地图容器中
    map.addLayers([layer, layer1]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(105.9, 32.8), 4);
}

/**
 * 企鹅云
 */
function initCloudRiverMap() {
    destroyMap();
    clearJSON();
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
    layer = new Zondy.Map.Doc("底图图层", "worldJW", {
        ip: "123.206.26.105",
        port: "6163",//端口
        isBaseLayer: true,// 设为底图
        layers: "exclude:7"
    });
    //河流图层
    layer1 = new Zondy.Map.Doc("无河流图层", "worldJW", {
        ip: "123.206.26.105",
        port: "6163",//端口
        isBaseLayer: true,// 设为底图
        layers: "exclude:2,7"//设置显示河流图层索引号
    });

//          添加图层到地图容器中
    map.addLayers([layer, layer1]);
//            设置显示中心和级别
    map.setCenter(new OpenLayers.LonLat(105.9, 32.8), 4);
}


/**
 * 在线地图
 */

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

    //隐藏暂时用不到的按钮
    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "hidden";

    var btn5 = document.getElementById('btn5');
    btn5.style.visibility = "hidden";

    var btn6 = document.getElementById('btn6');
    btn6.style.visibility = "hidden";

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

/********************************交互规则多边形绘制************************************/
//创建一个矢量图层用于交互式绘制
function initDrawRPolygonControl() {
//            创建图层
    vecLayer = new OpenLayers.Layer.Vector("DrawLayer");
//            添加到地图中
    map.addLayer(vecLayer);
//            创建绘制**规则多边形**工具
    drawControl = new OpenLayers.Control.DrawFeature(vecLayer, OpenLayers.Handler.RegularPolygon);
//            将绘图工具添加到控件中
    map.addControl(drawControl);
}
//        开始绘制函数
function StartDraw4Polygon() {
    //如果绘图图层不存在
    if (vecLayer == null) {
//                初始化绘图
        initDrawRPolygonControl();
    } else {
        clearMap();
        initDrawRPolygonControl();
    }
    drawControl.activate();//激活绘图控件
    drawControl.handler.setOptions({sides: 4});//设置绘制4边形
}
/******************************交互绘制圆********************************/
//        开始绘制函数
function StartDrawCircle() {
    //如果绘图图层不存在
    if (vecLayer == null) {
//                初始化绘图
        initDrawRPolygonControl();
    } else {
        clearMap();
        initDrawRPolygonControl();
    }
    drawControl.activate();//激活绘图控件
    drawControl.handler.setOptions({sides: 60});//设置绘制4边形
}

/*******************更改按钮为绘图按钮************************/
function asDrawBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "交互绘制点";
    btn1.onclick = function () {
        //调用函数交互绘制点
        StartDrawPnt();
    };

    var btn2 = document.getElementById('btn2');
    btn2.value = "交互绘制折线";
    btn2.onclick = function () {
        ////调用函数交互绘制线
        StartDrawLin();
    };

    var btn3 = document.getElementById('btn3');
    btn3.value = "交互绘制多边形";
    btn3.onclick = function () {
        ////调用函数交互绘制多边形
        StartDrawPolygon();
    };
    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "";
    btn4.value = "交互绘制规则四边形";
    btn4.onclick = function () {
        ////调用函数交互绘制多边形
        StartDraw4Polygon();
    };
    var btn5 = document.getElementById('btn5');
    btn5.style.visibility = "";
    btn5.value = "交互绘制圆";
    btn5.onclick = function () {
        ////调用函数交互绘制圆
        StartDrawCircle();
    };

    var btn6 = document.getElementById('btn6');
    btn6.style.visibility = "";
    btn6.value = "清除绘制";
    btn6.onclick = function () {
        ////调用函数清除绘制的图形
        clearMap();
    };
}
/***************************地图查询****************************/

/*******************更改按钮为地图显示按钮************************/
function asQueryBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "交互划线查询(本地)";
    btn1.onclick = function () {
        startInteractivePathQuery();
    };

    var btn2 = document.getElementById('btn2');
    btn2.value = "交互多边形查询(本地)";
    btn2.onclick = function () {
        startInteractivePolQuery();
    };

    var btn3 = document.getElementById('btn3');
    btn3.style.visibility = "";
    btn3.value = "交互划线查询(腾讯云)";
    btn3.onclick = function () {
        startInteractiveCloudPathQuery();

    };

    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "";
    btn4.value = "交互多边形查询(腾讯云)";
    btn4.onclick = function () {
        startInteractiveCloudPolQuery();

    };


    var btn5 = document.getElementById('btn5');
    btn5.style.visibility = "hidden";
    var btn6 = document.getElementById('btn6');
    btn6.style.visibility = "hidden";

}


var drawLayer;
var highLtLayer;

/*******************************交互式线查询(高亮+JSON)本地*************************************/

function initDraw() {
//            添加一个绘制图层
    drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
    map.addLayer(drawLayer);
//          创建并添加控件  点
    drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Path);
    drawControl.featureAdded = PathQueryCallBack;
    map.addControl(drawControl);
}
function initHighLtLayer() {
//            添加一个用于高亮显示的图层
    highLtLayer = new OpenLayers.Layer.Vector("Highlight");
    map.addLayer(highLtLayer);
}


function PathQueryCallBack(feature) {
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
    var pathObj = new Zondy.Object.PolyLineForQuery();
//            传入OpenLayer的点的坐标
    pathObj.setByOL(feature.geometry);

//            在点击下一个点时清除之前的点
    feature.destroy();
//            创建查询参数
    var queryParm = new Zondy.Service.QueryParameter(
        {
            geometry: pathObj,
            resultFormat: "json",
            struct: queryStruct
        });
//            创建查询服务
    var queryService = new Zondy.Service.QueryDocFeature(queryParm, "world", 2, {
        ip: "127.0.0.1",
        port: "6163"
    });

//          开始查询
    queryService.query(InteractivePathQuerySuccess);
}

function InteractivePathQuerySuccess(data) {
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

function startInteractivePathQuery() {
    clearJSON();
    initLocalRiverMap();
    initDraw();
    if (drawControl) {
        drawControl.activate();//激活绘图控件
    }
}


/******************交互多边形查询(本地)*******************/
function startInteractivePolQuery() {
    clearJSON();
    initLocalRiverMap();
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
    drawControl.featureAdded = PolygonQueryCallBack;
    map.addControl(drawControl);
}

function PolygonQueryCallBack(feature) {
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
    var polygonObj = new Zondy.Object.Polygon();
//            传入OpenLayer的点的坐标
    polygonObj.setByOL(feature.geometry);

//            在点击下一个点时清除之前的点
    feature.destroy();
//            创建查询参数
    var queryParm = new Zondy.Service.QueryParameter(
        {
            geometry: polygonObj,
            resultFormat: "json",
            struct: queryStruct
        });
//            创建查询服务
    var queryService = new Zondy.Service.QueryDocFeature(queryParm, "world", 2, {
        ip: "127.0.0.1",
        port: "6163"
    });

//          开始查询
    queryService.query(InteractivePolygonQuerySuccess);
}
function InteractivePolygonQuerySuccess(data) {
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

/**************************************交互线查询(云)*****************************************/
function startInteractiveCloudPathQuery() {
    clearJSON();
    initCloudRiverMap();
    initCloudDraw();
    if (drawControl) {
        drawControl.activate();//激活绘图控件
    }
}

function initCloudDraw() {
//            添加一个绘制图层
    drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
    map.addLayer(drawLayer);
//          创建并添加控件  点
    drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Path);
    drawControl.featureAdded = CloudPathQueryCallBack;
    map.addControl(drawControl);
}
function CloudPathQueryCallBack(feature) {
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
    var pathObj = new Zondy.Object.PolyLineForQuery();
//            传入OpenLayer的点的坐标
    pathObj.setByOL(feature.geometry);

//            在点击下一个点时清除之前的点
    feature.destroy();
//            创建查询参数
    var queryParm = new Zondy.Service.QueryParameter(
        {
            geometry: pathObj,
            resultFormat: "json",
            struct: queryStruct
        });
//            创建查询服务
    var queryService = new Zondy.Service.QueryDocFeature(queryParm, "worldJW", 2, {
        ip: "123.206.26.105",
        port: "6163"
    });

//          开始查询
    queryService.query(InteractiveCloudPathQuerySuccess);
}

function InteractiveCloudPathQuerySuccess(data) {
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




/**************************************交互多边形查询(云)*****************************************/

/******************交互多边形查询(本地)*******************/
function startInteractiveCloudPolQuery() {
    clearJSON();
    initCloudRiverMap();
    initDrawPolCloud();
    if (drawControl) {
        drawControl.activate();//激活绘图控件
    }
}

function initDrawPolCloud() {
//            添加一个绘制图层
    drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
    map.addLayer(drawLayer);
//          创建并添加控件  多边形
    drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Polygon);
    drawControl.featureAdded = CloudPolygonQueryCallBack;
    map.addControl(drawControl);
}

function CloudPolygonQueryCallBack(feature) {
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
    var polygonObj = new Zondy.Object.Polygon();
//            传入OpenLayer的点的坐标
    polygonObj.setByOL(feature.geometry);

//            在点击下一个点时清除之前的点
    feature.destroy();
//            创建查询参数
    var queryParm = new Zondy.Service.QueryParameter(
        {
            geometry: polygonObj,
            resultFormat: "json",
            struct: queryStruct
        });
//            创建查询服务
    var queryService = new Zondy.Service.QueryDocFeature(queryParm, "worldJW", 2, {
        ip: "123.206.26.105",
        port: "6163"
    });

//          开始查询
    queryService.query(InteractiveCloudPolygonQuerySuccess);
}
function InteractiveCloudPolygonQuerySuccess(data) {
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



/**********************************************缓冲区分析*******************************************/
/*******************更改按钮为缓冲区分析按钮************************/
function asBuffBtn() {
    var btn1 = document.getElementById('btn1');
    btn1.value = "河流水害模拟分析(本地)";
    btn1.onclick = function () {
        classBuffBySingleRing();
    };

    var btn2 = document.getElementById('btn2');
    btn2.value = "河流水害模拟分析(腾讯云)";
    btn2.onclick = function () {
        classBuffBySingleRingCloud();
    };

    var btn3 = document.getElementById('btn3');
    btn3.style.visibility = "hidden";
    // btn3.value = "河流图层显示(yun)";
    // btn3.onclick = function () {
    //     initCloudRiverMap();
    //
    // };
    var btn4 = document.getElementById('btn4');
    btn4.style.visibility = "hidden";

    var btn5 = document.getElementById('btn5');
    btn5.style.visibility = "hidden";

    var btn6 = document.getElementById('btn6');
    btn6.style.visibility = "hidden";

}


/*******************************多重类缓冲分析(本地)**********************************/
function initClassAnalysisMap() {
    
}
    initLocalRiverMap();

    var classSRLayerName = "gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/河流水害模拟结果" + getCurrentTime();

    function classBuffBySingleRing() {
        initClassAnalysisMap();

//        调用函数清理图层
        clearA();
//        实例化一个多重类缓冲分析对象
        var classBuffAnalysis = new Zondy.Service.ClassBufferBySingleRing({
            ip: "127.0.0.1",                                    //ip
            port: "6163",//端口
            //    缓冲时要素左侧缓冲半径
            leftRad: 0.5,
            //    缓冲时要素右侧缓冲半径
            rightRad: 0.5,

            srcInfo: "gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/世界河流",  //要缓冲的图层
            desInfo: classSRLayerName    //缓冲结果存储路径及命名
        });
//        执行多重类缓冲分析
        classBuffAnalysis.execute(classBuffBySingleRingSuccess);
    }

//    回调函数
    function classBuffBySingleRingSuccess(data) {
//          如果获取到结果
        if (data.results) {
//          如果获取的结果数组元素数量不为0
            if (data.results.length != 0) {
//                新建图层存储缓冲区分析结果
                var resultLayer = new Zondy.Map.Layer("河流水害模拟结果" + getCurrentTime(), [classSRLayerName], {
                    ip: "127.0.0.1",//ip
                    port: "6163",//端口
                    isBaseLayer: false//不为基础图层
                });
            }
            map.addLayer(resultLayer);//将图层添加到地图容器中
        } else {
            alert("缓冲失败!");//弹窗提醒
        }
    }

/*******************************多重类缓冲分析(腾讯云)**********************************/
function initClassAnalysisCloudMap() {

}
initCloudRiverMap();

var classSRLayerNameCloud = "gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/河流水害模拟结果" + getCurrentTime();

function classBuffBySingleRingCloud() {
    initClassAnalysisCloudMap();

//        调用函数清理图层
    clearA();
//        实例化一个多重类缓冲分析对象
    var classBuffAnalysis = new Zondy.Service.ClassBufferBySingleRing({
        ip: "123.206.26.105",                                    //ip
        port: "6163",//端口
        //    缓冲时要素左侧缓冲半径
        leftRad: 0.5,
        //    缓冲时要素右侧缓冲半径
        rightRad: 0.5,

        srcInfo: "gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/世界河流",  //要缓冲的图层
        desInfo: classSRLayerNameCloud    //缓冲结果存储路径及命名
    });
//        执行多重类缓冲分析
    classBuffAnalysis.execute(classBuffBySingleRingSuccessCloud);
}

//    回调函数
function classBuffBySingleRingSuccessCloud(data) {
//          如果获取到结果
    if (data.results) {
//          如果获取的结果数组元素数量不为0
        if (data.results.length != 0) {
//                新建图层存储缓冲区分析结果
            var resultLayer = new Zondy.Map.Layer("河流水害模拟结果" + getCurrentTime(), [classSRLayerNameCloud], {
                ip: "123.206.26.105",//ip
                port: "6163",//端口
                isBaseLayer: false//不为基础图层
            });
        }
        map.addLayer(resultLayer);//将图层添加到地图容器中
    } else {
        alert("缓冲失败!");//弹窗提醒
    }
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

    /*********************清除JSON数据******************/
    function clearJSON() {
        var jsonTable = document.getElementById('resultTable');
        if (jsonTable)
        {
            jsonTable.innerHTML = null;  
        }
        
        
    }

    /********************隐藏JSON面板*******************/
    function hideJSON() {
        var jsonTable = document.getElementById('resultTable');
        jsonTable.style.display = "none";
    }

    /********************显示JSON面板*******************/
    function showJSON() {
        var jsonTable = document.getElementById('resultTable');
        jsonTable.style.display = "";
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


//    获取当前时间函数
    function getCurrentTime() {
        //实例化一个日期对象
        var now = new Date();

        var year = now.getFullYear();	//四位数字返回年份。
        var month = now.getMonth() + 1; //月份 (0 ~ 11)。
        var day = now.getDate();        //一个月中的某一天 (1 ~ 31)

        var hh = now.getHours();        //获取小时 0-23
        var mm = now.getMinutes();      //获取分钟 0-59
        var ss = now.getSeconds();      //获取秒 0-59

//            定义一个对象存储时间
        var clock = year + "-";   //2016-

//            如果月份小于10则在月份前加0
        if (month < 10) clock += "0";
        clock += month + "-";      //2016-07-
//            如果天数小于10则在天数前加0
        if (day < 10) clock += "0";
        clock += day + "-";         //2016-07-27-
//            如果小时小于10则在小时前加0
        if (hh < 10) clock += "0";
        clock += hh;                //2016-07-27-21
//            如果分钟小于10则在分钟前加0
        if (mm < 10) clock += "0";
        clock += mm;                //2016-07-27-2135
//            如果秒数小于10则在秒数前加0
        if (ss < 10) clock += "0";
        clock += ss;                //2016-07-27-213523
//            返回clock的值
        return (clock);
    }

//      清理图层函数
    function clearA() {
//        如果图层数量大于1 (要留下基础图层)
        if (map.layers.length > 1) {
            for (var i = map.layers.length - 1; i > 0; i--) {
//                删除除基础图层外的图层
                map.removeLayer(map.layers[i], false);
            }
        }

    }
