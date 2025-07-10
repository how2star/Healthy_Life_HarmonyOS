if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeTopView_Params {
    homeStore?: HomeStore;
}
import type { HomeStore } from '../../viewmodel/HomeViewModel';
import { WeekCalendar } from "@bundle:com.example.healthy_life/entry/ets/view/home/WeekCalendarComponent";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
function __Text__titleTextStyle(): void {
    Text.fontSize({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_500);
    Text.width(Const.THOUSANDTH_1000);
    Text.fontFamily({ "id": 16777289, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontColor({ "id": -1, "type": -1, params: [`app.element.color.titleColor`], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export default class HomeTopView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeStore = new SynchedPropertyObjectTwoWayPU(params.homeStore, this, "homeStore");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeTopView_Params) {
    }
    updateStateVars(params: HomeTopView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __homeStore: SynchedPropertySimpleOneWayPU<HomeStore>;
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue: HomeStore) {
        this.__homeStore.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/home/HomeTopComponent.ets(35:5)", "entry");
            Column.height(Const.THOUSANDTH_500);
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_900 });
            Column.justifyContent(FlexAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777321, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/home/HomeTopComponent.ets(36:7)", "entry");
            __Text__titleTextStyle();
            Text.opacity(Const.OPACITY_6);
            Text.padding({ left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/HomeTopComponent.ets(40:7)", "entry");
            Row.width(Const.THOUSANDTH_1000);
            Row.padding({ left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HealthText(this, {
                        title: this.homeStore.getDonePercent(),
                        fontSize: { "id": 16777462, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        fontFamily: { "id": 16777288, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        fontWeight: Const.FONT_WEIGHT_700
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/HomeTopComponent.ets", line: 41, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.homeStore.getDonePercent(),
                            fontSize: { "id": 16777462, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            fontFamily: { "id": 16777288, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            fontWeight: Const.FONT_WEIGHT_700
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.homeStore.getDonePercent()
                    });
                }
            }, { name: "HealthText" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('%');
            Text.debugLine("entry/src/main/ets/view/home/HomeTopComponent.ets(47:9)", "entry");
            __Text__titleTextStyle();
            Text.fontSize({ "id": 16777450, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, left: { "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // WeekCalendar({ homeStore: $homeStore })
                    WeekCalendar(this, { homeStore: this.homeStore }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/HomeTopComponent.ets", line: 56, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            homeStore: this.homeStore
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        homeStore: this.homeStore
                    });
                }
            }, { name: "WeekCalendar" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
