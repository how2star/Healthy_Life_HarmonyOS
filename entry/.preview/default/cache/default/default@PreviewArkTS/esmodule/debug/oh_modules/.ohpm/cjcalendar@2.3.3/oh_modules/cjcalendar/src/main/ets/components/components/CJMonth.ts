if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CJMonth_Params {
    cjMonthController?: CJMonthController;
    selectedItems?: Array<CJDateItem>;
    extras?: Record<string, number | string | boolean> | undefined;
    weeks?: Array<Array<CJDateItem>>;
    days?: Array<CJDateItem>;
    itemCellHeight?: number;
    tempSelectedItem?: CJDateItem;
    month?: CJDateItem | undefined;
    weekStartMode?: WeekStartMode;
    weekCount?: number;
    today?: CJDateItem;
    startDate?: Date;
    endDate?: Date;
    onReady?: (cjMonthController: CJMonthController) => void;
    //======================
    // 缓存月数
    cacheMaonthCount?: number;
    // 初始化默认选中日期：["2024-06-07"]
    defSelectedItems?: Array<string | Date> | undefined;
    /** 默认选中形状 */
    selectedShape?: SelectedShape;
    //================
    /** 操作模式 */
    optMode?: OptMode;
    selectedStyle?: SelectedStyle;
    /** 样式 */
    calStyle?: CJCalStyle;
    cjDataItem?: CJDateItem;
    animDuration?: number;
    themeColor?: string;
    selectedBorderRadius?: number;
    isNeedMarkToday?: boolean;
    itemFontColor?: ResourceColor;
    cjCellStatus?: CellStatus;
    cjCellStyle?: CJCellStyle;
    // 不能使用的日期字体颜色
    disabledFontColor?: ResourceColor;
    onlyShowCurrMonthDay?: boolean;
    showLunar?: boolean;
    showJieQi?: boolean | undefined;
    showJieRi?: boolean | undefined;
    viewModel?: CJViewModel;
    isFold?: boolean;
    /** 自定义构建每一项的样式 */
    buildCellStyle?: (cjDataItem: CJDateItem) => CJCellStyle;
    onCellClickIntercept?: (item: CJDateItem) => boolean | undefined;
    cellClick?: (cjDataItem: CJDateItem) => void;
    /**
     * 选择改变监听，
     */
    onSelectedChanged?: (items: Array<CJDateItem>) => void;
    /**
     * 月份切换
     */
    onMonthChanged?: (month: Date) => void;
    /**
     * 重新构建Item
     */
    reBuildCellItem?: (cjDateItem: CJDateItem) => void;
    /**
     * 获取农历描述信息
     */
    buildCellLunarDesc?: (cjDateItem: CJDateItem) => string;
    buildCellBackground?: CustomBuilder;
    buildDisableCellBackground?: CustomBuilder;
    buildCellBody?: CustomBuilder;
    buildMark?: CustomBuilder;
    freshView?;
}
import { Solar } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/index";
import { CJDateItem } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJDateItem";
import { SelectedShape } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/SelectedShape";
import { OptMode } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/OptMode";
import { SelectedStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/SelectedStyle";
import { CJCalStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCalStyle";
import { CJCellStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCellStyle";
import { CellStatus } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CellStatus";
import type { CJViewModel } from './CJViewModel';
import { CJMonthController } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJMonthController";
import { CJDay } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJDay";
import { CJLogUtil } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/utils/CJLogUtil";
import type { WeekStartMode } from '../data/WeekStartMode';
const TAG = "CJMonth";
export class CJMonth extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.cjMonthController = new CJMonthController();
        this.__selectedItems = this.initializeConsume("selectedItems", "selectedItems");
        this.__extras = this.initializeConsume("extras", "extras");
        this.__weeks = new ObservedPropertyObjectPU(new Array(), this, "weeks");
        this.__days = new ObservedPropertyObjectPU(new Array(), this, "days");
        this.__itemCellHeight = this.initializeConsume("itemCellHeight", "itemCellHeight");
        this.__tempSelectedItem = this.initializeConsume("tempSelectedItem", "tempSelectedItem");
        this.__month = new ObservedPropertyObjectPU(undefined, this, "month");
        this.__weekStartMode = this.initializeConsume("weekStartMode", "weekStartMode");
        this.weekCount = 1;
        this.today = new CJDateItem(new Date());
        this.startDate = new Date("1970-01-01");
        this.endDate = new Date(this.today.fullYear + 10, 0, 1);
        this.onReady = undefined;
        this.cacheMaonthCount = 1;
        this.defSelectedItems = undefined;
        this.selectedShape = SelectedShape.SHAPE_RECT;
        this.optMode = OptMode.NORMAL;
        this.selectedStyle = SelectedStyle.ALONE;
        this.calStyle = new CJCalStyle();
        this.cjDataItem = undefined;
        this.__animDuration = new ObservedPropertySimplePU(500
        // =====theme======
        , this, "animDuration");
        this.__themeColor = this.initializeConsume("themeColor", "themeColor");
        this.__selectedBorderRadius = this.initializeConsume("selectedBorderRadius", "selectedBorderRadius");
        this.__isNeedMarkToday = this.initializeConsume("isNeedMarkToday", "isNeedMarkToday");
        this.itemFontColor = "#252a34";
        this.cjCellStatus = new CellStatus();
        this.cjCellStyle = new CJCellStyle();
        this.disabledFontColor = "#9E9E9E";
        this.__onlyShowCurrMonthDay = this.initializeConsume("onlyShowCurrMonthDay", "onlyShowCurrMonthDay");
        this.__showLunar = this.initializeConsume("showLunar", "showLunar");
        this.__showJieQi = this.initializeConsume("showJieQi", "showJieQi");
        this.__showJieRi = this.initializeConsume("showJieRi", "showJieRi");
        this.__viewModel = this.initializeConsume("viewModel", "viewModel");
        this.__isFold = this.initializeConsume("isFold", "isFold");
        this.buildCellStyle = () => {
            return new CJCellStyle();
        };
        this.onCellClickIntercept = undefined;
        this.cellClick = () => {
        };
        this.onSelectedChanged = () => {
        };
        this.onMonthChanged = () => {
        };
        this.reBuildCellItem = undefined;
        this.buildCellLunarDesc = undefined;
        this.buildCellBackground = this.BuildCellBackground;
        this.buildDisableCellBackground = this.BuildDisableCellBackground;
        this.buildCellBody = this.BuildCellBody;
        this.buildMark = this.BuildMark;
        this.freshView = (item: CJDateItem) => {
            CJLogUtil.debug(TAG, "收到刷新：", JSON.stringify(item));
            if (this.month?.fullYear == item.fullYear && this.month.month == item.month) {
                // this.refresh()
            }
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isFold", this.isFoldChanged);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CJMonth_Params) {
        if (params.cjMonthController !== undefined) {
            this.cjMonthController = params.cjMonthController;
        }
        if (params.weeks !== undefined) {
            this.weeks = params.weeks;
        }
        if (params.days !== undefined) {
            this.days = params.days;
        }
        if (params.month !== undefined) {
            this.month = params.month;
        }
        if (params.weekCount !== undefined) {
            this.weekCount = params.weekCount;
        }
        if (params.today !== undefined) {
            this.today = params.today;
        }
        if (params.startDate !== undefined) {
            this.startDate = params.startDate;
        }
        if (params.endDate !== undefined) {
            this.endDate = params.endDate;
        }
        if (params.onReady !== undefined) {
            this.onReady = params.onReady;
        }
        if (params.cacheMaonthCount !== undefined) {
            this.cacheMaonthCount = params.cacheMaonthCount;
        }
        if (params.defSelectedItems !== undefined) {
            this.defSelectedItems = params.defSelectedItems;
        }
        if (params.selectedShape !== undefined) {
            this.selectedShape = params.selectedShape;
        }
        if (params.optMode !== undefined) {
            this.optMode = params.optMode;
        }
        if (params.selectedStyle !== undefined) {
            this.selectedStyle = params.selectedStyle;
        }
        if (params.calStyle !== undefined) {
            this.calStyle = params.calStyle;
        }
        if (params.cjDataItem !== undefined) {
            this.cjDataItem = params.cjDataItem;
        }
        if (params.animDuration !== undefined) {
            this.animDuration = params.animDuration;
        }
        if (params.itemFontColor !== undefined) {
            this.itemFontColor = params.itemFontColor;
        }
        if (params.cjCellStatus !== undefined) {
            this.cjCellStatus = params.cjCellStatus;
        }
        if (params.cjCellStyle !== undefined) {
            this.cjCellStyle = params.cjCellStyle;
        }
        if (params.disabledFontColor !== undefined) {
            this.disabledFontColor = params.disabledFontColor;
        }
        if (params.buildCellStyle !== undefined) {
            this.buildCellStyle = params.buildCellStyle;
        }
        if (params.onCellClickIntercept !== undefined) {
            this.onCellClickIntercept = params.onCellClickIntercept;
        }
        if (params.cellClick !== undefined) {
            this.cellClick = params.cellClick;
        }
        if (params.onSelectedChanged !== undefined) {
            this.onSelectedChanged = params.onSelectedChanged;
        }
        if (params.onMonthChanged !== undefined) {
            this.onMonthChanged = params.onMonthChanged;
        }
        if (params.reBuildCellItem !== undefined) {
            this.reBuildCellItem = params.reBuildCellItem;
        }
        if (params.buildCellLunarDesc !== undefined) {
            this.buildCellLunarDesc = params.buildCellLunarDesc;
        }
        if (params.buildCellBackground !== undefined) {
            this.buildCellBackground = params.buildCellBackground;
        }
        if (params.buildDisableCellBackground !== undefined) {
            this.buildDisableCellBackground = params.buildDisableCellBackground;
        }
        if (params.buildCellBody !== undefined) {
            this.buildCellBody = params.buildCellBody;
        }
        if (params.buildMark !== undefined) {
            this.buildMark = params.buildMark;
        }
        if (params.freshView !== undefined) {
            this.freshView = params.freshView;
        }
    }
    updateStateVars(params: CJMonth_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedItems.purgeDependencyOnElmtId(rmElmtId);
        this.__extras.purgeDependencyOnElmtId(rmElmtId);
        this.__weeks.purgeDependencyOnElmtId(rmElmtId);
        this.__days.purgeDependencyOnElmtId(rmElmtId);
        this.__itemCellHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__tempSelectedItem.purgeDependencyOnElmtId(rmElmtId);
        this.__month.purgeDependencyOnElmtId(rmElmtId);
        this.__weekStartMode.purgeDependencyOnElmtId(rmElmtId);
        this.__animDuration.purgeDependencyOnElmtId(rmElmtId);
        this.__themeColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedBorderRadius.purgeDependencyOnElmtId(rmElmtId);
        this.__isNeedMarkToday.purgeDependencyOnElmtId(rmElmtId);
        this.__onlyShowCurrMonthDay.purgeDependencyOnElmtId(rmElmtId);
        this.__showLunar.purgeDependencyOnElmtId(rmElmtId);
        this.__showJieQi.purgeDependencyOnElmtId(rmElmtId);
        this.__showJieRi.purgeDependencyOnElmtId(rmElmtId);
        this.__viewModel.purgeDependencyOnElmtId(rmElmtId);
        this.__isFold.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedItems.aboutToBeDeleted();
        this.__extras.aboutToBeDeleted();
        this.__weeks.aboutToBeDeleted();
        this.__days.aboutToBeDeleted();
        this.__itemCellHeight.aboutToBeDeleted();
        this.__tempSelectedItem.aboutToBeDeleted();
        this.__month.aboutToBeDeleted();
        this.__weekStartMode.aboutToBeDeleted();
        this.__animDuration.aboutToBeDeleted();
        this.__themeColor.aboutToBeDeleted();
        this.__selectedBorderRadius.aboutToBeDeleted();
        this.__isNeedMarkToday.aboutToBeDeleted();
        this.__onlyShowCurrMonthDay.aboutToBeDeleted();
        this.__showLunar.aboutToBeDeleted();
        this.__showJieQi.aboutToBeDeleted();
        this.__showJieRi.aboutToBeDeleted();
        this.__viewModel.aboutToBeDeleted();
        this.__isFold.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private cjMonthController: CJMonthController;
    private __selectedItems: ObservedPropertyAbstractPU<Array<CJDateItem>>;
    get selectedItems() {
        return this.__selectedItems.get();
    }
    set selectedItems(newValue: Array<CJDateItem>) {
        this.__selectedItems.set(newValue);
    }
    private __extras: ObservedPropertyAbstractPU<Record<string, number | string | boolean> | undefined>;
    get extras() {
        return this.__extras.get();
    }
    set extras(newValue: Record<string, number | string | boolean> | undefined) {
        this.__extras.set(newValue);
    }
    private __weeks: ObservedPropertyObjectPU<Array<Array<CJDateItem>>>;
    get weeks() {
        return this.__weeks.get();
    }
    set weeks(newValue: Array<Array<CJDateItem>>) {
        this.__weeks.set(newValue);
    }
    private __days: ObservedPropertyObjectPU<Array<CJDateItem>>;
    get days() {
        return this.__days.get();
    }
    set days(newValue: Array<CJDateItem>) {
        this.__days.set(newValue);
    }
    private __itemCellHeight: ObservedPropertyAbstractPU<number>;
    get itemCellHeight() {
        return this.__itemCellHeight.get();
    }
    set itemCellHeight(newValue: number) {
        this.__itemCellHeight.set(newValue);
    }
    private __tempSelectedItem: ObservedPropertyAbstractPU<CJDateItem>;
    get tempSelectedItem() {
        return this.__tempSelectedItem.get();
    }
    set tempSelectedItem(newValue: CJDateItem) {
        this.__tempSelectedItem.set(newValue);
    }
    private __month: ObservedPropertyObjectPU<CJDateItem | undefined>;
    get month() {
        return this.__month.get();
    }
    set month(newValue: CJDateItem | undefined) {
        this.__month.set(newValue);
    }
    private __weekStartMode: ObservedPropertyAbstractPU<WeekStartMode>;
    get weekStartMode() {
        return this.__weekStartMode.get();
    }
    set weekStartMode(newValue: WeekStartMode) {
        this.__weekStartMode.set(newValue);
    }
    private weekCount: number;
    private today: CJDateItem;
    private startDate: Date;
    private endDate: Date;
    private onReady?: (cjMonthController: CJMonthController) => void;
    //======================
    // 缓存月数
    private cacheMaonthCount: number;
    // 初始化默认选中日期：["2024-06-07"]
    private defSelectedItems: Array<string | Date> | undefined;
    /** 默认选中形状 */
    private selectedShape: SelectedShape;
    //================
    /** 操作模式 */
    private optMode: OptMode;
    private selectedStyle: SelectedStyle;
    /** 样式 */
    private calStyle: CJCalStyle;
    private cjDataItem?: CJDateItem;
    private __animDuration: ObservedPropertySimplePU<number>;
    get animDuration() {
        return this.__animDuration.get();
    }
    set animDuration(newValue: number) {
        this.__animDuration.set(newValue);
    }
    // =====theme======
    private __themeColor: ObservedPropertyAbstractPU<string>;
    get themeColor() {
        return this.__themeColor.get();
    }
    set themeColor(newValue: string) {
        this.__themeColor.set(newValue);
    }
    private __selectedBorderRadius: ObservedPropertyAbstractPU<number>;
    get selectedBorderRadius() {
        return this.__selectedBorderRadius.get();
    }
    set selectedBorderRadius(newValue: number) {
        this.__selectedBorderRadius.set(newValue);
    }
    private __isNeedMarkToday: ObservedPropertyAbstractPU<boolean>;
    get isNeedMarkToday() {
        return this.__isNeedMarkToday.get();
    }
    set isNeedMarkToday(newValue: boolean) {
        this.__isNeedMarkToday.set(newValue);
    }
    private itemFontColor: ResourceColor;
    private cjCellStatus: CellStatus;
    private cjCellStyle: CJCellStyle;
    // 不能使用的日期字体颜色
    private disabledFontColor: ResourceColor;
    // 是否仅显示当月日期
    private __onlyShowCurrMonthDay: ObservedPropertyAbstractPU<boolean
    // 是否显示农历
    >;
    get onlyShowCurrMonthDay() {
        return this.__onlyShowCurrMonthDay.get();
    }
    set onlyShowCurrMonthDay(newValue: boolean) {
        this.__onlyShowCurrMonthDay.set(newValue);
    }
    // 是否显示农历
    private __showLunar: ObservedPropertyAbstractPU<boolean>;
    get showLunar() {
        return this.__showLunar.get();
    }
    set showLunar(newValue: boolean) {
        this.__showLunar.set(newValue);
    }
    private __showJieQi: ObservedPropertyAbstractPU<boolean | undefined>;
    get showJieQi() {
        return this.__showJieQi.get();
    }
    set showJieQi(newValue: boolean | undefined) {
        this.__showJieQi.set(newValue);
    }
    private __showJieRi: ObservedPropertyAbstractPU<boolean | undefined>;
    get showJieRi() {
        return this.__showJieRi.get();
    }
    set showJieRi(newValue: boolean | undefined) {
        this.__showJieRi.set(newValue);
    }
    private __viewModel: ObservedPropertyAbstractPU<CJViewModel>;
    get viewModel() {
        return this.__viewModel.get();
    }
    set viewModel(newValue: CJViewModel) {
        this.__viewModel.set(newValue);
    }
    private __isFold: ObservedPropertyAbstractPU<boolean
    /** 自定义构建每一项的样式 */
    >;
    get isFold() {
        return this.__isFold.get();
    }
    set isFold(newValue: boolean) {
        this.__isFold.set(newValue);
    }
    /** 自定义构建每一项的样式 */
    private buildCellStyle: (cjDataItem: CJDateItem) => CJCellStyle;
    private onCellClickIntercept?: (item: CJDateItem) => boolean | undefined;
    private cellClick: (cjDataItem: CJDateItem) => void;
    /**
     * 选择改变监听，
     */
    private onSelectedChanged: (items: Array<CJDateItem>) => void;
    /**
     * 月份切换
     */
    private onMonthChanged: (month: Date) => void;
    /**
     * 重新构建Item
     */
    private reBuildCellItem?: (cjDateItem: CJDateItem) => void;
    /**
     * 获取农历描述信息
     */
    private buildCellLunarDesc?: (cjDateItem: CJDateItem) => string;
    // ========自定义布局==========
    /** 构建单元格背景 */
    private __buildCellBackground;
    /** 构建不可选中Cell背景，当实现buildCellBackground时，该方法无效 */
    private __buildDisableCellBackground;
    /** 构建单元格主体内容 */
    private __buildCellBody;
    /** 构建自定义标记 */
    private __buildMark;
    aboutToAppear(): void {
        CJLogUtil.debug(TAG, "月份初始化：aboutToAppear");
        this.cjMonthController.bind(this);
        this.onReady?.(this.cjMonthController);
        if (this.cjMonthController.getMonth()) {
            this.__calcMonthDays(new Date(this.cjMonthController.getMonth()!!.time));
        }
        else if (this.month) {
            this.__calcMonthDays(new Date(this.month.time));
        }
    }
    private freshView;
    aboutToDisappear(): void {
        this.cjMonthController.unbind();
    }
    BuildCellBackground(parent = null) {
    }
    BuildDisableCellBackground(parent = null) {
    }
    BuildCellBody(parent = null) {
    }
    BuildMark(parent = null) {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJMonth.ets(144:5)", "cjcalendar");
            Context.animation({
                duration: this.animDuration,
                curve: Curve.EaseOut,
                iterations: 1,
                playMode: PlayMode.Normal,
                onFinish: () => {
                    this.animDuration = 0;
                }
            });
            Flex.translate({
                y: this.isFold ? -this.getFoldRowIndex() * this.itemCellHeight : 0
            });
            Context.animation(null);
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.height(this.itemCellHeight);
                    __Common__.width("14.28%");
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new CJDay(this, {
                                cjDataItem: item,
                                today: this.today,
                                cjCellStyle: this.buildCellStyle(item),
                                buildDisableCellBackground: this.buildDisableCellBackground,
                                buildCellBackground: this.buildCellBackground,
                                buildCellBody: this.buildCellBody,
                                buildMark: this.buildMark,
                                onCellClickIntercept: (cellItem: CJDateItem) => {
                                    return this.onCellClickIntercept?.(cellItem);
                                },
                                cellClick: (cjDataItem: CJDateItem) => {
                                    CJLogUtil.debug(TAG, `cellClick foldRowIndex ${cjDataItem.foldRowIndex}`);
                                    this.cellClick(cjDataItem);
                                }
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJMonth.ets", line: 146, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    cjDataItem: item,
                                    today: this.today,
                                    cjCellStyle: this.buildCellStyle(item),
                                    buildDisableCellBackground: this.buildDisableCellBackground,
                                    buildCellBackground: this.buildCellBackground,
                                    buildCellBody: this.buildCellBody,
                                    buildMark: this.buildMark,
                                    onCellClickIntercept: (cellItem: CJDateItem) => {
                                        return this.onCellClickIntercept?.(cellItem);
                                    },
                                    cellClick: (cjDataItem: CJDateItem) => {
                                        CJLogUtil.debug(TAG, `cellClick foldRowIndex ${cjDataItem.foldRowIndex}`);
                                        this.cellClick(cjDataItem);
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                cjDataItem: item,
                                today: this.today
                            });
                        }
                    }, { name: "CJDay" });
                }
                __Common__.pop();
            };
            this.forEachUpdateFunction(elmtId, this.days, forEachItemGenFunction, (item: CJDateItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
    }
    // refresh(time: number) {
    //   this.__calcMonthDays(new Date(time))
    // }
    isFoldChanged() {
        this.animDuration = 500;
    }
    /**
     * 计算指定月份的所有日期
     */
    __calcMonthDays(month: Date) {
        // TODO 测试 记得删除
        // this.today.reset(new Date("2024-12-30"))
        month.setDate(1);
        if (this.days.length > 0) {
            this.days.splice(0, this.days.length);
        }
        // 计算第一个月
        // 获取第一个月总天数
        let endDay: Date = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59);
        CJLogUtil.debug(TAG, "endDay：" + endDay.getFullYear() + "-" + (endDay.getMonth() + 1) + "-" + endDay.getDate());
        // TimeConversionTool.formatDateTime()
        let tempDate: Date = new Date(month);
        CJLogUtil.debug("tempDate：", tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate());
        CJLogUtil.debug("tempDate 星期：", tempDate.getDay());
        const count = endDay.getDate();
        const preCount = month.getDay() - this.weekStartMode.valueOf() >= 0 ? month.getDay() - this.weekStartMode.valueOf() : 7 + month.getDay() - this.weekStartMode.valueOf();
        const nextCount = 6 - endDay.getDay() + this.weekStartMode.valueOf();
        const finilCount = count + preCount + nextCount;
        // 补齐上一个月
        tempDate.setDate(tempDate.getDate() - preCount);
        CJLogUtil.debug("补齐上一个月 tempDate：", tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate());
        // 添加日期
        const weekCount = finilCount / 7;
        // this.rows.splice(0, this.rows.length)
        for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
            for (let index = weekIndex * 7; index < (weekIndex + 1) * 7; index++) {
                let item = new CJDateItem(tempDate, (index < preCount ? true : false) || this.startDate.getTime() > tempDate.getTime(), (index >= preCount + count ? true : false) || this.endDate.getTime() < tempDate.getTime());
                item.foldRowIndex = weekIndex;
                item.isSmallThanStart = index < preCount;
                item.isBigThanEnd = index >= preCount + count;
                // CJLogUtil.debug("date:", item.date, ",isSmallThanStart:", item.isSmallThanStart, ",isBigThanEnd:", item.isBigThanEnd)
                item.isToday = tempDate.getFullYear() == this.today.fullYear && tempDate.getMonth() == this.today.month &&
                    tempDate.getDate() == this.today.date;
                if (this.reBuildCellItem) {
                    // item = this.reBuildCellItem(item)
                    this.reBuildCellItem?.(item);
                }
                if (this.showLunar) { // 显示农历
                    item.solar = Solar.fromYmd(item.fullYear, item.month + 1, item.date);
                    if (this.buildCellLunarDesc) {
                        item.desc = this.buildCellLunarDesc(item);
                    }
                    else {
                        item.desc = this._getLunarDesc(item, this.showJieQi, this.showJieRi);
                    }
                }
                // this.reBuildDateItem(item)
                // week.push(item)
                this.days.push(item);
                tempDate.setDate(tempDate.getDate() + 1);
            }
            this.weekCount++;
            // this.rows.push(weekIndex)
        }
    }
    refresh(date?: Date) {
        let temp: Date;
        if (date) {
            this.month = new CJDateItem(date);
            temp = date;
        }
        else {
            temp = new Date(this.month!!.fullYear, this.month!!.month, this.month!!.date);
        }
        this.__calcMonthDays(temp);
        // for (let date of this.days) {
        //   this.reBuildCellItem?.(date)
        // }
    }
    getFoldRowIndex(): number {
        for (let item of this.days) {
            if (this.tempSelectedItem.equalDay(item)) {
                return item.foldRowIndex;
            }
        }
        return 0;
    }
    _getLunarDesc(cjDataItem: CJDateItem, showJieQi: boolean | undefined, showJieRi: boolean | undefined): string {
        try {
            if (cjDataItem.solar) {
                if (showJieRi && cjDataItem.solar.getLunar().getFestivals().length > 0) {
                    return cjDataItem.solar.getLunar().getFestivals().join();
                }
                if (showJieQi && cjDataItem.solar.getLunar().getJieQi()) {
                    return cjDataItem.solar.getLunar().getJieQi();
                }
                return cjDataItem.solar.getLunar().getDayInChinese();
            }
        }
        catch (e) {
        }
        return "";
    }
    rerender() {
        this.updateDirtyElements();
    }
}
