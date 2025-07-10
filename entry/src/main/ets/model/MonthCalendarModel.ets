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

import TaskInfo from '../viewmodel/TaskInfo';
import DayInfo from '../viewmodel/DayInfo';
import { WEEK_TITLES, dateToStr } from '../common/utils/Utils'
import Logger from '../common/utils/Logger'
import WeekCalendarInfo from '../viewmodel/WeekCalendarInfo';
import { WeekDateModel, initializeOnStartUp, getPreviousWeek, WEEK_DAY_NUM } from './WeekCalendarModel';

import { HomeStore } from '../viewmodel/HomeViewModel';

import HashMap from '@ohos.util.HashMap'; // 导入HashMap模块




@Observed
export class MonthCalendar {
  public dateArr: Array<WeekDateModel> = []; // data source list
  public currentDate: Date;
  public dayInfoMap: HashMap<number, DayInfo> = new HashMap();

  constructor(currentDate: Date) {
    this.currentDate = currentDate;
  }

  public initMonthCalendar() {
    let weekCalendarInfo: WeekCalendarInfo = initializeOnStartUp(this.currentDate);
    this.dateArr = weekCalendarInfo.arr;
    for (let item of this.dateArr) {
      this.dayInfoMap[Number(item.date)] = item.dayInfo;
    }
  }
}






