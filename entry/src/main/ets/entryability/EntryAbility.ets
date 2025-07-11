/*
<<<<<<< HEAD
 * Copyright (c) 2023 Huawei Device Co., Ltd.
=======
 * Copyright (c) 2025 Huawei Device Co., Ltd.
>>>>>>> origin/cjh
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

// <<<<<<< HEAD
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
// =======
// UIAbility基类和arkUI的window对象
// 导入数据库表
// >>>>>>> origin/cjh
import {
  columnDayInfoList,
  columnGlobalInfoList,
  columnTaskInfoInfoList,
  columnFormInfoList
} from '../model/RdbColumnModel';
// <<<<<<< HEAD
// import RdbUtils from '../common/database/rdb/RdbUtils';
// import Logger from '../common/utils/Logger';
// import FormUtils from '../common/utils/FormUtils';
// import { GlobalContext } from '../common/utils/GlobalContext';
// import { MonthCalendar } from '../model/MonthCalendarModel';
//
// export default class EntryAbility extends UIAbility {
//   private static TAG: string = 'EntryAbility';
//
//   async onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
//     GlobalContext.getContext().setObject('want', want);
//     GlobalContext.getContext().setObject('launchParam', launchParam);
//
//     RdbUtils.initDb(this.context, Const.RDB_NAME.dbName ? Const.RDB_NAME.dbName : '');
//     await RdbUtils.createDb();
//
// =======
// 数据库操作工具
import RdbUtils from '../common/database/rdb/RdbUtils';
// 日志工具
import Logger from '../common/utils/Logger';
// 表格工具
import FormUtils from '../common/utils/FormUtils';
// 全局内容
import { GlobalContext } from '../common/utils/GlobalContext';
import { MonthCalendar } from '../model/MonthCalendarModel';


// 定义了一个默认导出的EntryAbility类
export default class EntryAbility extends UIAbility {
  private static TAG: string = 'EntryAbility';

  // onCreate 生命周期方法 一创建就调用
  async onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    //将启动参数 Want 对象和启动模式参数存储到全局上下文中
    GlobalContext.getContext().setObject('want', want);
    GlobalContext.getContext().setObject('launchParam', launchParam);
    // 初始化关系型数据库工具，传入应用上下文和数据库名称
    // 等待数据库创建完成
    RdbUtils.initDb(this.context, Const.RDB_NAME.dbName ? Const.RDB_NAME.dbName : '');
    await RdbUtils.createDb();
    // 创建dayInfo表 成功正常 失败 输出报错信息
// >>>>>>> origin/cjh
    RdbUtils.createTable(Const.DAY_INFO.tableName ? Const.DAY_INFO.tableName : '', columnDayInfoList).then(() => {
      Logger.info(`RdbHelper createTable dayInfo success`);
    }).catch((err: Error) => {
      Logger.error(`RdbHelper dayInfo err : ${JSON.stringify(err)}`);
    });
// <<<<<<< HEAD
//
// =======
//     //创建全局信息表
// >>>>>>> origin/cjh
    RdbUtils.createTable(Const.GLOBAL_INFO.tableName ? Const.GLOBAL_INFO.tableName : '', columnGlobalInfoList)
      .then(() => {
        Logger.info(`RdbHelper createTable globalInfo success`);
      })
      .catch((err: Error) => {
        Logger.error(`RdbHelper globalInfo err : ${JSON.stringify(err)}`);
      });
// <<<<<<< HEAD
// =======
    // 创建任务信息表
// >>>>>>> origin/cjh
    RdbUtils.createTable(Const.TASK_INFO.tableName ? Const.TASK_INFO.tableName : '', columnTaskInfoInfoList)
      .then(() => {
        Logger.info(`RdbHelper createTable taskInfo success`);
      })
      .catch((err: Error) => {
        Logger.error(`RdbHelper taskInfo err : ${JSON.stringify(err)}`);
      });
// <<<<<<< HEAD
// =======
    // 创建表格信息表
// >>>>>>> origin/cjh
    RdbUtils.createTable(Const.FORM_INFO.tableName ? Const.FORM_INFO.tableName : '', columnFormInfoList)
      .catch((err: Error) => {
        Logger.error(`RdbHelper formInfo err : ${JSON.stringify(err)}`);
      });
  }

// <<<<<<< HEAD
//   onWindowStageCreate(windowStage: window.WindowStage) {
//     // Main window is created, set main page for this ability
//     GlobalContext.getContext().setObject('isForeground', true);
// =======
  //窗口创建时使用，就是打开app时调用的
  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    //设置应用处于前台状态
    GlobalContext.getContext().setObject('isForeground', true);
    //加载启动页面 SplashPage，处理加载成功和失败的回调  todo 打开app页面加载效果更改
// >>>>>>> origin/cjh
    windowStage.loadContent('pages/SplashPage', (err, data) => {
      if (err.code) {
        Logger.error('windowStage', 'Failed to load the content. Cause:' + JSON.stringify(err));
        return;
      }
      Logger.info('windowStage', 'Succeeded in loading the content. Data: ' + JSON.stringify(data));
    });
  }

// <<<<<<< HEAD
// =======
//   //应用进入前台时调用，更新应用状态为前台，重置任务列表变更标记为 false
// >>>>>>> origin/cjh
  onForeground() {
    // Ability has brought to foreground
    GlobalContext.getContext().setObject('isForeground', true);
    GlobalContext.getContext().setObject('taskListChange', false);
  }
// <<<<<<< HEAD
//
// =======
//   //应用进入后台时调用，根据任务列表是否变更，调用表单工具的后台卡片更新方法
// >>>>>>> origin/cjh
  onBackground() {
    // Ability has back to background
    FormUtils.backgroundUpdateCard(GlobalContext.getContext().getObject('taskListChange') as boolean);
  }
// <<<<<<< HEAD
//
// =======
// /**
//  * 新启动请求处理：更新启动参数” 指的是当应用已经处于运行状态时，
//  * 再次收到新的启动请求（例如用户从桌面图标再次点击应用、从其他应用跳转启动当前应用等），
//  * 应用对启动参数进行更新的过程。这一机制确保应用能根据最新的启动需求调整自身状态，
//  * 常见于多场景启动、参数动态传递的场景。
//  */
// >>>>>>> origin/cjh
  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam) {
    // Ability has new want
    GlobalContext.getContext().setObject('abilityWant', want);
    GlobalContext.getContext().setObject('launchParam', launchParam);
  }
};

