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

import { ACHIEVEMENT_LEVEL_LIST, DEGREE_LEVEL_LIST } from './TaskInitList';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import GlobalInfo from '../viewmodel/GlobalInfo';
import GlobalInfoApi from '../common/database/tables/GlobalInfoApi';

export const ACHIEVEMENT_LEVEL_KEY = 'AchievementLevelKey';
export const ACHIEVEMENT_SINGLE_LEVEL_KEY = ['AchievementGetEarly','AchievementDrink','AchievementApple',
  'AchievementSmile','AchievementBrush','AchievementSleepEarly','AchievementRun'];
export const ACHIEVEMENT_SINGLE_LEVEL_KEY_LIST = 'AchievementLevelKeyList';
export const ACHIEVEMENT_DEGREE_LEVEL_KEY_LIST = 'AchievementDegreeLevelKeyList';

export function getAchievementLevel() {
  GlobalInfoApi.query((res: GlobalInfo) => {
    let globalInfo: GlobalInfo = res;
    let achievementStr = globalInfo.achievements ?? '';
    let achievements = achievementStr.split(',');
    if (achievements.length > 0) {
      AppStorage.set<Number>(ACHIEVEMENT_LEVEL_KEY, Number(achievements[achievements.length - 1]));
    }
  })

}

export function getSingleAchievementLevel() {
  for(let i = 1; i <= Const.TASK_NUM; i++){
    GlobalInfoApi.query((res: GlobalInfo) => {
      let globalInfo: GlobalInfo = res;
      let achievementStr = globalInfo.achievements ?? '';
      let achievements = achievementStr.split(',');
      if (achievements.length > 0) {
        AppStorage.set<Number>(ACHIEVEMENT_SINGLE_LEVEL_KEY[i-1], Number(achievements[achievements.length - 1]));
      }
    }, i)
  }

}

export function isReachNewAchievement(globalInfo: GlobalInfo): boolean {
  let achievementStr = globalInfo.achievements ?? '';
  let achievements = achievementStr.split(',');
  if (ACHIEVEMENT_LEVEL_LIST.indexOf(globalInfo.checkInDays) >= 0 && achievements.indexOf(String(globalInfo.checkInDays)) < 0) {
    return true;
  }
  return false;
}

export function isReachNewDegreeAchievement(globalInfo: GlobalInfo, degree: number): boolean {
  let achievementStr = globalInfo.achievements ?? '';
  let achievements = achievementStr.split(',');
  if (DEGREE_LEVEL_LIST.indexOf(degree) >= 0 && achievements.indexOf(String(degree)) < 0) {
    return true;
  }
  return false;
}

export async  function getSuccessiveDays(){
  let successiveDays: Array<number> = [];
  for(let i = 1; i <= Const.TASK_NUM; i++){
    let res = await GlobalInfoApi.queryInstant(i);
    let globalInfo: GlobalInfo = res;
    let achievementStr = globalInfo.achievements ?? '';
    let achievements = achievementStr.split(',');
    if (achievements.length > 1) {
      successiveDays.push(Number(achievements[achievements.length - 1]));
    }
    else successiveDays.push(0);
  }
  AppStorage.set<Array<number>>(ACHIEVEMENT_SINGLE_LEVEL_KEY_LIST, successiveDays);
}

export async  function getDegreeSuccessiveDays(){
  let successiveDays: Array<number> = [];
  for(let i = 1; i <= Const.TASK_NUM; i++){
    if(i == 1 || i == 6) continue;
    let res = await GlobalInfoApi.queryInstant(i * 100);
    let globalInfo: GlobalInfo = res;
    let achievementStr = globalInfo.achievements ?? '';
    let achievements = achievementStr.split(',');
    if (achievements.length > 1) {
      successiveDays.push(Number(achievements[achievements.length - 1]));
    }
    else successiveDays.push(0);
  }
  AppStorage.set<Array<number>>(ACHIEVEMENT_DEGREE_LEVEL_KEY_LIST, successiveDays);
}