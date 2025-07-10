import { CellStatus, CJCalendar, CJCellStyle, CJDateItem } from 'cjcalendar'
import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { HomeStore } from '../viewmodel/HomeViewModel';
import DayInfo from '../viewmodel/DayInfo';
import { WeekDateModel } from '../model/WeekCalendarModel';
import { WEEK_TITLES, dateToStr } from '../common/utils/Utils'
import HashMap from '@ohos.util.HashMap'; // 导入HashMap模块

// class structofDayInfoMap {
//   dayInfoMap: HashMap<number, DayInfo> = new HashMap();
// }
// class structofDayInfoArr {
//   dayInfoArr: DayInfo[] = [];
// }
function checkValuesEqual(dateArr: Array<WeekDateModel>): boolean {
  let result = false;
  for (let item of dateArr) {
    if (item.dayInfo.finTaskNum === item.dayInfo.targetTaskNum) {
      result = true;
    }
  }
  return result;
}

function isAchieved(dateArr: Array<WeekDateModel>, cj: CJDateItem) {
  let result = false;
  for (let item of dateArr) {
    let dateStr_item_temp = String(item.date);
    let dateStr_item: string = `${dateStr_item_temp.toString()
      .substring(0, 4)}${Number(dateStr_item_temp.toString()
      .substring(5, 7))}${Number(dateStr_item_temp.toString()
      .substring(8, 10))}`;
    let dateStr: string = `${cj.fullYear}${(cj.month) % 12}${cj.date}`;
    if (Number(dateStr_item) == Number(dateStr)) {
      if (item.dayInfo.targetTaskNum == item.dayInfo.finTaskNum && item.dayInfo.targetTaskNum != 0) {
        result = true;
      } else {
        result = false;
      }
    }
  }
  return result;
}


@Entry
@Component
struct CalendarDetailPage {
  // @Link homeStore: HomeStore;
  // @Prop homeStore: HomeStore;
  @State homeStore: HomeStore = router.getParams() as HomeStore; // 获取传递过来的参数对象
  // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
  // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
  // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
  // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
  cjDataItem: CJDateItem = new CJDateItem(new Date());
  cjCellStyle: CJCellStyle = new CJCellStyle();
  cjCellStatus: CellStatus = new CellStatus();

  build() {
    Row() {
      Navigation() {
        Column() {
          CJCalendar({
            // 自定义单元格背景
            // buildCellBackground: this.BuildCellBackground,
            // 自定义Cell样式风格
            // buildCellStyle: (item: CJDateItem) => {
            //   let cjCellStyle: CJCellStyle = new CJCellStyle()
            //   if (item.date < 7) {
            //     cjCellStyle.itemBackgroundColor = "#abedd8"
            //     cjCellStyle.fontColor = "#3f72af"
            //   } else if (item.date >= 10 && item.date < 16) {
            //     cjCellStyle.itemBackgroundColor = "#e4f9f5"
            //     cjCellStyle.fontColor = "#3d84a8"
            //   } else if (item.date >= 20 && item.date <= 28) {
            //     cjCellStyle.itemBackgroundColor = "#88304e"
            //     cjCellStyle.fontColor = "#fae3d9"
            //   }
            //   return cjCellStyle
            // }
            // 自定义主体部分
            buildCellBody: this.BuildCellBody,
            // 向CellItem中添加自定义属性
            // reBuildCellItem: (cjDateItem: CJDateItem) => {
            //   // 需要向 CJDateItem 中添加附加数据时，可是使用如下方式
            //   if (true) {
            //     cjDateItem.extras.set("1", "-" + cjDateItem.date + "-")
            //   }
            //   return cjDateItem
            // },
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

  @Builder
  BuildCellBackground() {
    // if (this.cjDataItem.date == Number((router.getParams() as HomeStore).dateArr[0].date)) { // 今天
    if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
      //   if (this.cjDataItem.isToday) { // 今天
      Column()
        .backgroundImage($r('app.media.ic_home_all_done'))
        .renderFit(RenderFit.RESIZE_FILL)// Image($r('app.media.ic_user'))
          //   .objectFit(ImageFit.Contain)
          //   .height($r('app.float.default_66'))
          //   .width($r('app.float.default_66'))
          //   .margin({ top: $r('app.float.default_71') })

        .backgroundColor(this.cjCellStatus.backgroundColor)
        .width('85%')
        .aspectRatio(1)
        .border({
          width: this.cjCellStyle.borderWidth,
          color: this.cjCellStyle.borderColor
        })
        .borderRadius(this.cjCellStyle.borderRadius)
    } else {
      Column()
        .backgroundColor(this.cjCellStatus.backgroundColor)
        .width('85%')
        .aspectRatio(1)
        .border({
          width: this.cjCellStyle.borderWidth,
          color: this.cjCellStyle.borderColor
        })
        .borderRadius(this.cjCellStyle.borderRadius)
    }

  }

  @Builder
  BuildCellBody() {
    Column() {
      Text(this.cjDataItem.date + '')
        .fontColor(this.cjCellStatus.fontColor)
        .fontSize(this.cjCellStyle.fontSize)
        .fontWeight(this.cjCellStyle.fontFontWeight)
      if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
        Image($r('app.media.ic_home_all_done'))
          .objectFit(ImageFit.Contain)
          .height('20vp')
          .width('20vp')
          .margin({ top: '0vp' })
      } else {
        Text('')
          .height('20vp')
          .width('20vp')
          .margin({ top: '0vp' })
      }
    }
    .alignItems(HorizontalAlign.Center)

  }
}