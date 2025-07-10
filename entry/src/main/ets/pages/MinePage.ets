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

import { MineListInfo } from '../view/MineListInfo';
import { UserBaseInfo } from '../view/UserBaseInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import UserInfoData from '../viewmodel/UserInfoData';
import Logger from '../common/utils/Logger';
import emitter from '@ohos.events.emitter';
import { util } from '@kit.ArkTS';
import { image } from '@kit.ImageKit';

@Component
export struct MineIndex {
  private UserInfoTable = new UserInfoApi(() => {
  });
  @State userInfo: UserInfoData[] = [];
  @State nickname: string = Const.NICK_NAME;
  @State signature: string = Const.SIGNATURE;
  @State icon: string | PixelMap | undefined = ""

  // 查找用户信息
  async aboutToAppear() {
    this.UserInfoTable.getRdbStore(() => { // 获取数据库
      this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
        if (result && result.length > 0) {
          this.userInfo.push(result[0]);
          this.nickname = this.userInfo[0].username || "SpongeBob";
          this.signature = this.userInfo[0].signature || "这是一条个性签名";
          this.icon = this.userInfo[0].icon;
          Logger.info('MinePage', `${this.nickname}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newUserInfo = new UserInfoData();
          this.UserInfoTable.insertData(newUserInfo, (id: number) => {
            newUserInfo.id = id;
            this.userInfo.push(newUserInfo);
            this.nickname = this.userInfo[0].username;
            this.signature = this.userInfo[0].signature;
            Logger.info('MinePage', `${this.nickname}`);
            Logger.info('MinePage', `${this.signature}`);
          });
        }
      }, false);
    });

    const TAG: string = 'ThreadModel';
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

  build() {
    Column() {
      UserBaseInfo({
        nickname: this.nickname,
        signature: this.signature,
        icon: this.icon as PixelMap | undefined
      });

      MineListInfo();
    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
  }
}