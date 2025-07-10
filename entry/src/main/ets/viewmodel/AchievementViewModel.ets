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
import CardInfo from './CardInfo';
import { ACHIEVEMENT_LEVEL_LIST, AchievementMap } from '../model/TaskInitList';  // 获取成就标准 和 图片资源
import { CONTINUE_LEVEL_LIST, ContinueMap } from '../model/TaskInitList';
import { DEGREE_LEVEL_LIST, DegreeMap } from '../model/TaskInitList';

export function getBadgeCardItems(successiveDays: number): Array<CardInfo> {
  let badgeMileStones = ACHIEVEMENT_LEVEL_LIST;
  let cardItems: Array<CardInfo> = [];
  for (let i = 0; i < badgeMileStones.length; i++) {
    let onOrOff = successiveDays >= badgeMileStones[i] ? 'on' : 'off';
    let titleContent = String(badgeMileStones[i]);
    let cardInfo: CardInfo = new CardInfo();
    cardInfo.titleContent = '连续' + titleContent + '天打卡';
    cardInfo.achievement = getAchievement(`${onOrOff}_${badgeMileStones[i]}`);
    cardItems.push(cardInfo);
  }
  return cardItems;
}

function getAchievement(key: string) {
  let result = $r('app.string.empty');
  switch (key) {
    case 'off_3':
      result = AchievementMap.off_3;
      break;
    case 'on_3':
      result = AchievementMap.on_3;
      break;
    case 'off_7':
      result = AchievementMap.off_7;
      break;
    case 'on_7':
      result = AchievementMap.on_7;
      break;
    case 'off_30':
      result = AchievementMap.off_30;
      break;
    case 'on_30':
      result = AchievementMap.on_30;
      break;
    case 'off_50':
      result = AchievementMap.off_50;
      break;
    case 'on_50':
      result = AchievementMap.on_50;
      break;
    case 'off_73':
      result = AchievementMap.off_73;
      break;
    case 'on_73':
      result = AchievementMap.on_73;
      break;
    case 'off_99':
      result = AchievementMap.off_99;
      break;
    case 'on_99':
      result = AchievementMap.on_99;
      break;
    default:
      break;
  }
  return result;
}

// 输入单个任务连续次数，  返回单任务连续成就数组(CardInfo类型)
export function getContinueCardItems(successiveDays: Array<number>): Array<CardInfo> {   // CardInfo 成就对应的文字和图片
  let ContinueList: Array<string> = ['早起','喝水','吃苹果','每日微笑','每日刷牙','早睡'];

  let badgeMileStones = CONTINUE_LEVEL_LIST;   // 单任务连续成就标准
  let cardItems: Array<CardInfo> = [];

  for (let k = 0; k < ContinueList.length; k++){
    for (let i = 0; i < badgeMileStones.length; i++) {
      let onOrOff = successiveDays[k] >= badgeMileStones[i] ? 'on' : 'off';
      let titleContent = String(badgeMileStones[i]);  // 成就标准 数字转成字符串
      let cardInfo: CardInfo = new CardInfo();
      cardInfo.titleContent =  '连续' + titleContent + '天' + ContinueList[k] ;
      cardInfo.achievement = getContinue(`${onOrOff}__${badgeMileStones[i]}`);  // 返回图片， 增亮与否_成就标准
      cardItems.push(cardInfo);
    }
  }
  return cardItems;
}

function getContinue(key: string) {
  let result = $r('app.string.empty');
  switch (key) {
    case 'off__3':
      result = ContinueMap.off__3;   // 返回对应图片
      break;
    case 'on__3':
      result = ContinueMap.on__3;
      break;
    case 'off__30':
      result = ContinueMap.off__30;
      break;
    case 'on__30':
      result = ContinueMap.on__30;
      break;
    case 'off__90':
      result = ContinueMap.off__90;
      break;
    case 'on__90':
      result = ContinueMap.on__90;
      break;
    default:
      break;
  }
  return result;
}


// 输入单个任务完成率，  返回单任务完成率成就数组(CardInfo类型)
export function getDegreeCardItems(successiveDays: Array<number>): Array<CardInfo> {   // CardInfo 成就对应的文字和图片
  let DegreeList: Array<string> = ['喝水','吃苹果','每日微笑','每日刷牙', '跑步']

  let badgeMileStones = DEGREE_LEVEL_LIST;   // 单任务完成率成就标准
  let cardItems: Array<CardInfo> = [];

  for (let k = 0; k < DegreeList.length; k++){
    for (let i = 0; i < badgeMileStones.length; i++) {
      let onOrOff = successiveDays[k] >= badgeMileStones[i] ? 'on' : 'off';
      let titleContent = String(badgeMileStones[i]);  // 成就标准 数字转成字符串
      let cardInfo: CardInfo = new CardInfo();
      cardInfo.titleContent = DegreeList[k] + titleContent + '%完成' ;
      cardInfo.achievement = getDegree(`${onOrOff}__${badgeMileStones[i]}`);  // 返回图片， 增亮与否_成就标准
      cardItems.push(cardInfo);
    }
  }
  return cardItems;
}

function getDegree(key: string) {
  let result = $r('app.string.empty');
  switch (key) {
    case 'off__200':
      result = DegreeMap.off__200;  // 返回对应图片
      break;
    case 'on__200':
      result = DegreeMap.on__200;
      break;
    case 'off__300':
      result = DegreeMap.off__300;
      break;
    case 'on__300':
      result = DegreeMap.on__300;
      break;
    case 'off__400':
      result = DegreeMap.off__400;
      break;
    case 'on__400':
      result = DegreeMap.on__400;
      break;
    default:
      break;
  }
  return result;
}