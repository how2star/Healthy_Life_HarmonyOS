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

@Styles
function allSize() {
  .width(Const.THOUSANDTH_560)
  .height(Const.THOUSANDTH_560)
}

@Component
export default struct AddCalendarBtn {
  clickAction: Function = () => {
  };

  build() {
    Button({ type: ButtonType.Normal, stateEffect: false }) {
      Image($r('app.media.calendar_month'))
        .allSize()
        .borderRadius(Const.BORDER_RADIUS_PERCENT_50)
    }
    .backgroundColor('#00ffffff')

    .onClick(() => this.clickAction())
    .zIndex(Const.HOME_BTN_Z)
    .width($r('app.float.default_36'))
    .height($r('app.float.default_36'))
  }
}