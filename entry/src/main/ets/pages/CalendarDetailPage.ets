import { CellStatus, CJCalendar, CJCellStyle, CJDateItem } from 'cjcalendar'
import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { HomeStore } from '../viewmodel/HomeViewModel';
// <<<<<<< HEAD
// import DayInfo from '../viewmodel/DayInfo';
// import { WeekDateModel } from '../model/WeekCalendarModel';
// import { WEEK_TITLES, dateToStr } from '../common/utils/Utils'
// import HashMap from '@ohos.util.HashMap'; // 导入HashMap模块
//
// // class structofDayInfoMap {
// //   dayInfoMap: HashMap<number, DayInfo> = new HashMap();
// // }
// // class structofDayInfoArr {
// //   dayInfoArr: DayInfo[] = [];
// // }
// function checkValuesEqual(dateArr: Array<WeekDateModel>): boolean {
//   let result = false;
//   for (let item of dateArr) {
//     if (item.dayInfo.finTaskNum === item.dayInfo.targetTaskNum) {
//       result = true;
//     }
//   }
//   return result;
// }
//
// function isAchieved(dateArr: Array<WeekDateModel>, cj: CJDateItem) {
//   let result = false;
//   for (let item of dateArr) {
//     let dateStr_item_temp = String(item.date);
//     let dateStr_item: string = `${dateStr_item_temp.toString()
//       .substring(0, 4)}${Number(dateStr_item_temp.toString()
//       .substring(5, 7))}${Number(dateStr_item_temp.toString()
//       .substring(8, 10))}`;
//     let dateStr: string = `${cj.fullYear}${(cj.month) % 12}${cj.date}`;
//     if (Number(dateStr_item) == Number(dateStr)) {
//       if (item.dayInfo.targetTaskNum == item.dayInfo.finTaskNum && item.dayInfo.targetTaskNum != 0) {
//         result = true;
//       } else {
//         result = false;
//       }
//     }
//   }
//   return result;
// }
//
// =======
import { WeekDateModel } from '../model/WeekCalendarModel';

// 日期工具函数
function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// 获取今天的日期字符串 YYYYMMDD
function getTodayString(): string {
  return formatDateToYYYYMMDD(new Date());
}

// 将CJDateItem转换为YYYYMMDD格式
function convertCJDateItemToYYYYMMDD(cj: CJDateItem): string {
  const year = cj.fullYear;
  const month = String(cj.month + 1).padStart(2, '0');
  const day = String(cj.date).padStart(2, '0');
  return `${year}${month}${day}`;
}

// 检查是否所有任务都完成
function checkValuesEqual(dateArr: Array<WeekDateModel>): boolean {
  return dateArr.some(item => item.dayInfo.finTaskNum === item.dayInfo.targetTaskNum);
}

// 判断日期是否有任务且全部完成
function isAchieved(dateArr: Array<WeekDateModel>, cj: CJDateItem): boolean {
  const cjDateStr = convertCJDateItemToYYYYMMDD(cj);

  for (let item of dateArr) {
    const itemDateStr = formatDateToYYYYMMDD(new Date(item.date));

    if (itemDateStr === cjDateStr) {
      return item.dayInfo.targetTaskNum !== 0 &&
        item.dayInfo.finTaskNum === item.dayInfo.targetTaskNum;
    }
  }

  return false;
}

// 判断日期是否有任务
function hasTask(dateArr: Array<WeekDateModel>, cj: CJDateItem): number {
  const cjDateStr = convertCJDateItemToYYYYMMDD(cj);
  const todayStr = getTodayString();

  // 如果日历日期大于今天，不显示图标
  if (cjDateStr > todayStr) {
    return 0; // 无图标
  }

  for (let item of dateArr) {
    const itemDateStr = formatDateToYYYYMMDD(new Date(item.date));

    if (itemDateStr === cjDateStr) {
      if (item.dayInfo.targetTaskNum !== 0) {
        return 1; // 有任务
      } else {
        return 2; // 无任务
      }
    }
  }

  return 0; // 默认无图标
}
// >>>>>>> origin/cjh

@Entry
@Component
struct CalendarDetailPage {
// <<<<<<< HEAD
//   // @Link homeStore: HomeStore;
//   // @Prop homeStore: HomeStore;
//   @State homeStore: HomeStore = router.getParams() as HomeStore; // 获取传递过来的参数对象
//   // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
//   // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
//   // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
//   // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
// =======
  @State homeStore: HomeStore = router.getParams() as HomeStore;

// >>>>>>> origin/cjh
  cjDataItem: CJDateItem = new CJDateItem(new Date());
  cjCellStyle: CJCellStyle = new CJCellStyle();
  cjCellStatus: CellStatus = new CellStatus();

  build() {
    Row() {
      Navigation() {
        Column() {
          CJCalendar({
// <<<<<<< HEAD
//             // 自定义单元格背景
//             // buildCellBackground: this.BuildCellBackground,
//             // 自定义Cell样式风格
//             // buildCellStyle: (item: CJDateItem) => {
//             //   let cjCellStyle: CJCellStyle = new CJCellStyle()
//             //   if (item.date < 7) {
//             //     cjCellStyle.itemBackgroundColor = "#abedd8"
//             //     cjCellStyle.fontColor = "#3f72af"
//             //   } else if (item.date >= 10 && item.date < 16) {
//             //     cjCellStyle.itemBackgroundColor = "#e4f9f5"
//             //     cjCellStyle.fontColor = "#3d84a8"
//             //   } else if (item.date >= 20 && item.date <= 28) {
//             //     cjCellStyle.itemBackgroundColor = "#88304e"
//             //     cjCellStyle.fontColor = "#fae3d9"
//             //   }
//             //   return cjCellStyle
//             // }
//             // 自定义主体部分
//             buildCellBody: this.BuildCellBody,
//             // 向CellItem中添加自定义属性
//             // reBuildCellItem: (cjDateItem: CJDateItem) => {
//             //   // 需要向 CJDateItem 中添加附加数据时，可是使用如下方式
//             //   if (true) {
//             //     cjDateItem.extras.set("1", "-" + cjDateItem.date + "-")
//             //   }
//             //   return cjDateItem
//             // },
// =======
            buildCellBody: this.BuildCellBody
// >>>>>>> origin/cjh
          })
        }
        .width('100%')
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title('日历')
      .titleMode(NavigationTitleMode.Mini)
    }
    .height('100%')
// <<<<<<< HEAD
//
//   }
//
//   @Builder
//   BuildCellBackground() {
//     // if (this.cjDataItem.date == Number((router.getParams() as HomeStore).dateArr[0].date)) { // 今天
//     if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
//       //   if (this.cjDataItem.isToday) { // 今天
//       Column()
//         .backgroundImage($r('app.media.ic_home_all_done'))
//         .renderFit(RenderFit.RESIZE_FILL)// Image($r('app.media.ic_user'))
//           //   .objectFit(ImageFit.Contain)
//           //   .height($r('app.float.default_66'))
//           //   .width($r('app.float.default_66'))
//           //   .margin({ top: $r('app.float.default_71') })
//
//         .backgroundColor(this.cjCellStatus.backgroundColor)
//         .width('85%')
//         .aspectRatio(1)
//         .border({
//           width: this.cjCellStyle.borderWidth,
//           color: this.cjCellStyle.borderColor
//         })
//         .borderRadius(this.cjCellStyle.borderRadius)
//     } else {
//       Column()
//         .backgroundColor(this.cjCellStatus.backgroundColor)
//         .width('85%')
//         .aspectRatio(1)
//         .border({
//           width: this.cjCellStyle.borderWidth,
//           color: this.cjCellStyle.borderColor
//         })
//         .borderRadius(this.cjCellStyle.borderRadius)
//     }
//
//   }
//
//   @Builder
// =======
  }

  @Builder // 主体内容
// >>>>>>> origin/cjh
  BuildCellBody() {
    Column() {
      Text(this.cjDataItem.date + '')
        .fontColor(this.cjCellStatus.fontColor)
        .fontSize(this.cjCellStyle.fontSize)
        .fontWeight(this.cjCellStyle.fontFontWeight)
// <<<<<<< HEAD
//       if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
//         Image($r('app.media.ic_home_all_done'))
// =======



      if (hasTask((router.getParams() as HomeStore).dateArr, this.cjDataItem) === 1) { // 有任务
        if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) {
          Image($r('app.media.ic_home_all_done'))
            .objectFit(ImageFit.Contain)
            .height('20vp')
            .width('20vp')
            .margin({ top: '0vp' })
        } else {
          Image($r('app.media.ic_home_half_done'))
            .objectFit(ImageFit.Contain)
            .height('20vp')
            .width('20vp')
            .margin({ top: '0vp' })
        }
      } else if (hasTask((router.getParams() as HomeStore).dateArr, this.cjDataItem) === 2) { // 无任务
        Image($r('app.media.ic_home_no_task'))
// >>>>>>> origin/cjh
          .objectFit(ImageFit.Contain)
          .height('20vp')
          .width('20vp')
          .margin({ top: '0vp' })
// <<<<<<< HEAD
//       } else {
//         Text('')
//           .height('20vp')
//           .width('20vp')
//           .margin({ top: '0vp' })
//       }
//     }
//     .alignItems(HorizontalAlign.Center)
//
// =======
      }
      // taskStatus === 0 时不显示图标
    }
    .alignItems(HorizontalAlign.Center)
// >>>>>>> origin/cjh
  }
}