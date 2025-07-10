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

import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { AchievementMap, DegreeMap, TaskMapById } from '../../model/TaskInitList';

const ANGLE_LARGE = 360;

@CustomDialog
export struct AchievementDegreeDialog {
  controller: CustomDialogController = new CustomDialogController({ builder: 0 });
  @Consume achievementLevel: number;
  @Consume taskID: number;
  @State private opacityValue: number = 0;
  @State private angle: number = 0;
  @State private scaleValue: number = 0;
  @State achievementMapValue: Resource = $r('app.string.empty');

  aboutToAppear() {
    switch (this.achievementLevel) {
      case 200:
        this.achievementMapValue = DegreeMap.on__200;
        break;
      case 300:
        this.achievementMapValue = DegreeMap.on__300;
        break;
      case 400:
        this.achievementMapValue = DegreeMap.on__400;
        break;
      default:
        break;
    }
  }

  build() {
    Column() {

      Image(this.achievementMapValue)
        .width(Const.THOUSANDTH_560)
        .height(Const.THOUSANDTH_400)
        .objectFit(ImageFit.Contain)

      Text($r('app.string.task_degree_achievement_level', this.achievementLevel))
        .fontSize($r('app.float.default_24'))
        .fontWeight(Const.FONT_WEIGHT_500)
        .fontColor($r('app.color.white'))
        .fontFamily($r('app.string.HarmonyHeiTi'))
        .margin({ top: $r('app.float.default_12') })
    }
    .height(Const.THOUSANDTH_800)
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Center)
    .gesture(TapGesture().onAction(() => {
      this.controller.close();
    }))
    .scale({ x: this.scaleValue, y: this.scaleValue })
    .rotate({ x: 0, y: 1, z: 0, angle: this.angle })
    .opacity(this.opacityValue)
    .onAppear(() => {
      animateTo({
        duration: Const.DURATION_800,
        curve: Curve.EaseOut,
        delay: Const.DURATION_100,
        iterations: 1
      }, () => {
        this.opacityValue = 1;
        this.scaleValue = 1;
        this.angle = ANGLE_LARGE;
      });
    })
  }
}



