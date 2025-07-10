if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineListInfo_Params {
}
import { MineInfoList } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import type { InfoItem } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import router from "@ohos:router";
export class MineListInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineListInfo_Params) {
    }
    updateStateVars(params: MineListInfo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/view/MineListInfo.ets(22:5)", "entry");
            List.border({
                radius: {
                    topLeft: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    topRight: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                }
            });
            List.backgroundColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            List.margin({ top: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.padding({ top: { "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.flexGrow(1);
            List.clip(true);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.backgroundColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.margin({
                            left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            right: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.height({ "id": 16777454, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.border({
                            width: { bottom: { "id": 16777431, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                            color: { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.onClick(() => {
                            //点击跳转个人用户信息编辑页面
                            if (item.id == '1') {
                                router.pushUrl({
                                    url: 'pages/MineEditPage',
                                });
                            }
                            else if (item.id == '2') {
                                router.pushUrl({
                                    url: 'pages/CheckUpdatePage',
                                });
                            }
                            else if (item.id == '3') {
                                router.pushUrl({
                                    url: 'pages/AboutPage',
                                });
                            }
                        });
                        ListItem.debugLine("entry/src/main/ets/view/MineListInfo.ets(24:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                            Flex.debugLine("entry/src/main/ets/view/MineListInfo.ets(25:11)", "entry");
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/view/MineListInfo.ets(26:13)", "entry");
                            Text.fontSize({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777450, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777349, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.debugLine("entry/src/main/ets/view/MineListInfo.ets(28:13)", "entry");
                            Image.objectFit(ImageFit.Contain);
                            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.width({ "id": 16777460, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Image);
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, MineInfoList, forEachItemGenFunction, (item: InfoItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
