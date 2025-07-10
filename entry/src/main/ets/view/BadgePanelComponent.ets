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

import { BadgeCard } from './BadgeCardComponent'
import {
  ACHIEVEMENT_DEGREE_LEVEL_KEY_LIST,
  ACHIEVEMENT_SINGLE_LEVEL_KEY_LIST,
  getAchievementLevel,
  getDegreeSuccessiveDays,
  getSingleAchievementLevel, getSuccessiveDays } from '../model/AchieveModel'
import { getBadgeCardItems, getContinueCardItems, getDegreeCardItems } from '../viewmodel/AchievementViewModel'
import Logger from '../common/utils/Logger'
import { ACHIEVEMENT_LEVEL_KEY } from '../model/AchieveModel'
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import CardInfo from '../viewmodel/CardInfo'


// 总体成就框图
@Component
export struct BadgePanel {
  @StorageProp(ACHIEVEMENT_LEVEL_KEY) successiveDays: number=0;

  aboutToAppear() {
    Logger.debug('BadgePanel', 'aboutToAppear');
    getAchievementLevel();
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      ForEach(getBadgeCardItems(this.successiveDays), (item: CardInfo) => {
        BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
      })
    }
    .width(Const.FULL_WIDTH)
  }
}


// 单任务连续成就框图
@Component
export struct ContinuePanel {
  @StorageProp(ACHIEVEMENT_SINGLE_LEVEL_KEY_LIST) successiveDays: Array<number> = [];


  aboutToAppear() {
    Logger.debug('ContinuePanel', 'aboutToAppear');
    getSingleAchievementLevel();                                    // getAchievementLevel()
    getSuccessiveDays();
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      ForEach( getContinueCardItems(this.successiveDays), (item: CardInfo) => {//this.successiveDays
        BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
      })
    }
    .width(Const.FULL_WIDTH)
  }
}


// 单任务完成率成就框图
@Component
export struct DegreePanel {
  @StorageProp(ACHIEVEMENT_DEGREE_LEVEL_KEY_LIST) successiveDays: Array<number> = [];

  aboutToAppear() {
    Logger.debug('DegreePanel', 'aboutToAppear');
    getAchievementLevel();                                    // getAchievementLevel()
    getDegreeSuccessiveDays();
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      ForEach( getDegreeCardItems(this.successiveDays), (item: CardInfo) => {  //this.successiveDays
        BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
      })
    }
    .width(Const.FULL_WIDTH)
  }
}