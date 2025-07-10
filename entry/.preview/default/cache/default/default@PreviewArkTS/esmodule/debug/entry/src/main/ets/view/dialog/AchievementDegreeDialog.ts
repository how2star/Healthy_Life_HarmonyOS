if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AchievementDegreeDialog_Params {
    controller?: CustomDialogController;
    achievementLevel?: number;
    taskID?: number;
    opacityValue?: number;
    angle?: number;
    scaleValue?: number;
    achievementMapValue?: Resource;
}
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { DegreeMap } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
const ANGLE_LARGE = 360;
export class AchievementDegreeDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new CustomDialogController({
            builder: 0
        }, this);
        this.__achievementLevel = this.initializeConsume("achievementLevel", "achievementLevel");
        this.__taskID = this.initializeConsume("taskID", "taskID");
        this.__opacityValue = new ObservedPropertySimplePU(0, this, "opacityValue");
        this.__angle = new ObservedPropertySimplePU(0, this, "angle");
        this.__scaleValue = new ObservedPropertySimplePU(0, this, "scaleValue");
        this.__achievementMapValue = new ObservedPropertyObjectPU({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, this, "achievementMapValue");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AchievementDegreeDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
        if (params.achievementMapValue !== undefined) {
            this.achievementMapValue = params.achievementMapValue;
        }
    }
    updateStateVars(params: AchievementDegreeDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__achievementLevel.purgeDependencyOnElmtId(rmElmtId);
        this.__taskID.purgeDependencyOnElmtId(rmElmtId);
        this.__opacityValue.purgeDependencyOnElmtId(rmElmtId);
        this.__angle.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleValue.purgeDependencyOnElmtId(rmElmtId);
        this.__achievementMapValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__achievementLevel.aboutToBeDeleted();
        this.__taskID.aboutToBeDeleted();
        this.__opacityValue.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        this.__achievementMapValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __achievementLevel: ObservedPropertyAbstractPU<number>;
    get achievementLevel() {
        return this.__achievementLevel.get();
    }
    set achievementLevel(newValue: number) {
        this.__achievementLevel.set(newValue);
    }
    private __taskID: ObservedPropertyAbstractPU<number>;
    get taskID() {
        return this.__taskID.get();
    }
    set taskID(newValue: number) {
        this.__taskID.set(newValue);
    }
    private __opacityValue: ObservedPropertySimplePU<number>;
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue: number) {
        this.__opacityValue.set(newValue);
    }
    private __angle: ObservedPropertySimplePU<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private __scaleValue: ObservedPropertySimplePU<number>;
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue: number) {
        this.__scaleValue.set(newValue);
    }
    private __achievementMapValue: ObservedPropertyObjectPU<Resource>;
    get achievementMapValue() {
        return this.__achievementMapValue.get();
    }
    set achievementMapValue(newValue: Resource) {
        this.__achievementMapValue.set(newValue);
    }
    aboutToAppear() {
        switch (this.achievementLevel) {
            case 200:
                this.achievementMapValue = DegreeMap.on__200;
                break;
            case 300:
                this.achievementMapValue = DegreeMap.on__300;
                break;
            case 400:
                this.achievementMapValue = DegreeMap.on__400;
                break;
            default:
                break;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/AchievementDegreeDialog.ets(48:5)", "entry");
            Column.height(Const.THOUSANDTH_800);
            Column.width(Const.THOUSANDTH_1000);
            Column.justifyContent(FlexAlign.Center);
            Gesture.create(GesturePriority.Low);
            TapGesture.create();
            TapGesture.onAction(() => {
                this.controller.close();
            });
            TapGesture.pop();
            Gesture.pop();
            Column.scale({ x: this.scaleValue, y: this.scaleValue });
            Column.rotate({ x: 0, y: 1, z: 0, angle: this.angle });
            Column.opacity(this.opacityValue);
            Column.onAppear(() => {
                Context.animateTo({
                    duration: Const.DURATION_800,
                    curve: Curve.EaseOut,
                    delay: Const.DURATION_100,
                    iterations: 1
                }, () => {
                    this.opacityValue = 1;
                    this.scaleValue = 1;
                    this.angle = ANGLE_LARGE;
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.achievementMapValue);
            Image.debugLine("entry/src/main/ets/view/dialog/AchievementDegreeDialog.ets(50:7)", "entry");
            Image.width(Const.THOUSANDTH_560);
            Image.height(Const.THOUSANDTH_400);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777326, "type": 10003, params: [this.achievementLevel], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/AchievementDegreeDialog.ets(55:7)", "entry");
            Text.fontSize({ "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_500);
            Text.fontColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontFamily({ "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
