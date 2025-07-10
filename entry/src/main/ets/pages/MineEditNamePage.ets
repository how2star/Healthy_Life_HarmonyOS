/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { router } from '@kit.ArkUI';

// import { CommonConstants } from '../common/constants/CommonConstants';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { CommonConstants } from '../common/constants/UserConstants';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import Logger from '../common/utils/Logger';
import UserInfoData from '../viewmodel/UserInfoData';

import emitter from '@ohos.events.emitter';

@CustomDialog
struct CustomDialogExample {
  controller?: CustomDialogController;

  build() {
    Column() {
      Text("昵称不规范！")
        .fontSize($r('app.float.font_size1'))
        .fontColor(Color.Black)
        .height($r('app.float.toast_height'))
    }
    .backgroundColor($r('app.color.white'))
    .borderRadius($r('app.float.border_radius2'))
    .width($r('app.float.toast_width'))
  }
}

@CustomDialog
struct CustomDialogExample2 {
  controller?: CustomDialogController;

  build() {
    Column() {
      Text("保存成功")
        .fontSize($r('app.float.font_size1'))
        .fontColor(Color.Black)
        .height($r('app.float.toast_height'))
    }
    .backgroundColor($r('app.color.white'))
    .borderRadius($r('app.float.border_radius2'))
    .width($r('app.float.toast_width'))
  }
}


@Entry
@Component
struct Index {
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample(),
    openAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    closeAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    alignment: DialogAlignment.Bottom,
    offset: { dx: CommonConstants.ZERO, dy: $r('app.float.offset_dy') },
    customStyle: true,
    cornerRadius: $r('app.float.corner_radius'),
    isModal: false
  })
  dialogController2: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample2(),
    openAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    closeAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    alignment: DialogAlignment.Bottom,
    offset: { dx: CommonConstants.ZERO, dy: $r('app.float.offset_dy') },
    customStyle: true,
    cornerRadius: $r('app.float.corner_radius'),
    isModal: false
  })
  @State name: string = ''
  @State userInfo: UserInfoData[] = []
  private UserInfoTable = new UserInfoApi(() => {
  });

  build() {
    Row() {
      Navigation() {
        Column() {
          TextInput({ placeholder: "起一个昵称" })
            .margin({
              top: $r('app.float.corner_radius'),
              left: $r('app.float.corner_radius'),
              right: $r('app.float.corner_radius')
            }).onChange((value: string) => {
            this.name = value
          }).enableKeyboardOnFocus(true)

          Button('保存')
            .width($r('app.float.default_120'))
            .height($r('app.float.default_40'))// Write the information and clear the content so that the text box is cleared after you click Save.
            .onClick(() => {
              if (this.name == '' || this.name.length > 30) {
                if (this.dialogController != null) {
                  this.dialogController.open();
                  setTimeout(() => {
                    this.dialogController?.close();
                  }, 1000)
                }
                return
              }
              // 保存成功
              this.UserInfoTable.getRdbStore(() => { // 获取数据库
                this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
                  this.userInfo.push(result[0]);
                  this.userInfo[0].username = this.name
                  Logger.info('MineEditNamePage', `${this.name}`);
                  this.UserInfoTable.updateData(this.userInfo[0], () => {
                  });
                  // 定义一个eventId为1的事件，事件优先级为Low
                  let event: emitter.InnerEvent = {
                    eventId: 1,
                    priority: emitter.EventPriority.LOW
                  }
                  // 将修改后的名字发送出去
                  let eventData: emitter.EventData = {
                    data: {
                      content: this.name,
                      id: 1,
                      isEmpty: false
                    }
                  };
                  // 发送eventId为1的事件，事件内容为eventData
                  emitter.emit(event, eventData);
                }, false);
              });

              if (this.dialogController2 != null) {
                this.dialogController2.open();
                setTimeout(() => {
                  this.dialogController2?.close();
                }, 1000)
              }
              // 返回上一级
              router.back()
            }).margin({ top: 50 })
        }
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title('昵称修改')
      .titleMode(NavigationTitleMode.Mini)
    }
    .height(Const.THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}