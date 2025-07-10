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

import { CommonConstants } from '../common/constants/UserConstants';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';
import { DateModel } from '../viewmodel/DateModel';
import { getRealTimeDate } from '../viewmodel/GetDate';
import UserInfoData from '../viewmodel/UserInfoData';
import UserInfoApi from '../common/database/tables/UserInfoApi';

import emitter from '@ohos.events.emitter';


@Entry
@Component
struct Index {
  @State selectGenderIndex: number = 0
  private provideGender: string[] = ['保密', '男', '女'];
  @State selectGender: string = this.provideGender[this.selectGenderIndex]
  @State currentMonth: number = 1;
  @State currentDay: number = 1;
  @State currentYear: number = 1;
  @StorageLink('selectedDate') dateModel: DateModel = new DateModel(0, 0, 0, 0);
  private selectedDate: Date = new Date()
  private provideWeight: string[] = []
  private provideHeight: string[] = []
  private selectWeightIndex: number = 50 - 20
  private selectHeightIndex: number = 160 - 80
  @State selectWeight: string = "50"
  @State selectHeight: string = "160"

  onCancel() {
  }

  @State nickname: string = Const.NICK_NAME;
  private UserInfoTable = new UserInfoApi(() => {
  });
  @State userInfo: UserInfoData[] = [];

  aboutToAppear(): void {
    this.dateModel = getRealTimeDate();
    // this.currentMonth = this.dateModel.month;
    // this.currentDay = this.dateModel.day;
    // this.currentYear = this.dateModel.year;
    for (let i = 0; i < 160; i++) {
      this.provideHeight.push(String(i + 80))
    }
    for (let i = 0; i < 100; i++) {
      this.provideWeight.push(String(i + 20))
    }
    // 查找用户信息
    this.UserInfoTable.getRdbStore(() => { // 获取数据库
      this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
        this.userInfo.push(result[0]);
        // 初始名称
        this.nickname = this.userInfo[0].username
        // 初始生日
        this.dateModel.month = Number(this.userInfo[0].mouth)
        this.dateModel.year = Number(this.userInfo[0].year)
        this.dateModel.day = Number(this.userInfo[0].date)
        this.currentMonth = Number(this.userInfo[0].mouth)
        this.currentDay = Number(this.userInfo[0].date)
        this.currentYear = Number(this.userInfo[0].year)
        this.selectedDate.setDate(this.currentDay)
        this.selectedDate.setMonth(this.currentMonth)
        this.selectedDate.setFullYear(this.currentYear)
        // 初始身高体重
        this.selectWeight = this.userInfo[0].weight
        this.selectHeight = this.userInfo[0].height
        this.selectWeightIndex = Number(this.selectWeight) - 20
        this.selectHeightIndex = Number(this.selectHeight) - 80
        // 初始性别
        this.selectGender = this.userInfo[0].gender
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
      let userName = eventData.data?.content as string
      this.userInfo[0].username = userName;
      this.nickname = this.userInfo[0].username
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

  @Builder
  Options(name: Resource, url: string) {
    Row() {
      Column() {
        Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
          Text(name)
            .fontSize($r('app.float.card_padding'))
            .fontWeight(FontWeight.Medium)

          if (url == '性别') {
            Text(this.selectGender)
              .fontSize($r('app.float.card_padding'))
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.no_data_background'))
              .textAlign(TextAlign.End)
          } else if (url == '生日') {
            Text(`${this.dateModel.year}年${this.dateModel.month + 1}月${this.dateModel.day}日`)
              .fontSize($r('app.float.card_padding'))
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.no_data_background'))
              .textAlign(TextAlign.End)
          } else if (url == '身高') {
            Text(this.selectHeight + "cm")
              .fontSize($r('app.float.card_padding'))
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.no_data_background'))
              .textAlign(TextAlign.End)
          } else if (url == '体重') {
            Text(this.selectWeight + "kg")
              .fontSize($r('app.float.card_padding'))
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.no_data_background'))
              .textAlign(TextAlign.End)
          } else {
            Text(this.nickname)
              .fontSize($r('app.float.card_padding'))
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.no_data_background'))
              .textAlign(TextAlign.End)
          }


          Image($r('app.media.ic_right_grey'))
            .objectFit(ImageFit.Contain)
            .height($r('app.float.default_12'))
            .width($r('app.float.default_12'))
        }
      }
      .alignItems(HorizontalAlign.Start)
      .margin({
        left: $r('app.float.default_4'),
        right: $r('app.float.default_12')
      })

      Blank()
      Row()
        .width(Const.THOUSANDTH_1000)
        .height(Const.THOUSANDTH_1000)
        .border({
          width: { top: $r('app.float.border'), right: $r('app.float.border') },
          color: $r('app.color.white')
        })
        .rotate({ angle: CommonConstants.ANGLE })
    }
    .borderRadius($r('app.float.text_size_headline'))
    .shadow({
      radius: $r('app.float.shadow_radius'),
      color: $r('app.color.white')
    })
    .width(CommonConstants.ONE_HUNDRED_PERCENT)
    .height($r('app.float.row_height'))
    .alignItems(VerticalAlign.Center)
    .padding({
      left: $r('app.float.column_padding'),
      top: $r('app.float.column_padding'),
      bottom: $r('app.float.column_padding')
    })
    .border({
      width: { bottom: $r('app.float.default_1') },
      color: $r('app.color.borderColor')
    })
    .backgroundColor(Color.White)
    .onClick(() => {
      if (url == '性别') {
        TextPickerDialog.show({
          range: this.provideGender,
          selected: this.selectGenderIndex,
          backgroundColor: $r('app.color.white'),
          onAccept: (value: TextPickerResult) => {
            this.selectGenderIndex = value.index as number;
            this.selectGender = value.value as string;
            Logger.debug('MineEditPage', '编辑性别');
            // 保存
            this.UserInfoTable.getRdbStore(() => { // 获取数据库
              this.userInfo[0].gender = this.selectGender
              Logger.info('MineEditPage', `编辑性别 ${this.userInfo[0].gender}`);
              this.UserInfoTable.updateData(this.userInfo[0], () => {
              });
            });
          },
          canLoop: false
        })
        return
      }
      if (url == '身高') {
        TextPickerDialog.show({
          range: this.provideHeight,
          selected: this.selectHeightIndex,
          backgroundColor: $r('app.color.white'),
          onAccept: (value: TextPickerResult) => {
            this.selectHeightIndex = value.index as number;
            this.selectHeight = value.value as string;
            Logger.debug('MineEditPage', '编辑身高');
            // 保存
            this.UserInfoTable.getRdbStore(() => { // 获取数据库
              this.userInfo[0].height = this.selectHeight
              Logger.info('MineEditPage', `编辑身高 ${this.userInfo[0].height}`);
              this.UserInfoTable.updateData(this.userInfo[0], () => {
              });
            });
          },
          canLoop: false
        })
        return
      }
      if (url == '体重') {
        TextPickerDialog.show({
          range: this.provideWeight,
          selected: this.selectWeightIndex,
          backgroundColor: $r('app.color.white'),
          onAccept: (value: TextPickerResult) => {
            this.selectWeightIndex = value.index as number;
            this.selectWeight = value.value as string;
            Logger.debug('MineEditPage', '编辑体重');
            // 保存
            this.UserInfoTable.getRdbStore(() => { // 获取数据库
              this.userInfo[0].weight = this.selectWeight
              Logger.info('MineEditPage', `编辑体重 ${this.userInfo[0].weight}`);
              this.UserInfoTable.updateData(this.userInfo[0], () => {
              });
            });
          },
          canLoop: false
        })
        return
      }
      if (url == '生日') {
        CalendarPickerDialog.show({
          selected: this.selectedDate,
          onAccept: (value) => {
            console.info("calendar onAccept:" + JSON.stringify(value))
            this.dateModel.month = value.getMonth()
            this.dateModel.year = value.getFullYear()
            this.dateModel.day = value.getDate()
            // 保存
            this.UserInfoTable.getRdbStore(() => { // 获取数据库
              this.userInfo[0].mouth = String(this.dateModel.month)
              this.userInfo[0].year = String(this.dateModel.year)
              this.userInfo[0].date = String(this.dateModel.day)
              this.currentMonth = Number(this.userInfo[0].mouth)
              this.currentDay = Number(this.userInfo[0].date)
              this.currentYear = Number(this.userInfo[0].year)
              this.selectedDate.setDate(this.currentDay)
              this.selectedDate.setMonth(this.currentMonth)
              this.selectedDate.setFullYear(this.currentYear)
              Logger.info('MineEditPage', `编辑生日 ${this.userInfo[0].date}`);
              this.UserInfoTable.updateData(this.userInfo[0], () => {
              });
            });
          },
        })
        return
      }
      router.pushUrl({
        url
      })
    })
  }

  build() {
    Row() {
      Navigation() {
        Column() {
          this.Options($r('app.string.user_name'), 'pages/MineEditNamePage')
          this.Options($r('app.string.gender'), '性别')
          this.Options($r('app.string.birth_data'), '生日')
          this.Options($r('app.string.height'), '身高')
          this.Options($r('app.string.weight'), '体重')
        }
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title($r('app.string.base_personal_data'))
      .titleMode(NavigationTitleMode.Mini)
    }
    .height(Const.THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}