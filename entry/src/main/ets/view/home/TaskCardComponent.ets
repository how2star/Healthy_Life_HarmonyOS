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

import { TaskMapById } from '../../model/TaskInitList';
import HealthText from '../../view/HealthTextComponent';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import TaskInfo from '../../viewmodel/TaskInfo';

@Styles
function allSize() {
  .width(Const.THOUSANDTH_1000)
  .height(Const.THOUSANDTH_1000)
}

@Extend(Text)
function labelTextStyle() {
  .fontSize($r('app.float.default_16'))
  .fontWeight(Const.FONT_WEIGHT_500)
  .opacity(Const.OPACITY_6)
  .fontFamily($r('app.string.HarmonyHeiTi'))
}

@Component
export struct TaskCard {
  /**
   * Prop装饰的变量为一种状态变量，其变量名和类型来自父组件，且数据是父->子单向同步。
   * TaskCard的父组件是HomeIndex，同步的变量是taskInfoStr(保存了taskInfo信息)。
   */
  @Prop taskInfoStr: string = '';
  clickAction: Function = (isClick: boolean) => {
  };
  @State taskInfo: TaskInfo = new TaskInfo(-1, '', -1, '', false, '', '', '', false, '', false);

  // 解析由父组件同步的JSON格式的taskInfo数据
  aboutToAppear() {
    this.taskInfo = JSON.parse(this.taskInfoStr);
  }

  /**
   * 自定义构建函数，可理解为定义了一个在build里使用的函数。
   * 更新子任务完成情况的显示。
   */
  @Builder
  targetValueBuilder() {
    if (this.taskInfo.isDone) {
      Row() {
        if (this.taskInfo.taskID != 1 && this.taskInfo.taskID != 6) {
          HealthText({
            title: this.taskInfo.finValue || `--`,
            fontSize: $r('app.float.default_24')
          })
          Text(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`)
            .labelTextStyle()
            .fontWeight(Const.FONT_WEIGHT_400)
            .padding(10)
        }
        HealthText({ title: '', titleResource: $r('app.string.task_done') })
      }
      .align(Alignment.End)
    } else {
      Row() {
        // 子任务完成情况显示前半部分：--或者finalvalue（已累加值）
        HealthText({
          title: this.taskInfo.finValue || `--`,
          fontSize: $r('app.float.default_24')
        })
        Text(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`) // 子任务完成情况显示后半部分：/+targetvalue+单位
          .labelTextStyle()
          .fontWeight(Const.FONT_WEIGHT_400)
      }
    }
  }

  build() {
    Row() {
      Row({ space: Const.DEFAULT_6 }) {
        Image(TaskMapById[this.taskInfo.taskID - 1].icon)
          .width($r('app.float.default_36')).height($r('app.float.default_36'))
          .objectFit(ImageFit.Contain)
        HealthText({
          title: '',
          titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
          fontFamily: $r('app.string.HarmonyHeiTi')
        })
      }

      this.targetValueBuilder();
    }
    .allSize()
    .justifyContent(FlexAlign.SpaceBetween)
    .borderRadius($r('app.float.default_24'))
    .padding({ left: Const.THOUSANDTH_50, right: Const.THOUSANDTH_33 })
    // .backgroundColor($r('app.color.white'))
    .linearGradient({
      direction: GradientDirection.Left, // 渐变方向
      repeating: false, // 渐变颜色是否重复
      // colors: [[$r('app.color.white'), 1-Number(this.taskInfo.finValue)/Number(this.taskInfo.targetValue)], [0xB0E0E6, 0]] // 数组末尾元素占比小于1时满足重复着色效果
      colors: (this.taskInfo.taskID === 1 || this.taskInfo.taskID === 6) ?
        [[$r('app.color.white'), 1 - Number(Boolean(this.taskInfo.finValue))], [0xB0E0E6, 0]] :
        [[$r('app.color.white'), 1 - Number(this.taskInfo.finValue) / Number(this.taskInfo.targetValue)], [0xB0E0E6, 0]]
    })
    .onClick(() => this.clickAction(true))
    .gesture(LongPressGesture().onAction(() => this.clickAction(false)))
  }
}