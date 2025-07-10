import { BroadCast } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
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
        //内部持有一个 BroadCast 实例（前面解读过的事件广播类），用于管理健康数据相关的事件发布与订阅。
        return this.broadCast;
    }
}
