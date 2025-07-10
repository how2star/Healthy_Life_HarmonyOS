if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CalendarDetailPage_Params {
    homeStore?: HomeStore;
    // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
    // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
    // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
    // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
    cjDataItem?: CJDateItem;
    cjCellStyle?: CJCellStyle;
    cjCellStatus?: CellStatus;
}
import { CellStatus, CJCalendar, CJCellStyle, CJDateItem } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/Index";
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type { HomeStore } from '../viewmodel/HomeViewModel';
import type { WeekDateModel } from '../model/WeekCalendarModel';
// class structofDayInfoMap {
//   dayInfoMap: HashMap<number, DayInfo> = new HashMap();
// }
// class structofDayInfoArr {
//   dayInfoArr: DayInfo[] = [];
// }
function checkValuesEqual(dateArr: Array<WeekDateModel>): boolean {
    let result = false;
    for (let item of dateArr) {
        if (item.dayInfo.finTaskNum === item.dayInfo.targetTaskNum) {
            result = true;
        }
    }
    return result;
}
/**
 对比日历组件中的日期（cj）与任务数据中的日期（dateArr），判断该日期是否满足
 “任务全部完成”（finTaskNum == targetTaskNum 且不为 0）。
 核心逻辑：将日期转换为数字格式（如 20231005）进行比对，确保日期匹配。
 作用：决定日历中该日期是否显示 “任务完成” 图标。
 * @param dateArr
 * @param cj
 * @returns
 */
function isAchieved(dateArr: Array<WeekDateModel>, cj: CJDateItem) {
    let result = false;
    for (let item of dateArr) {
        //遍历所有任务数据，获取任务时间
        let dateStr_item_temp = String(item.date);
        // 截取年、月、日，拼接为“YYYYMMDD”格式的数字字符串（如“20231005”）
        let dateStr_item: string = `${dateStr_item_temp.toString()
            .substring(0, 4)}${Number(dateStr_item_temp.toString()
            .substring(5, 7))}${Number(dateStr_item_temp.toString()
            .substring(8, 10))}`;
        //转换日历组件中的日期的时间格式
        let dateStr: string = `${cj.fullYear}${(cj.month + 1) % 12}${cj.date}`;
        //如果当前任务时间和日历组件中的时间一致
        if (Number(dateStr_item) == Number(dateStr)) {
            //检查一下任务是否全部完成，且任务数量为0，返回结果
            if (item.dayInfo.targetTaskNum == item.dayInfo.finTaskNum && item.dayInfo.targetTaskNum != 0) {
                result = true;
            }
            else {
                result = false;
            }
        }
    }
    return result;
}
function hasTask(dateArr: Array<WeekDateModel>, cj: CJDateItem) {
    let result = false;
    for (let item of dateArr) {
        //遍历所有任务数据，获取任务时间
        let dateStr_item_temp = String(item.date);
        // 截取年、月、日，拼接为“YYYYMMDD”格式的数字字符串（如“20231005”）
        let dateStr_item: string = `${dateStr_item_temp.toString()
            .substring(0, 4)}${Number(dateStr_item_temp.toString()
            .substring(5, 7))}${Number(dateStr_item_temp.toString()
            .substring(8, 10))}`;
        //转换日历组件中的日期的时间格式
        let dateStr: string = `${cj.fullYear}${(cj.month + 1) % 12}${cj.date}`;
        //如果当前任务时间和日历组件中的时间一致
        if (Number(dateStr_item) == Number(dateStr)) {
            //检查一下任务数量是否为0，返回结果
            if (item.dayInfo.targetTaskNum == 0) {
                result = false;
            }
            else {
                result = true;
            }
        }
    }
    return result;
}
class CalendarDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeStore = new ObservedPropertyObjectPU(router.getParams() as HomeStore, this, "homeStore");
        this.cjDataItem = new CJDateItem(new Date());
        this.cjCellStyle = new CJCellStyle();
        this.cjCellStatus = new CellStatus();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CalendarDetailPage_Params) {
        if (params.homeStore !== undefined) {
            this.homeStore = params.homeStore;
        }
        if (params.cjDataItem !== undefined) {
            this.cjDataItem = params.cjDataItem;
        }
        if (params.cjCellStyle !== undefined) {
            this.cjCellStyle = params.cjCellStyle;
        }
        if (params.cjCellStatus !== undefined) {
            this.cjCellStatus = params.cjCellStatus;
        }
    }
    updateStateVars(params: CalendarDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // @Link homeStore: HomeStore;
    // @Prop homeStore: HomeStore;
    //@State homeStore: HomeStore：通过路由参数（router.getParams()）接收从其他页面传递的 HomeStore 对象，
    // 包含日历所需的任务数据（如 dateArr 数组，存储每日任务信息）。
    private __homeStore: ObservedPropertyObjectPU<HomeStore>; // 获取传递过来的参数对象
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue: HomeStore) {
        this.__homeStore.set(newValue);
    }
    // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
    // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
    // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
    // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
    private cjDataItem: CJDateItem;
    private cjCellStyle: CJCellStyle;
    private cjCellStatus: CellStatus;
    /**
     * 在页面中渲染一个完整的月历视图，每个日期单元格会显示日期数字，
     * 且当该日期的任务全部完成时，会额外显示 “任务完成图标”。
     */
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(109:5)", "entry");
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/CalendarDetailPage", isUserCreateStack: false });
            Navigation.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(110:7)", "entry");
            Navigation.size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 });
            Navigation.title('日历');
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(111:9)", "entry");
            Column.width('100%');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CJCalendar(this, {
                        // 自定义单元格背景
                        // buildCellBackground: this.BuildCellBackground,
                        // 自定义Cell样式风格
                        // buildCellStyle: (item: CJDateItem) => {
                        //   let cjCellStyle: CJCellStyle = new CJCellStyle()
                        //   if (item.date < 7) {
                        //     cjCellStyle.itemBackgroundColor = "#abedd8"
                        //     cjCellStyle.fontColor = "#3f72af"
                        //   } else if (item.date >= 10 && item.date < 16) {
                        //     cjCellStyle.itemBackgroundColor = "#e4f9f5"
                        //     cjCellStyle.fontColor = "#3d84a8"
                        //   } else if (item.date >= 20 && item.date <= 28) {
                        //     cjCellStyle.itemBackgroundColor = "#88304e"
                        //     cjCellStyle.fontColor = "#fae3d9"
                        //   }
                        //   return cjCellStyle
                        // }
                        // 自定义主体部分
                        buildCellBody: this.BuildCellBody,
                        // 向CellItem中添加自定义属性
                        // reBuildCellItem: (cjDateItem: CJDateItem) => {
                        //   // 需要向 CJDateItem 中添加附加数据时，可是使用如下方式
                        //   if (true) {
                        //     cjDateItem.extras.set("1", "-" + cjDateItem.date + "-")
                        //   }
                        //   return cjDateItem
                        // },
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CalendarDetailPage.ets", line: 112, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            // 自定义单元格背景
                            // buildCellBackground: this.BuildCellBackground,
                            // 自定义Cell样式风格
                            // buildCellStyle: (item: CJDateItem) => {
                            //   let cjCellStyle: CJCellStyle = new CJCellStyle()
                            //   if (item.date < 7) {
                            //     cjCellStyle.itemBackgroundColor = "#abedd8"
                            //     cjCellStyle.fontColor = "#3f72af"
                            //   } else if (item.date >= 10 && item.date < 16) {
                            //     cjCellStyle.itemBackgroundColor = "#e4f9f5"
                            //     cjCellStyle.fontColor = "#3d84a8"
                            //   } else if (item.date >= 20 && item.date <= 28) {
                            //     cjCellStyle.itemBackgroundColor = "#88304e"
                            //     cjCellStyle.fontColor = "#fae3d9"
                            //   }
                            //   return cjCellStyle
                            // }
                            // 自定义主体部分
                            buildCellBody: this.BuildCellBody
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CJCalendar" });
        }
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    BuildCellBackground(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            /**
             * 判断用户当前单元格任务是否完成，如果完成填充图标，未完成则保持风格不变
             */
            // if (this.cjDataItem.date == Number((router.getParams() as HomeStore).dateArr[0].date)) { // 今天
            if (hasTask((router.getParams() as HomeStore).dateArr, this.cjDataItem)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(161:9)", "entry");
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.backgroundImage({ "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.renderFit(RenderFit.RESIZE_FILL);
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.width('85%');
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.aspectRatio(1);
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.border({
                                        width: this.cjCellStyle.borderWidth,
                                        color: this.cjCellStyle.borderColor
                                    });
                                    //   if (this.cjDataItem.isToday) { // 今天
                                    Column.borderRadius(this.cjCellStyle.borderRadius);
                                }, Column);
                                //   if (this.cjDataItem.isToday) { // 今天
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(178:9)", "entry");
                                    Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                    Column.width('85%');
                                    Column.aspectRatio(1);
                                    Column.border({
                                        width: this.cjCellStyle.borderWidth,
                                        color: this.cjCellStyle.borderColor
                                    });
                                    Column.borderRadius(this.cjCellStyle.borderRadius);
                                }, Column);
                                Column.pop();
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(189:7)", "entry");
                        Column.backgroundImage({ "id": 16777486, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Column.renderFit(RenderFit.RESIZE_FILL);
                        Column.backgroundColor(this.cjCellStatus.backgroundColor);
                        Column.width('85%');
                        Column.aspectRatio(1);
                        Column.border({
                            width: this.cjCellStyle.borderWidth,
                            color: this.cjCellStyle.borderColor
                        });
                        Column.borderRadius(this.cjCellStyle.borderRadius);
                    }, Column);
                    Column.pop();
                });
            }
        }, If);
        If.pop();
    }
    BuildCellBody(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(213:5)", "entry");
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cjDataItem.date + '');
            Text.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(214:7)", "entry");
            Text.fontColor(this.cjCellStatus.fontColor);
            Text.fontSize(this.cjCellStyle.fontSize);
            Text.fontWeight(this.cjCellStyle.fontFontWeight);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(219:9)", "entry");
                        Image.objectFit(ImageFit.Contain);
                        Image.height('20vp');
                        Image.width('20vp');
                        Image.margin({ top: '0vp' });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('');
                        Text.debugLine("entry/src/main/ets/pages/CalendarDetailPage.ets(225:9)", "entry");
                        Text.height('20vp');
                        Text.width('20vp');
                        Text.margin({ top: '0vp' });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CalendarDetailPage";
    }
}
registerNamedRoute(() => new CalendarDetailPage(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/CalendarDetailPage", pageFullPath: "entry/src/main/ets/pages/CalendarDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
