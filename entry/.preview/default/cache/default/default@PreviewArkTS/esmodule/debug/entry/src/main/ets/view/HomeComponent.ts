if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeIndex_Params {
    broadCast?: BroadCast;
    naviAlpha?: number;
    homeStore?: HomeStore;
    editedTaskInfo?: ITaskItem;
    editedTaskID?: string;
    scroller?: Scroller;
    yOffset?: number;
}
import router from "@ohos:router";
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import AddBtn from "@bundle:com.example.healthy_life/entry/ets/view/home/AddBtnComponent";
import { TaskCard } from "@bundle:com.example.healthy_life/entry/ets/view/home/TaskCardComponent";
import HomeTopView from "@bundle:com.example.healthy_life/entry/ets/view/home/HomeTopComponent";
import { CustomDialogView } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/CustomDialogView";
import type { CustomDialogCallback } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/CustomDialogView";
import type TaskInfo from '../viewmodel/TaskInfo';
import type { HomeStore } from '../viewmodel/HomeViewModel';
import { TaskMapById } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import type { ITaskItem } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import { HealthDataSrcMgr } from "@bundle:com.example.healthy_life/entry/ets/common/utils/HealthDataSrcMgr";
import { BroadCastType } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import type { BroadCast } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import AchievementInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementInfo";
import type DayInfo from '../viewmodel/DayInfo';
import { getDegreeSuccessiveDays, getSuccessiveDays } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
const WHITE_COLOR_0X = 255;
// class structofDayInfoMap {
//   dayInfoMap: HashMap<number, DayInfo> = new HashMap();
// }
class structofDayInfoArr {
    dayInfoArr: DayInfo[] = [];
}
function __Text__titleTextStyle(): void {
    Text.fontSize({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_500);
    Text.width(Const.THOUSANDTH_1000);
    Text.fontFamily({ "id": 16777289, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontColor({ "id": -1, "type": -1, params: [`app.element.color.titleColor`], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.padding({
        top: Const.THOUSANDTH_15,
        bottom: Const.THOUSANDTH_15,
        left: Const.THOUSANDTH_33
    });
}
export default class HomeIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__broadCast = new ObservedPropertyObjectPU(HealthDataSrcMgr.getInstance().getBroadCast(), this, "broadCast");
        this.addProvidedVar("broadCast", this.__broadCast, false);
        this.__naviAlpha = new ObservedPropertySimplePU(0, this, "naviAlpha");
        this.__homeStore = new SynchedPropertyObjectTwoWayPU(params.homeStore, this, "homeStore");
        this.__editedTaskInfo = new SynchedPropertyObjectTwoWayPU(params.editedTaskInfo, this, "editedTaskInfo");
        this.__editedTaskID = new SynchedPropertySimpleTwoWayPU(params.editedTaskID, this, "editedTaskID");
        this.scroller = new Scroller();
        this.yOffset = 0;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("editedTaskID", this.taskChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeIndex_Params) {
        if (params.broadCast !== undefined) {
            this.broadCast = params.broadCast;
        }
        if (params.naviAlpha !== undefined) {
            this.naviAlpha = params.naviAlpha;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.yOffset !== undefined) {
            this.yOffset = params.yOffset;
        }
    }
    updateStateVars(params: HomeIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__broadCast.purgeDependencyOnElmtId(rmElmtId);
        this.__naviAlpha.purgeDependencyOnElmtId(rmElmtId);
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskID.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__broadCast.aboutToBeDeleted();
        this.__naviAlpha.aboutToBeDeleted();
        this.__homeStore.aboutToBeDeleted();
        this.__editedTaskInfo.aboutToBeDeleted();
        this.__editedTaskID.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __broadCast: ObservedPropertyObjectPU<BroadCast>;
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue: BroadCast) {
        this.__broadCast.set(newValue);
    }
    private __naviAlpha: ObservedPropertySimplePU<number>;
    get naviAlpha() {
        return this.__naviAlpha.get();
    }
    set naviAlpha(newValue: number) {
        this.__naviAlpha.set(newValue);
    }
    private __homeStore: SynchedPropertySimpleOneWayPU<HomeStore>;
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue: HomeStore) {
        this.__homeStore.set(newValue);
    }
    private __editedTaskInfo: SynchedPropertySimpleOneWayPU<ITaskItem>;
    get editedTaskInfo() {
        return this.__editedTaskInfo.get();
    }
    set editedTaskInfo(newValue: ITaskItem) {
        this.__editedTaskInfo.set(newValue);
    }
    private __editedTaskID: SynchedPropertySimpleTwoWayPU<string>;
    get editedTaskID() {
        return this.__editedTaskID.get();
    }
    set editedTaskID(newValue: string) {
        this.__editedTaskID.set(newValue);
    }
    private scroller: Scroller;
    private yOffset: number;
    taskChange() {
        this.homeStore.updateTaskInfoList(this.editedTaskInfo);
    }
    taskItemAction(item: TaskInfo, isClick: boolean): void {
        if (!this.homeStore.checkCurrentDay()) {
            return;
        }
        if (isClick) {
            // click to clock
            let callback: CustomDialogCallback = {
                confirmCallback: (taskTemp: TaskInfo) => {
                    this.onConfirm(taskTemp);
                }, cancelCallback: () => {
                }
            };
            this.broadCast.emit(BroadCastType.SHOW_TASK_DETAIL_DIALOG, [item, callback]);
        }
        else {
            // edit task
            let editTaskStr: string = JSON.stringify(TaskMapById[item.taskID - 1]);
            let editTask: ITaskItem = JSON.parse(editTaskStr);
            editTask.targetValue = item?.targetValue;
            editTask.isAlarm = item.isAlarm;
            editTask.startTime = item.startTime;
            editTask.frequency = item.frequency;
            editTask.isOpen = item.isOpen;
            router.pushUrl({ url: 'pages/TaskEditPage', params: { params: JSON.stringify(editTask) } });
        }
    }
    //confirm clockL
    onConfirm(task: TaskInfo) {
        this.homeStore.taskClock(task).then((res: AchievementInfo | Array<AchievementInfo>) => {
            if (res instanceof AchievementInfo) {
                if (res.showAchievement) {
                    let achievementLevel = res.achievementLevel;
                    if (achievementLevel) {
                        this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG, achievementLevel);
                    }
                    else {
                        this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG);
                    }
                }
            }
            else {
                let len = res.length;
                for (let i = 0; i < len; i++) {
                    let ins = res[i];
                    if (ins.showAchievement) {
                        let achievementLevel = ins.achievementLevel;
                        if (achievementLevel) {
                            if (ins.taskID) {
                                if (achievementLevel < 200)
                                    this.broadCast.emit(BroadCastType.SHOW_SINGLE_ACHIEVEMENT_DIALOG, [achievementLevel, ins.taskID]);
                                else
                                    this.broadCast.emit(BroadCastType.SHOW_DEGREE_ACHIEVEMENT_DIALOG, [achievementLevel, ins.taskID]);
                            }
                            else
                                this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG, achievementLevel);
                        }
                        else {
                            this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG);
                        }
                    }
                }
            }
            getSuccessiveDays();
            getDegreeSuccessiveDays();
        });
    }
    // change navigator alpha when scrolling the Scroll component
    onScrollAction() {
        this.yOffset = this.scroller.currentOffset().yOffset;
        if (this.yOffset > Const.DEFAULT_56) {
            this.naviAlpha = 1;
        }
        else {
            this.naviAlpha = this.yOffset / Const.DEFAULT_56;
        }
    }
    editTaskAction() {
        if (this.homeStore.checkCurrentDay()) {
            router.pushUrl({ url: 'pages/TaskListPage' });
        }
    }
    showCalendar() {
        // let dayInfoMap_tmp: structofDayInfoMap = {
        //   dayInfoMap: this.homeStore.dayInfoMap
        // };
        // let dayInfoArr_tmp: DayInfo[] = [];
        // for (let item of this.homeStore.dateArr) {
        //   dayInfoArr_tmp.push(item.dayInfo);
        // }
        // let dayInfoArrStruct_tmp: structofDayInfoArr = {
        //   dayInfoArr : dayInfoArr_tmp
        // };
        // router.pushUrl({ url: 'pages/CalendarDetailPage' , params: dayInfoArrStruct_tmp} );
        router.pushUrl({ url: 'pages/CalendarDetailPage', params: this.homeStore });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/view/HomeComponent.ets(172:5)", "entry");
            Stack.width(Const.THOUSANDTH_1000);
            Stack.height(Const.THOUSANDTH_1000);
            Stack.backgroundColor({ "id": 16777252, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/view/HomeComponent.ets(173:7)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.width(Const.THOUSANDTH_1000);
            Scroll.height(Const.THOUSANDTH_1000);
            Scroll.onScroll(() => {
                this.onScrollAction();
            });
            Scroll.align(Alignment.TopStart);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/HomeComponent.ets(174:9)", "entry");
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTopView(this, { homeStore: this.__homeStore }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/HomeComponent.ets", line: 175, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            homeStore: this.homeStore
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomeTopView" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777328, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/HomeComponent.ets(176:11)", "entry");
            __Text__titleTextStyle();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.homeStore.getTaskListOfDay().length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: Const.DEFAULT_8 });
                        Column.debugLine("entry/src/main/ets/view/HomeComponent.ets(178:13)", "entry");
                        Column.onAppear(() => {
                            this.scroller.scrollTo({ xOffset: 0, yOffset: this.yOffset });
                        });
                        Column.padding({
                            top: Const.THOUSANDTH_15,
                            left: Const.THOUSANDTH_33,
                            right: Const.THOUSANDTH_33
                        });
                        Column.width(Const.THOUSANDTH_1000);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 循环渲染，创建子组件(taskcard)
                        // 参数1是待创建组件的信息组成的数组，
                        // 参数2是每个组件的创建操作，
                        // 参数3是标识组件信息的键值(用于判断组件是否变化，若无变化则跳过创建，使用原组件)
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.margin({ bottom: Const.DEFAULT_12 });
                                __Common__.height({ "id": 16777458, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new TaskCard(this, {
                                            taskInfoStr: JSON.stringify(item),
                                            clickAction: (isClick: boolean) => this.taskItemAction(item, isClick)
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/HomeComponent.ets", line: 184, col: 17 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                taskInfoStr: JSON.stringify(item),
                                                clickAction: (isClick: boolean) => this.taskItemAction(item, isClick)
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            taskInfoStr: JSON.stringify(item)
                                        });
                                    }
                                }, { name: "TaskCard" });
                            }
                            __Common__.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.homeStore.getTaskListOfDay(), forEachItemGenFunction, (item: TaskInfo) => JSON.stringify(item), false, false);
                    }, ForEach);
                    // 循环渲染，创建子组件(taskcard)
                    // 参数1是待创建组件的信息组成的数组，
                    // 参数2是每个组件的创建操作，
                    // 参数3是标识组件信息的键值(用于判断组件是否变化，若无变化则跳过创建，使用原组件)
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: Const.DEFAULT_8 });
                        Column.debugLine("entry/src/main/ets/view/HomeComponent.ets(202:13)", "entry");
                        Column.margin({ top: Const.DEFAULT_48 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777476, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/HomeComponent.ets(203:15)", "entry");
                        Image.width({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.opacity(Const.OPACITY_4);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HealthText(this, { title: '', titleResource: { "id": 16777311, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, fontSize: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/HomeComponent.ets", line: 206, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '',
                                        titleResource: { "id": 16777311, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                        fontSize: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
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
                    __Common__.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AddBtn(this, {
                        clickAction: () => {
                            this.editTaskAction();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/HomeComponent.ets", line: 220, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            clickAction: () => {
                                this.editTaskAction();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "AddBtn" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // AddCalendarBtn({
            //   clickAction: () => {
            //     this.showCalendar();
            //   }
            // })
            Row.create();
            Row.debugLine("entry/src/main/ets/view/HomeComponent.ets(230:7)", "entry");
            // AddCalendarBtn({
            //   clickAction: () => {
            //     this.showCalendar();
            //   }
            // })
            Row.width(Const.THOUSANDTH_1000);
            // AddCalendarBtn({
            //   clickAction: () => {
            //     this.showCalendar();
            //   }
            // })
            Row.height(Const.DEFAULT_56);
            // AddCalendarBtn({
            //   clickAction: () => {
            //     this.showCalendar();
            //   }
            // })
            Row.position({ x: 0, y: 0 });
            // AddCalendarBtn({
            //   clickAction: () => {
            //     this.showCalendar();
            //   }
            // })
            Row.backgroundColor(`rgba(${WHITE_COLOR_0X},${WHITE_COLOR_0X},${WHITE_COLOR_0X},${this.naviAlpha})`);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/HomeComponent.ets(231:9)", "entry");
            __Text__titleTextStyle();
            Text.fontSize({ "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.padding({ left: Const.THOUSANDTH_66 });
        }, Text);
        Text.pop();
        // AddCalendarBtn({
        //   clickAction: () => {
        //     this.showCalendar();
        //   }
        // })
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomDialogView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/HomeComponent.ets", line: 241, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CustomDialogView" });
        }
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
