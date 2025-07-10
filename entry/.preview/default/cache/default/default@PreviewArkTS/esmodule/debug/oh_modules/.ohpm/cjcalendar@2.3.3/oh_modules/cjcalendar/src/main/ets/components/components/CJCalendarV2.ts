if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CJCalendarV2_Params {
    controller?: CJCalendarControlV2;
    cacheCount?: number;
    logSwitch?: boolean;
    swipers?: Array<number>;
    cjMonthControllers?: Array<CJMonthController>;
    swiperController?: SwiperController;
    currentIndex?: number;
    cjCalStatus?: CJCalStatusParams;
    selectedItems?: Array<CJDateItem>;
    tempSelectedItem?: CJDateItem;
    months?: Array<CJDateItem>;
    extras?: Record<string, number | string | boolean> | undefined;
    weekStartMode?: WeekStartMode;
    // 初始化默认选中日期：["2024-06-07"]
    defSelectedItems?: Array<string | Date> | undefined;
    selectedShape?: SelectedShape;
    viewModel?: CJViewModel;
    //================
    today?: CJDateItem;
    // 当前显示月份、周、年==份
    currYMW?: Date;
    // 初始化显示所在月/星期/年
    initShowDate?: Date | undefined;
    optMode?: OptMode;
    startDate?: Date;
    endDate?: Date;
    endLastDay?: Date;
    startFirstDay?: Date;
    selectedStyle?: SelectedStyle;
    /** 样式 */
    calStyle?: CJCalStyle;
    cjDataItem?: CJDateItem;
    weeks?: string[];
    /** 星期标题字体大小 */
    weekTitleFontSize?: number | string | Resource;
    /** 星期标题字体颜色 */
    weekTitleFontColor?: ResourceColor;
    weekTitleBackgroundColor?: ResourceColor;
    // 星期标栏高度
    weekTitleHeight?: Length;
    /** 是否显示星期标题 */
    showWeekTitle?: boolean;
    themeColor?: string;
    selectedBorderRadius?: number;
    isNeedMarkToday?: boolean;
    itemFontColor?: ResourceColor;
    itemCellHeight?: number;
    cjCellStatus?: CellStatus;
    cjCellStyle?: CJCellStyle;
    // 不能使用的日期字体颜色
    disabledFontColor?: ResourceColor;
    // 标题栏高度
    titleHeight?: Length;
    titleBackgroundColor?: ResourceColor | undefined;
    titleBackgroundImage?: PixelMap | ResourceStr | DrawableDescriptor | undefined;
    // 标题年月格式化,默认：yyyy-MM
    titleFormat?: string;
    // 标题字体大小
    titleFontSize?: number | string | Resource;
    // 标题字体颜色
    titleFontColor?: ResourceColor;
    // 是否显示Toolbar
    showToolbar?: boolean;
    // 是否显示快捷 今
    showFastToday?: boolean;
    fastTodayFontSize?: number | string | Resource;
    fastTodayFontColor?: ResourceColor;
    fastTodayBackgroundColor?: ResourceColor // = "#03A9F4"
    ;
    // 仅需要日期显示区域，不需要底部自定义区域
    onlyShowDateArea?: boolean;
    // 回显方式，仅支持Normal操作模式，当本月选中某日期，切换下一月时回显同样日期，当选中当月最后一天或者第一天时，会出现两种情况
    // 1、当前选中当月最后一天如：31，则下月同样显示31，如下月不够，则显示当月最后一天
    // 2、当前选中当月最后一天，切换月日期不足显示第一天，
    // 3、月份切换时，目标月回显当月1号，
    // 默认第一种
    dateShowBackMode?: CJDateShowBackMode;
    isAttchCustomLayoutToWhole?: boolean;
    isShowFoldView?: boolean;
    // 设置后每一行会均分monthHeight高度
    monthHeight?: number | undefined;
    isFirst?: boolean;
    isFold?: boolean;
    foldRowIndex?: number;
    onlyShowCurrMonthDay?: boolean;
    showLunar?: boolean;
    showJieQi?: boolean | undefined;
    showJieRi?: boolean | undefined;
    markAlignment?: Alignment;
    // 从点击或者制定日期导致切换
    _month_change_from_click?: boolean;
    /** 状态改变回调 */
    onStatusChange?: (cjCalStatus: CJCalStatusParams) => void;
    /**
     * 获取农历描述信息
     */
    buildCellLunarDesc?: (cjDateItem: CJDateItem) => string;
    /** 自定义构建每一项的样式 */
    buildCellStyle?: (cjDataItem: CJDateItem) => CJCellStyle;
    /**
     * 选择改变监听，选择操作模式下才会触发
     */
    onSelectedChanged?: (items: Array<CJDateItem>) => void;
    /**
     * 点击前置拦截
     * @returns true 表示 拦截， false：不拦截
     */
    onCellClickIntercept?: (item: CJDateItem) => boolean | undefined;
    /**
     * 点击日期事件响应
     * @returns true: 拦截点击
     */
    onCellItemClick?: (item: CJDateItem) => boolean;
    /**
     * 不能点击项的点击日期事件响应
     * @returns true: 拦截点击
     */
    onDisableCellItemClick?: (item: CJDateItem) => boolean;
    /**
     * 月份切换之前
     */
    onMonthChangeBefore?: (curr: CJDateItem, target: CJDateItem) => void;
    /**
     * 变化之后
     */
    onAnimationEnd?: (item: CJDateItem) => void;
    /**
     * 月份切换
     */
    onMonthChanged?: (month: CJDateItem) => void;
    /**
     * 重新构建Item
     */
    reBuildCellItem?: (cjDateItem: CJDateItem) => void;
    toolbarLayout?: CustomBuilder;
    buildToolbarLayoutBackground?: CustomBuilder;
    buildCellBackground?: CustomBuilder;
    buildDisableCellBackground?: CustomBuilder;
    buildCellBody?: CustomBuilder;
    buildMark?: CustomBuilder;
    buildMonthCustomLayout?: CustomBuilder;
    buildFoldCustomLayout?: CustomBuilder;
    buildWeekTitleCell?: (week: string) => void;
    offsetY?: number;
    positionY?: number;
    isAniming?: boolean;
    startY?: number;
    startX?: number;
    // 初始化完成
    onInitFinish?: () => void;
}
import { CJDateItem } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJDateItem";
import { CJCellStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCellStyle";
import { OptMode } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/OptMode";
import { SelectedStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/SelectedStyle";
import { SelectedShape } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/SelectedShape";
import { CJCalStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCalStyle";
import { CellStatus } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CellStatus";
import { CJCalStatusParams } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCalStatusParams";
import { CJMonth } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJMonth";
import { CJCalendarControlV2 } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCalendarControlV2";
import TimeConversionTool from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/utils/TimeConversionTool";
import { CJViewModel } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJViewModel";
import { CJMonthController } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJMonthController";
import { CJWeek } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJWeek";
import { CJLogUtil } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/utils/CJLogUtil";
import { CJDateShowBackMode } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/data/CJDateShowBackMode";
import JSON from "@ohos:util.json";
import { WeekStartMode } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/data/WeekStartMode";
const TAG = "CJCalendarV2";
export class CJCalendarV2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new CJCalendarControlV2();
        this.cacheCount = 3;
        this.logSwitch = false;
        this.swipers = [];
        this.cjMonthControllers = [];
        this.swiperController = new SwiperController();
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__cjCalStatus = new ObservedPropertyObjectPU(new CJCalStatusParams()
        // 单选、多选不校验，时间段才必须是两个
        , this, "cjCalStatus");
        this.addProvidedVar("cjCalStatus", this.__cjCalStatus, false);
        this.__selectedItems = new ObservedPropertyObjectPU(new Array()
        // 临时选中项，用于切换时的标记，月模式 标记 日期，周模式 标记 星期
        , this, "selectedItems");
        this.addProvidedVar("selectedItems", this.__selectedItems, false);
        this.__tempSelectedItem = new ObservedPropertyObjectPU(new CJDateItem(new Date()), this, "tempSelectedItem");
        this.addProvidedVar("tempSelectedItem", this.__tempSelectedItem, false);
        this.__months = new ObservedPropertyObjectPU(new Array(), this, "months");
        this.__extras = new ObservedPropertyObjectPU(undefined, this, "extras");
        this.addProvidedVar("extras", this.__extras, false);
        this.__weekStartMode = new ObservedPropertySimplePU(WeekStartMode.Sunday
        // 初始化默认选中日期：["2024-06-07"]
        , this, "weekStartMode");
        this.addProvidedVar("weekStartMode", this.__weekStartMode, false);
        this.defSelectedItems = undefined;
        this.__selectedShape = new ObservedPropertySimplePU(SelectedShape.SHAPE_RECT
        // 视图模式，默认月视图
        , this, "selectedShape");
        this.addProvidedVar("selectedShape", this.__selectedShape, false);
        this.__viewModel = new ObservedPropertySimplePU(CJViewModel.MONTH
        //================
        , this, "viewModel");
        this.addProvidedVar("viewModel", this.__viewModel, false);
        this.today = new CJDateItem(new Date());
        this.currYMW = new Date();
        this.initShowDate = undefined;
        this.__optMode = new ObservedPropertySimplePU(OptMode.NORMAL, this, "optMode");
        this.addProvidedVar("optMode", this.__optMode, false);
        this.startDate = new Date("1970-01-01");
        this.endDate = new Date(new Date().getFullYear() + 10, 0, 1);
        this.endLastDay = new Date(this.endDate.getFullYear(), this.endDate.getMonth() + 1, 0, 23, 59, 59);
        this.startFirstDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1, 0, 0, 0);
        this.__selectedStyle = new ObservedPropertySimplePU(SelectedStyle.ALONE
        /** 样式 */
        , this, "selectedStyle");
        this.addProvidedVar("selectedStyle", this.__selectedStyle, false);
        this.calStyle = new CJCalStyle();
        this.cjDataItem = undefined;
        this.weeks = [];
        this.weekTitleFontSize = 13;
        this.weekTitleFontColor = "#9E9E9E";
        this.weekTitleBackgroundColor = "#00000000";
        this.weekTitleHeight = 40;
        this.showWeekTitle = true;
        this.__themeColor = new ObservedPropertySimplePU("#03A9F4"
        /** 全局圆角设置，优先级低于单元格内部圆角 */
        , this, "themeColor");
        this.addProvidedVar("themeColor", this.__themeColor, false);
        this.__selectedBorderRadius = new ObservedPropertySimplePU(4
        /** 是否需要标记出今日，仅在Nomal模式下支持 */
        , this, "selectedBorderRadius");
        this.addProvidedVar("selectedBorderRadius", this.__selectedBorderRadius, false);
        this.__isNeedMarkToday = new ObservedPropertySimplePU(false, this, "isNeedMarkToday");
        this.addProvidedVar("isNeedMarkToday", this.__isNeedMarkToday, false);
        this.itemFontColor = "#252a34";
        this.__itemCellHeight = new ObservedPropertySimplePU(55, this, "itemCellHeight");
        this.addProvidedVar("itemCellHeight", this.__itemCellHeight, false);
        this.cjCellStatus = new CellStatus();
        this.cjCellStyle = new CJCellStyle();
        this.disabledFontColor = "#9E9E9E";
        this.titleHeight = 50;
        this.titleBackgroundColor = undefined;
        this.titleBackgroundImage = undefined;
        this.titleFormat = "yyyy-MM";
        this.titleFontSize = 18;
        this.titleFontColor = "#252a34";
        this.showToolbar = true;
        this.showFastToday = true;
        this.fastTodayFontSize = 12;
        this.fastTodayFontColor = "#FFFFFF";
        this.fastTodayBackgroundColor = undefined;
        this.onlyShowDateArea = false;
        this.dateShowBackMode = CJDateShowBackMode.SHOW_LAST;
        this.__isAttchCustomLayoutToWhole = new ObservedPropertySimplePU(false
        // 是否显示折叠按钮
        , this, "isAttchCustomLayoutToWhole");
        this.__isShowFoldView = new ObservedPropertySimplePU(true
        // 设置后每一行会均分monthHeight高度
        , this, "isShowFoldView");
        this.monthHeight = undefined;
        this.isFirst = true;
        this.__isFold = new ObservedPropertySimplePU(false, this, "isFold");
        this.addProvidedVar("isFold", this.__isFold, false);
        this.__foldRowIndex = new ObservedPropertySimplePU(0
        // 是否仅显示当月日期
        , this, "foldRowIndex");
        this.__onlyShowCurrMonthDay = new ObservedPropertySimplePU(false
        // 是否显示农历
        , this, "onlyShowCurrMonthDay");
        this.addProvidedVar("onlyShowCurrMonthDay", this.__onlyShowCurrMonthDay, false);
        this.__showLunar = new ObservedPropertySimplePU(false, this, "showLunar");
        this.addProvidedVar("showLunar", this.__showLunar, false);
        this.__showJieQi = new ObservedPropertySimplePU(undefined, this, "showJieQi");
        this.addProvidedVar("showJieQi", this.__showJieQi, false);
        this.__showJieRi = new ObservedPropertySimplePU(undefined
        //
        , this, "showJieRi");
        this.addProvidedVar("showJieRi", this.__showJieRi, false);
        this.__markAlignment = new ObservedPropertySimplePU(Alignment.TopEnd
        // 从点击或者制定日期导致切换
        , this, "markAlignment");
        this.addProvidedVar("markAlignment", this.__markAlignment, false);
        this._month_change_from_click = false;
        this.onStatusChange = () => {
            console.debug("状态变化：", JSON.stringify(this.cjCalStatus));
        };
        this.buildCellLunarDesc = undefined;
        this.buildCellStyle = (cjDataItem: CJDateItem) => {
            return new CJCellStyle();
        };
        this.onSelectedChanged = () => {
        };
        this.onCellClickIntercept = undefined;
        this.onCellItemClick = undefined;
        this.onDisableCellItemClick = undefined;
        this.onMonthChangeBefore = undefined;
        this.onAnimationEnd = undefined;
        this.onMonthChanged = undefined;
        this.reBuildCellItem = undefined;
        this.toolbarLayout = this.ToolbarLayout;
        this.buildToolbarLayoutBackground = this.ToolbarLayoutBackground;
        this.buildCellBackground = this.BuildCellBackground;
        this.buildDisableCellBackground = this.BuildDisableCellBackground;
        this.buildCellBody = this.BuildCellBody;
        this.buildMark = this.BuildMark;
        this.buildMonthCustomLayout = undefined;
        this.buildFoldCustomLayout = undefined;
        this.buildWeekTitleCell = undefined;
        this.__offsetY = new ObservedPropertySimplePU(0, this, "offsetY");
        this.__positionY = new ObservedPropertySimplePU(0, this, "positionY");
        this.isAniming = false;
        this.startY = 0;
        this.startX = 0;
        this.onInitFinish = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("cjCalStatus", this.__onStatusChange);
        this.declareWatch("selectedItems", this.__onSelectedChanged);
        this.declareWatch("viewModel", this.__onViewModelChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CJCalendarV2_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cacheCount !== undefined) {
            this.cacheCount = params.cacheCount;
        }
        if (params.logSwitch !== undefined) {
            this.logSwitch = params.logSwitch;
        }
        if (params.swipers !== undefined) {
            this.swipers = params.swipers;
        }
        if (params.cjMonthControllers !== undefined) {
            this.cjMonthControllers = params.cjMonthControllers;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.cjCalStatus !== undefined) {
            this.cjCalStatus = params.cjCalStatus;
        }
        if (params.selectedItems !== undefined) {
            this.selectedItems = params.selectedItems;
        }
        if (params.tempSelectedItem !== undefined) {
            this.tempSelectedItem = params.tempSelectedItem;
        }
        if (params.months !== undefined) {
            this.months = params.months;
        }
        if (params.extras !== undefined) {
            this.extras = params.extras;
        }
        if (params.weekStartMode !== undefined) {
            this.weekStartMode = params.weekStartMode;
        }
        if (params.defSelectedItems !== undefined) {
            this.defSelectedItems = params.defSelectedItems;
        }
        if (params.selectedShape !== undefined) {
            this.selectedShape = params.selectedShape;
        }
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.today !== undefined) {
            this.today = params.today;
        }
        if (params.currYMW !== undefined) {
            this.currYMW = params.currYMW;
        }
        if (params.initShowDate !== undefined) {
            this.initShowDate = params.initShowDate;
        }
        if (params.optMode !== undefined) {
            this.optMode = params.optMode;
        }
        if (params.startDate !== undefined) {
            this.startDate = params.startDate;
        }
        if (params.endDate !== undefined) {
            this.endDate = params.endDate;
        }
        if (params.endLastDay !== undefined) {
            this.endLastDay = params.endLastDay;
        }
        if (params.startFirstDay !== undefined) {
            this.startFirstDay = params.startFirstDay;
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
        if (params.weeks !== undefined) {
            this.weeks = params.weeks;
        }
        if (params.weekTitleFontSize !== undefined) {
            this.weekTitleFontSize = params.weekTitleFontSize;
        }
        if (params.weekTitleFontColor !== undefined) {
            this.weekTitleFontColor = params.weekTitleFontColor;
        }
        if (params.weekTitleBackgroundColor !== undefined) {
            this.weekTitleBackgroundColor = params.weekTitleBackgroundColor;
        }
        if (params.weekTitleHeight !== undefined) {
            this.weekTitleHeight = params.weekTitleHeight;
        }
        if (params.showWeekTitle !== undefined) {
            this.showWeekTitle = params.showWeekTitle;
        }
        if (params.themeColor !== undefined) {
            this.themeColor = params.themeColor;
        }
        if (params.selectedBorderRadius !== undefined) {
            this.selectedBorderRadius = params.selectedBorderRadius;
        }
        if (params.isNeedMarkToday !== undefined) {
            this.isNeedMarkToday = params.isNeedMarkToday;
        }
        if (params.itemFontColor !== undefined) {
            this.itemFontColor = params.itemFontColor;
        }
        if (params.itemCellHeight !== undefined) {
            this.itemCellHeight = params.itemCellHeight;
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
        if (params.titleHeight !== undefined) {
            this.titleHeight = params.titleHeight;
        }
        if (params.titleBackgroundColor !== undefined) {
            this.titleBackgroundColor = params.titleBackgroundColor;
        }
        if (params.titleBackgroundImage !== undefined) {
            this.titleBackgroundImage = params.titleBackgroundImage;
        }
        if (params.titleFormat !== undefined) {
            this.titleFormat = params.titleFormat;
        }
        if (params.titleFontSize !== undefined) {
            this.titleFontSize = params.titleFontSize;
        }
        if (params.titleFontColor !== undefined) {
            this.titleFontColor = params.titleFontColor;
        }
        if (params.showToolbar !== undefined) {
            this.showToolbar = params.showToolbar;
        }
        if (params.showFastToday !== undefined) {
            this.showFastToday = params.showFastToday;
        }
        if (params.fastTodayFontSize !== undefined) {
            this.fastTodayFontSize = params.fastTodayFontSize;
        }
        if (params.fastTodayFontColor !== undefined) {
            this.fastTodayFontColor = params.fastTodayFontColor;
        }
        if (params.fastTodayBackgroundColor !== undefined) {
            this.fastTodayBackgroundColor = params.fastTodayBackgroundColor;
        }
        if (params.onlyShowDateArea !== undefined) {
            this.onlyShowDateArea = params.onlyShowDateArea;
        }
        if (params.dateShowBackMode !== undefined) {
            this.dateShowBackMode = params.dateShowBackMode;
        }
        if (params.isAttchCustomLayoutToWhole !== undefined) {
            this.isAttchCustomLayoutToWhole = params.isAttchCustomLayoutToWhole;
        }
        if (params.isShowFoldView !== undefined) {
            this.isShowFoldView = params.isShowFoldView;
        }
        if (params.monthHeight !== undefined) {
            this.monthHeight = params.monthHeight;
        }
        if (params.isFirst !== undefined) {
            this.isFirst = params.isFirst;
        }
        if (params.isFold !== undefined) {
            this.isFold = params.isFold;
        }
        if (params.foldRowIndex !== undefined) {
            this.foldRowIndex = params.foldRowIndex;
        }
        if (params.onlyShowCurrMonthDay !== undefined) {
            this.onlyShowCurrMonthDay = params.onlyShowCurrMonthDay;
        }
        if (params.showLunar !== undefined) {
            this.showLunar = params.showLunar;
        }
        if (params.showJieQi !== undefined) {
            this.showJieQi = params.showJieQi;
        }
        if (params.showJieRi !== undefined) {
            this.showJieRi = params.showJieRi;
        }
        if (params.markAlignment !== undefined) {
            this.markAlignment = params.markAlignment;
        }
        if (params._month_change_from_click !== undefined) {
            this._month_change_from_click = params._month_change_from_click;
        }
        if (params.onStatusChange !== undefined) {
            this.onStatusChange = params.onStatusChange;
        }
        if (params.buildCellLunarDesc !== undefined) {
            this.buildCellLunarDesc = params.buildCellLunarDesc;
        }
        if (params.buildCellStyle !== undefined) {
            this.buildCellStyle = params.buildCellStyle;
        }
        if (params.onSelectedChanged !== undefined) {
            this.onSelectedChanged = params.onSelectedChanged;
        }
        if (params.onCellClickIntercept !== undefined) {
            this.onCellClickIntercept = params.onCellClickIntercept;
        }
        if (params.onCellItemClick !== undefined) {
            this.onCellItemClick = params.onCellItemClick;
        }
        if (params.onDisableCellItemClick !== undefined) {
            this.onDisableCellItemClick = params.onDisableCellItemClick;
        }
        if (params.onMonthChangeBefore !== undefined) {
            this.onMonthChangeBefore = params.onMonthChangeBefore;
        }
        if (params.onAnimationEnd !== undefined) {
            this.onAnimationEnd = params.onAnimationEnd;
        }
        if (params.onMonthChanged !== undefined) {
            this.onMonthChanged = params.onMonthChanged;
        }
        if (params.reBuildCellItem !== undefined) {
            this.reBuildCellItem = params.reBuildCellItem;
        }
        if (params.toolbarLayout !== undefined) {
            this.toolbarLayout = params.toolbarLayout;
        }
        if (params.buildToolbarLayoutBackground !== undefined) {
            this.buildToolbarLayoutBackground = params.buildToolbarLayoutBackground;
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
        if (params.buildMonthCustomLayout !== undefined) {
            this.buildMonthCustomLayout = params.buildMonthCustomLayout;
        }
        if (params.buildFoldCustomLayout !== undefined) {
            this.buildFoldCustomLayout = params.buildFoldCustomLayout;
        }
        if (params.buildWeekTitleCell !== undefined) {
            this.buildWeekTitleCell = params.buildWeekTitleCell;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.positionY !== undefined) {
            this.positionY = params.positionY;
        }
        if (params.isAniming !== undefined) {
            this.isAniming = params.isAniming;
        }
        if (params.startY !== undefined) {
            this.startY = params.startY;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.onInitFinish !== undefined) {
            this.onInitFinish = params.onInitFinish;
        }
    }
    updateStateVars(params: CJCalendarV2_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__cjCalStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedItems.purgeDependencyOnElmtId(rmElmtId);
        this.__tempSelectedItem.purgeDependencyOnElmtId(rmElmtId);
        this.__months.purgeDependencyOnElmtId(rmElmtId);
        this.__extras.purgeDependencyOnElmtId(rmElmtId);
        this.__weekStartMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedShape.purgeDependencyOnElmtId(rmElmtId);
        this.__viewModel.purgeDependencyOnElmtId(rmElmtId);
        this.__optMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedStyle.purgeDependencyOnElmtId(rmElmtId);
        this.__themeColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedBorderRadius.purgeDependencyOnElmtId(rmElmtId);
        this.__isNeedMarkToday.purgeDependencyOnElmtId(rmElmtId);
        this.__itemCellHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__isAttchCustomLayoutToWhole.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowFoldView.purgeDependencyOnElmtId(rmElmtId);
        this.__isFold.purgeDependencyOnElmtId(rmElmtId);
        this.__foldRowIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__onlyShowCurrMonthDay.purgeDependencyOnElmtId(rmElmtId);
        this.__showLunar.purgeDependencyOnElmtId(rmElmtId);
        this.__showJieQi.purgeDependencyOnElmtId(rmElmtId);
        this.__showJieRi.purgeDependencyOnElmtId(rmElmtId);
        this.__markAlignment.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetY.purgeDependencyOnElmtId(rmElmtId);
        this.__positionY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__cjCalStatus.aboutToBeDeleted();
        this.__selectedItems.aboutToBeDeleted();
        this.__tempSelectedItem.aboutToBeDeleted();
        this.__months.aboutToBeDeleted();
        this.__extras.aboutToBeDeleted();
        this.__weekStartMode.aboutToBeDeleted();
        this.__selectedShape.aboutToBeDeleted();
        this.__viewModel.aboutToBeDeleted();
        this.__optMode.aboutToBeDeleted();
        this.__selectedStyle.aboutToBeDeleted();
        this.__themeColor.aboutToBeDeleted();
        this.__selectedBorderRadius.aboutToBeDeleted();
        this.__isNeedMarkToday.aboutToBeDeleted();
        this.__itemCellHeight.aboutToBeDeleted();
        this.__isAttchCustomLayoutToWhole.aboutToBeDeleted();
        this.__isShowFoldView.aboutToBeDeleted();
        this.__isFold.aboutToBeDeleted();
        this.__foldRowIndex.aboutToBeDeleted();
        this.__onlyShowCurrMonthDay.aboutToBeDeleted();
        this.__showLunar.aboutToBeDeleted();
        this.__showJieQi.aboutToBeDeleted();
        this.__showJieRi.aboutToBeDeleted();
        this.__markAlignment.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CJCalendarControlV2;
    private cacheCount: number;
    private logSwitch: boolean;
    private swipers: Array<number>;
    private cjMonthControllers: Array<CJMonthController>;
    private swiperController: SwiperController;
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __cjCalStatus: ObservedPropertyObjectPU<CJCalStatusParams>;
    get cjCalStatus() {
        return this.__cjCalStatus.get();
    }
    set cjCalStatus(newValue: CJCalStatusParams) {
        this.__cjCalStatus.set(newValue);
    }
    // 单选、多选不校验，时间段才必须是两个
    private __selectedItems: ObservedPropertyObjectPU<Array<CJDateItem>>;
    get selectedItems() {
        return this.__selectedItems.get();
    }
    set selectedItems(newValue: Array<CJDateItem>) {
        this.__selectedItems.set(newValue);
    }
    // 临时选中项，用于切换时的标记，月模式 标记 日期，周模式 标记 星期
    private __tempSelectedItem: ObservedPropertyObjectPU<CJDateItem>;
    get tempSelectedItem() {
        return this.__tempSelectedItem.get();
    }
    set tempSelectedItem(newValue: CJDateItem) {
        this.__tempSelectedItem.set(newValue);
    }
    private __months: ObservedPropertyObjectPU<Array<CJDateItem>>;
    get months() {
        return this.__months.get();
    }
    set months(newValue: Array<CJDateItem>) {
        this.__months.set(newValue);
    }
    private __extras: ObservedPropertyObjectPU<Record<string, number | string | boolean> | undefined>;
    get extras() {
        return this.__extras.get();
    }
    set extras(newValue: Record<string, number | string | boolean> | undefined) {
        this.__extras.set(newValue);
    }
    private __weekStartMode: ObservedPropertySimplePU<WeekStartMode>;
    get weekStartMode() {
        return this.__weekStartMode.get();
    }
    set weekStartMode(newValue: WeekStartMode) {
        this.__weekStartMode.set(newValue);
    }
    // 初始化默认选中日期：["2024-06-07"]
    private defSelectedItems: Array<string | Date> | undefined;
    /** 默认选中形状 */
    private __selectedShape: ObservedPropertySimplePU<SelectedShape>;
    get selectedShape() {
        return this.__selectedShape.get();
    }
    set selectedShape(newValue: SelectedShape) {
        this.__selectedShape.set(newValue);
    }
    // 视图模式，默认月视图
    private __viewModel: ObservedPropertySimplePU<CJViewModel>;
    get viewModel() {
        return this.__viewModel.get();
    }
    set viewModel(newValue: CJViewModel) {
        this.__viewModel.set(newValue);
    }
    //================
    private today: CJDateItem;
    // 当前显示月份、周、年==份
    private currYMW: Date;
    // 初始化显示所在月/星期/年
    private initShowDate: Date | undefined;
    /** 操作模式 */
    private __optMode: ObservedPropertySimplePU<OptMode>;
    get optMode() {
        return this.__optMode.get();
    }
    set optMode(newValue: OptMode) {
        this.__optMode.set(newValue);
    }
    private startDate: Date;
    private endDate: Date;
    private endLastDay: Date;
    private startFirstDay: Date;
    private __selectedStyle: ObservedPropertySimplePU<SelectedStyle>;
    get selectedStyle() {
        return this.__selectedStyle.get();
    }
    set selectedStyle(newValue: SelectedStyle) {
        this.__selectedStyle.set(newValue);
    }
    /** 样式 */
    private calStyle: CJCalStyle;
    private cjDataItem?: CJDateItem;
    private weeks: string[];
    /** 星期标题字体大小 */
    private weekTitleFontSize: number | string | Resource;
    /** 星期标题字体颜色 */
    private weekTitleFontColor: ResourceColor;
    private weekTitleBackgroundColor: ResourceColor;
    // 星期标栏高度
    private weekTitleHeight: Length;
    /** 是否显示星期标题 */
    private showWeekTitle: boolean;
    // =====theme======
    /** 主题色 */
    private __themeColor: ObservedPropertySimplePU<string>;
    get themeColor() {
        return this.__themeColor.get();
    }
    set themeColor(newValue: string) {
        this.__themeColor.set(newValue);
    }
    /** 全局圆角设置，优先级低于单元格内部圆角 */
    private __selectedBorderRadius: ObservedPropertySimplePU<number>;
    get selectedBorderRadius() {
        return this.__selectedBorderRadius.get();
    }
    set selectedBorderRadius(newValue: number) {
        this.__selectedBorderRadius.set(newValue);
    }
    /** 是否需要标记出今日，仅在Nomal模式下支持 */
    private __isNeedMarkToday: ObservedPropertySimplePU<boolean>;
    get isNeedMarkToday() {
        return this.__isNeedMarkToday.get();
    }
    set isNeedMarkToday(newValue: boolean) {
        this.__isNeedMarkToday.set(newValue);
    }
    private itemFontColor: ResourceColor;
    // 每一行高度
    private __itemCellHeight: ObservedPropertySimplePU<number>;
    get itemCellHeight() {
        return this.__itemCellHeight.get();
    }
    set itemCellHeight(newValue: number) {
        this.__itemCellHeight.set(newValue);
    }
    private cjCellStatus: CellStatus;
    private cjCellStyle: CJCellStyle;
    // 不能使用的日期字体颜色
    private disabledFontColor: ResourceColor;
    // 标题栏高度
    private titleHeight: Length;
    private titleBackgroundColor: ResourceColor | undefined;
    private titleBackgroundImage: PixelMap | ResourceStr | DrawableDescriptor | undefined;
    // 标题年月格式化,默认：yyyy-MM
    private titleFormat: string;
    // 标题字体大小
    private titleFontSize: number | string | Resource;
    // 标题字体颜色
    private titleFontColor: ResourceColor;
    // 是否显示Toolbar
    private showToolbar: boolean;
    // 是否显示快捷 今
    private showFastToday: boolean;
    private fastTodayFontSize: number | string | Resource;
    private fastTodayFontColor: ResourceColor;
    private fastTodayBackgroundColor?: ResourceColor; // = "#03A9F4"
    // 仅需要日期显示区域，不需要底部自定义区域
    private onlyShowDateArea: boolean;
    // 回显方式，仅支持Normal操作模式，当本月选中某日期，切换下一月时回显同样日期，当选中当月最后一天或者第一天时，会出现两种情况
    // 1、当前选中当月最后一天如：31，则下月同样显示31，如下月不够，则显示当月最后一天
    // 2、当前选中当月最后一天，切换月日期不足显示第一天，
    // 3、月份切换时，目标月回显当月1号，
    // 默认第一种
    private dateShowBackMode: CJDateShowBackMode;
    // 是否将底部用户布局添加到整体，默认是每个月
    private __isAttchCustomLayoutToWhole: ObservedPropertySimplePU<boolean>;
    get isAttchCustomLayoutToWhole() {
        return this.__isAttchCustomLayoutToWhole.get();
    }
    set isAttchCustomLayoutToWhole(newValue: boolean) {
        this.__isAttchCustomLayoutToWhole.set(newValue);
    }
    // 是否显示折叠按钮
    private __isShowFoldView: ObservedPropertySimplePU<boolean>;
    get isShowFoldView() {
        return this.__isShowFoldView.get();
    }
    set isShowFoldView(newValue: boolean) {
        this.__isShowFoldView.set(newValue);
    }
    // 设置后每一行会均分monthHeight高度
    private monthHeight: number | undefined;
    private isFirst: boolean;
    // 是否折叠
    private __isFold: ObservedPropertySimplePU<boolean>;
    get isFold() {
        return this.__isFold.get();
    }
    set isFold(newValue: boolean) {
        this.__isFold.set(newValue);
    }
    private __foldRowIndex: ObservedPropertySimplePU<number>;
    get foldRowIndex() {
        return this.__foldRowIndex.get();
    }
    set foldRowIndex(newValue: number) {
        this.__foldRowIndex.set(newValue);
    }
    // 是否仅显示当月日期
    private __onlyShowCurrMonthDay: ObservedPropertySimplePU<boolean>;
    get onlyShowCurrMonthDay() {
        return this.__onlyShowCurrMonthDay.get();
    }
    set onlyShowCurrMonthDay(newValue: boolean) {
        this.__onlyShowCurrMonthDay.set(newValue);
    }
    // 是否显示农历
    private __showLunar: ObservedPropertySimplePU<boolean>;
    get showLunar() {
        return this.__showLunar.get();
    }
    set showLunar(newValue: boolean) {
        this.__showLunar.set(newValue);
    }
    private __showJieQi: ObservedPropertySimplePU<boolean | undefined>;
    get showJieQi() {
        return this.__showJieQi.get();
    }
    set showJieQi(newValue: boolean | undefined) {
        this.__showJieQi.set(newValue);
    }
    private __showJieRi: ObservedPropertySimplePU<boolean | undefined>;
    get showJieRi() {
        return this.__showJieRi.get();
    }
    set showJieRi(newValue: boolean | undefined) {
        this.__showJieRi.set(newValue);
    }
    //
    private __markAlignment: ObservedPropertySimplePU<Alignment>;
    get markAlignment() {
        return this.__markAlignment.get();
    }
    set markAlignment(newValue: Alignment) {
        this.__markAlignment.set(newValue);
    }
    // 从点击或者制定日期导致切换
    private _month_change_from_click: boolean;
    /** 状态改变回调 */
    private onStatusChange: (cjCalStatus: CJCalStatusParams) => void;
    /**
     * 获取农历描述信息
     */
    private buildCellLunarDesc?: (cjDateItem: CJDateItem) => string;
    /** 自定义构建每一项的样式 */
    private buildCellStyle: (cjDataItem: CJDateItem) => CJCellStyle;
    /**
     * 选择改变监听，选择操作模式下才会触发
     */
    private onSelectedChanged: (items: Array<CJDateItem>) => void;
    /**
     * 点击前置拦截
     * @returns true 表示 拦截， false：不拦截
     */
    private onCellClickIntercept?: (item: CJDateItem) => boolean | undefined;
    /**
     * 点击日期事件响应
     * @returns true: 拦截点击
     */
    private onCellItemClick?: (item: CJDateItem) => boolean;
    /**
     * 不能点击项的点击日期事件响应
     * @returns true: 拦截点击
     */
    private onDisableCellItemClick?: (item: CJDateItem) => boolean;
    /**
     * 月份切换之前
     */
    private onMonthChangeBefore?: (curr: CJDateItem, target: CJDateItem) => void;
    /**
     * 变化之后
     */
    private onAnimationEnd?: (item: CJDateItem) => void;
    /**
     * 月份切换
     */
    private onMonthChanged?: (month: CJDateItem) => void;
    /**
     * 重新构建Item
     */
    private reBuildCellItem?: (cjDateItem: CJDateItem) => void;
    // ========自定义布局==========
    /** 构建整体标题栏 */
    private __toolbarLayout;
    /** 仅构建标题栏背景 */
    private __buildToolbarLayoutBackground;
    /** 构建单元格背景 */
    private __buildCellBackground;
    /** 构建不可选中Cell背景 */
    private __buildDisableCellBackground;
    /** 构建单元格主体内容 */
    private __buildCellBody;
    /** 构建自定义标记 */
    private __buildMark;
    /** 用户内容区 */
    private __buildMonthCustomLayout;
    /** 自定义折叠 */
    private __buildFoldCustomLayout;
    /** 自定义星期cell */
    private __buildWeekTitleCell;
    // ============滑动处理===============
    private __offsetY: ObservedPropertySimplePU<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private __positionY: ObservedPropertySimplePU<number>;
    get positionY() {
        return this.__positionY.get();
    }
    set positionY(newValue: number) {
        this.__positionY.set(newValue);
    }
    private isAniming: boolean;
    private startY: number;
    private startX: number;
    // 初始化完成
    private onInitFinish?: () => void;
    aboutToAppear() {
        this.__initAttrs();
        // this.buildCellBackground.bind(this)
        // 初始化其他参数
        // this.fastTodayBackgroundColor = this.themeColor
        this.cjCalStatus.showFastToday = this.showFastToday;
        // 初始化日期项
        this.__initDays();
        // 初始化完成回调
        if (this.onInitFinish) {
            this.onInitFinish();
        }
    }
    /**
     * 初始化星期标题栏参数
     */
    __initWeekParams() {
        if (this.weeks.length == 0 || !this.weeks) {
            if (this.weekStartMode == WeekStartMode.Sunday) {
                this.weeks = ["日", "一", "二", "三", "四", "五", "六"];
            }
            else if (this.weekStartMode == WeekStartMode.Saturday) {
                this.weeks = ["六", "日", "一", "二", "三", "四", "五"];
            }
            else if (this.weekStartMode == WeekStartMode.Friday) {
                this.weeks = ["五", "六", "日", "一", "二", "三", "四"];
            }
            else if (this.weekStartMode == WeekStartMode.Thursday) {
                this.weeks = ["四", "五", "六", "日", "一", "二", "三"];
            }
            else if (this.weekStartMode == WeekStartMode.Wednesday) {
                this.weeks = ["三", "四", "五", "六", "日", "一", "二"];
            }
            else if (this.weekStartMode == WeekStartMode.Tuesday) {
                this.weeks = ["二", "三", "四", "五", "六", "日", "一"];
            }
            else {
                this.weeks = ["一", "二", "三", "四", "五", "六", "日"];
            }
        }
    }
    /**
     * 初始化属性
     */
    __initAttrs() {
        CJLogUtil.IS_DEBUG = this.logSwitch;
        this.__initWeekParams();
        if (!this.fastTodayBackgroundColor) {
            this.fastTodayBackgroundColor = this.themeColor;
        }
        if (this.optMode != OptMode.NORMAL) {
            this.isNeedMarkToday = false;
        }
        // 初始化swiper item
        this.__calcSwiperCount();
        // 初始化农历相关属性
        if (this.showLunar) {
            if (this.showJieQi == undefined) {
                this.showJieQi = true;
            }
            if (this.showJieRi == undefined) {
                this.showJieRi = true;
            }
        }
        // 初始化defSelectedItems
        this.__changeSelectItems(this.defSelectedItems, false);
        // 操作模式初始化
        if (this.optMode == OptMode.NORMAL || this.optMode == OptMode.SINGLE) {
            if (this.optMode == OptMode.SINGLE) {
                if (this.selectedItems.length == 0) {
                    this.selectedItems.push(new CJDateItem(new Date()));
                }
            }
            else {
                if (this.selectedItems && this.selectedItems.length > 0) {
                    this.selectedItems.splice(0, this.selectedItems.length);
                }
                this.selectedItems.push(new CJDateItem(new Date()));
            }
        }
        if (this.endDate) {
            this.endLastDay = new Date(this.endDate.getFullYear(), this.endDate.getMonth() + 1, 0, 23, 59, 59);
        }
        if (this.startDate) {
            this.startDate.setHours(0, 0, 0);
            this.startFirstDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1, 0, 0, 0);
        }
        if (this.initShowDate) {
            if (this.initShowDate.getTime() > this.endDate.getTime()) {
                this.initShowDate = new Date(this.endDate);
            }
            if (this.initShowDate.getTime() < this.startDate.getTime()) {
                this.initShowDate = new Date(this.startDate);
            }
            this.tempSelectedItem.reset(this.initShowDate);
        }
        else {
            if (this.selectedItems.length > 0) {
                this.tempSelectedItem.reset(this.selectedItems[this.selectedItems.length - 1]);
            }
        }
        // 初始化ctroller
        if (!this.controller) {
            this.controller = new CJCalendarControlV2();
        }
        this.controller.bind(this);
        if (this.viewModel == CJViewModel.WEEK) {
            this.isFold = true;
            this.currYMW.setDate(this.tempSelectedItem.date - this.tempSelectedItem.week);
        }
        else if (this.viewModel == CJViewModel.MONTH) {
            // this.cjMonthController = new CJMonthController()
        }
        else if (this.viewModel == CJViewModel.YEAR) {
        }
    }
    /**
     * 计算页数
     */
    __calcSwiperCount() {
        if (this.viewModel == CJViewModel.MONTH) {
            let temp = TimeConversionTool.monthsBetween(this.startDate, this.endDate);
            if (temp < this.cacheCount) {
                this.cacheCount = temp;
            }
        }
        for (let i = 0; i < this.cacheCount; i++) {
            this.swipers.push(i);
            this.cjMonthControllers.push(new CJMonthController());
        }
    }
    aboutToDisappear() {
        this.controller.unbind();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(359:5)", "cjcalendar");
            Column.width("100%");
            Column.height(this.onlyShowDateArea ? undefined : "100%");
            Column.onTouch((event?: TouchEvent) => {
                if (!this.onlyShowDateArea) {
                    //TODO 处理滑动逻辑
                    if (event) {
                        if (event.type === TouchType.Down) {
                        }
                        else if (event.type === TouchType.Move) {
                        }
                        else if (event.type === TouchType.Up) {
                        }
                        else if (event.type === TouchType.Cancel) {
                        }
                    }
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // this.testTitle()
            // 顶部导航
            if (this.showToolbar && this.toolbarLayout) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.toolbarLayout.bind(this)();
                });
            }
            // 星期
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 星期
            if (this.showWeekTitle && this.viewModel != CJViewModel.YEAR) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.WeekTitleLayout.bind(this)();
                });
            }
            // 日期
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 日期
        this.BodyLayout.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 整体底部区域
            if (!this.onlyShowDateArea) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.viewModel != CJViewModel.YEAR && this.buildMonthCustomLayout && this.isAttchCustomLayoutToWhole) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(375:11)", "cjcalendar");
                                    Column.width("100%");
                                    Column.layoutWeight(1);
                                }, Column);
                                this.buildMonthCustomLayout.bind(this)();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    BuildDisableCellBackground(parent = null) {
    }
    BuildCellBackground(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cjDataItem?.disabled) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.buildDisableCellBackground) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.buildDisableCellBackground.bind(this)();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // if (this.cjDataItem?.fullYear == 2025 && this.cjDataItem.month == 0 && this.cjDataItem.date == 3 && this.cjDataItem.isNext){
                        //   Column()
                        //     .backgroundColor("#55aacc")
                        //     .width(100)
                        //     .height(100)
                        // }
                        if (this.optMode == OptMode.NORMAL ||
                            this.optMode == OptMode.MULTIPLE ||
                            this.optMode == OptMode.SINGLE) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    If.create();
                                    if (this.selectedShape == SelectedShape.LINE_CIRCLE) { // 线型-圆
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Column.create();
                                                Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(427:11)", "cjcalendar");
                                                Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                Column.width('90%');
                                                Column.aspectRatio(1);
                                                Column.border(this.cjCellStatus?.borderColor ? {
                                                    width: this.cjCellStatus.borderWidth,
                                                    color: this.cjCellStatus.borderColor,
                                                    radius: 200
                                                } : undefined);
                                            }, Column);
                                            Column.pop();
                                        });
                                    }
                                    else if (this.selectedShape == SelectedShape.LINE_RECT) { // 线型 - 矩形
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Column.create();
                                                Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(437:11)", "cjcalendar");
                                                Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                Column.width('90%');
                                                Column.aspectRatio(1);
                                                Column.border(this.cjCellStatus?.borderColor ? {
                                                    width: this.cjCellStatus.borderWidth,
                                                    color: this.cjCellStatus.borderColor
                                                } : undefined);
                                                Column.borderRadius(this.cjCellStyle.borderRadius);
                                            }, Column);
                                            Column.pop();
                                        });
                                    }
                                    else if (this.selectedShape == SelectedShape.SHAPE_CIRCLE) { // 圆形
                                        this.ifElseBranchUpdateFunction(2, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Column.create();
                                                Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(447:11)", "cjcalendar");
                                                Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                Column.width('90%');
                                                Column.aspectRatio(1);
                                                Column.border(this.cjCellStatus.borderColor ? {
                                                    width: this.cjCellStatus.borderWidth,
                                                    color: this.cjCellStatus.borderColor,
                                                } : undefined);
                                                Column.borderRadius(200);
                                            }, Column);
                                            Column.pop();
                                        });
                                    }
                                    else if (this.selectedShape == SelectedShape.SHAPE_RECT) { // 矩形
                                        this.ifElseBranchUpdateFunction(3, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Column.create();
                                                Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(457:11)", "cjcalendar");
                                                Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                Column.width('90%');
                                                Column.aspectRatio(1);
                                                Column.border(this.cjCellStatus.borderColor ? {
                                                    width: this.cjCellStatus.borderWidth,
                                                    color: this.cjCellStatus.borderColor
                                                } : undefined);
                                                Column.borderRadius(this.cjCellStyle.borderRadius);
                                            }, Column);
                                            Column.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(4, () => {
                                        });
                                    }
                                }, If);
                                If.pop();
                            });
                        }
                        else if (this.optMode == OptMode.RANGE) {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    If.create();
                                    if (this.selectedStyle == SelectedStyle.ALONE) { // 独立
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                If.create();
                                                if (this.selectedShape == SelectedShape.LINE_CIRCLE) { // 线型-圆
                                                    this.ifElseBranchUpdateFunction(0, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Column.create();
                                                            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(470:13)", "cjcalendar");
                                                            Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                            Column.width('90%');
                                                            Column.aspectRatio(1);
                                                            Column.border(this.cjCellStatus?.borderColor ? {
                                                                width: this.cjCellStatus.borderWidth,
                                                                color: this.cjCellStatus.borderColor,
                                                                radius: 200
                                                            } : undefined);
                                                        }, Column);
                                                        Column.pop();
                                                    });
                                                }
                                                else if (this.selectedShape == SelectedShape.LINE_RECT) { // 线型 - 矩形
                                                    this.ifElseBranchUpdateFunction(1, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Column.create();
                                                            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(480:13)", "cjcalendar");
                                                            Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                            Column.width('90%');
                                                            Column.aspectRatio(1);
                                                            Column.border(this.cjCellStatus?.borderColor ? {
                                                                width: this.cjCellStatus.borderWidth,
                                                                color: this.cjCellStatus.borderColor
                                                            } : undefined);
                                                            Column.borderRadius(this.cjCellStyle.borderRadius);
                                                        }, Column);
                                                        Column.pop();
                                                    });
                                                }
                                                else if (this.selectedShape == SelectedShape.SHAPE_CIRCLE) {
                                                    this.ifElseBranchUpdateFunction(2, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Column.create();
                                                            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(490:13)", "cjcalendar");
                                                            Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                            Column.width('90%');
                                                            Column.aspectRatio(1);
                                                            Column.border(this.cjCellStatus.borderColor ? {
                                                                width: this.cjCellStatus.borderWidth,
                                                                color: this.cjCellStyle.borderColor,
                                                            } : undefined);
                                                            Column.borderRadius(200);
                                                        }, Column);
                                                        Column.pop();
                                                    });
                                                }
                                                else if (this.selectedShape == SelectedShape.SHAPE_RECT) {
                                                    this.ifElseBranchUpdateFunction(3, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Column.create();
                                                            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(500:13)", "cjcalendar");
                                                            Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                            Column.width('90%');
                                                            Column.aspectRatio(1);
                                                            Column.border(this.cjCellStatus.borderColor ? {
                                                                width: this.cjCellStatus.borderWidth,
                                                                color: this.cjCellStatus.borderColor
                                                            } : undefined);
                                                            Column.borderRadius(this.cjCellStyle.borderRadius);
                                                        }, Column);
                                                        Column.pop();
                                                    });
                                                }
                                                else {
                                                    this.ifElseBranchUpdateFunction(4, () => {
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
                                                Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(511:11)", "cjcalendar");
                                                Column.backgroundColor(this.cjCellStatus.backgroundColor);
                                                Column.width('100%');
                                                Column.height("90%");
                                                Column.border(this.cjCellStatus.borderColor ? {
                                                    width: this.cjCellStatus.borderWidth,
                                                    color: this.cjCellStatus.borderColor
                                                } : undefined);
                                                Column.borderRadius({
                                                    topLeft: this.cjCellStatus.isStart ? this.cjCellStyle.borderRadius : 0,
                                                    topRight: this.cjCellStatus.isEnd ? this.cjCellStyle.borderRadius : 0,
                                                    bottomLeft: this.cjCellStatus.isStart ? this.cjCellStyle.borderRadius : 0,
                                                    bottomRight: this.cjCellStatus.isEnd ? this.cjCellStyle.borderRadius : 0
                                                });
                                            }, Column);
                                            Column.pop();
                                        });
                                    }
                                }, If);
                                If.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(2, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
        }, If);
        If.pop();
    }
    BuildCellBody(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(535:5)", "cjcalendar");
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedShape == SelectedShape.LINE_CIRCLE || this.selectedShape == SelectedShape.LINE_RECT) { // 线型
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.cjDataItem?.dateText ? this.cjDataItem.dateText : this.cjDataItem?.date + '');
                        Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(537:9)", "cjcalendar");
                        Text.fontColor(this.cjCellStatus.fontColor);
                        Text.fontSize(this.cjCellStatus.fontSize);
                        Text.fontWeight(this.cjCellStyle.fontFontWeight);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.showLunar && this.cjDataItem?.desc) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.cjDataItem.desc);
                                    Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(542:11)", "cjcalendar");
                                    Text.fontSize(this.cjCellStyle.descFontSize);
                                    Text.fontColor(this.cjCellStatus.descFontColor);
                                    Text.fontWeight(this.cjCellStyle.descFontFontWeight);
                                    Text.margin({
                                        top: this.cjCellStyle.descMargin
                                    });
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.cjDataItem?.dateText ? this.cjDataItem.dateText : this.cjDataItem?.date + '');
                        Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(551:9)", "cjcalendar");
                        Text.fontColor(this.cjCellStatus.fontColor);
                        Text.fontSize(this.cjCellStatus.fontSize);
                        Text.fontWeight(this.cjCellStyle.fontFontWeight);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.showLunar && this.cjDataItem?.desc) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.cjDataItem.desc);
                                    Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(556:11)", "cjcalendar");
                                    Text.fontSize(this.cjCellStyle.descFontSize);
                                    Text.fontColor(this.cjCellStatus.descFontColor);
                                    Text.fontWeight(this.cjCellStyle.descFontFontWeight);
                                    Text.margin({
                                        top: this.cjCellStyle.descMargin
                                    });
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
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    BuildMark(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(572:5)", "cjcalendar");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cjDataItem?.markImageUrl || this.cjDataItem?.markIcon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.cjDataItem?.markImageUrl);
                        Image.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(574:9)", "cjcalendar");
                        Image.alt(this.cjDataItem?.markIcon);
                        Image.objectFit(ImageFit.Contain);
                        Image.width(this.cjCellStyle.markImageWidth);
                        Image.height(this.cjCellStyle.markImageWidth);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.cjDataItem?.markText);
                        Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(580:9)", "cjcalendar");
                        Text.fontSize(this.cjCellStyle.markFontSize);
                        Text.fontColor(this.cjCellStatus.markFontColor);
                        Text.fontWeight(this.cjCellStyle.fontFontWeight);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    ToolbarLayoutBackground(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.titleBackgroundImage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.titleBackgroundImage);
                        Image.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(591:7)", "cjcalendar");
                        Image.width("100%");
                        Image.height("100%");
                        Image.objectFit(ImageFit.Fill);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.titleBackgroundColor) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(597:7)", "cjcalendar");
                        Row.width("100%");
                        Row.height("100%");
                        Row.backgroundColor(this.titleBackgroundColor);
                    }, Row);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    ToolbarLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(607:5)", "cjcalendar");
            Stack.width("100%");
            Stack.height(this.titleHeight);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buildToolbarLayoutBackground) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildToolbarLayoutBackground.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(611:7)", "cjcalendar");
            Row.width('100%');
            Row.height("100%");
            Row.backgroundColor("#00000000");
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777484, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(612:9)", "cjcalendar");
            Image.width(28);
            Image.fillColor(this.cjCalStatus.hasPre ? this.itemFontColor : this.disabledFontColor);
            Image.aspectRatio(1);
            Image.onClick(() => {
                // this.cjCalStatus.title = "2024-04"
                this.controller.preMonth();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(621:9)", "cjcalendar");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(623:9)", "cjcalendar");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cjCalStatus.title);
            Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(624:11)", "cjcalendar");
            Text.fontSize(this.titleFontSize);
            Text.fontColor(this.titleFontColor);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showFastToday && this.cjCalStatus.showFastToday) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("今");
                        Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(629:13)", "cjcalendar");
                        Text.fontSize(this.fastTodayFontSize);
                        Text.fontColor(this.fastTodayFontColor);
                        Text.backgroundColor(this.fastTodayBackgroundColor);
                        Text.borderRadius(50);
                        Text.padding(4);
                        Text.margin({ left: 4 });
                        Text.onClick(() => {
                            this.controller.backToday();
                        });
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
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(642:9)", "cjcalendar");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777479, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(644:9)", "cjcalendar");
            Image.width(28);
            Image.fillColor(this.cjCalStatus.hasNext ? this.itemFontColor : this.disabledFontColor);
            Image.aspectRatio(1);
            Image.onClick(() => {
                // this.cjCalStatus.title = "2024-06"
                this.controller.nextMonth();
            });
        }, Image);
        Row.pop();
        Stack.pop();
    }
    WeekTitleLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(664:5)", "cjcalendar");
            Row.backgroundColor(this.weekTitleBackgroundColor);
            Row.alignItems(VerticalAlign.Center);
            Row.height(this.weekTitleHeight);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.WeekTitleCell.bind(this)(item);
            };
            this.forEachUpdateFunction(elmtId, this.weeks, forEachItemGenFunction, (item: string) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    WeekTitleCell(week: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buildWeekTitleCell) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildWeekTitleCell.bind(this)(week);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(week);
                        Text.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(680:7)", "cjcalendar");
                        Text.textAlign(TextAlign.Center);
                        Text.fontColor(this.weekTitleFontColor);
                        Text.fontSize(this.weekTitleFontSize);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
    }
    YearLayout(parent = null) {
    }
    MonthLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(696:7)", "cjcalendar");
                    Column.width("100%");
                    Column.height(this.onlyShowDateArea || this.buildMonthCustomLayout && this.isAttchCustomLayoutToWhole ? undefined :
                        "100%");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(697:9)", "cjcalendar");
                    Context.animation({
                        duration: 500,
                        curve: Curve.EaseOut,
                        iterations: 1,
                        playMode: PlayMode.Normal,
                        onFinish: () => {
                            this.__foldAnimFinish();
                        }
                    });
                    Column.height(this.isFold ? this.itemCellHeight : undefined);
                    Context.animation(null);
                    Column.clip(true);
                    Column.width('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new CJMonth(this, {
                                // cjDataItem: item,
                                cjMonthController: item,
                                startDate: this.startDate,
                                endDate: this.endDate,
                                month: this.__getInitDate(index),
                                today: this.today,
                                // optMode: this.optMode,
                                buildDisableCellBackground: this.buildDisableCellBackground,
                                // cjCalStatus: this.cjCalStatus,
                                // themeColor: this.themeColor,
                                cjCellStyle: this.cjCellStyle,
                                // selectedStyle: this.selectedStyle,
                                // selectedShape: this.selectedShape,
                                // buildCellBackground: (item: CJDateItem, cjCellStyle: CJCellStyle, cjCellStatus: CellStatus) => {
                                //   this.buildCellBackground(item, cjCellStyle, cjCellStatus)
                                // },
                                buildCellBackground: this.buildCellBackground,
                                buildCellBody: this.buildCellBody,
                                buildMark: this.buildMark,
                                buildCellStyle: this.buildCellStyle,
                                reBuildCellItem: this.reBuildCellItem,
                                buildCellLunarDesc: this.buildCellLunarDesc,
                                onCellClickIntercept: (cellItem: CJDateItem) => {
                                    return this.onCellClickIntercept?.(cellItem);
                                },
                                cellClick: (cellItem: CJDateItem) => {
                                    CJLogUtil.debug(TAG, "cellClick" + cellItem.toString());
                                    if (!this.__cellItemClick(cellItem)) {
                                        if (cellItem.isPre) {
                                            if (this.controller) {
                                                this._month_change_from_click = true;
                                                this.controller.preMonth();
                                            }
                                        }
                                        else if (cellItem.isNext) {
                                            if (this.controller) {
                                                this._month_change_from_click = true;
                                                this.controller.nextMonth();
                                            }
                                        }
                                    }
                                },
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets", line: 698, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    // cjDataItem: item,
                                    cjMonthController: item,
                                    startDate: this.startDate,
                                    endDate: this.endDate,
                                    month: this.__getInitDate(index),
                                    today: this.today,
                                    // optMode: this.optMode,
                                    buildDisableCellBackground: this.buildDisableCellBackground,
                                    // cjCalStatus: this.cjCalStatus,
                                    // themeColor: this.themeColor,
                                    cjCellStyle: this.cjCellStyle,
                                    // selectedStyle: this.selectedStyle,
                                    // selectedShape: this.selectedShape,
                                    // buildCellBackground: (item: CJDateItem, cjCellStyle: CJCellStyle, cjCellStatus: CellStatus) => {
                                    //   this.buildCellBackground(item, cjCellStyle, cjCellStatus)
                                    // },
                                    buildCellBackground: this.buildCellBackground,
                                    buildCellBody: this.buildCellBody,
                                    buildMark: this.buildMark,
                                    buildCellStyle: this.buildCellStyle,
                                    reBuildCellItem: this.reBuildCellItem,
                                    buildCellLunarDesc: this.buildCellLunarDesc,
                                    onCellClickIntercept: (cellItem: CJDateItem) => {
                                        return this.onCellClickIntercept?.(cellItem);
                                    },
                                    cellClick: (cellItem: CJDateItem) => {
                                        CJLogUtil.debug(TAG, "cellClick" + cellItem.toString());
                                        if (!this.__cellItemClick(cellItem)) {
                                            if (cellItem.isPre) {
                                                if (this.controller) {
                                                    this._month_change_from_click = true;
                                                    this.controller.preMonth();
                                                }
                                            }
                                            else if (cellItem.isNext) {
                                                if (this.controller) {
                                                    this._month_change_from_click = true;
                                                    this.controller.nextMonth();
                                                }
                                            }
                                        }
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "CJMonth" });
                }
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (!this.onlyShowDateArea) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (this.isShowFoldView) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(757:13)", "cjcalendar");
                                            Row.justifyContent(FlexAlign.Center);
                                            Row.width("100%");
                                            Row.onClick(() => {
                                                this.isFold = !this.isFold;
                                            });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create(this.isFold ? { "id": 16777481, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777483, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                            Image.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(758:15)", "cjcalendar");
                                            Image.height(20);
                                            Image.width(40);
                                            Image.padding(4);
                                        }, Image);
                                        Row.pop();
                                    });
                                }
                                // 用户内容区
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                    });
                                }
                            }, If);
                            If.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 用户内容区
                                if (this.buildMonthCustomLayout && !this.isAttchCustomLayoutToWhole) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(773:13)", "cjcalendar");
                                            Column.width("100%");
                                            Column.layoutWeight(1);
                                        }, Column);
                                        this.buildMonthCustomLayout.bind(this)();
                                        Column.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                    });
                                }
                            }, If);
                            If.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.cjMonthControllers, forEachItemGenFunction, (item: CJMonthController, index: number) => JSON.stringify(item.getMonth()) + index, true, true);
        }, ForEach);
        ForEach.pop();
    }
    getKey(item: CJDateItem) {
        return item.fullYear + "-" + item.month;
    }
    WeekLayout(item: CJDateItem, parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CJWeek(this, {
                        startItem: item,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        today: this.today,
                        buildCellStyle: this.buildCellStyle,
                        buildDisableCellBackground: this.buildDisableCellBackground,
                        buildCellBackground: this.buildCellBackground,
                        buildCellBody: this.buildCellBody,
                        reBuildCellItem: this.reBuildCellItem,
                        cellClick: (cjDataItem: CJDateItem) => {
                            this.__cellItemClick(cjDataItem);
                        }
                    }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets", line: 794, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            startItem: item,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            today: this.today,
                            buildCellStyle: this.buildCellStyle,
                            buildDisableCellBackground: this.buildDisableCellBackground,
                            buildCellBackground: this.buildCellBackground,
                            buildCellBody: this.buildCellBody,
                            reBuildCellItem: this.reBuildCellItem,
                            cellClick: (cjDataItem: CJDateItem) => {
                                this.__cellItemClick(cjDataItem);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CJWeek" });
        }
    }
    BodyLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(812:5)", "cjcalendar");
            Column.clip(true);
            Column.width('100%');
            Column.layoutWeight(this.onlyShowDateArea || this.buildMonthCustomLayout && this.isAttchCustomLayoutToWhole ? undefined :
                1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.swiperController);
            Swiper.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJCalendarV2.ets(813:7)", "cjcalendar");
            Swiper.index(this.currentIndex);
            Swiper.indicator(false);
            Swiper.autoPlay(false);
            Swiper.loop(true);
            Swiper.cachedCount(1);
            Swiper.onAnimationStart((index, targetIndex) => {
                CJLogUtil.debug(TAG, "onAnimationStart index：" + index + "，targetIndex：" + targetIndex);
                this.onMonthChangeBefore?.(this.cjMonthControllers[index].getMonth()!!, this.cjMonthControllers[targetIndex].getMonth()!!);
                this.__onAnimationStart(index, targetIndex);
            });
            Swiper.onAnimationEnd((index: number) => {
                CJLogUtil.debug(TAG, "onAnimationEnd index：" + index);
                this.__onSwiperIndexChanged();
                this.__refreshPageData();
            });
            Swiper.onChange((index: number) => {
                this.currentIndex = index;
                CJLogUtil.debug(TAG, "index:" + index + ",currentIndex:" + this.currentIndex);
            });
            Swiper.height(this.onlyShowDateArea || this.buildMonthCustomLayout && this.isAttchCustomLayoutToWhole ? undefined :
                "100%");
            Swiper.width("100%");
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.viewModel == CJViewModel.MONTH || this.viewModel == CJViewModel.WEEK) {
                this.ifElseBranchUpdateFunction(0, () => {
                    // 月、周
                    this.MonthLayout.bind(this)();
                });
            }
            else if (this.viewModel == CJViewModel.YEAR) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (!this.onlyShowDateArea) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                // 年
                                this.YearLayout.bind(this)();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
        Swiper.pop();
        Column.pop();
    }
    __onStatusChange() {
        this.onStatusChange(this.cjCalStatus);
    }
    __onAnimationStart(index: number, targetIndex: number) {
        if (index != targetIndex) {
            if (index == 0 && targetIndex == this.cacheCount - 1) {
                // 上一页
                this.__onAnimationStartPreImpl(targetIndex);
            }
            else if (index == this.cacheCount - 1 && targetIndex == 0) {
                // 下一页
                this.__onAnimationStartNextImpl(targetIndex);
            }
            else if (targetIndex > index) {
                // 下一页
                this.__onAnimationStartNextImpl(targetIndex);
            }
            else {
                // 上一页
                this.__onAnimationStartPreImpl(targetIndex);
            }
        }
        this.__resetTempSelectedItem(index, targetIndex);
        this.__checkToolStatus();
    }
    /**
     * 上一页
     * @param targetIndex
     */
    __onAnimationStartPreImpl(targetIndex: number) {
        if (this.viewModel == CJViewModel.MONTH) {
            let preDate: Date = new Date(this.currYMW);
            preDate.setDate(0);
            this.currYMW.setMonth(this.currYMW.getMonth() - 1, this.currYMW.getDate() <= preDate.getDate() ? this.currYMW.getDate() : preDate.getDate());
        }
        else if (this.viewModel == CJViewModel.WEEK) {
            this.currYMW = new Date(this.tempSelectedItem.fullYear, this.tempSelectedItem.month, this.tempSelectedItem.date - 7 - this.tempSelectedItem.week);
        }
    }
    /**
     * 下一页
     * @param targetIndex
     */
    __onAnimationStartNextImpl(targetIndex: number) {
        if (this.viewModel == CJViewModel.MONTH) {
            let nextDate: Date = new Date(this.currYMW);
            nextDate.setMonth(nextDate.getMonth() + 2, 0);
            this.currYMW.setMonth(this.currYMW.getMonth() + 1, this.currYMW.getDate() <= nextDate.getDate() ? this.currYMW.getDate() : nextDate.getDate());
        }
        else if (this.viewModel == CJViewModel.WEEK) {
            this.currYMW = new Date(this.tempSelectedItem.fullYear, this.tempSelectedItem.month, this.tempSelectedItem.date + 7 - this.tempSelectedItem.week);
        }
    }
    /**
     * 调整临时选中项目
     */
    __resetTempSelectedItem(index: number, targetIndex: number) {
        let isNext: boolean = this.isNextPage(index, targetIndex);
        let date: number;
        if (this.selectedItems.length > 0) {
            date = this.selectedItems[this.selectedItems.length - 1].date;
        }
        else {
            date = new Date().getDate();
        }
        let temp: Date = new Date(this.tempSelectedItem.fullYear, this.tempSelectedItem.month, this.tempSelectedItem.date);
        let t: CJDateItem = this.cjMonthControllers[targetIndex].getMonth()!!;
        CJLogUtil.debug("月份切换：", `date: ${date}，t：${t.toString()}`);
        if (this.viewModel == CJViewModel.MONTH) {
            this.currYMW.setFullYear(t.fullYear, t.month, 1);
            // 末尾选中
            let show_click: boolean = (this.dateShowBackMode & CJDateShowBackMode.SHOW_CLICK) == CJDateShowBackMode.SHOW_CLICK;
            let mode = show_click ? this.dateShowBackMode - CJDateShowBackMode.SHOW_CLICK : this.dateShowBackMode;
            let last: Date = new Date(t.fullYear, t.month + 1, 0);
            if (mode == CJDateShowBackMode.SHOW_FIRST) {
                if (show_click && this._month_change_from_click) {
                    this._month_change_from_click = false;
                }
                else {
                    if (this.today.fullYear == t.fullYear && this.today.month == t.month) {
                        // 当月
                        this.tempSelectedItem.reset(new Date());
                        // this._resetSelectedItems()
                    }
                    else {
                        this.tempSelectedItem.reset(this.currYMW);
                    }
                }
                // this._resetSelectedItems()
            }
            else if (mode == CJDateShowBackMode.SHOW_PRE_LAST_NEXT_FIRST) {
                if (show_click && this._month_change_from_click) {
                    this._month_change_from_click = false;
                }
                else {
                    if (this.today.fullYear == t.fullYear && this.today.month == t.month) {
                        // 当月
                        this.tempSelectedItem.reset(new Date());
                        // this._resetSelectedItems()
                    }
                    else {
                        // 非当月
                        if (isNext) { // 下一月
                            this.tempSelectedItem.reset(new Date(t.fullYear, t.month, 1));
                            // this._resetSelectedItems()
                        }
                        else { // 上一月
                            this.tempSelectedItem.reset(last);
                            // this._resetSelectedItems()
                        }
                    }
                }
            }
            else {
                if (date <= last.getDate()) {
                    this.tempSelectedItem.reset(new Date(t.fullYear, t.month, date));
                }
                else {
                    if (mode == CJDateShowBackMode.SHOW_LAST) {
                        this.tempSelectedItem.reset(new Date(t.fullYear, t.month, last.getDate()));
                    }
                    else if (mode == CJDateShowBackMode.SHOW_LAST_TO_FIRST) {
                        if ((this.dateShowBackMode & CJDateShowBackMode.SHOW_CLICK) == CJDateShowBackMode.SHOW_CLICK &&
                            this._month_change_from_click) {
                            // 点击或者指定日期跳转
                            this._month_change_from_click = false;
                        }
                        else {
                            this.tempSelectedItem.reset(this.currYMW);
                        }
                    }
                }
            }
            CJLogUtil.debug("月份切换：", `tempSelectedItem: ${this.tempSelectedItem.toString()}}`);
        }
        else if (this.viewModel == CJViewModel.WEEK) {
            // 判断是否在同一个星期
            let d = new Date(this.currYMW.getTime());
            d.setDate(d.getDate() + this.tempSelectedItem.week);
            this.tempSelectedItem.reset(d);
        }
        // this.tempSelectedItem.
        this._resetSelectedItems();
    }
    _resetSelectedItems() {
        if (this.optMode == OptMode.NORMAL) {
            // 常规操作模式只会存在当前月标记
            if (this.selectedItems.length > 0 &&
                !this.tempSelectedItem.equalDay(this.selectedItems[this.selectedItems.length - 1])) {
                let t: CJDateItem = new CJDateItem(new Date());
                t.reset(this.tempSelectedItem);
                this.selectedItems[0] = t;
            }
        }
    }
    /**
     * 判断是否是下一页
     * @param index
     * @param targetIndex
     */
    isNextPage(index: number, targetIndex: number): boolean {
        if (index == this.cacheCount - 1 && targetIndex == 0) {
            return true;
        }
        else if (index == 0 && targetIndex == this.cacheCount - 1) {
            return false;
        }
        else if (targetIndex > index) {
            return true;
        }
        return false;
    }
    // 索引发生变化时
    __onSwiperIndexChanged() {
        // this.onAnimationEnd?.(this.itemDataSource.getData(index))
        let cjItem: CJDateItem = new CJDateItem(this.currYMW); // this.itemDataSource.getData(index)
        this.onMonthChanged?.(this.tempSelectedItem);
    }
    /**
     * 视图切换监听
     */
    private __onViewModelChange() {
        CJLogUtil.debug(TAG, "视图模式切换：", this.viewModel);
        if (this.selectedItems.length > 0) {
            let item: CJDateItem = this.selectedItems[this.selectedItems.length - 1];
            if (item.fullYear == this.tempSelectedItem.fullYear &&
                item.month == this.tempSelectedItem.month &&
                item.date != this.tempSelectedItem.date) {
                this.tempSelectedItem.reset(item);
            }
        }
        if (this.viewModel == CJViewModel.WEEK) {
            this.currYMW.setDate(this.tempSelectedItem.date - this.tempSelectedItem.week);
        }
        else {
            this.currYMW.setDate(1);
        }
        this.__refreshPageData();
    }
    private __cellItemClick(cellItem: CJDateItem): boolean | void {
        let flag: boolean | void = false;
        if (cellItem.smallThan(new CJDateItem(this.startDate)) ||
            cellItem.bigThan(new CJDateItem(this.endDate)) || cellItem.disabled) {
            if (this.onDisableCellItemClick) {
                flag = this.onDisableCellItemClick(cellItem);
            }
            else {
                if (this.onCellItemClick) {
                    flag = this.onCellItemClick(cellItem);
                }
            }
        }
        else {
            if (this.onCellItemClick) {
                flag = this.onCellItemClick(cellItem);
            }
        }
        return flag;
        // this.onSelectedChanged(this.selectedItems)
    }
    private __checkToolStatus() {
        this.cjCalStatus.title = TimeConversionTool.formatDateTime(this.currYMW, this.titleFormat);
        const currItem = new CJDateItem(this.currYMW);
        if (this.viewModel == CJViewModel.WEEK) {
            // 判断是否有上一星期
            if (this.startDate.getTime() < new Date(currItem.fullYear, currItem.month, currItem.date).getTime()) {
                this.cjCalStatus.hasPre = true;
            }
            else {
                this.cjCalStatus.hasPre = false;
            }
            // 判断是否有下一月
            if (this.endDate.getTime() >= new Date(currItem.fullYear, currItem.month, currItem.date + 7).getTime()) {
                this.cjCalStatus.hasNext = true;
            }
            else {
                this.cjCalStatus.hasNext = false;
            }
            // 判断是否显示 今
            if (this.today.time < currItem.time ||
                this.today.time >= new Date(currItem.fullYear, currItem.month, currItem.date + 7).getTime()) {
                this.cjCalStatus.showFastToday = true;
            }
            else {
                this.cjCalStatus.showFastToday = false;
            }
        }
        else if (this.viewModel == CJViewModel.MONTH) {
            // 判断是否有上一月
            if (TimeConversionTool.calcMontsBetween(this.startDate.getFullYear(), this.startDate.getMonth(), currItem.fullYear, currItem.month) > 0) {
                this.cjCalStatus.hasPre = true;
            }
            else {
                this.cjCalStatus.hasPre = false;
            }
            // 判断是否有下一月
            if (TimeConversionTool.calcMontsBetween(currItem.fullYear, currItem.month, this.endDate.getFullYear(), this.endDate.getMonth()) > 0) {
                this.cjCalStatus.hasNext = true;
            }
            else {
                this.cjCalStatus.hasNext = false;
            }
            // 判断是否显示 今
            // 本月不显示，本月不在开始与结束时间区域内时，不显示
            if (currItem.fullYear == this.today.fullYear &&
                currItem.month == this.today.month || (this.today.time < this.startDate.getTime()) ||
                this.today.time > this.endDate.getTime()) {
                this.cjCalStatus.showFastToday = false;
            }
            else {
                this.cjCalStatus.showFastToday = true;
            }
        }
        else if (this.viewModel == CJViewModel.YEAR) {
        }
    }
    /**
     * 修改选中项目
     */
    __changeSelectItems(items: Array<string | Date> | undefined, fresh: boolean = true) {
        if (fresh && this.selectedItems.length > 0) {
            this.selectedItems.splice(0, this.selectedItems.length);
        }
        if (items && items.length > 0) {
            if (this.optMode == OptMode.SINGLE) {
                if (typeof items[0] == "string") {
                    this.selectedItems.push(new CJDateItem(new Date(items[0])));
                }
                else {
                    this.selectedItems.push(new CJDateItem(items[0]));
                }
            }
            else if (this.optMode == OptMode.MULTIPLE) {
                items.forEach((item: string | Date) => {
                    if (typeof item == "string") {
                        this.selectedItems.push(new CJDateItem(new Date(item)));
                    }
                    else {
                        this.selectedItems.push(new CJDateItem(item));
                    }
                });
            }
            else if (this.optMode == OptMode.RANGE) {
                if (typeof items[0] == "string") {
                    this.selectedItems.push(new CJDateItem(new Date(items[0])));
                }
                else {
                    this.selectedItems.push(new CJDateItem(items[0]));
                }
                if (items.length >= 2) {
                    if (typeof items[1] == "string") {
                        this.selectedItems.push(new CJDateItem(new Date(items[1])));
                    }
                    else {
                        this.selectedItems.push(new CJDateItem(items[1]));
                    }
                }
            }
        }
    }
    __onSelectedChanged() {
        if (this.selectedItems.length > 0 &&
            !this.tempSelectedItem.equalDay(this.selectedItems[this.selectedItems.length - 1])) {
            this.tempSelectedItem.reset(this.selectedItems[this.selectedItems.length - 1]);
        }
        if (this.optMode != OptMode.NORMAL) {
            this.onSelectedChanged(this.selectedItems);
        }
    }
    /**
     * 上一月
     */
    __prePage() {
        if (!this.cjCalStatus.hasPre) {
            return;
        }
        this.swiperController.showPrevious();
    }
    /**
     * 初始化时，只会有第0页面、最后一页，第一页
     * @param index
     * @returns
     */
    __getInitDate(index: number): CJDateItem {
        if (index == 0) {
            return new CJDateItem(new Date(this.currYMW.getFullYear(), this.currYMW.getMonth(), 1));
        }
        else if (index == this.cacheCount - 1) {
            let preMonth: Date = new Date(this.currYMW.getFullYear(), this.currYMW.getMonth() - 1, 1, 0, 0, 0);
            if (preMonth.getTime() < this.startFirstDay.getTime()) {
                preMonth = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), 1);
            }
            return new CJDateItem(preMonth);
        }
        else {
            let nextMonth: Date = new Date(this.currYMW.getFullYear(), this.currYMW.getMonth() + 1, 1);
            if (nextMonth.getTime() > this.endLastDay.getTime()) {
                nextMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1);
            }
            return new CJDateItem(nextMonth);
        }
    }
    /**
     * 下一月
     */
    __nextPage() {
        if (!this.cjCalStatus.hasNext) {
            return;
        }
        this.swiperController.showNext();
    }
    /**
     * 回到今天
     */
    __backToday() {
        CJLogUtil.debug(TAG, "==============  回到当前年/月/周   ==============");
        this.__skipToDate(new Date());
    }
    /**
     * 跳转至指定的年月份
     * @param month “2016-08” / new Date(“2016-08”)
     */
    __skipToDate(date: Date | string) {
        CJLogUtil.debug(TAG, "==============  跳转指定年/月/周   ==============");
        let temp: Date;
        if (typeof date == "string") {
            temp = new Date(date);
        }
        else {
            temp = date;
        }
        this.tempSelectedItem.reset(temp);
        if (this.optMode == OptMode.NORMAL ||
            this.optMode == OptMode.SINGLE) {
            if (this.selectedItems.length > 0) {
                this.selectedItems.splice(0, this.selectedItems.length);
            }
            this.selectedItems.push(new CJDateItem(temp));
        }
        if (this.viewModel == CJViewModel.MONTH) {
            let count: number = TimeConversionTool.calcMontsBetween(this.currYMW.getFullYear(), this.currYMW.getMonth(), temp.getFullYear(), temp.getMonth());
            // if (count != 0) {
            // this._month_change_from_click = true
            // }
            if (count == 1) {
                this.__nextPage();
                return;
            }
            else if (count == -1) {
                this.__prePage();
                return;
            }
            this.currYMW = temp;
            this.currYMW.setDate(1);
        }
        else if (this.viewModel == CJViewModel.WEEK) {
            this.currYMW.setFullYear(temp.getFullYear(), temp.getMonth(), temp.getDate() - temp.getDay());
        }
        this.cjMonthControllers[this.currentIndex].refresh(new Date(this.currYMW));
        this.__checkToolStatus();
        this.__refreshPageData();
    }
    /**
     * 初始化日期项
     */
    __initDays() {
        this.__calcItems(new Date(this.currYMW));
    }
    /**
     * 计算指定月份的所有日期
     */
    __calcItems(date: Date) {
        date.setHours(0, 0, 0, 0);
        if (this.viewModel == CJViewModel.WEEK) { // 周视图
            let temp: Date;
            if (this.initShowDate) {
                if (this.initShowDate.getTime() < this.startDate.getTime()) {
                    temp = this.startDate;
                }
                else if (this.initShowDate.getTime() > this.endDate.getTime()) {
                    temp = this.endDate;
                }
                else {
                    temp = this.initShowDate;
                }
            }
            else {
                if (this.currYMW.getTime() < this.startDate.getTime()) {
                    temp = this.startDate;
                }
                else if (this.currYMW.getTime() > this.endDate.getTime()) {
                    temp = this.endDate;
                }
                else {
                    temp = this.currYMW;
                }
            }
            // 回到当前星期第一天
            date.setTime(temp.getTime());
            date.setDate(date.getDate() - date.getDay());
            // date.setDate(date.getDate() - 7 * Number.parseInt((this.firstInitCount / 5 * 4).toString()))
        }
        else if (this.viewModel == CJViewModel.MONTH) { // 月视图
            date.setDate(1);
            let temp: Date;
            if (this.initShowDate) {
                if (this.initShowDate.getTime() < this.startDate.getTime()) {
                    temp = this.startDate;
                }
                else if (this.initShowDate.getTime() > this.endDate.getTime()) {
                    temp = this.endDate;
                }
                else {
                    temp = this.initShowDate;
                }
            }
            else {
                if (this.currYMW.getTime() < this.startDate.getTime()) {
                    temp = this.startDate;
                }
                else if (this.currYMW.getTime() > this.endDate.getTime()) {
                    temp = this.endDate;
                }
                else {
                    temp = this.currYMW;
                }
            }
            this.currYMW = temp;
            if (!this.isFirst) {
                this.tempSelectedItem.reset(temp);
            }
            else {
                this.isFirst = false;
            }
        }
        else {
            // date.setFullYear(date.getFullYear() - Number.parseInt((this.firstInitCount / 5 * 4).toString()), 0, 1)
            let temp: Date;
            if (this.initShowDate) {
                if (this.initShowDate.getTime() < this.startDate.getTime()) {
                    temp = this.startDate;
                }
                else if (this.initShowDate.getTime() > this.endDate.getTime()) {
                    temp = this.endDate;
                }
                else {
                    temp = this.initShowDate;
                }
            }
            else {
                if (this.currYMW.getTime() < this.startDate.getTime()) {
                    temp = this.startDate;
                }
                else if (this.currYMW.getTime() > this.endDate.getTime()) {
                    temp = this.endDate;
                }
                else {
                    temp = this.currYMW;
                }
            }
            // 年视图
        }
        this.__refreshPageData();
        // 状态校验
        this.__checkToolStatus();
    }
    /**
     * 修改农历显示状态
     * @param show
     */
    changeShowLunar(show: boolean) {
        this.showLunar = show;
    }
    /**
     * 获取当指定页days
     * index: 0, 当前页， 1，下一页(大于0下一页)， -1，上一页（小于0上一页）
     * @param index
     * @returns
     */
    getPageItems(index: number = 0): CJDateItem[] | undefined {
        if (this.viewModel == CJViewModel.WEEK) {
        }
        else if (this.viewModel == CJViewModel.MONTH) {
            // return this.monthControllerMap.get(this.getKey(this.itemDataSource.getData(this.currentIndex)))?.getItems()
            if (index == 0) {
                return this.cjMonthControllers[this.currentIndex].getItems();
            }
            else if (index < 0) { //上一页
                if (this.cjMonthControllers.length > 1) {
                    if (this.currentIndex == 0) {
                        return this.cjMonthControllers[this.cjMonthControllers.length - 1].getItems();
                    }
                    else {
                        return this.cjMonthControllers[this.currentIndex - 1].getItems();
                    }
                }
                else {
                    return undefined;
                }
            }
            else { // 下一页
                if (this.cjMonthControllers.length > 1) {
                    if (this.currentIndex == this.cjMonthControllers.length - 1) {
                        return this.cjMonthControllers[0].getItems();
                    }
                    else {
                        return this.cjMonthControllers[this.currentIndex + 1].getItems();
                    }
                }
                else {
                    return undefined;
                }
            }
        }
        else if (this.viewModel == CJViewModel.YEAR) {
        }
        return undefined;
    }
    changViewModel(model: CJViewModel) {
        if (this.viewModel != model) {
            if (model == CJViewModel.WEEK) {
                this.isFold = true;
            }
            else {
                this.isFold = false;
            }
        }
        this.viewModel = model;
    }
    /**
     * 切换操作模式
     */
    changOptModel(optModel: OptMode) {
        this.optMode = optModel;
        if (this.optMode == OptMode.NORMAL || this.optMode == OptMode.SINGLE) {
            if (this.selectedItems.length > 1) {
                this.selectedItems.splice(0, this.selectedItems.length - 1);
            }
        }
        else {
            if (this.selectedItems.length > 0) {
                this.selectedItems.splice(0, this.selectedItems.length);
            }
        }
    }
    /**
     * 刷新日历
     * @param isAll：是否刷新所有月，默认刷新当前月
     */
    refresh(isAll: boolean = false) {
        if (isAll) {
            this.cjMonthControllers.forEach(controller => {
                controller.refresh();
            });
        }
        else {
            this.cjMonthControllers[this.currentIndex].refresh();
        }
    }
    // ======================V3=============================
    __refreshPageData() {
        if (this.cacheCount < 3) {
            return;
        }
        if (this.viewModel == CJViewModel.WEEK) {
            let temp: Date = new Date(this.tempSelectedItem.time);
            if (this.currentIndex == 0) {
                this.cjMonthControllers[this.cacheCount - 1]
                    .refresh(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() - 7));
                this.cjMonthControllers[1]
                    .refresh(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 7));
            }
            else if (this.currentIndex == this.cacheCount - 1) {
                this.cjMonthControllers[0]
                    .refresh(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 7));
                this.cjMonthControllers[this.cacheCount - 2]
                    .refresh(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() - 7));
            }
            else {
                this.cjMonthControllers[this.currentIndex - 1]
                    .refresh(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() - 7));
                this.cjMonthControllers[this.currentIndex + 1]
                    .refresh(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 7));
            }
        }
        else if (this.viewModel == CJViewModel.MONTH) {
            let preMonth: Date = new Date(this.currYMW.getFullYear(), this.currYMW.getMonth() - 1, 1);
            let nextMonth: Date = new Date(this.currYMW.getFullYear(), this.currYMW.getMonth() + 1, 1);
            if (preMonth.getTime() < this.startFirstDay.getTime()) {
                preMonth = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), 1);
            }
            if (nextMonth.getTime() > this.endLastDay.getTime()) {
                nextMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1);
            }
            if (this.currentIndex == 0) {
                this.cjMonthControllers[this.cacheCount - 1].refresh(preMonth);
                this.cjMonthControllers[1].refresh(nextMonth);
            }
            else if (this.currentIndex == this.cacheCount - 1) {
                this.cjMonthControllers[0].refresh(nextMonth);
                this.cjMonthControllers[this.cacheCount - 2].refresh(preMonth);
            }
            else {
                this.cjMonthControllers[this.currentIndex - 1].refresh(preMonth);
                this.cjMonthControllers[this.currentIndex + 1].refresh(nextMonth);
            }
        }
    }
    /**
     * 折叠动画结束
     */
    __foldAnimFinish() {
        if (this.isFold) {
            // 周模式
            this.viewModel = CJViewModel.WEEK;
        }
        else {
            // 月模式
            this.viewModel = CJViewModel.MONTH;
        }
    }
    /**
     * 折叠
     */
    setFoldStatue(fold: boolean) {
        this.foldRowIndex = this.cjMonthControllers[this.currentIndex].getFoldRowIndex();
        console.log(TAG, "setFoldStatue foldRowIndex：", this.foldRowIndex);
        this.isFold = fold;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
