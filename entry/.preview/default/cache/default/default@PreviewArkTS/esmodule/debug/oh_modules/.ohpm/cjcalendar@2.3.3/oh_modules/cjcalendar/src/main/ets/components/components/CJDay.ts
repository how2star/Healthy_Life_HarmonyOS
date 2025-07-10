if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CJDay_Params {
    cjCellStatus?: CellStatus;
    cjDataItem?: CJDateItem;
    today?: CJDateItem;
    selectedItems?: Array<CJDateItem>;
    cjCalStatus?: CJCalStatusParams;
    extras?: Record<string, number | string | boolean> | undefined;
    selectedStyle?: SelectedStyle;
    selectedShape?: SelectedShape;
    optMode?: OptMode;
    itemCellHeight?: number;
    cjCellStyle?: CJCellStyle;
    onlyShowCurrMonthDay?: boolean;
    showLunar?: boolean;
    showJieQi?: boolean;
    showJieRi?: boolean;
    markAlignment?: Alignment;
    themeColor?: string;
    selectedBorderRadius?: number;
    isNeedMarkToday?: boolean;
    tempSelectedItem?: CJDateItem;
    // 点击
    cellClick?: (cjDataItem: CJDateItem) => void;
    onCellClickIntercept?: (item: CJDateItem) => boolean | undefined;
    buildCellBackground?: CustomBuilder;
    buildDisableCellBackground?: CustomBuilder;
    buildCellBody?: CustomBuilder;
    buildMark?: CustomBuilder;
}
import { ColorUtil } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/utils/ColorUtil";
import type { CJDateItem } from './CJDateItem';
import { CJCellStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCellStyle";
import { CellStatus } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CellStatus";
import type { SelectedStyle } from './SelectedStyle';
import type { CJCalStatusParams } from './CJCalStatusParams';
import { SelectedShape } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/SelectedShape";
import { OptMode } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/OptMode";
export class CJDay extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cjCellStatus = new ObservedPropertyObjectPU(new CellStatus(), this, "cjCellStatus");
        this.__cjDataItem = new SynchedPropertyNesedObjectPU(params.cjDataItem, this, "cjDataItem");
        this.__today = new SynchedPropertyObjectOneWayPU(params.today, this, "today");
        this.__selectedItems = this.initializeConsume("selectedItems", "selectedItems");
        this.__cjCalStatus = this.initializeConsume("cjCalStatus", "cjCalStatus");
        this.__extras = this.initializeConsume("extras", "extras");
        this.__selectedStyle = this.initializeConsume("selectedStyle", "selectedStyle");
        this.__selectedShape = this.initializeConsume("selectedShape", "selectedShape");
        this.__optMode = this.initializeConsume("optMode", "optMode");
        this.__itemCellHeight = this.initializeConsume("itemCellHeight", "itemCellHeight");
        this.cjCellStyle = new CJCellStyle();
        this.__onlyShowCurrMonthDay = this.initializeConsume("onlyShowCurrMonthDay", "onlyShowCurrMonthDay");
        this.__showLunar = this.initializeConsume("showLunar", "showLunar");
        this.__showJieQi = this.initializeConsume("showJieQi", "showJieQi");
        this.__showJieRi = this.initializeConsume("showJieRi", "showJieRi");
        this.__markAlignment = this.initializeConsume("markAlignment", "markAlignment");
        this.__themeColor = this.initializeConsume("themeColor", "themeColor");
        this.__selectedBorderRadius = this.initializeConsume("selectedBorderRadius", "selectedBorderRadius");
        this.__isNeedMarkToday = this.initializeConsume("isNeedMarkToday", "isNeedMarkToday");
        this.__tempSelectedItem = this.initializeConsume("tempSelectedItem", "tempSelectedItem");
        this.cellClick = () => {
        };
        this.onCellClickIntercept = undefined;
        this.buildCellBackground = this.BuildCellBackground;
        this.buildDisableCellBackground = this.BuildDisableCellBackground;
        this.buildCellBody = this.BuildCellBody;
        this.buildMark = this.BuildMark;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("selectedItems", this.__onSelectChange);
        this.declareWatch("tempSelectedItem", this.__onTempSelectedChangeed);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CJDay_Params) {
        if (params.cjCellStatus !== undefined) {
            this.cjCellStatus = params.cjCellStatus;
        }
        this.__cjDataItem.set(params.cjDataItem);
        if (params.cjCellStyle !== undefined) {
            this.cjCellStyle = params.cjCellStyle;
        }
        if (params.cellClick !== undefined) {
            this.cellClick = params.cellClick;
        }
        if (params.onCellClickIntercept !== undefined) {
            this.onCellClickIntercept = params.onCellClickIntercept;
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
    }
    updateStateVars(params: CJDay_Params) {
        this.__cjDataItem.set(params.cjDataItem);
        this.__today.reset(params.today);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cjCellStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__cjDataItem.purgeDependencyOnElmtId(rmElmtId);
        this.__today.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedItems.purgeDependencyOnElmtId(rmElmtId);
        this.__cjCalStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__extras.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedStyle.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedShape.purgeDependencyOnElmtId(rmElmtId);
        this.__optMode.purgeDependencyOnElmtId(rmElmtId);
        this.__itemCellHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__onlyShowCurrMonthDay.purgeDependencyOnElmtId(rmElmtId);
        this.__showLunar.purgeDependencyOnElmtId(rmElmtId);
        this.__showJieQi.purgeDependencyOnElmtId(rmElmtId);
        this.__showJieRi.purgeDependencyOnElmtId(rmElmtId);
        this.__markAlignment.purgeDependencyOnElmtId(rmElmtId);
        this.__themeColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedBorderRadius.purgeDependencyOnElmtId(rmElmtId);
        this.__isNeedMarkToday.purgeDependencyOnElmtId(rmElmtId);
        this.__tempSelectedItem.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cjCellStatus.aboutToBeDeleted();
        this.__cjDataItem.aboutToBeDeleted();
        this.__today.aboutToBeDeleted();
        this.__selectedItems.aboutToBeDeleted();
        this.__cjCalStatus.aboutToBeDeleted();
        this.__extras.aboutToBeDeleted();
        this.__selectedStyle.aboutToBeDeleted();
        this.__selectedShape.aboutToBeDeleted();
        this.__optMode.aboutToBeDeleted();
        this.__itemCellHeight.aboutToBeDeleted();
        this.__onlyShowCurrMonthDay.aboutToBeDeleted();
        this.__showLunar.aboutToBeDeleted();
        this.__showJieQi.aboutToBeDeleted();
        this.__showJieRi.aboutToBeDeleted();
        this.__markAlignment.aboutToBeDeleted();
        this.__themeColor.aboutToBeDeleted();
        this.__selectedBorderRadius.aboutToBeDeleted();
        this.__isNeedMarkToday.aboutToBeDeleted();
        this.__tempSelectedItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cjCellStatus: ObservedPropertyObjectPU<CellStatus>;
    get cjCellStatus() {
        return this.__cjCellStatus.get();
    }
    set cjCellStatus(newValue: CellStatus) {
        this.__cjCellStatus.set(newValue);
    }
    private __cjDataItem: SynchedPropertyNesedObjectPU<CJDateItem>;
    get cjDataItem() {
        return this.__cjDataItem.get();
    }
    private __today: SynchedPropertySimpleOneWayPU<CJDateItem>;
    get today() {
        return this.__today.get();
    }
    set today(newValue: CJDateItem) {
        this.__today.set(newValue);
    }
    private __selectedItems: ObservedPropertyAbstractPU<Array<CJDateItem>>;
    get selectedItems() {
        return this.__selectedItems.get();
    }
    set selectedItems(newValue: Array<CJDateItem>) {
        this.__selectedItems.set(newValue);
    }
    private __cjCalStatus: ObservedPropertyAbstractPU<CJCalStatusParams>;
    get cjCalStatus() {
        return this.__cjCalStatus.get();
    }
    set cjCalStatus(newValue: CJCalStatusParams) {
        this.__cjCalStatus.set(newValue);
    }
    private __extras: ObservedPropertyAbstractPU<Record<string, number | string | boolean> | undefined>;
    get extras() {
        return this.__extras.get();
    }
    set extras(newValue: Record<string, number | string | boolean> | undefined) {
        this.__extras.set(newValue);
    }
    private __selectedStyle: ObservedPropertyAbstractPU<SelectedStyle
    /** 默认选中形状 */
    >;
    get selectedStyle() {
        return this.__selectedStyle.get();
    }
    set selectedStyle(newValue: SelectedStyle) {
        this.__selectedStyle.set(newValue);
    }
    /** 默认选中形状 */
    private __selectedShape: ObservedPropertyAbstractPU<SelectedShape>;
    get selectedShape() {
        return this.__selectedShape.get();
    }
    set selectedShape(newValue: SelectedShape) {
        this.__selectedShape.set(newValue);
    }
    private __optMode: ObservedPropertyAbstractPU<OptMode>;
    get optMode() {
        return this.__optMode.get();
    }
    set optMode(newValue: OptMode) {
        this.__optMode.set(newValue);
    }
    private __itemCellHeight: ObservedPropertyAbstractPU<number>;
    get itemCellHeight() {
        return this.__itemCellHeight.get();
    }
    set itemCellHeight(newValue: number) {
        this.__itemCellHeight.set(newValue);
    }
    private cjCellStyle: CJCellStyle;
    private __onlyShowCurrMonthDay: ObservedPropertyAbstractPU<boolean>;
    get onlyShowCurrMonthDay() {
        return this.__onlyShowCurrMonthDay.get();
    }
    set onlyShowCurrMonthDay(newValue: boolean) {
        this.__onlyShowCurrMonthDay.set(newValue);
    }
    private __showLunar: ObservedPropertyAbstractPU<boolean>;
    get showLunar() {
        return this.__showLunar.get();
    }
    set showLunar(newValue: boolean) {
        this.__showLunar.set(newValue);
    }
    private __showJieQi: ObservedPropertyAbstractPU<boolean>;
    get showJieQi() {
        return this.__showJieQi.get();
    }
    set showJieQi(newValue: boolean) {
        this.__showJieQi.set(newValue);
    }
    private __showJieRi: ObservedPropertyAbstractPU<boolean>;
    get showJieRi() {
        return this.__showJieRi.get();
    }
    set showJieRi(newValue: boolean) {
        this.__showJieRi.set(newValue);
    }
    private __markAlignment: ObservedPropertyAbstractPU<Alignment>;
    get markAlignment() {
        return this.__markAlignment.get();
    }
    set markAlignment(newValue: Alignment) {
        this.__markAlignment.set(newValue);
    }
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
    private __tempSelectedItem: ObservedPropertyAbstractPU<CJDateItem
    // 点击
    >;
    get tempSelectedItem() {
        return this.__tempSelectedItem.get();
    }
    set tempSelectedItem(newValue: CJDateItem) {
        this.__tempSelectedItem.set(newValue);
    }
    // 点击
    private cellClick: (cjDataItem: CJDateItem) => void;
    private onCellClickIntercept?: (item: CJDateItem) => boolean | undefined;
    // ========自定义布局=======
    private __buildCellBackground;
    /** 构建不可选中Cell背景 */
    private __buildDisableCellBackground;
    private __buildCellBody;
    /** 构建自定义标记 */
    private __buildMark;
    aboutToAppear(): void {
        // if (this.cjDataItem.equalDay(this.today)) {
        //   this.cjCellStatus.fontColor = this.themeColor
        // } else {
        //   this.cjCellStatus.fontColor = this.cjCellStyle.fontColor
        // }
        // getContext().eventHub.on(CJConstants.CJCALENDER_CJDAY_CLICK, this.eventFunc)
        this._initStyle();
        this.__onSelectChange();
    }
    _onThemeColorChange() {
        this._initStyle();
    }
    _initStyle() {
        if (this.themeColor) {
            if (!this.cjCellStyle.selectItemBackgroundColor) {
                this.cjCellStyle.selectItemBackgroundColor = this.themeColor;
            }
            if (!this.cjCellStyle.markFontColor) {
                this.cjCellStyle.markFontColor = this.themeColor;
            }
        }
        if (this.selectedBorderRadius) {
            if (!this.cjCellStyle.borderRadius) {
                this.cjCellStyle.borderRadius = this.selectedBorderRadius;
            }
        }
    }
    eventFunc(year: number, month: number, date: number) {
        console.log(`eventFunc is called, ${year}, ${month},${date}`);
    }
    aboutToDisappear(): void {
        // getContext().eventHub.off(CJConstants.CJCALENDER_CJDAY_CLICK)
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.onlyShowCurrMonthDay && (this.cjDataItem.isSmallThanStart || this.cjDataItem.isBigThanEnd)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJDay.ets(89:7)", "cjcalendar");
                    }, Stack);
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJDay.ets(91:7)", "cjcalendar");
                        Stack.height("100%");
                        Stack.height("100%");
                        Stack.onClick(() => {
                            if (this.onCellClickIntercept?.(ObservedObject.GetRawObject(this.cjDataItem))) {
                                return;
                            }
                            if (!this.cjDataItem.disabled) {
                                if ((!this.cjDataItem.isPre && !this.cjDataItem.isNext) ||
                                    (this.cjDataItem.isPre && this.cjCalStatus.hasPre) ||
                                    (this.cjDataItem.isNext && this.cjCalStatus.hasNext)) {
                                    if (this.optMode == OptMode.NORMAL) { // 正常
                                        this.selectedItems[0] = this.cjDataItem;
                                        // this.cjDataItem.date = 66
                                    }
                                    else if (this.optMode == OptMode.SINGLE) { // 单选
                                        this.selectedItems[0] = this.cjDataItem;
                                    }
                                    else if (this.optMode == OptMode.MULTIPLE) { //多选
                                        const index = this.containsItem(ObservedObject.GetRawObject(this.cjDataItem));
                                        if (index >= 0) {
                                            this.selectedItems.splice(index, 1);
                                        }
                                        else {
                                            this.selectedItems.push(ObservedObject.GetRawObject(this.cjDataItem));
                                        }
                                    }
                                    else if (this.optMode == OptMode.RANGE) { //范围
                                        if (this.selectedItems.length == 0) { //一个没选
                                            this.selectedItems.push(ObservedObject.GetRawObject(this.cjDataItem));
                                        }
                                        else if (this.selectedItems.length == 1) { // 选了一个
                                            if (this.cjDataItem.bigThan(this.selectedItems[0])) {
                                                this.selectedItems.push(ObservedObject.GetRawObject(this.cjDataItem));
                                            }
                                            else {
                                                this.selectedItems.splice(0, 0, ObservedObject.GetRawObject(this.cjDataItem));
                                            }
                                        }
                                        else if (this.selectedItems.length == 2) { // 选了两个
                                            this.selectedItems.splice(0, 2);
                                            this.selectedItems.push(ObservedObject.GetRawObject(this.cjDataItem));
                                        }
                                    }
                                }
                            }
                            // 回调点击
                            this.cellClick(ObservedObject.GetRawObject(this.cjDataItem));
                        });
                    }, Stack);
                    // 背景
                    this.CellBackground.bind(this)();
                    // 主题内容
                    this.CellMain.bind(this)();
                    // 标记
                    this.CellMark.bind(this)();
                    Stack.pop();
                });
            }
        }, If);
        If.pop();
    }
    BuildCellBackground(parent = null) {
    }
    BuildDisableCellBackground(parent = null) {
    }
    BuildCellBody(parent = null) {
    }
    BuildMark(parent = null) {
    }
    CellBackground(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJDay.ets(177:5)", "cjcalendar");
            Stack.width('100%');
            Stack.height('100%');
            Stack.clip(true);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buildCellBackground) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildCellBackground.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    CellMain(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buildCellBody) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildCellBody.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    CellMark(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((this.cjDataItem.markText || this.cjDataItem.markIcon || this.cjDataItem.markImageUrl) && this.buildMark) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJDay.ets(197:7)", "cjcalendar");
                        Stack.padding(this.cjCellStyle.markMarin);
                        Stack.alignContent(this.cjCellStyle.markAlignment ?? this.markAlignment);
                        Stack.width('100%');
                        Stack.height('100%');
                        Stack.clip(true);
                    }, Stack);
                    this.buildMark.bind(this)();
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    /**
     * 选中要改变
     */
    __onSelectChange() {
        this._styleSetting();
    }
    /**
     * 样式改造
     */
    _styleSetting() {
        // 先处理状态、再调整样式
        // 常规显示
        if (this.optMode == OptMode.NORMAL) {
            if (this.cjDataItem.equalDay(this.selectedItems[0])) {
                this.cjDataItem.isSelected = true;
            }
            else {
                this.cjDataItem.isSelected = false;
            }
            this._changeStyleImpl(this._getStyleNum());
        }
        else if (this.optMode == OptMode.SINGLE) {
            // 单选
            if (this.cjDataItem.equalDay(this.selectedItems[0])) {
                this.cjDataItem.isSelected = true;
            }
            else {
                this.cjDataItem.isSelected = false;
            }
            this._changeStyleImpl(this._getStyleNum());
        }
        else if (this.optMode == OptMode.MULTIPLE) {
            // 多选
            if (this.containsItem(this.cjDataItem) >= 0) {
                this.cjDataItem.isSelected = true;
            }
            else {
                this.cjDataItem.isSelected = false;
            }
            this._changeStyleImpl(this._getStyleNum());
        }
        else if (this.optMode == OptMode.RANGE) {
            let isStart = this.cjDataItem.equalDay(this.selectedItems[0]);
            let isEnd = this.cjDataItem.equalDay(this.selectedItems[1]);
            if (isStart && !this.selectedItems[1]) {
                isEnd = true;
            }
            this.cjCellStatus.isStart = isStart;
            this.cjCellStatus.isEnd = isEnd;
            // 范围选择
            if (isStart || isEnd) { // 两端状态
                this.cjDataItem.isSelected = true;
                this._changeStyleImpl(2);
            }
            else if (this.selectedItems.length == 2 &&
                (this.cjDataItem.bigThan(this.selectedItems[0]) && this.cjDataItem.smallThan(this.selectedItems[1]))) {
                //中间状态
                this.cjDataItem.isSelected = true;
                this._changeStyleImpl(3);
            }
            else {
                this.cjDataItem.isSelected = false;
                this._changeStyleImpl(this._getStyleNum());
            }
        }
    }
    _getStyleNum() {
        let disabled = this.cjDataItem.isPre || this.cjDataItem.isNext || this.cjDataItem.disabled;
        if (disabled) {
            if (this.cjDataItem.isSelected) {
                return 5;
            }
            else {
                return 4;
            }
        }
        else {
            if (this.cjDataItem.isSelected) {
                return 2;
            }
            else {
                return 1;
            }
        }
    }
    /**
     * 处理单元格样式
     * @param style
     * 1、常规状态
     * 2、常规选中状态
     * 3、常规半选状态
     * 4、一般不可用状态，结合常规模式下的是否需要回显
     * 5、不可用选中状态
     * 都需要区别每种状态下的 “今天”
     * 需要结合状态是否需要回显 “今天”
     * 内置样式考虑：线型、面型、
     * 操作状态考虑：常规、单选、多选、范围选择
     */
    _changeStyleImpl(style: number) {
        let isLineStye = this.selectedShape == SelectedShape.LINE_CIRCLE || this.selectedShape == SelectedShape.LINE_RECT;
        // if (this.cjDataItem.fullYear == 2025 && this.cjDataItem.month == 0 && this.cjDataItem.date == 3 && this.cjDataItem.isNext){
        //   CJLogUtil.debug("xxx", "====")
        // }
        // 1、日期字体色
        // 2、描述字颜色
        // 3、标注颜色
        // 4、背景景色
        // 5、边框色
        // 常规状态
        if (style == 1) {
            if (this.cjDataItem.isToday) {
                if (isLineStye) {
                    // 常规-今日-线型
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = this.cjCellStyle.todayFontColor ?? this.themeColor;
                    this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStatus.fontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                }
                else {
                    // 常规-今日-面型
                    if (this.isNeedMarkToday) {
                        // 1、日期颜色
                        this.cjCellStatus.fontColor = this.cjCellStyle.todayFontColor ?? "#FFFFFF";
                        this.cjCellStatus.fontSize = this.cjCellStyle.todayFontSize ?? this.cjCellStyle.fontSize;
                        // 2、描述颜色
                        this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStatus.fontColor;
                        // 3、标注颜色
                        this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor ?? this.cjCellStatus.fontColor;
                        // 4、背景颜色
                        this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor ?? ColorUtil.lightenColor(this.cjCellStyle.todayBackgroundColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                    }
                    else {
                        // 1、日期颜色
                        this.cjCellStatus.fontColor = this.cjCellStyle.todayFontColor ?? this.themeColor;
                        this.cjCellStatus.fontSize = this.cjCellStyle.todayFontSize ?? this.cjCellStyle.fontSize;
                        // 2、描述颜色
                        this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStatus.fontColor;
                        // 3、标注颜色
                        this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor;
                        // 4、背景颜色
                        this.cjCellStatus.backgroundColor = this.cjCellStyle.todayBackgroundColor ?? this.cjCellStyle.itemBackgroundColor;
                    }
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                }
            }
            else {
                if (isLineStye) {
                    // 常规-非今日-线型
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = this.cjCellStyle.fontColor;
                    this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStyle.disabledFontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                }
                else {
                    // 常规-非今日-面型
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = this.cjCellStyle.fontColor;
                    this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStyle.disabledFontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                }
            }
        }
        else if (style == 2) {
            // 常规选中状态
            if (isLineStye) {
                // 常规选中 - 线型
                // 1、日期颜色
                this.cjCellStatus.fontColor = this.cjCellStyle.selectFontColor ?? this.themeColor;
                this.cjCellStatus.fontSize = this.cjCellStyle.selectFontSize ?? this.cjCellStyle.fontSize;
                // 2、描述颜色
                this.cjCellStatus.descFontColor = this.cjCellStyle.descSelectFontColor ?? (this.cjCellStyle.descFontColor ?? this.cjCellStatus.fontColor);
                // 3、标注颜色
                this.cjCellStatus.markFontColor = this.cjCellStyle.markSelectedFontColor ?? (this.cjCellStyle.markFontColor ?? this.cjCellStatus.fontColor);
                // 4、背景颜色
                this.cjCellStatus.backgroundColor = this.cjCellStyle.itemBackgroundColor;
                // 5、边框颜色
                this.cjCellStatus.borderColor = this.cjCellStyle.selectBoderColor ?? this.themeColor;
            }
            else {
                // 常规选中 - 面型
                // 1、日期颜色
                this.cjCellStatus.fontColor = this.cjCellStyle.selectFontColor ?? "#FFFFFF";
                this.cjCellStatus.fontSize = this.cjCellStyle.selectFontSize ?? this.cjCellStyle.fontSize;
                // 2、描述颜色
                this.cjCellStatus.descFontColor = this.cjCellStyle.descSelectFontColor ?? this.cjCellStatus.fontColor;
                // 3、标注颜色
                this.cjCellStatus.markFontColor = this.cjCellStyle.markSelectedFontColor ?? this.cjCellStatus.fontColor;
                // 4、背景颜色
                this.cjCellStatus.backgroundColor = this.cjCellStyle.selectItemBackgroundColor ?? this.themeColor;
                // 5、边框颜色
                this.cjCellStatus.borderColor = this.cjCellStyle.selectBoderColor;
            }
        }
        else if (style == 3) {
            // 常规半选状态 - 只有范围选择区间内才存在
            if (isLineStye) {
                // 常规半选状态 - 线型
                // 1、日期颜色
                this.cjCellStatus.fontColor = ColorUtil.lightenColor(this.cjCellStyle.selectFontColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                // 2、描述颜色
                this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStatus.fontColor;
                // 3、标注颜色
                this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor;
                // 4、背景颜色
                this.cjCellStatus.backgroundColor = this.cjCellStyle.itemBackgroundColor;
                // 5、边框颜色
                this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.selectBoderColor ?? this.themeColor, this.cjCellStyle.lightRatio);
            }
            else {
                // 常规半选状态 - 面型
                // 1、日期颜色
                this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ?? "#FFFFFF";
                this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                // 2、描述颜色
                this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                // 3、标注颜色
                this.cjCellStatus.markFontColor = this.cjCellStyle.disabledFontColor ?? this.cjCellStatus.fontColor;
                // 4、背景颜色
                this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor ?? ColorUtil.lightenColor(this.cjCellStyle.todayBackgroundColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                // 5、边框颜色
                this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.selectBoderColor, this.cjCellStyle.lightRatio);
            }
        }
        else if (style == 4) {
            // 一般不可用状态
            if (this.cjDataItem.isToday) {
                if (isLineStye) {
                    if (this.isNeedMarkToday) {
                        // 一般不可用 - 今日 - 线型 - 需要回显
                        // 1、日期颜色
                        this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ??
                            ColorUtil.lightenColor(this.cjCellStyle.todayFontColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                        this.cjCellStatus.fontSize = this.cjCellStyle.todayFontSize ?? this.cjCellStyle.fontSize;
                        // 2、描述颜色
                        this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                        // 3、标注颜色
                        this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor ?? this.cjCellStyle.disabledFontColor;
                        // 4、背景颜色
                        this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor;
                        // 5、边框颜色
                        this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.borderColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                    }
                    else {
                        // 一般不可用 - 今日 - 线型 - 不需要回显
                        // 1、日期颜色
                        this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ?? this.cjCellStyle.disabledFontColor;
                        this.cjCellStatus.fontSize = this.cjCellStyle.todayFontSize ?? this.cjCellStyle.fontSize;
                        // 2、描述颜色
                        this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStyle.disabledFontColor;
                        // 3、标注颜色
                        this.cjCellStatus.markFontColor = this.cjCellStyle.markFontColor ?? this.cjCellStyle.disabledFontColor;
                        // 4、背景颜色
                        this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor;
                        // 5、边框颜色
                        this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                    }
                }
                else {
                    if (this.isNeedMarkToday) {
                        // 一般不可用 - 今日 - 面型 - 需要回显
                        // 1、日期颜色
                        this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ?? "#FFFFFF";
                        this.cjCellStatus.fontSize = this.cjCellStyle.todayFontSize ?? this.cjCellStyle.fontSize;
                        // 2、描述颜色
                        this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                        // 3、标注颜色
                        this.cjCellStatus.markFontColor = this.cjCellStyle.disabledFontColor ?? this.cjCellStatus.fontColor;
                        // 4、背景颜色
                        this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor ?? ColorUtil.lightenColor(this.cjCellStyle.todayBackgroundColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                        // 5、边框颜色
                        this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.selectBoderColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                    }
                    else {
                        // 一般不可用 - 今日 - 面型 - 不需要回显
                        // 1、日期颜色
                        this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ?? this.cjCellStyle.disabledFontColor;
                        this.cjCellStatus.fontSize = this.cjCellStyle.todayFontSize ?? this.cjCellStyle.fontSize;
                        // 2、描述颜色
                        this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                        // 3、标注颜色
                        this.cjCellStatus.markFontColor = this.cjCellStyle.disabledFontColor ?? this.cjCellStatus.fontColor;
                        // 4、背景颜色
                        this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor ?? this.cjCellStyle.itemBackgroundColor;
                        // 5、边框颜色
                        this.cjCellStatus.borderColor = this.cjCellStyle.selectBoderColor ?? this.cjCellStyle.borderColor;
                    }
                }
            }
            else {
                if (isLineStye) {
                    // 一般不可用 - 非今日 - 线型
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = this.cjCellStyle.disabledFontColor;
                    this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.descFontColor ?? this.cjCellStyle.disabledFontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.markDisabledFontColor ?? this.cjCellStyle.disabledFontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                }
                else {
                    // 一般不可用 - 非今日 - 面型
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = this.cjCellStyle.disabledFontColor;
                    this.cjCellStatus.fontSize = this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.disabledFontColor ?? this.cjCellStatus.fontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.disabledBackgroundColor ?? this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = this.cjCellStyle.borderColor;
                }
            }
        }
        else if (style == 5) {
            // 一般不可用 - 选中
            if (isLineStye) {
                if (this.cjDataItem.isToday) {
                    // 一般不可用 - 选中 - 线型 - 今日
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ?? ColorUtil.lightenColor(this.cjCellStyle.selectFontColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                    this.cjCellStatus.fontSize = this.cjCellStyle.selectFontSize ?? this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.todayDisabledFontColor ?? this.cjCellStatus.fontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.todayDisabledFontColor ?? this.cjCellStatus.fontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor ?? this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.selectBoderColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                }
                else {
                    // 一般不可用 - 选中 - 线型 - 非今日
                    // 1、日期颜色
                    this.cjCellStatus.fontColor = ColorUtil.lightenColor(this.cjCellStyle.selectFontColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                    this.cjCellStatus.fontSize = this.cjCellStyle.selectFontSize ?? this.cjCellStyle.fontSize;
                    // 2、描述颜色
                    this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                    // 3、标注颜色
                    this.cjCellStatus.markFontColor = this.cjCellStyle.disabledFontColor ?? this.cjCellStatus.fontColor;
                    // 4、背景颜色
                    this.cjCellStatus.backgroundColor = this.cjCellStyle.disabledBackgroundColor ?? this.cjCellStyle.itemBackgroundColor;
                    // 5、边框颜色
                    this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.selectBoderColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                }
            }
            else {
                // 一般不可用 - 选中 - 面型
                // 1、日期颜色
                this.cjCellStatus.fontColor = this.cjCellStyle.todayDisabledFontColor ?? "#FFFFFF";
                this.cjCellStatus.fontSize = this.cjCellStyle.selectFontSize ?? this.cjCellStyle.fontSize;
                // 2、描述颜色
                this.cjCellStatus.descFontColor = this.cjCellStyle.descDisabledFontColor ?? this.cjCellStatus.fontColor;
                // 3、标注颜色
                this.cjCellStatus.markFontColor = this.cjCellStyle.disabledFontColor ?? this.cjCellStatus.fontColor;
                // 4、背景颜色
                this.cjCellStatus.backgroundColor = this.cjCellStyle.todayDisabledBackgroundColor ?? ColorUtil.lightenColor(this.cjCellStyle.todayBackgroundColor ?? this.themeColor, this.cjCellStyle.lightRatio);
                // 5、边框颜色
                this.cjCellStatus.borderColor = ColorUtil.lightenColor(this.cjCellStyle.selectBoderColor, this.cjCellStyle.lightRatio);
            }
        }
    }
    /**
     * 临时选中项改变
     */
    __onTempSelectedChangeed() {
        // 目前仅常规模式会有临时选中项
        if (this.optMode == OptMode.NORMAL) {
            if (!this.cjDataItem.isPre && !this.cjDataItem.isNext && !this.cjDataItem.disabled) {
                // 同一天
                if (this.cjDataItem.equalDay(this.tempSelectedItem)) {
                    // this.setSelectedStyle()
                }
                else {
                    // this.setNormalCententStyle()
                }
            }
        }
    }
    containsItem(cellItem: CJDateItem): number {
        return this.selectedItems.findIndex(item => item.equalDay(cellItem));
    }
    rerender() {
        this.updateDirtyElements();
    }
}
