if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    dialogController?: CustomDialogController | null;
    dialogController2?: CustomDialogController | null;
    name?: string;
    userInfo?: UserInfoData[];
    UserInfoTable?;
}
interface CustomDialogExample2_Params {
    controller?: CustomDialogController;
}
interface CustomDialogExample_Params {
    controller?: CustomDialogController;
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { CommonConstants } from "@bundle:com.example.healthy_life/entry/ets/common/constants/UserConstants";
import UserInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/UserInfoApi";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import type UserInfoData from '../viewmodel/UserInfoData';
import emitter from "@ohos:events.emitter";
class CustomDialogExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: CustomDialogExample_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(31:5)", "entry");
            Column.backgroundColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777375, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width({ "id": 16777414, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("昵称不规范！");
            Text.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(32:7)", "entry");
            Text.fontSize({ "id": 16777392, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.height({ "id": 16777413, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CustomDialogExample2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomDialogExample2_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: CustomDialogExample2_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(48:5)", "entry");
            Column.backgroundColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777375, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width({ "id": 16777414, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("保存成功");
            Text.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(49:7)", "entry");
            Text.fontSize({ "id": 16777392, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.height({ "id": 16777413, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/MineEditNamePage.ets", line: 65, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            openAnimation: {
                duration: 300,
                curve: Curve.Friction,
                delay: CommonConstants.DELAY,
                playMode: PlayMode.Alternate
            },
            closeAnimation: {
                duration: 300,
                curve: Curve.Friction,
                delay: CommonConstants.DELAY,
                playMode: PlayMode.Alternate
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: CommonConstants.ZERO, dy: { "id": 16777400, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
            customStyle: true,
            cornerRadius: { "id": 16777387, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
            isModal: false
        }, this);
        this.dialogController2 = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample2(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/MineEditNamePage.ets", line: 85, col: 14 });
                jsDialog.setController(this.dialogController2);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            openAnimation: {
                duration: 300,
                curve: Curve.Friction,
                delay: CommonConstants.DELAY,
                playMode: PlayMode.Alternate
            },
            closeAnimation: {
                duration: 300,
                curve: Curve.Friction,
                delay: CommonConstants.DELAY,
                playMode: PlayMode.Alternate
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: CommonConstants.ZERO, dy: { "id": 16777400, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
            customStyle: true,
            cornerRadius: { "id": 16777387, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
            isModal: false
        }, this);
        this.__name = new ObservedPropertySimplePU('', this, "name");
        this.__userInfo = new ObservedPropertyObjectPU([], this, "userInfo");
        this.UserInfoTable = new UserInfoApi(() => {
        });
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.dialogController2 !== undefined) {
            this.dialogController2 = params.dialogController2;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.UserInfoTable !== undefined) {
            this.UserInfoTable = params.UserInfoTable;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dialogController: CustomDialogController | null;
    private dialogController2: CustomDialogController | null;
    private __name: ObservedPropertySimplePU<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __userInfo: ObservedPropertyObjectPU<UserInfoData[]>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfoData[]) {
        this.__userInfo.set(newValue);
    }
    private UserInfoTable;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(110:5)", "entry");
            Row.height(Const.THOUSANDTH_1000);
            Row.backgroundColor({ "id": 16777252, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/MineEditNamePage", isUserCreateStack: false });
            Navigation.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(111:7)", "entry");
            Navigation.size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 });
            Navigation.title('昵称修改');
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(112:9)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "起一个昵称" });
            TextInput.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(113:11)", "entry");
            TextInput.margin({
                top: { "id": 16777387, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                left: { "id": 16777387, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                right: { "id": 16777387, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            TextInput.onChange((value: string) => {
                this.name = value;
            });
            TextInput.enableKeyboardOnFocus(true);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('保存');
            Button.debugLine("entry/src/main/ets/pages/MineEditNamePage.ets(122:11)", "entry");
            Button.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.height({ "id": 16777450, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                if (this.name == '' || this.name.length > 30) {
                    if (this.dialogController != null) {
                        this.dialogController.open();
                        setTimeout(() => {
                            this.dialogController?.close();
                        }, 1000);
                    }
                    return;
                }
                // 保存成功
                this.UserInfoTable.getRdbStore(() => {
                    this.UserInfoTable.query(1, (result: UserInfoData[]) => {
                        this.userInfo.push(result[0]);
                        this.userInfo[0].username = this.name;
                        Logger.info('MineEditNamePage', `${this.name}`);
                        this.UserInfoTable.updateData(this.userInfo[0], () => {
                        });
                        // 定义一个eventId为1的事件，事件优先级为Low
                        let event: emitter.InnerEvent = {
                            eventId: 1,
                            priority: emitter.EventPriority.LOW
                        };
                        // 将修改后的名字发送出去
                        let eventData: emitter.EventData = {
                            data: {
                                content: this.name,
                                id: 1,
                                isEmpty: false
                            }
                        };
                        // 发送eventId为1的事件，事件内容为eventData
                        emitter.emit(event, eventData);
                    }, false);
                });
                if (this.dialogController2 != null) {
                    this.dialogController2.open();
                    setTimeout(() => {
                        this.dialogController2?.close();
                    }, 1000);
                }
                // 返回上一级
                router.back();
            });
            Button.margin({ top: 50 });
        }, Button);
        Button.pop();
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/MineEditNamePage", pageFullPath: "entry/src/main/ets/pages/MineEditNamePage", integratedHsp: "false", moduleType: "followWithHap" });
