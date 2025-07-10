if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WeekCalendar_Params {
    homeStore?: HomeStore;
    updateTrigger?: number;
    currentPage?: number;
    scroller?: Scroller;
    scrollWidth?: number;
    isLoadMore?: boolean;
    isPageScroll?: boolean;
}
import display from "@ohos:display";
import router from "@ohos:router";
import WeekCalendarMethods from "@bundle:com.example.healthy_life/entry/ets/viewmodel/CalendarViewModel";
import type { ScrollTo } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/CalendarViewModel";
import type { HomeStore } from '../../viewmodel/HomeViewModel';
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import type { WeekDateModel } from '../../model/WeekCalendarModel';
import { sameDate } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import AddCalendarBtn from "@bundle:com.example.healthy_life/entry/ets/view/home/AddCalendarBtnComponent";
export const WEEK_DAY_WIDTH: number = 100 / Const.WEEK_DAY_NUM;
const DEFAULT_SCROLL_WIDTH = 336; // default calendar width
const DEFAULT_SCROLL_PERCENT = 0.934; // default calendar width percent
export class WeekCalendar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeStore = new SynchedPropertyNesedObjectPU(params.homeStore, this, "homeStore");
        this.__updateTrigger = new ObservedPropertySimplePU(0, this, "updateTrigger");
        this.currentPage = 1;
        this.scroller = new Scroller();
        this.scrollWidth = DEFAULT_SCROLL_WIDTH;
        this.isLoadMore = false;
        this.isPageScroll = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WeekCalendar_Params) {
        this.__homeStore.set(params.homeStore);
        if (params.updateTrigger !== undefined) {
            this.updateTrigger = params.updateTrigger;
        }
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scrollWidth !== undefined) {
            this.scrollWidth = params.scrollWidth;
        }
        if (params.isLoadMore !== undefined) {
            this.isLoadMore = params.isLoadMore;
        }
        if (params.isPageScroll !== undefined) {
            this.isPageScroll = params.isPageScroll;
        }
    }
    updateStateVars(params: WeekCalendar_Params) {
        this.__homeStore.set(params.homeStore);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
        this.__updateTrigger.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        this.__updateTrigger.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __homeStore: SynchedPropertyNesedObjectPU<HomeStore>;
    get homeStore() {
        return this.__homeStore.get();
    }
    private __updateTrigger: ObservedPropertySimplePU<number>;
    get updateTrigger() {
        return this.__updateTrigger.get();
    }
    set updateTrigger(newValue: number) {
        this.__updateTrigger.set(newValue);
    }
    private currentPage: number;
    private scroller: Scroller;
    private scrollWidth: number;
    private isLoadMore: boolean;
    private isPageScroll: boolean;
    aboutToAppear() {
        try {
            let displayClass = display.getDefaultDisplaySync();
            this.scrollWidth = displayClass.width / displayClass.densityPixels * DEFAULT_SCROLL_PERCENT;
            Logger.info('HomeIndex', 'get the window scrollWidth: ' + this.scrollWidth);
        }
        catch (err) {
            Logger.error('HomeIndex->onScrollEnd', JSON.stringify(err));
        }
        this.homeStore.setSelectedShowDate(new Date().getTime());
    }
    getProgressImg(item: WeekDateModel): Resource {
        const finNum = item.dayInfo?.finTaskNum || 0;
        const targetNum = item.dayInfo?.targetTaskNum || 0;
        const currentDate = new Date();
        const itemDate = new Date(item.date);
        // 判断是否为未来日期（当前日期之后）
        if (itemDate > currentDate) {
            return { "id": 16777343, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }; // 未来日期显示未完成图标
        }
        if (targetNum === 0) {
            return { "id": 16777486, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }; // 新增：没有任务的图标
        }
        if (finNum === 0) {
            return { "id": 16777343, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }; // 有任务但未开始
        }
        if (finNum === targetNum) {
            return { "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }; // 任务全部完成
        }
        return { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }; // 部分完成
    }
    showCalendar() {
        router.pushUrl({ url: 'pages/CalendarDetailPage', params: this.homeStore });
    }
    ArrowIcon(isRight: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(85:5)", "entry");
            Row.width({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 });
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                Logger.info('WeekCalendar', `Arrow clicked: isRight=${isRight}, currentPage=${this.currentPage}`);
                isRight ?
                    (() => {
                        Logger.info('WeekCalendar', `Calling goToNextWeek with params: currentPage=${this.currentPage}, isPageScroll=${this.isPageScroll}`);
                        WeekCalendarMethods.goToNextWeek(this.currentPage, this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.scroller);
                    })() :
                    (() => {
                        WeekCalendarMethods.gotoPreviousWeek(this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.currentPage, this.scroller);
                        Logger.info(this.homeStore.dateTitle + "________________________________");
                        this.updateTrigger += 1;
                    })();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777349, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(86:7)", "entry");
            Image.width({ "id": 16777457, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(112:5)", "entry");
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_420);
            Row.padding(Const.THOUSANDTH_33);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(113:7)", "entry");
            Column.borderRadius({ "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width(Const.THOUSANDTH_1000);
            Column.height(Const.THOUSANDTH_1000);
            Column.padding({ top: Const.THOUSANDTH_50, bottom: Const.THOUSANDTH_120 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(114:9)", "entry");
            Row.margin({ left: 30 });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.ArrowIcon.bind(this)(false);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 直接通过showDate计算标题，而非依赖dateTitle
                    HealthText(this, {
                        title: this.homeStore.dateTitle,
                        fontSize: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/WeekCalendarComponent.ets", line: 117, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.homeStore.dateTitle,
                            fontSize: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.homeStore.dateTitle
                    });
                }
            }, { name: "HealthText" });
        }
        __Common__.pop();
        this.ArrowIcon.bind(this)(true);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AddCalendarBtn(this, {
                        clickAction: () => {
                            this.showCalendar();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/WeekCalendarComponent.ets", line: 126, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            clickAction: () => {
                                this.showCalendar();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "AddCalendarBtn" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(135:9)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.width(Const.THOUSANDTH_1000);
            Scroll.onScrollStop(() => this.onScrollEndAction());
            Scroll.onScrollEdge((event) => this.onScrollEdgeAction(event));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(136:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(138:15)", "entry");
                    Column.width(`${WEEK_DAY_WIDTH}%`);
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.onClick(() => WeekCalendarMethods.calenderItemClickAction(item, index, ObservedObject.GetRawObject(this.homeStore)));
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.weekTitle);
                    Text.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(139:17)", "entry");
                    Text.fontSize({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontWeight(Const.FONT_WEIGHT_500);
                    Text.fontColor(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777260, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontFamily({ "id": 16777289, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.opacity(Const.OPACITY_6);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(146:17)", "entry");
                    Divider.margin({ top: Const.DEFAULT_2, bottom: { "id": 16777449, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Divider.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Divider.color(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                }, Divider);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.getProgressImg(item));
                    Image.debugLine("entry/src/main/ets/view/home/WeekCalendarComponent.ets(151:17)", "entry");
                    Image.height({ "id": 16777446, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Image.objectFit(ImageFit.Contain);
                    Image.margin({ top: Const.THOUSANDTH_80 });
                }, Image);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.homeStore.dateArr, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    onScrollEndAction() {
        if (this.isPageScroll === false) {
            let page = Math.round(this.scroller.currentOffset().xOffset / this.scrollWidth);
            page = (this.isLoadMore === true) ? page + 1 : page;
            if (this.scroller.currentOffset().xOffset % this.scrollWidth != 0 || this.isLoadMore === true) {
                let xOffset = page * this.scrollWidth;
                this.scroller.scrollTo({ xOffset, yOffset: 0 } as ScrollTo);
                this.isLoadMore = false;
            }
            this.currentPage = this.homeStore.dateArr.length / Const.WEEK_DAY_NUM - page - 1;
            Logger.info('HomeIndex', 'onScrollEnd: page ' + page + ', listLength ' + this.homeStore.dateArr.length);
            let dayModel: WeekDateModel = this.homeStore.dateArr[Const.WEEK_DAY_NUM * page + this.homeStore.selectedDay];
            Logger.info('HomeIndex', 'currentItem: ' + JSON.stringify(dayModel) + ', selectedDay  ' + this.homeStore.selectedDay);
            this.homeStore!.setSelectedShowDate(dayModel!.date!.getTime());
        }
        this.isPageScroll = false;
    }
    onScrollEdgeAction(side: Edge) {
        if (side === Edge.Top && this.isPageScroll === false) {
            Logger.info('HomeIndex', 'onScrollEdge: currentPage ' + this.currentPage);
            if ((this.currentPage + 2) * Const.WEEK_DAY_NUM >= this.homeStore.dateArr.length) {
                Logger.info('HomeIndex', 'onScrollEdge: load more data');
                let date: Date = new Date(this.homeStore.showDate);
                date.setDate(date.getDate() - Const.WEEK_DAY_NUM);
                this.homeStore.getPreWeekData(date, () => {
                });
                this.isLoadMore = true;
            }
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
