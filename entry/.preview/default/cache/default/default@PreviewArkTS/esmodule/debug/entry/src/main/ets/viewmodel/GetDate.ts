import { DateModel } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/DateModel";
export function getMonthDate(specifiedMonth: number, specifiedYear: number): number[] {
    let currentFirstWeekDay: number = 0;
    let currentLastWeekDay: number = 0;
    let currentAllDay: number[] = [];
    let totalDays = new Date(specifiedYear, specifiedMonth, 0).getDate();
    currentFirstWeekDay = new Date(specifiedYear, specifiedMonth - 1, 1).getDay();
    currentLastWeekDay = new Date(specifiedYear, specifiedMonth - 1, totalDays).getDay();
    for (let item = 0; item < currentFirstWeekDay; item++) {
        currentAllDay[item] = 0;
    }
    for (let item = 1; item <= totalDays; item++) {
        currentAllDay.push(item);
    }
    for (let item = 0; item < 6 - currentLastWeekDay; item++) {
        currentAllDay.push(0);
    }
    return currentAllDay;
}
export function getRealTimeDate(): DateModel {
    const nowDate = new Date();
    let currentMonth = nowDate.getMonth() + 1;
    let currentDay = nowDate.getDate();
    let currentYear = nowDate.getFullYear();
    let currentWeekDay = new Date(currentYear, currentMonth - 1, currentDay).getDay();
    let nowDateModel = new DateModel(0, 0, 0, 0);
    nowDateModel.day = currentDay;
    nowDateModel.week = currentWeekDay;
    nowDateModel.month = currentMonth;
    nowDateModel.year = currentYear;
    return nowDateModel;
}
