if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CJWeek_Params {
    startItem?: CJDateItem | undefined;
    days?: Array<CJDateItem>;
    showLunar?: boolean;
    today?: CJDateItem;
    startDate?: Date;
    endDate?: Date;
    buildCellBackground?: CustomBuilder;
    buildDisableCellBackground?: CustomBuilder;
    buildCellBody?: CustomBuilder;
    buildMark?: CustomBuilder;
    /**
     * 重新构建Item
     */
    reBuildCellItem?: (cjDateItem: CJDateItem) => void;
    /** 自定义构建每一项的样式 */
    buildCellStyle?: (cjDataItem: CJDateItem) => CJCellStyle;
    cellClick?: (cjDataItem: CJDateItem) => void;
}
import { Solar } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/index";
import { CJCellStyle } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJCellStyle";
import { CJDateItem } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJDateItem";
import { CJDay } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.3/pkg_modules/cjcalendar/src/main/ets/components/components/CJDay";
export class CJWeek extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__startItem = new ObservedPropertyObjectPU(undefined, this, "startItem");
        this.__days = new ObservedPropertyObjectPU(new Array(), this, "days");
        this.__showLunar = this.initializeConsume("showLunar", "showLunar");
        this.today = new CJDateItem(new Date());
        this.startDate = new Date("1970-01-01");
        this.endDate = new Date(new Date().getFullYear() + 10, 0, 1);
        this.buildCellBackground = this.BuildCellBackground;
        this.buildDisableCellBackground = this.BuildDisableCellBackground;
        this.buildCellBody = this.BuildCellBody;
        this.buildMark = this.BuildMark;
        this.reBuildCellItem = undefined;
        this.buildCellStyle = () => {
            return new CJCellStyle();
        };
        this.cellClick = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CJWeek_Params) {
        if (params.startItem !== undefined) {
            this.startItem = params.startItem;
        }
        if (params.days !== undefined) {
            this.days = params.days;
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
        if (params.reBuildCellItem !== undefined) {
            this.reBuildCellItem = params.reBuildCellItem;
        }
        if (params.buildCellStyle !== undefined) {
            this.buildCellStyle = params.buildCellStyle;
        }
        if (params.cellClick !== undefined) {
            this.cellClick = params.cellClick;
        }
    }
    updateStateVars(params: CJWeek_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__startItem.purgeDependencyOnElmtId(rmElmtId);
        this.__days.purgeDependencyOnElmtId(rmElmtId);
        this.__showLunar.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__startItem.aboutToBeDeleted();
        this.__days.aboutToBeDeleted();
        this.__showLunar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __startItem: ObservedPropertyObjectPU<CJDateItem | undefined>;
    get startItem() {
        return this.__startItem.get();
    }
    set startItem(newValue: CJDateItem | undefined) {
        this.__startItem.set(newValue);
    }
    private __days: ObservedPropertyObjectPU<Array<CJDateItem>>;
    get days() {
        return this.__days.get();
    }
    set days(newValue: Array<CJDateItem>) {
        this.__days.set(newValue);
    }
    private __showLunar: ObservedPropertyAbstractPU<boolean>;
    get showLunar() {
        return this.__showLunar.get();
    }
    set showLunar(newValue: boolean) {
        this.__showLunar.set(newValue);
    }
    private today: CJDateItem;
    private startDate: Date;
    private endDate: Date;
    // ========自定义布局==========
    /** 构建单元格背景 */
    private __buildCellBackground;
    /** 构建不可选中Cell背景，当实现buildCellBackground时，该方法无效 */
    private __buildDisableCellBackground;
    /** 构建单元格主体内容 */
    private __buildCellBody;
    /** 构建自定义标记 */
    private __buildMark;
    /**
     * 重新构建Item
     */
    private reBuildCellItem?: (cjDateItem: CJDateItem) => void;
    /** 自定义构建每一项的样式 */
    private buildCellStyle: (cjDataItem: CJDateItem) => CJCellStyle;
    private cellClick: (cjDataItem: CJDateItem) => void;
    BuildCellBackground(parent = null) {
    }
    BuildDisableCellBackground(parent = null) {
    }
    BuildCellBody(parent = null) {
    }
    BuildMark(parent = null) {
    }
    aboutToAppear(): void {
        if (this.startItem) {
            let tempDate: Date = new Date(this.startItem.time);
            for (let index = 0; index < 7; index++) {
                let item = new CJDateItem(tempDate);
                // item.isSmallThanStart = index < preCount
                // item.isBigThanEnd = index >= preCount + count
                // console.log("date:", item.date, ",isSmallThanStart:", item.isSmallThanStart, ",isBigThanEnd:", item.isBigThanEnd)
                item.isToday = tempDate.getFullYear() == this.today.fullYear && tempDate.getMonth() == this.today.month &&
                    tempDate.getDate() == this.today.date;
                if (this.reBuildCellItem) {
                    // item = this.reBuildCellItem(item)
                    this.reBuildCellItem(item);
                }
                if (this.showLunar) { // 显示农历
                    item.solar = Solar.fromYmd(item.fullYear, item.month + 1, item.date);
                }
                this.days.push(item);
                tempDate.setDate(tempDate.getDate() + 1);
            }
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJWeek.ets(79:5)", "cjcalendar");
            Row.width("100%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.layoutWeight(1);
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
                                cellClick: (cjDataItem: CJDateItem) => {
                                    this.cellClick(cjDataItem);
                                }
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/cjcalendar@2.3.3/oh_modules/cjcalendar/src/main/ets/components/components/CJWeek.ets", line: 81, col: 9 });
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
                                    cellClick: (cjDataItem: CJDateItem) => {
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
            this.forEachUpdateFunction(elmtId, this.days, forEachItemGenFunction, (item: CJDateItem) => item.time.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
