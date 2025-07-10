if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    selectGenderIndex?: number;
    provideGender?: string[];
    selectGender?: string;
    currentMonth?: number;
    currentDay?: number;
    currentYear?: number;
    dateModel?: DateModel;
    selectedDate?: Date;
    provideWeight?: string[];
    provideHeight?: string[];
    selectWeightIndex?: number;
    selectHeightIndex?: number;
    selectWeight?: string;
    selectHeight?: string;
    nickname?: string;
    UserInfoTable?;
    userInfo?: UserInfoData[];
}
import router from "@ohos:router";
import { CommonConstants } from "@bundle:com.example.healthy_life/entry/ets/common/constants/UserConstants";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { DateModel } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/DateModel";
import { getRealTimeDate } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/GetDate";
import type UserInfoData from '../viewmodel/UserInfoData';
import UserInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/UserInfoApi";
import emitter from "@ohos:events.emitter";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectGenderIndex = new ObservedPropertySimplePU(0, this, "selectGenderIndex");
        this.provideGender = ['保密', '男', '女'];
        this.__selectGender = new ObservedPropertySimplePU(this.provideGender[this.selectGenderIndex], this, "selectGender");
        this.__currentMonth = new ObservedPropertySimplePU(1, this, "currentMonth");
        this.__currentDay = new ObservedPropertySimplePU(1, this, "currentDay");
        this.__currentYear = new ObservedPropertySimplePU(1, this, "currentYear");
        this.__dateModel = this.createStorageLink('selectedDate', new DateModel(0, 0, 0, 0), "dateModel");
        this.selectedDate = new Date();
        this.provideWeight = [];
        this.provideHeight = [];
        this.selectWeightIndex = 50 - 20;
        this.selectHeightIndex = 160 - 80;
        this.__selectWeight = new ObservedPropertySimplePU("50", this, "selectWeight");
        this.__selectHeight = new ObservedPropertySimplePU("160", this, "selectHeight");
        this.__nickname = new ObservedPropertySimplePU(Const.NICK_NAME, this, "nickname");
        this.UserInfoTable = new UserInfoApi(() => {
        });
        this.__userInfo = new ObservedPropertyObjectPU([], this, "userInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.selectGenderIndex !== undefined) {
            this.selectGenderIndex = params.selectGenderIndex;
        }
        if (params.provideGender !== undefined) {
            this.provideGender = params.provideGender;
        }
        if (params.selectGender !== undefined) {
            this.selectGender = params.selectGender;
        }
        if (params.currentMonth !== undefined) {
            this.currentMonth = params.currentMonth;
        }
        if (params.currentDay !== undefined) {
            this.currentDay = params.currentDay;
        }
        if (params.currentYear !== undefined) {
            this.currentYear = params.currentYear;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.provideWeight !== undefined) {
            this.provideWeight = params.provideWeight;
        }
        if (params.provideHeight !== undefined) {
            this.provideHeight = params.provideHeight;
        }
        if (params.selectWeightIndex !== undefined) {
            this.selectWeightIndex = params.selectWeightIndex;
        }
        if (params.selectHeightIndex !== undefined) {
            this.selectHeightIndex = params.selectHeightIndex;
        }
        if (params.selectWeight !== undefined) {
            this.selectWeight = params.selectWeight;
        }
        if (params.selectHeight !== undefined) {
            this.selectHeight = params.selectHeight;
        }
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.UserInfoTable !== undefined) {
            this.UserInfoTable = params.UserInfoTable;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectGenderIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__selectGender.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__currentDay.purgeDependencyOnElmtId(rmElmtId);
        this.__currentYear.purgeDependencyOnElmtId(rmElmtId);
        this.__dateModel.purgeDependencyOnElmtId(rmElmtId);
        this.__selectWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__selectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectGenderIndex.aboutToBeDeleted();
        this.__selectGender.aboutToBeDeleted();
        this.__currentMonth.aboutToBeDeleted();
        this.__currentDay.aboutToBeDeleted();
        this.__currentYear.aboutToBeDeleted();
        this.__dateModel.aboutToBeDeleted();
        this.__selectWeight.aboutToBeDeleted();
        this.__selectHeight.aboutToBeDeleted();
        this.__nickname.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectGenderIndex: ObservedPropertySimplePU<number>;
    get selectGenderIndex() {
        return this.__selectGenderIndex.get();
    }
    set selectGenderIndex(newValue: number) {
        this.__selectGenderIndex.set(newValue);
    }
    private provideGender: string[];
    private __selectGender: ObservedPropertySimplePU<string>;
    get selectGender() {
        return this.__selectGender.get();
    }
    set selectGender(newValue: string) {
        this.__selectGender.set(newValue);
    }
    private __currentMonth: ObservedPropertySimplePU<number>;
    get currentMonth() {
        return this.__currentMonth.get();
    }
    set currentMonth(newValue: number) {
        this.__currentMonth.set(newValue);
    }
    private __currentDay: ObservedPropertySimplePU<number>;
    get currentDay() {
        return this.__currentDay.get();
    }
    set currentDay(newValue: number) {
        this.__currentDay.set(newValue);
    }
    private __currentYear: ObservedPropertySimplePU<number>;
    get currentYear() {
        return this.__currentYear.get();
    }
    set currentYear(newValue: number) {
        this.__currentYear.set(newValue);
    }
    private __dateModel: ObservedPropertyAbstractPU<DateModel>;
    get dateModel() {
        return this.__dateModel.get();
    }
    set dateModel(newValue: DateModel) {
        this.__dateModel.set(newValue);
    }
    private selectedDate: Date;
    private provideWeight: string[];
    private provideHeight: string[];
    private selectWeightIndex: number;
    private selectHeightIndex: number;
    private __selectWeight: ObservedPropertySimplePU<string>;
    get selectWeight() {
        return this.__selectWeight.get();
    }
    set selectWeight(newValue: string) {
        this.__selectWeight.set(newValue);
    }
    private __selectHeight: ObservedPropertySimplePU<string>;
    get selectHeight() {
        return this.__selectHeight.get();
    }
    set selectHeight(newValue: string) {
        this.__selectHeight.set(newValue);
    }
    onCancel() {
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private UserInfoTable;
    private __userInfo: ObservedPropertyObjectPU<UserInfoData[]>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfoData[]) {
        this.__userInfo.set(newValue);
    }
    aboutToAppear(): void {
        this.dateModel = getRealTimeDate();
        // this.currentMonth = this.dateModel.month;
        // this.currentDay = this.dateModel.day;
        // this.currentYear = this.dateModel.year;
        for (let i = 0; i < 160; i++) {
            this.provideHeight.push(String(i + 80));
        }
        for (let i = 0; i < 100; i++) {
            this.provideWeight.push(String(i + 20));
        }
        // 查找用户信息
        this.UserInfoTable.getRdbStore(() => {
            this.UserInfoTable.query(1, (result: UserInfoData[]) => {
                this.userInfo.push(result[0]);
                // 初始名称
                this.nickname = this.userInfo[0].username;
                // 初始生日
                this.dateModel.month = Number(this.userInfo[0].mouth);
                this.dateModel.year = Number(this.userInfo[0].year);
                this.dateModel.day = Number(this.userInfo[0].date);
                this.currentMonth = Number(this.userInfo[0].mouth);
                this.currentDay = Number(this.userInfo[0].date);
                this.currentYear = Number(this.userInfo[0].year);
                this.selectedDate.setDate(this.currentDay);
                this.selectedDate.setMonth(this.currentMonth);
                this.selectedDate.setFullYear(this.currentYear);
                // 初始身高体重
                this.selectWeight = this.userInfo[0].weight;
                this.selectHeight = this.userInfo[0].height;
                this.selectWeightIndex = Number(this.selectWeight) - 20;
                this.selectHeightIndex = Number(this.selectHeight) - 80;
                // 初始性别
                this.selectGender = this.userInfo[0].gender;
                this.selectGenderIndex = this.provideGender.findIndex(g => g == this.selectGender);
            }, false);
        });
        const TAG: string = 'ThreadModel';
        // 定义一个eventId为1的事件
        let event: emitter.InnerEvent = {
            eventId: 1
        };
        // 收到eventId为1的事件后执行该回调
        let callback = (eventData: emitter.EventData): void => {
            // promptAction.showToast({
            //   message: JSON.stringify(eventData.data?.content)
            // });
            // 更新用户信息
            let userName = eventData.data?.content as string;
            this.userInfo[0].username = userName;
            this.nickname = this.userInfo[0].username;
            Logger.info(TAG, 'event callback:' + JSON.stringify(eventData.data?.content));
        };
        // 订阅eventId为1的事件
        emitter.on(event, callback);
    }
    // onPageShow() {
    //   // 查找用户信息
    //   this.UserInfoTable.getRdbStore(() => { // 获取数据库
    //     this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
    //       this.userInfo.push(result[0]);
    //       this.nickname = this.userInfo[0].username
    //       Logger.info('MinePage', `${this.nickname}`);
    //     }, false);
    //   });
    //   Logger.info('MinePage', `${this.nickname}`);
    // }
    //
    // onForeground() {
    //   // 查找用户信息
    //   this.UserInfoTable.getRdbStore(() => { // 获取数据库
    //     this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
    //       this.userInfo.push(result[0]);
    //       this.nickname = this.userInfo[0].username
    //       Logger.info('MinePage', `${this.nickname}`);
    //     }, false);
    //   });
    //   Logger.info('MinePage', `${this.nickname}`);
    // }
    Options(name: Resource, url: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineEditPage.ets(139:5)", "entry");
            Row.borderRadius({ "id": 16777412, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.shadow({
                radius: { "id": 16777408, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                color: { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            Row.width(CommonConstants.ONE_HUNDRED_PERCENT);
            Row.height({ "id": 16777406, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.alignItems(VerticalAlign.Center);
            Row.padding({
                left: { "id": 16777386, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                top: { "id": 16777386, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                bottom: { "id": 16777386, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            Row.border({
                width: { bottom: { "id": 16777431, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                color: { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            Row.backgroundColor(Color.White);
            Row.onClick(() => {
                if (url == '性别') {
                    TextPickerDialog.show({
                        range: this.provideGender,
                        selected: this.selectGenderIndex,
                        backgroundColor: { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        onAccept: (value: TextPickerResult) => {
                            this.selectGenderIndex = value.index as number;
                            this.selectGender = value.value as string;
                            Logger.debug('MineEditPage', '编辑性别');
                            // 保存
                            this.UserInfoTable.getRdbStore(() => {
                                this.userInfo[0].gender = this.selectGender;
                                Logger.info('MineEditPage', `编辑性别 ${this.userInfo[0].gender}`);
                                this.UserInfoTable.updateData(this.userInfo[0], () => {
                                });
                            });
                        },
                        canLoop: false
                    });
                    return;
                }
                if (url == '身高') {
                    TextPickerDialog.show({
                        range: this.provideHeight,
                        selected: this.selectHeightIndex,
                        backgroundColor: { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        onAccept: (value: TextPickerResult) => {
                            this.selectHeightIndex = value.index as number;
                            this.selectHeight = value.value as string;
                            Logger.debug('MineEditPage', '编辑身高');
                            // 保存
                            this.UserInfoTable.getRdbStore(() => {
                                this.userInfo[0].height = this.selectHeight;
                                Logger.info('MineEditPage', `编辑身高 ${this.userInfo[0].height}`);
                                this.UserInfoTable.updateData(this.userInfo[0], () => {
                                });
                            });
                        },
                        canLoop: false
                    });
                    return;
                }
                if (url == '体重') {
                    TextPickerDialog.show({
                        range: this.provideWeight,
                        selected: this.selectWeightIndex,
                        backgroundColor: { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        onAccept: (value: TextPickerResult) => {
                            this.selectWeightIndex = value.index as number;
                            this.selectWeight = value.value as string;
                            Logger.debug('MineEditPage', '编辑体重');
                            // 保存
                            this.UserInfoTable.getRdbStore(() => {
                                this.userInfo[0].weight = this.selectWeight;
                                Logger.info('MineEditPage', `编辑体重 ${this.userInfo[0].weight}`);
                                this.UserInfoTable.updateData(this.userInfo[0], () => {
                                });
                            });
                        },
                        canLoop: false
                    });
                    return;
                }
                if (url == '生日') {
                    CalendarPickerDialog.show({
                        selected: this.selectedDate,
                        onAccept: (value) => {
                            console.info("calendar onAccept:" + JSON.stringify(value));
                            this.dateModel.month = value.getMonth();
                            this.dateModel.year = value.getFullYear();
                            this.dateModel.day = value.getDate();
                            // 保存
                            this.UserInfoTable.getRdbStore(() => {
                                this.userInfo[0].mouth = String(this.dateModel.month);
                                this.userInfo[0].year = String(this.dateModel.year);
                                this.userInfo[0].date = String(this.dateModel.day);
                                this.currentMonth = Number(this.userInfo[0].mouth);
                                this.currentDay = Number(this.userInfo[0].date);
                                this.currentYear = Number(this.userInfo[0].year);
                                this.selectedDate.setDate(this.currentDay);
                                this.selectedDate.setMonth(this.currentMonth);
                                this.selectedDate.setFullYear(this.currentYear);
                                Logger.info('MineEditPage', `编辑生日 ${this.userInfo[0].date}`);
                                this.UserInfoTable.updateData(this.userInfo[0], () => {
                                });
                            });
                        },
                    });
                    return;
                }
                router.pushUrl({
                    url
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineEditPage.ets(140:7)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({
                left: { "id": 16777449, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                right: { "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/MineEditPage.ets(141:9)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.debugLine("entry/src/main/ets/pages/MineEditPage.ets(142:11)", "entry");
            Text.fontSize({ "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (url == '性别') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectGender);
                        Text.debugLine("entry/src/main/ets/pages/MineEditPage.ets(147:13)", "entry");
                        Text.fontSize({ "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor({ "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.textAlign(TextAlign.End);
                    }, Text);
                    Text.pop();
                });
            }
            else if (url == '生日') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.dateModel.year}年${this.dateModel.month + 1}月${this.dateModel.day}日`);
                        Text.debugLine("entry/src/main/ets/pages/MineEditPage.ets(153:13)", "entry");
                        Text.fontSize({ "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor({ "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.textAlign(TextAlign.End);
                    }, Text);
                    Text.pop();
                });
            }
            else if (url == '身高') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectHeight + "cm");
                        Text.debugLine("entry/src/main/ets/pages/MineEditPage.ets(159:13)", "entry");
                        Text.fontSize({ "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor({ "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.textAlign(TextAlign.End);
                    }, Text);
                    Text.pop();
                });
            }
            else if (url == '体重') {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectWeight + "kg");
                        Text.debugLine("entry/src/main/ets/pages/MineEditPage.ets(165:13)", "entry");
                        Text.fontSize({ "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor({ "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.textAlign(TextAlign.End);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.nickname);
                        Text.debugLine("entry/src/main/ets/pages/MineEditPage.ets(171:13)", "entry");
                        Text.fontSize({ "id": 16777383, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor({ "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Text.textAlign(TextAlign.End);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777349, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/MineEditPage.ets(179:11)", "entry");
            Image.objectFit(ImageFit.Contain);
            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Image);
        Flex.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/MineEditPage.ets(191:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineEditPage.ets(192:7)", "entry");
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_1000);
            Row.border({
                width: { top: { "id": 16777373, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, right: { "id": 16777373, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                color: { "id": 16777261, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            Row.rotate({ angle: CommonConstants.ANGLE });
        }, Row);
        Row.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineEditPage.ets(317:5)", "entry");
            Row.height(Const.THOUSANDTH_1000);
            Row.backgroundColor({ "id": 16777252, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/MineEditPage", isUserCreateStack: false });
            Navigation.debugLine("entry/src/main/ets/pages/MineEditPage.ets(318:7)", "entry");
            Navigation.size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 });
            Navigation.title({ "id": 16777297, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineEditPage.ets(319:9)", "entry");
        }, Column);
        this.Options.bind(this)({ "id": 16777335, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, 'pages/MineEditNamePage');
        this.Options.bind(this)({ "id": 16777304, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, '性别');
        this.Options.bind(this)({ "id": 16777298, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, '生日');
        this.Options.bind(this)({ "id": 16777306, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, '身高');
        this.Options.bind(this)({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, '体重');
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
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/MineEditPage", pageFullPath: "entry/src/main/ets/pages/MineEditPage", integratedHsp: "false", moduleType: "followWithHap" });
