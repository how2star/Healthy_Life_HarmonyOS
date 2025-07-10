import { ACHIEVEMENT_LEVEL_LIST, DEGREE_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type GlobalInfo from '../viewmodel/GlobalInfo';
import GlobalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi";
export const ACHIEVEMENT_LEVEL_KEY = 'AchievementLevelKey';
export const ACHIEVEMENT_SINGLE_LEVEL_KEY = ['AchievementGetEarly', 'AchievementDrink', 'AchievementApple',
    'AchievementSmile', 'AchievementBrush', 'AchievementSleepEarly', 'AchievementRun'];
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
    });
}
export function getSingleAchievementLevel() {
    for (let i = 1; i <= Const.TASK_NUM; i++) {
        GlobalInfoApi.query((res: GlobalInfo) => {
            let globalInfo: GlobalInfo = res;
            let achievementStr = globalInfo.achievements ?? '';
            let achievements = achievementStr.split(',');
            if (achievements.length > 0) {
                AppStorage.set<Number>(ACHIEVEMENT_SINGLE_LEVEL_KEY[i - 1], Number(achievements[achievements.length - 1]));
            }
        }, i);
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
export async function getSuccessiveDays() {
    let successiveDays: Array<number> = [];
    for (let i = 1; i <= Const.TASK_NUM; i++) {
        let res = await GlobalInfoApi.queryInstant(i);
        let globalInfo: GlobalInfo = res;
        let achievementStr = globalInfo.achievements ?? '';
        let achievements = achievementStr.split(',');
        if (achievements.length > 1) {
            successiveDays.push(Number(achievements[achievements.length - 1]));
        }
        else
            successiveDays.push(0);
    }
    AppStorage.set<Array<number>>(ACHIEVEMENT_SINGLE_LEVEL_KEY_LIST, successiveDays);
}
export async function getDegreeSuccessiveDays() {
    let successiveDays: Array<number> = [];
    for (let i = 1; i <= Const.TASK_NUM; i++) {
        if (i == 1 || i == 6)
            continue;
        let res = await GlobalInfoApi.queryInstant(i * 100);
        let globalInfo: GlobalInfo = res;
        let achievementStr = globalInfo.achievements ?? '';
        let achievements = achievementStr.split(',');
        if (achievements.length > 1) {
            successiveDays.push(Number(achievements[achievements.length - 1]));
        }
        else
            successiveDays.push(0);
    }
    AppStorage.set<Array<number>>(ACHIEVEMENT_DEGREE_LEVEL_KEY_LIST, successiveDays);
}
