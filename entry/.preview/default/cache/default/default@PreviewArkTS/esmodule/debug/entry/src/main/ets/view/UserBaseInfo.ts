if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserBaseInfo_Params {
    nickname?: string;
    signature?: string;
    icon?: PixelMap | undefined;
    userInfo?: UserInfoData[];
    base64?: string;
    UserInfoTable?;
}
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import fileIo from "@ohos:file.fs";
import picker from "@ohos:file.picker";
import type { BusinessError as BusinessError } from "@ohos:base";
import type UserInfoData from '../viewmodel/UserInfoData';
import UserInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/UserInfoApi";
import buffer from "@ohos:buffer";
import image from "@ohos:multimedia.image";
// 定义一个URI数组，用于接收PhotoViewPicker返回的用于选择图像的URI。
let uris: Array<string> = [];
// 调用PhotoViewPicker.select选择图片。
export async function photoPickerGetUri(): Promise<string> {
    try {
        let PhotoSelectOptions = new picker.PhotoSelectOptions();
        PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
        PhotoSelectOptions.maxSelectNumber = 1;
        let photoPicker = new picker.PhotoViewPicker();
        await photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult: picker.PhotoSelectResult) => {
            Logger.info('PhotoViewPicker.select successfully, PhotoSelectResult uri: ' + JSON.stringify(PhotoSelectResult));
            uris = PhotoSelectResult.photoUris;
        }).catch((err: BusinessError) => {
            Logger.error('PhotoViewPicker.select failed with err: ' + JSON.stringify(err));
        });
    }
    catch (error) {
        let err = error as BusinessError;
        Logger.error('PhotoViewPicker failed with err: ' + err.message);
    }
    return uris[0].toString();
}
export class UserBaseInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new SynchedPropertySimpleOneWayPU(params.nickname, this, "nickname");
        this.__signature = new SynchedPropertySimpleOneWayPU(params.signature, this, "signature");
        this.__icon = new SynchedPropertyObjectOneWayPU(params.icon, this, "icon");
        this.__userInfo = new ObservedPropertyObjectPU([], this, "userInfo");
        this.__base64 = new ObservedPropertySimplePU('', this, "base64");
        this.UserInfoTable = new UserInfoApi(() => {
        });
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserBaseInfo_Params) {
        if (params.nickname === undefined) {
            this.__nickname.set('');
        }
        if (params.signature === undefined) {
            this.__signature.set('');
        }
        if (params.icon === undefined) {
            this.__icon.set(undefined);
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.base64 !== undefined) {
            this.base64 = params.base64;
        }
        if (params.UserInfoTable !== undefined) {
            this.UserInfoTable = params.UserInfoTable;
        }
    }
    updateStateVars(params: UserBaseInfo_Params) {
        this.__nickname.reset(params.nickname);
        this.__signature.reset(params.signature);
        this.__icon.reset(params.icon);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__base64.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        this.__base64.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __nickname: SynchedPropertySimpleOneWayPU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __signature: SynchedPropertySimpleOneWayPU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __icon: SynchedPropertySimpleOneWayPU<PixelMap | undefined>;
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: PixelMap | undefined) {
        this.__icon.set(newValue);
    }
    private __userInfo: ObservedPropertyObjectPU<UserInfoData[]>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfoData[]) {
        this.__userInfo.set(newValue);
    }
    private __base64: ObservedPropertySimplePU<string>;
    get base64() {
        return this.__base64.get();
    }
    set base64(newValue: string) {
        this.__base64.set(newValue);
    }
    private UserInfoTable;
    private async loadImage(name: string) {
        // setTimeout(async () => {
        //   let fileSource = await fileIo.open(name, fileIo.OpenMode.READ_ONLY);
        //   let imageSource = image.createImageSource(fileSource.fd);
        //   this.icon = await imageSource.createPixelMap();
        //   Logger.info('UserBaseInfo.loadImage: ' + JSON.stringify(this.icon));
        // }, 100)
        let fileSource = await fileIo.open(name, fileIo.OpenMode.READ_ONLY);
        let imageSource = image.createImageSource(fileSource.fd);
        this.icon = await imageSource.createPixelMap();
        Logger.info('UserBaseInfo.loadImage 读取 PixelMap' + JSON.stringify(this.icon));
        // let resourceManager = getContext(this).resourceManager
        // let imageArray = await resourceManager.getMediaContent($r('app.media.beer'));
        // let pixelBuffer = new Uint8Array(imageArray).buffer as Object as ArrayBuffer
        // let imageResource = image.createImageSource(pixelBuffer);
        // let opts: image.DecodingOptions = { editable: true }
        // let pixelMap = await imageResource.createPixelMap(opts);
        let pixelMap = this.icon;
        // 转换成base64
        const imagePackerApi: image.ImagePacker = image.createImagePacker();
        let packOpts: image.PackingOption = { format: 'image/jpeg', quality: 100 };
        imagePackerApi.packing(pixelMap, packOpts).then((data: ArrayBuffer) => {
            let buf: buffer.Buffer = buffer.from(data);
            this.base64 = 'data:image/jpeg;base64,' + buf.toString('base64', 0, buf.length);
            console.info('base64: ' + this.base64);
            Logger.info('UserBaseInfo.loadImage 转 PixelMap 为 base64' + this.base64);
        });
    }
    aboutToAppear(): void {
        // 查找用户信息
        this.UserInfoTable.getRdbStore(() => {
            this.UserInfoTable.query(1, (result: UserInfoData[]) => {
                this.userInfo.push(result[0]);
                // this.icon = this.userInfo[0].icon
            }, false);
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(100:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // userIcon
            Column.create();
            Column.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(102:7)", "entry");
            // userIcon
            Column.onClick(async () => {
                Logger.debug('UserBaseInfo', '打开相册');
                await photoPickerGetUri().then(async (value) => {
                    // TODO: 转 base64
                    await this.loadImage(value);
                    Logger.info('UserBaseInfo', `读取 userInfo.icon ${this.userInfo[0].icon}`);
                });
                // 保存
                this.UserInfoTable.getRdbStore(() => {
                    this.userInfo[0].icon = this.base64;
                    Logger.info('UserBaseInfo', `写数据库 userInfo.icon ${this.userInfo[0].icon}`);
                    this.UserInfoTable.updateData(this.userInfo[0], () => {
                    });
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.icon != undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.icon);
                        Image.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(104:11)", "entry");
                        Image.height({ "id": 16777459, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.width({ "id": 16777459, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.margin({ top: { "id": 16777461, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                        Image.borderRadius({ "id": 16777450, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.onComplete(msg => {
                            if (msg) {
                                Logger.debug('UserBaseInfo', JSON.stringify(msg));
                            }
                        });
                        Image.onError(error => {
                            Logger.debug('UserBaseInfo', `load image fail ${this.icon}`);
                            Logger.debug('UserBaseInfo', JSON.stringify(error));
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777270, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(119:11)", "entry");
                        Image.objectFit(ImageFit.Contain);
                        Image.height({ "id": 16777459, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.width({ "id": 16777459, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.margin({ top: { "id": 16777461, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    }, Image);
                });
            }
        }, If);
        If.pop();
        // userIcon
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(141:7)", "entry");
            Column.width({ "id": 16777452, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.height({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.margin({ top: { "id": 16777464, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.border({ radius: { "id": 16777455, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('LV.7');
            Text.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(142:9)", "entry");
            Text.fontSize({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // nickname
            Text.create(`${this.nickname}`);
            Text.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(155:7)", "entry");
            // nickname
            Text.fontSize({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.fontFamily({ "id": 16777290, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.margin({ bottom: { "id": 16777457, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            // nickname
            Text.fontWeight(FontWeight.Normal);
            // nickname
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        // nickname
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // signature
            Text.create(this.signature);
            Text.debugLine("entry/src/main/ets/view/UserBaseInfo.ets(163:7)", "entry");
            // signature
            Text.fontSize({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontWeight(FontWeight.Normal);
            // signature
            Text.fontFamily({ "id": 16777291, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontColor({ "id": 16777256, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        // signature
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
