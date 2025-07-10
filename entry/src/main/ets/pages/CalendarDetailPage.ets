import { CellStatus, CJCalendar, CJCellStyle, CJDateItem } from 'cjcalendar'
import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { HomeStore } from '../viewmodel/HomeViewModel';
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

@Entry
@Component
struct CalendarDetailPage {
  @State homeStore: HomeStore = router.getParams() as HomeStore;

  cjDataItem: CJDateItem = new CJDateItem(new Date());
  cjCellStyle: CJCellStyle = new CJCellStyle();
  cjCellStatus: CellStatus = new CellStatus();

  build() {
    Row() {
      Navigation() {
        Column() {
          CJCalendar({
            buildCellBody: this.BuildCellBody
          })
        }
        .width('100%')
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title('日历')
      .titleMode(NavigationTitleMode.Mini)
    }
    .height('100%')
  }

  @Builder // 主体内容
  BuildCellBody() {
    Column() {
      Text(this.cjDataItem.date + '')
        .fontColor(this.cjCellStatus.fontColor)
        .fontSize(this.cjCellStyle.fontSize)
        .fontWeight(this.cjCellStyle.fontFontWeight)



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
          .objectFit(ImageFit.Contain)
          .height('20vp')
          .width('20vp')
          .margin({ top: '0vp' })
      }
      // taskStatus === 0 时不显示图标
    }
    .alignItems(HorizontalAlign.Center)
  }
}