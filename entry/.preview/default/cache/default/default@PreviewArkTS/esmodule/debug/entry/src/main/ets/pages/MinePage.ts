if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineIndex_Params {
    UserInfoTable?;
    userInfo?: UserInfoData[];
    nickname?: string;
    signature?: string;
    icon?: string | PixelMap | undefined;
}
import { MineListInfo } from "@bundle:com.example.healthy_life/entry/ets/view/MineListInfo";
import { UserBaseInfo } from "@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import UserInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/UserInfoApi";
import UserInfoData from "@bundle:com.example.healthy_life/entry/ets/viewmodel/UserInfoData";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import emitter from "@ohos:events.emitter";
import util from "@ohos:util";
import image from "@ohos:multimedia.image";
export class MineIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.UserInfoTable = new UserInfoApi(() => { });
        this.__userInfo = new ObservedPropertyObjectPU([], this, "userInfo");
        this.__nickname = new ObservedPropertySimplePU(Const.NICK_NAME, this, "nickname");
        this.__signature = new ObservedPropertySimplePU(Const.SIGNATURE, this, "signature");
        this.__icon = new ObservedPropertyObjectPU("", this, "icon");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineIndex_Params) {
        if (params.UserInfoTable !== undefined) {
            this.UserInfoTable = params.UserInfoTable;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
    }
    updateStateVars(params: MineIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userInfo.aboutToBeDeleted();
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    //@State：标记的变量为响应式状态，其值变化时，依赖它们的 UI 会自动刷新（如昵称修改后，页面上的昵称会实时更新）。
    private UserInfoTable; // 用户信息数据库操作实例
    private __userInfo: ObservedPropertyObjectPU<UserInfoData[]>; // 存储用户信息的响应式数组
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfoData[]) {
        this.__userInfo.set(newValue);
    }
    private __nickname: ObservedPropertySimplePU<string>; // 昵称（响应式状态，默认值从常量获取）
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __signature: ObservedPropertySimplePU<string>; // 个性签名（响应式状态，默认值）
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __icon: ObservedPropertyObjectPU<string | PixelMap | undefined>; // 用户头像（支持字符串路径或像素图）
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: string | PixelMap | undefined) {
        this.__icon.set(newValue);
    }
    // 查找用户信息
    async aboutToAppear() {
        this.UserInfoTable.getRdbStore(() => {
            this.UserInfoTable.query(1, (result: UserInfoData[]) => {
                if (result && result.length > 0) {
                    this.userInfo.push(result[0]);
                    this.nickname = this.userInfo[0]?.username;
                    this.icon = this.userInfo[0].icon;
                    Logger.info('MinePage', `${this.nickname}`);
                }
                else {
                    // 如果没有查询到数据，创建默认用户信息，插入新数据
                    let newUserInfo = new UserInfoData();
                    this.UserInfoTable.insertData(newUserInfo, (id: number) => {
                        newUserInfo.id = id;
                        this.userInfo.push(newUserInfo);
                        this.nickname = this.userInfo[0].username;
                        Logger.info('MinePage', `${this.nickname}`);
                    });
                }
            }, false);
        });
        const TAG: string = 'ThreadModel';
        // 定义一个eventId为1的事件
        let event: emitter.InnerEvent = {
            eventId: 1
        };
        // 收到eventId为1的事件后执行该回调
        let callback = (eventData: emitter.EventData): void => {
            // 更新用户信息
            let userName = eventData.data?.content as string;
            this.userInfo[0].username = userName;
            this.nickname = this.userInfo[0].username;
            Logger.info(TAG, 'event callback:' + JSON.stringify(eventData.data?.content));
        };
        // 订阅eventId为1的事件
        emitter.on(event, callback);
        await this.getIcon();
    }
    private async getIcon() {
        if (this.icon == '') {
            this.icon = undefined;
            return;
        }
        let helper = new util.Base64Helper();
        let buffer: ArrayBuffer = helper.decodeSync(this.icon as string, util.Type.MIME).buffer as ArrayBuffer;
        let imageSource = image.createImageSource(buffer);
        let opts: image.DecodingOptions = { editable: true };
        let pixelMap = await imageSource.createPixelMap(opts);
        this.icon = pixelMap;
    }
    // UI 布局（build 方法）
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(92:5)", "entry");
            Column.height(Const.FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 参数通过响应式变量传递
                    // 根据查询到的数据赋值用户名 签名 头像 或者默认数据，反正是最新的
                    UserBaseInfo(this, {
                        nickname: this.nickname,
                        signature: this.signature,
                        icon: this.icon as PixelMap | undefined
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 95, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            nickname: this.nickname,
                            signature: this.signature,
                            icon: this.icon as PixelMap | undefined
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        nickname: this.nickname,
                        signature: this.signature,
                        icon: this.icon as PixelMap | undefined
                    });
                }
            }, { name: "UserBaseInfo" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    //MineListInfo：展示个人主页的功能列表（如 “编辑资料”“设置”“帮助中心” 等），通常包含跳转其他页面的入口。
                    MineListInfo(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 101, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MineListInfo" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "MineIndex", new MineIndex(undefined, {}));
    previewComponent();
}
else {
}
