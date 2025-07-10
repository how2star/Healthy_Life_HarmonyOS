/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Logger from '../common/utils/Logger';
// PictureSaving.ets
import { fileIo, picker } from '@kit.CoreFileKit';
import { BusinessError } from '@kit.BasicServicesKit';
import UserInfoData from '../viewmodel/UserInfoData';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import { buffer, util } from '@kit.ArkTS';
import { image } from '@kit.ImageKit';
import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';
import { rpc } from '@kit.IPCKit';

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
  } catch (error) {
    let err = error as BusinessError;
    Logger.error('PhotoViewPicker failed with err: ' + err.message);
  }
  return uris[0].toString();
}

@Component
export struct UserBaseInfo {
  @Prop nickname: string = '';
  @Prop signature: string = '';
  @Prop icon: PixelMap | undefined = undefined;
  @State userInfo: UserInfoData[] = [];
  @State base64: string = '';
  private UserInfoTable = new UserInfoApi(() => {
  });

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
    let pixelMap = this.icon
    // 转换成base64
    const imagePackerApi: image.ImagePacker = image.createImagePacker();
    let packOpts: image.PackingOption = { format: 'image/jpeg', quality: 100 };
    imagePackerApi.packing(pixelMap, packOpts).then((data: ArrayBuffer) => {
      let buf: buffer.Buffer = buffer.from(data);
      this.base64 = 'data:image/jpeg;base64,' + buf.toString('base64', 0, buf.length);
      console.info('base64: ' + this.base64);
      Logger.info('UserBaseInfo.loadImage 转 PixelMap 为 base64' + this.base64);
    })
  }

  aboutToAppear(): void {
    // 查找用户信息
    this.UserInfoTable.getRdbStore(() => { // 获取数据库
      this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
        this.userInfo.push(result[0]);
        // this.icon = this.userInfo[0].icon
      }, false);
    });
  }

  build() {
    Column() {
      // userIcon
      Column() {
        if (this.icon != undefined) {
          Image(this.icon)
            .height($r('app.float.default_66'))
            .width($r('app.float.default_66'))
            .margin({ top: $r('app.float.default_71') })
            .borderRadius($r('app.float.default_40'))
            .onComplete(msg => {
              if (msg) {
                Logger.debug('UserBaseInfo', JSON.stringify(msg))
              }
            })// 图片获取失败，打印结果
            .onError(error => {
              Logger.debug('UserBaseInfo', `load image fail ${this.icon}`)
              Logger.debug('UserBaseInfo', JSON.stringify(error))
            })
        } else {
          Image($r('app.media.ic_user'))
            .objectFit(ImageFit.Contain)
            .height($r('app.float.default_66'))
            .width($r('app.float.default_66'))
            .margin({ top: $r('app.float.default_71') })
        }
      }.onClick(async () => {
        Logger.debug('UserBaseInfo', '打开相册');
        await photoPickerGetUri().then(async value => {
          // TODO: 转 base64
          await this.loadImage(value)
          Logger.info('UserBaseInfo', `读取 userInfo.icon ${this.userInfo[0].icon}`);
        });
        // 保存
        this.UserInfoTable.getRdbStore(() => { // 获取数据库
          this.userInfo[0].icon = this.base64
          Logger.info('UserBaseInfo', `写数据库 userInfo.icon ${this.userInfo[0].icon}`);
          this.UserInfoTable.updateData(this.userInfo[0], () => {
          });
        });
      })

      Column() {
        Text('LV.7')
          .fontSize($r('app.float.default_12'))
          .fontWeight(FontWeight.Bolder)
          .fontColor($r('app.color.leveColor'))
      }
      .width($r('app.float.default_44'))
      .height($r('app.float.default_16'))
      .margin({ top: $r('app.float.default_n8') })
      .border({ radius: $r('app.float.default_5') })
      .backgroundColor($r('app.color.leveBgColor'))
      .justifyContent(FlexAlign.Center)

      // nickname
      Text(`${this.nickname}`,)
        .fontSize($r('app.float.default_20'))
        .fontFamily($r('app.string.Helvetica'))
        .margin({ bottom: $r('app.float.default_6') })
        .fontWeight(FontWeight.Normal)
        .fontColor($r('app.color.black'))

      // signature
      Text(this.signature).fontSize($r('app.float.default_16')).fontWeight(FontWeight.Normal)
        .fontFamily($r('app.string.PingFangSC_Regular'))
        .fontColor($r('app.color.signatureColor'))
    }
  }
}