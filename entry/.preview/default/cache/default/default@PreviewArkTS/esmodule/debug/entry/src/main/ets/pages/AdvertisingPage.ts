if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AdvertisingPage_Params {
    duration?: number;
    intervalId?: number;
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
class AdvertisingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__duration = new ObservedPropertySimplePU(Const.AD_DURATION, this, "duration");
        this.intervalId = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AdvertisingPage_Params) {
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
    }
    updateStateVars(params: AdvertisingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__duration.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    //状态变量，广告倒计时秒数，初始值从常量读取
    private __duration: ObservedPropertySimplePU<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    // 定时器 ID，用于管理倒计时
    private intervalId: number;
    goToHomePage() {
        clearInterval(this.intervalId);
        router.replaceUrl({ url: 'pages/MainPage' });
    }
    //组件即将显示时触发的生命周期方法，用于初始化倒计时。
    //注册定时器并且每秒做一次，倒计时结束之后进入home首页
    aboutToAppear() {
        this.intervalId = setInterval(() => {
            if (this.duration > 0) {
                this.duration -= 1;
            }
            else {
                this.goToHomePage();
            }
        }, Const.DURATION_1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(50:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777418, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
            Column.justifyContent(FlexAlign.SpaceBetween);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(51:7)", "entry");
            Row.width('90%');
            Row.justifyContent(FlexAlign.End);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777307, "type": 10003, params: [this.duration], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(52:9)", "entry");
            Text.fontSize({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.borderRadius({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.letterSpacing(Const.LETTER_1);
            Text.height({ "id": 16777448, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.backgroundColor('rgba(0,0,0,0.20)');
            Text.border({ color: { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, width: { "id": 16777431, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Text.margin({ top: { "id": 16777448, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Text.padding({ "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => this.goToHomePage());
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(67:7)", "entry");
            Row.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777421, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(68:9)", "entry");
            Image.width({ "id": 16777456, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777456, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: Const.SPACE_4 });
            Column.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(72:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: { "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(73:11)", "entry");
            Text.fontFamily({ "id": 16777288, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777444, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777260, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_700);
            Text.letterSpacing(Const.LETTER_1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(79:11)", "entry");
            Text.fontFamily({ "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777260, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_400);
            Text.letterSpacing(Const.LETTER_34);
            Text.opacity(Const.OPACITY_4);
            Text.fontSize({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AdvertisingPage";
    }
}
registerNamedRoute(() => new AdvertisingPage(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/AdvertisingPage", pageFullPath: "entry/src/main/ets/pages/AdvertisingPage", integratedHsp: "false", moduleType: "followWithHap" });
