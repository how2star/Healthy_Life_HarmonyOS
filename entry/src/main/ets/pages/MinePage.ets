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

// <<<<<<< HEAD
// =======
// 我的个人主页
// >>>>>>> origin/cjh
import { MineListInfo } from '../view/MineListInfo';
import { UserBaseInfo } from '../view/UserBaseInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import UserInfoData from '../viewmodel/UserInfoData';
import Logger from '../common/utils/Logger';
import emitter from '@ohos.events.emitter';
import { util } from '@kit.ArkTS';
import { image } from '@kit.ImageKit';
// <<<<<<< HEAD

@Component
export struct MineIndex {
  private UserInfoTable = new UserInfoApi(() => {
  });
  @State userInfo: UserInfoData[] = [];
  @State nickname: string = Const.NICK_NAME;
  @State signature: string = Const.SIGNATURE;
  @State icon: string | PixelMap | undefined = ""

// =======
// @Preview
// @Component
// export struct MineIndex {
//
//   //@State：标记的变量为响应式状态，其值变化时，依赖它们的 UI 会自动刷新（如昵称修改后，页面上的昵称会实时更新）。
//   private UserInfoTable = new UserInfoApi(() => {}); // 用户信息数据库操作实例
//   @State userInfo: UserInfoData[] = []; // 存储用户信息的响应式数组
//   @State nickname: string = Const.NICK_NAME; // 昵称（响应式状态，默认值从常量获取）
//   @State signature: string = Const.SIGNATURE; // 个性签名（响应式状态，默认值）
//   @State icon: string | PixelMap | undefined = ""; // 用户头像（支持字符串路径或像素图）
// >>>>>>> origin/cjh
  // 查找用户信息
  async aboutToAppear() {
    this.UserInfoTable.getRdbStore(() => { // 获取数据库
      this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
        if (result && result.length > 0) {
          this.userInfo.push(result[0]);
// <<<<<<< HEAD
          this.nickname = this.userInfo[0].username || "SpongeBob";
          this.signature = this.userInfo[0].signature || "这是一条个性签名";
          this.icon = this.userInfo[0].icon;
          Logger.info('MinePage', `${this.nickname}`);
        } else {
          // 如果没有查询到数据，插入新数据
// =======
//           this.nickname = this.userInfo[0]?.username;
//           this.icon = this.userInfo[0].icon;
//           Logger.info('MinePage', `${this.nickname}`);
//         } else {
          // 如果没有查询到数据，创建默认用户信息，插入新数据
// >>>>>>> origin/cjh
          let newUserInfo = new UserInfoData();
          this.UserInfoTable.insertData(newUserInfo, (id: number) => {
            newUserInfo.id = id;
            this.userInfo.push(newUserInfo);
            this.nickname = this.userInfo[0].username;
// <<<<<<< HEAD
            this.signature = this.userInfo[0].signature;
            Logger.info('MinePage', `${this.nickname}`);
            Logger.info('MinePage', `${this.signature}`);
// =======
//             Logger.info('MinePage', `${this.nickname}`);
// >>>>>>> origin/cjh
          });
        }
      }, false);
    });

    const TAG: string = 'ThreadModel';
// <<<<<<< HEAD
    // 分别定义name和signature对应的事件
    let nameEvent: emitter.InnerEvent = {
      eventId: 1
    };
    emitter.on(nameEvent, (eventData) => {
      const newName = eventData.data?.content as string;
      this.nickname = newName;
      Logger.info('MinePage', `昵称更新回调: ${newName}`);
    });
    // 收到eventId为1的事件后执行该回调
    let sigEvent: emitter.InnerEvent = { eventId: 2 };
    emitter.on(sigEvent, (eventData) => {
      const newSig = eventData.data?.content as string;
      this.signature = newSig;
      Logger.info('MinePage', `签名更新回调: ${newSig}`);
    });
// =======
//     // 定义一个eventId为1的事件
//     let event: emitter.InnerEvent = {
//       eventId: 1
//     };
//     // 收到eventId为1的事件后执行该回调
//     let callback = (eventData: emitter.EventData): void => {
//       // 更新用户信息
//       let userName = eventData.data?.content as string
//       this.userInfo[0].username = userName;
//       this.nickname = this.userInfo[0].username
//       Logger.info(TAG, 'event callback:' + JSON.stringify(eventData.data?.content));
//     };
//     // 订阅eventId为1的事件
//     emitter.on(event, callback);
// >>>>>>> origin/cjh

    await this.getIcon()
  }

  private async getIcon() {
    if (this.icon == '') {
      this.icon = undefined
      return
    }
    let helper = new util.Base64Helper();
    let buffer: ArrayBuffer = helper.decodeSync(this.icon as string, util.Type.MIME).buffer as ArrayBuffer;
    let imageSource = image.createImageSource(buffer);
    let opts: image.DecodingOptions = { editable: true };
    let pixelMap = await imageSource.createPixelMap(opts);
    this.icon = pixelMap
  }

// <<<<<<< HEAD
  build() {
    Column() {
// =======
//   // UI 布局（build 方法）
//   build() {
//     Column() {
//       // 参数通过响应式变量传递
//       // 根据查询到的数据赋值用户名 签名 头像 或者默认数据，反正是最新的
// >>>>>>> origin/cjh
      UserBaseInfo({
        nickname: this.nickname,
        signature: this.signature,
        icon: this.icon as PixelMap | undefined
      });
// <<<<<<< HEAD

// =======
//     //MineListInfo：展示个人主页的功能列表（如 “编辑资料”“设置”“帮助中心” 等），通常包含跳转其他页面的入口。
// >>>>>>> origin/cjh
      MineListInfo();
    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
  }
}