if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    message?: string;
    updateStatus?: UpdateStatus;
}
import promptAction from "@ohos:promptAction";
import type common from "@ohos:app.ability.common";
enum UpdateStatus {
    IDLE = // 初始状态
     0,
    CHECKING = // 检查中
     1,
    UPDATE_AVAILABLE = // 有更新可用
     2,
    DOWNLOADING = // 下载中
     3,
    READY_TO_RESTART = 4 // 更新完成，等待重启
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertySimplePU('您当前版本是1.1.1', this, "message");
        this.__updateStatus = new ObservedPropertySimplePU(UpdateStatus.IDLE, this, "updateStatus");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.updateStatus !== undefined) {
            this.updateStatus = params.updateStatus;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__updateStatus.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__updateStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __message: ObservedPropertySimplePU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __updateStatus: ObservedPropertySimplePU<UpdateStatus>;
    get updateStatus() {
        return this.__updateStatus.get();
    }
    set updateStatus(newValue: UpdateStatus) {
        this.__updateStatus.set(newValue);
    }
    // 模拟检查更新的异步操作
    async checkUpdate() {
        this.updateStatus = UpdateStatus.CHECKING;
        this.message = '正在检查更新...';
        await new Promise<void>(resolve => setTimeout(resolve, 1500));
        const hasNewVersion = Math.random() > 0.5;
        if (hasNewVersion) {
            this.updateStatus = UpdateStatus.UPDATE_AVAILABLE;
            this.message = '检测到新版本2.0.0，是否更新？';
        }
        else {
            this.updateStatus = UpdateStatus.IDLE;
            this.message = '最新版本是1.1.1，您当前已经是最新版本';
        }
    }
    // 执行更新操作
    async handleUpdate() {
        this.updateStatus = UpdateStatus.DOWNLOADING;
        this.message = '正在下载更新...';
        // 模拟下载过程
        await new Promise<void>(resolve => setTimeout(resolve, 3000));
        this.updateStatus = UpdateStatus.READY_TO_RESTART;
        this.message = '更新已下载完成，重启应用生效';
    }
    // 重启应用
    restartApp() {
        const context = getContext(this) as common.UIAbilityContext;
        promptAction.showToast({ message: '应用即将重启' });
        // 延迟执行重启，确保toast显示
        setTimeout(() => {
            // 关闭当前应用
            context.terminateSelf();
            // 实际项目中需要通过其他方式重新启动应用
            // 例如：使用startAbility打开应用入口
        }, 1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CheckUpdatePage.ets(64:5)", "entry");
            Row.height('100%');
            Row.backgroundColor({ "id": 16777252, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/CheckUpdatePage", isUserCreateStack: false });
            Navigation.debugLine("entry/src/main/ets/pages/CheckUpdatePage.ets(65:7)", "entry");
            Navigation.size({ width: '100%', height: '100%' });
            Navigation.title({ "id": 16777485, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CheckUpdatePage.ets(66:9)", "entry");
            Column.width('100%');
            Column.padding(20);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.debugLine("entry/src/main/ets/pages/CheckUpdatePage.ets(67:11)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 50, bottom: 30 });
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.createWithLabel(this.getButtonText());
            Button.debugLine("entry/src/main/ets/pages/CheckUpdatePage.ets(75:11)", "entry");
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.width(200);
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.height(50);
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.backgroundColor(this.getButtonColor());
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.fontColor(Color.White);
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.onClick(() => this.handleButtonClick());
            // 动态按钮：根据更新状态显示不同文本和行为
            Button.enabled(this.updateStatus !== UpdateStatus.CHECKING &&
                this.updateStatus !== UpdateStatus.DOWNLOADING);
        }, Button);
        // 动态按钮：根据更新状态显示不同文本和行为
        Button.pop();
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    // 根据状态获取按钮文本
    getButtonText() {
        switch (this.updateStatus) {
            case UpdateStatus.CHECKING:
                return '检查中...';
            case UpdateStatus.UPDATE_AVAILABLE:
                return '立即更新';
            case UpdateStatus.DOWNLOADING:
                return '下载中...';
            case UpdateStatus.READY_TO_RESTART:
                return '立即重启应用';
            default:
                return '检查更新';
        }
    }
    // 根据状态获取按钮颜色
    getButtonColor() {
        if (this.updateStatus === UpdateStatus.READY_TO_RESTART) {
            return Color.Red; // 重启按钮使用红色强调
        }
        if (this.updateStatus === UpdateStatus.UPDATE_AVAILABLE) {
            return Color.Green; // 更新可用时使用高亮色
        }
        return Color.Blue; // 默认颜色
    }
    // 处理按钮点击
    handleButtonClick() {
        switch (this.updateStatus) {
            case UpdateStatus.IDLE:
            case UpdateStatus.READY_TO_RESTART:
                this.checkUpdate();
                break;
            case UpdateStatus.UPDATE_AVAILABLE:
                this.handleUpdate();
                break;
            case UpdateStatus.READY_TO_RESTART:
                this.restartApp();
                break;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/CheckUpdatePage", pageFullPath: "entry/src/main/ets/pages/CheckUpdatePage", integratedHsp: "false", moduleType: "followWithHap" });
