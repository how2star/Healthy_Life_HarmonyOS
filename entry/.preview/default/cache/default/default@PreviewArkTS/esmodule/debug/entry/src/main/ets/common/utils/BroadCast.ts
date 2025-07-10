import type { CustomDialogCallback } from '../../view/dialog/CustomDialogView';
import BroadCastCallBackInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/BroadCastCallBackInfo";
import type TaskInfo from '../../viewmodel/TaskInfo';
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
const FILE_TAG = 'BroadCast';
const callBackArrayTemp = new BroadCastCallBackInfo();
/**
 * 一个基于事件广播机制的工具类 BroadCast，以及配套的事件类型枚举 BroadCastType，
 * 主要用于在应用内不同组件之间进行解耦的事件通信（类似 “发布 - 订阅” 模式），
 * 尤其专注于管理各类弹窗的显示事件。
 *
 * 总的来说，用于发布消息，监听消息
 */
export class BroadCast {
    private callBackArray: BroadCastCallBackInfo = callBackArrayTemp;
    // 注册事件监听器（订阅事件）。当指定事件被触发时，执行传入的 callback 函数。
    // 根据事件类型，回调对应函数，比如存储数据之类的
    public on(event: string, callback: Function) {
        Logger.info(FILE_TAG, 'register broadcast with type ' + event);
        switch (event) {
            case BroadCastType.SHOW_ACHIEVEMENT_DIALOG:
                this.callBackArray.showAchievementDialog = callback;
                break;
            case BroadCastType.SHOW_SINGLE_ACHIEVEMENT_DIALOG:
                this.callBackArray.showSingleAchievementDialog = callback;
                break;
            case BroadCastType.SHOW_DEGREE_ACHIEVEMENT_DIALOG:
                this.callBackArray.showDegreeAchievementDialog = callback;
                break;
            case BroadCastType.SHOW_TASK_DETAIL_DIALOG:
                this.callBackArray.showTaskDetailDialog = callback;
                break;
            case BroadCastType.SHOW_TARGET_SETTING_DIALOG:
                this.callBackArray.showTargetSettingDialog = callback;
                break;
            case BroadCastType.SHOW_REMIND_TIME_DIALOG:
                this.callBackArray.showRemindTimeDialog = callback;
                break;
            case BroadCastType.SHOW_FREQUENCY_DIALOG:
                this.callBackArray.showFrequencyDialog = callback;
                break;
            default:
                break;
        }
    }
    //取消事件监听器，取消事件
    public off(event: string, callback: Function) {
        if (event === null) {
            Logger.info(FILE_TAG, 'cancel all broadcast');
            this.callBackArray = callBackArrayTemp;
        }
        Logger.info(FILE_TAG, 'cancel broadcast with type ' + event);
        const cbs = this.callBackArray;
        if (!cbs) {
            return;
        }
        if (callback === null) {
            switch (event) {
                case BroadCastType.SHOW_ACHIEVEMENT_DIALOG:
                    this.callBackArray.showAchievementDialog = () => { };
                    break;
                case BroadCastType.SHOW_DEGREE_ACHIEVEMENT_DIALOG:
                    this.callBackArray.showDegreeAchievementDialog = () => { };
                    break;
                case BroadCastType.SHOW_SINGLE_ACHIEVEMENT_DIALOG:
                    this.callBackArray.showSingleAchievementDialog = () => { };
                    break;
                case BroadCastType.SHOW_TASK_DETAIL_DIALOG:
                    this.callBackArray.showTaskDetailDialog = () => { };
                    break;
                case BroadCastType.SHOW_TARGET_SETTING_DIALOG:
                    this.callBackArray.showTargetSettingDialog = () => { };
                    break;
                case BroadCastType.SHOW_REMIND_TIME_DIALOG:
                    this.callBackArray.showRemindTimeDialog = () => { };
                    break;
                case BroadCastType.SHOW_FREQUENCY_DIALOG:
                    this.callBackArray.showFrequencyDialog = () => { };
                    break;
                default:
                    break;
            }
        }
    }
    // 触发指定事件，发布事件，传递参数给该事件的所有监听器
    public emit(event: string, args?: (number | number[] | (TaskInfo | CustomDialogCallback)[])) {
        if (!this.callBackArray) {
            Logger.info(FILE_TAG, 'emit broadcast failed for no callback');
            return;
        }
        Logger.info(FILE_TAG, 'emit broadcast with type ' + event);
        let cbs: Array<Function> = [];
        switch (event) {
            case BroadCastType.SHOW_ACHIEVEMENT_DIALOG:
                cbs = [this.callBackArray.showAchievementDialog];
                break;
            case BroadCastType.SHOW_SINGLE_ACHIEVEMENT_DIALOG:
                cbs = [this.callBackArray.showSingleAchievementDialog];
                break;
            case BroadCastType.SHOW_DEGREE_ACHIEVEMENT_DIALOG:
                cbs = [this.callBackArray.showDegreeAchievementDialog];
                break;
            case BroadCastType.SHOW_TASK_DETAIL_DIALOG:
                cbs = [this.callBackArray.showTaskDetailDialog];
                break;
            case BroadCastType.SHOW_TARGET_SETTING_DIALOG:
                cbs = [this.callBackArray.showTargetSettingDialog];
                break;
            case BroadCastType.SHOW_REMIND_TIME_DIALOG:
                cbs = [this.callBackArray.showRemindTimeDialog];
                break;
            case BroadCastType.SHOW_FREQUENCY_DIALOG:
                cbs = [this.callBackArray.showFrequencyDialog];
                break;
            default:
                break;
        }
        if (cbs) {
            let len = cbs.length;
            for (let i = 0; i < len; i++) {
                try {
                    if (args instanceof Array) {
                        cbs[i](args[0], args[1]);
                    }
                    else {
                        cbs[i](args);
                    }
                }
                catch (error) {
                    Logger.error(`emit broadcast err : ${error}`);
                }
            }
        }
    }
}
//  枚举了所有的事件类型
export enum BroadCastType {
    SHOW_ACHIEVEMENT_DIALOG = "showAchievementDialog",
    SHOW_SINGLE_ACHIEVEMENT_DIALOG = "showSingleAchievementDialog",
    SHOW_DEGREE_ACHIEVEMENT_DIALOG = "showDegreeAchievementDialog",
    SHOW_TASK_DETAIL_DIALOG = "showTaskDetailDialog",
    SHOW_TARGET_SETTING_DIALOG = "showTargetSettingDialog",
    SHOW_REMIND_TIME_DIALOG = "showRemindTimeDialog",
    SHOW_FREQUENCY_DIALOG = "showFrequencyDialog"
}
