if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskCard_Params {
    taskInfoStr?: string;
    clickAction?: Function;
    taskInfo?: TaskInfo;
}
import { TaskMapById } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
function __Text__labelTextStyle(): void {
    Text.fontSize({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_500);
    Text.opacity(Const.OPACITY_6);
    Text.fontFamily({ "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export class TaskCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__taskInfoStr = new SynchedPropertySimpleOneWayPU(params.taskInfoStr, this, "taskInfoStr");
        this.clickAction = (isClick: boolean) => {
        };
        this.__taskInfo = new ObservedPropertyObjectPU(new TaskInfo(-1, '', -1, '', false, '', '', '', false, '', false), this, "taskInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskCard_Params) {
        if (params.taskInfoStr === undefined) {
            this.__taskInfoStr.set('');
        }
        if (params.clickAction !== undefined) {
            this.clickAction = params.clickAction;
        }
        if (params.taskInfo !== undefined) {
            this.taskInfo = params.taskInfo;
        }
    }
    updateStateVars(params: TaskCard_Params) {
        this.__taskInfoStr.reset(params.taskInfoStr);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__taskInfoStr.purgeDependencyOnElmtId(rmElmtId);
        this.__taskInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__taskInfoStr.aboutToBeDeleted();
        this.__taskInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * Prop装饰的变量为一种状态变量，其变量名和类型来自父组件，且数据是父->子单向同步。
     * TaskCard的父组件是HomeIndex，同步的变量是taskInfoStr(保存了taskInfo信息)。
     */
    private __taskInfoStr: SynchedPropertySimpleOneWayPU<string>;
    get taskInfoStr() {
        return this.__taskInfoStr.get();
    }
    set taskInfoStr(newValue: string) {
        this.__taskInfoStr.set(newValue);
    }
    private clickAction: Function;
    private __taskInfo: ObservedPropertyObjectPU<TaskInfo>;
    get taskInfo() {
        return this.__taskInfo.get();
    }
    set taskInfo(newValue: TaskInfo) {
        this.__taskInfo.set(newValue);
    }
    // 解析由父组件同步的JSON格式的taskInfo数据
    aboutToAppear() {
        this.taskInfo = JSON.parse(this.taskInfoStr);
    }
    /**
     * 自定义构建函数，可理解为定义了一个在build里使用的函数。
     * 更新子任务完成情况的显示。
     */
    targetValueBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.taskInfo.isDone) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(58:7)", "entry");
                        Row.align(Alignment.End);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.taskInfo.taskID != 1 && this.taskInfo.taskID != 6) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new HealthText(this, {
                                                title: this.taskInfo.finValue || `--`,
                                                fontSize: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 60, col: 11 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    title: this.taskInfo.finValue || `--`,
                                                    fontSize: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                title: this.taskInfo.finValue || `--`
                                            });
                                        }
                                    }, { name: "HealthText" });
                                }
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`);
                                    Text.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(64:11)", "entry");
                                    __Text__labelTextStyle();
                                    Text.fontWeight(Const.FONT_WEIGHT_400);
                                    Text.padding(10);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HealthText(this, { title: '', titleResource: { "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 69, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '',
                                        titleResource: { "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: ''
                                });
                            }
                        }, { name: "HealthText" });
                    }
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(73:7)", "entry");
                    }, Row);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 子任务完成情况显示前半部分：--或者finalvalue（已累加值）
                                HealthText(this, {
                                    title: this.taskInfo.finValue || `--`,
                                    fontSize: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 75, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: this.taskInfo.finValue || `--`,
                                        fontSize: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: this.taskInfo.finValue || `--`
                                });
                            }
                        }, { name: "HealthText" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`);
                        Text.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(79:9)", "entry");
                        __Text__labelTextStyle();
                        Text.fontWeight(Const.FONT_WEIGHT_400);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(87:5)", "entry");
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.borderRadius({ "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.padding({ left: Const.THOUSANDTH_50, right: Const.THOUSANDTH_33 });
            Row.linearGradient({
                direction: GradientDirection.Left,
                repeating: false,
                // colors: [[$r('app.color.white'), 1-Number(this.taskInfo.finValue)/Number(this.taskInfo.targetValue)], [0xB0E0E6, 0]] // 数组末尾元素占比小于1时满足重复着色效果
                colors: (this.taskInfo.taskID === 1 || this.taskInfo.taskID === 6) ?
                    [[{ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, 1 - Number(Boolean(this.taskInfo.finValue))], [0xB0E0E6, 0]] :
                    [[{ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, 1 - Number(this.taskInfo.finValue) / Number(this.taskInfo.targetValue)], [0xB0E0E6, 0]]
            });
            Row.onClick(() => this.clickAction(true));
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction(() => this.clickAction(false));
            LongPressGesture.pop();
            Gesture.pop();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: Const.DEFAULT_6 });
            Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(88:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(TaskMapById[this.taskInfo.taskID - 1].icon);
            Image.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(89:9)", "entry");
            Image.width({ "id": 16777448, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777448, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HealthText(this, {
                        title: '',
                        titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
                        fontFamily: { "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 92, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '',
                            titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
                            fontFamily: { "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: ''
                    });
                }
            }, { name: "HealthText" });
        }
        Row.pop();
        this.targetValueBuilder.bind(this)();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
