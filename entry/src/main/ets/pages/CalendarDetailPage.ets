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

/**
 对比日历组件中的日期（cj）与任务数据中的日期（dateArr），判断该日期是否满足
 “任务全部完成”（finTaskNum == targetTaskNum 且不为 0）。
 核心逻辑：将日期转换为数字格式（如 20231005）进行比对，确保日期匹配。
 作用：决定日历中该日期是否显示 “任务完成” 图标。
 * @param dateArr
 * @param cj
 * @returns
 */
function isAchieved(dateArr: Array<WeekDateModel>, cj: CJDateItem) {
  let result = false;
  for (let item of dateArr) {
    //遍历所有任务数据，获取任务时间
    let dateStr_item_temp = String(item.date);
    // 截取年、月、日，拼接为“YYYYMMDD”格式的数字字符串（如“20231005”）
    let dateStr_item: string = `${dateStr_item_temp.toString()
      .substring(0, 4)}${Number(dateStr_item_temp.toString()
      .substring(5, 7))}${Number(dateStr_item_temp.toString()
      .substring(8, 10))}`;
    //转换日历组件中的日期的时间格式
    let dateStr: string = `${cj.fullYear}${(cj.month + 1) % 12}${cj.date}`;
    //如果当前任务时间和日历组件中的时间一致
    if (Number(dateStr_item) == Number(dateStr)) {
      //检查一下任务是否全部完成，且任务数量为0，返回结果
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
  //@State homeStore: HomeStore：通过路由参数（router.getParams()）接收从其他页面传递的 HomeStore 对象，
  // 包含日历所需的任务数据（如 dateArr 数组，存储每日任务信息）。
  @State homeStore: HomeStore = router.getParams() as HomeStore; // 获取传递过来的参数对象
  // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
  // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
  // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
  // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
  cjDataItem: CJDateItem = new CJDateItem(new Date());
  cjCellStyle: CJCellStyle = new CJCellStyle();
  cjCellStatus: CellStatus = new CellStatus();

  /**
   * 在页面中渲染一个完整的月历视图，每个日期单元格会显示日期数字，
   * 且当该日期的任务全部完成时，会额外显示 “任务完成图标”。
   */

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

  @Builder  //背景样式
  BuildCellBackground() {
    /**
     * 判断用户当前单元格任务是否完成，如果完成填充图标，未完成则保持风格不变
     */
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

  @Builder //主体内容
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