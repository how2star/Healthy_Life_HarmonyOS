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

<<<<<<< HEAD
=======
/**
 * 健康数据源管理器
 * 单例模式的实现
 getInstance() 静态方法：
 确保全局只有一个 HealthDataSrcMgr 实例，通过 AppStorage 存储和获取实例。
 若 AppStorage 中不存在该实例，则创建并存储（AppStorage.setOrCreate）。
 若已存在，则直接从 AppStorage 中获取，避免重复创建。
 这种设计保证了应用中所有模块使用的是同一个数据源管理器，确保数据和事件的一致性。
 */
>>>>>>> origin/cjh
import { BroadCast } from './BroadCast';
import Logger from './Logger';

const APP_KEY_GROUP_DATA_SOURCE_MANAGER = 'app_key_group_data_source_manager';

export class HealthDataSrcMgr {
  private broadCast: BroadCast;

  constructor() {
    Logger.debug('HealthDataSourceManager', 'constructor');
    this.broadCast = new BroadCast();
  }

  public static getInstance(): HealthDataSrcMgr {
    if (!AppStorage.get<HealthDataSrcMgr>(APP_KEY_GROUP_DATA_SOURCE_MANAGER)) {
      AppStorage.setOrCreate<HealthDataSrcMgr>(APP_KEY_GROUP_DATA_SOURCE_MANAGER, new HealthDataSrcMgr());
    }
    let healthDataSrcMgr = AppStorage.get<HealthDataSrcMgr>(APP_KEY_GROUP_DATA_SOURCE_MANAGER);
    return healthDataSrcMgr ? healthDataSrcMgr : new HealthDataSrcMgr();
  }

  public getBroadCast(): BroadCast {
<<<<<<< HEAD
=======
    //内部持有一个 BroadCast 实例（前面解读过的事件广播类），用于管理健康数据相关的事件发布与订阅。
>>>>>>> origin/cjh
    return this.broadCast;
  }
}