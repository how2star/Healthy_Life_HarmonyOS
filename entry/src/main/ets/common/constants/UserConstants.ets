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
import { relationalStore } from '@kit.ArkData';

export interface UserInfoTable {
  tableName: string;
  sqlCreate: string;
  columns: string[];
}

export class CommonConstants {
  /**
   * Month.
   */
  static readonly MONTHS = 12;
  /**
   * January.
   */
  static readonly JANUARY = 1;
  /**
   * A week.
   */
  static readonly WEEK_NUMBER = 7;
  /**
   * Month number.
   */
  static readonly MONTH_NUMBER = 35;
  /**
   * Small grid height.
   */
  static readonly GRID_HEIGHT_L = 360;
  /**
   * Large grid height.
   */
  static readonly GRID_HEIGHT_M = 300;
  /**
   * Outside margin.
   */
  static readonly ELEMENTS_MARGIN = 12;
  /**
   * One hundred percent.
   */
  static readonly ONE_HUNDRED_PERCENT: string = '100%';
  /**
   * One hundred eleven percent.
   */
  static readonly ONE_HUNDRED_ELEVEN_PERCENT: string = '111%';
  /**
   * Ninety two percent.
   */
  static readonly NINETY_PERCENT: string = '90%';
  /**
   * Ninety two percent.
   */
  static readonly NINETY_TWO_PERCENT: string = '92%';
  /**
   * Ninety five percent.
   */
  static readonly NINETY_FIVE_PERCENT: string = '95%';
  /**
   * Eighty five percent.
   */
  static readonly EIGHTY_FIVE_PERCENT: string = '85%';
  /**
   * Thirty percent.
   */
  static readonly THIRTY_PERCENT: string = '30%';
  /**
   * Forty percent.
   */
  static readonly FORTY_PERCENT: string = '40%';
  /**
   * Seventy-five percent.
   */
  static readonly SEVENTY_FIVE_PERCENT: string = '75%';
  /**
   * Rotation angle.
   */
  static readonly ANGLE: number = 45;
  /**
   * Line Spacing.
   */
  static readonly SPACE: number = 15;
  /**
   * Moving distance.
   */
  static readonly TRANSLATE: number = 1000;
  /**
   * Zero six.
   */
  static readonly ZERO_SIX: number = 0.6;
  /**
   * Zero eight.
   */
  static readonly ZERO_EIGHT: number = 0.8;
  /**
   * Duration.
   */
  static readonly DURATION: number = 1200;
  /**
   * Delay.
   */
  static readonly DELAY: number = 500;
  /**
   * GridCount.
   */
  static readonly GRID_COUNT: number = 2;
  /**
   * Zero.
   */
  static readonly ZERO: number = 0;
  /**
   * Four
   */
  static readonly FOUR: number = 4;
  /**
   * Eight.
   */
  static readonly EIGHT: number = 8;
  /**
   * Twelves.
   */
  static readonly TWELVES: number = 12;
  /**
   * Space.
   */
  static readonly SPACE_ONE: number = 20;
  /**
   * Element margin large.
   */
  static readonly ELEMENTS_MARGIN_L: number = 24;
  /**
   * Element margin small.
   */
  static readonly ELEMENTS_MARGIN_M: number = 8;
  /**
   * 0.0.
   */
  static readonly ZERO_ZERO: number = 0.0;
  /**
   * 0.3.
   */
  static readonly ZERO_Three: number = 0.3;
  /**
   * 1.0.
   */
  static readonly ONE_ZERO: number = 1.0;
  /**
   * Privacy pop-up window content 1.
   */
  static readonly TEXT_ONE: string =
    '根据《常见类型移动互联网应用程序必要个人信息范围规定》,主要功能为购买商品，必要个人信息为：' +
      '注册用户电话号码；收货人姓名、地址、联系电话;支付时间、支付金额、支付渠道等。请您在使用我们的服务前仔细阅读';
  /**
   * Privacy pop-up window content 2.
   */
  static readonly TEXT_TWO: string =
    '。请您知悉，同意隐私政策仅代表您已了解应用提供功能，以及功能运行所需的必要个人信息。基于您的授权我们可能会获取您的位置等信息，您有权拒绝或取消授权；' +
      '我们会采取业界先进的安全措施保护您的信息安全；未经您同意，我们不会从第三方处获取、共享或向其提供您的信息；您可以查询、更正、删除您的个人信息';
  /**
   * Edit.
   */
  static readonly EDIT: string = '编辑';
  /**
   * Saturday.
   */
  static readonly SATURDAY: string = '六';
  /**
   * Sunday.
   */
  static readonly SUNDAY: string = '日';
  /**
   * Seven grid.
   */
  static readonly GRID_SEVEN: string = '1fr 1fr 1fr 1fr 1fr 1fr 1fr';
  /**
   * Six grid.
   */
  static readonly GRID_SIX: string = '1fr 1fr 1fr 1fr 1fr 1fr';
  /**
   * Five grid.
   */
  static readonly GRID_FIVE: string = '1fr 1fr 1fr 1fr 1fr';
  /**
   * Rdb database config.
   */
  static readonly STORE_CONFIG: relationalStore.StoreConfig = {
    name: 'database.db',
    // name: 'taskInfo.db',
    securityLevel: relationalStore.SecurityLevel.S1
  };
  /**
   * Account table config.
   */
  static readonly USERINFO_TABLE: UserInfoTable = {
    tableName: 'userInfoTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS userInfoTable(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, ' +
      'year TEXT, mouth TEXT, date TEXT, gender TEXT, weight TEXT, height TEXT, icon TEXT)',
    columns: ['id', 'username', 'year', 'mouth', 'date', 'gender', 'weight', 'height', 'icon']
  };
  /**
   * Search text of Search component.
   */
  static readonly SEARCH_TEXT = '搜索';
  /**
   * toast text of prompt component.
   */
  static readonly TOAST_TEXT_1 = '账目类型不能为空';
  static readonly TOAST_TEXT_2 = '账目金额不为正整数';
  /**
   * Component size.
   */
  static readonly FULL_WIDTH = '100%';
  static readonly FULL_HEIGHT = '100%';
  static readonly DIALOG_HEIGHT = '55%';
  static readonly TABS_HEIGHT = '45%';
  static readonly MINIMUM_SIZE = 0;
  static readonly FULL_SIZE = 1;
  static readonly PROMPT_BOTTOM = '70vp';
  /**
   * Component location.
   */
  static readonly EDIT_POSITION_X = '80%';
  static readonly EDIT_POSITION_Y = '90%';
  static readonly DELETE_POSITION_X = '50%';
  static readonly DELETE_POSITION_Y = '90%';
  /**
   * Log tag.
   */
  static readonly RDB_TAG = '[Debug.Rdb]';
  static readonly TABLE_TAG = '[Debug.AccountTable]';
  static readonly INDEX_TAG = '[Debug.Index]';
}