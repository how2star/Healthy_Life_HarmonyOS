import { router } from '@kit.ArkUI';
// import { CommonConstants } from '../common/constants/CommonConstants';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { CommonConstants } from '../common/constants/UserConstants';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import Logger from '../common/utils/Logger';
import UserInfoData from '../viewmodel/UserInfoData';

import emitter from '@ohos.events.emitter';

@CustomDialog
struct CustomDialogExample {
  controller?: CustomDialogController;

  build() {
    Column() {
      Text("签名不能为空且不超过50字")
        .fontSize($r('app.float.font_size1'))
        .fontColor(Color.Black)
        .height($r('app.float.toast_height'))
    }
    .backgroundColor($r('app.color.white'))
    .borderRadius($r('app.float.border_radius2'))
    .width($r('app.float.toast_width'))
  }
}

@CustomDialog
struct CustomDialogExample2 {
  controller?: CustomDialogController;

  build() {
    Column() {
      Text("保存成功")
        .fontSize($r('app.float.font_size1'))
        .fontColor(Color.Black)
        .height($r('app.float.toast_height'))
    }
    .backgroundColor($r('app.color.white'))
    .borderRadius($r('app.float.border_radius2'))
    .width($r('app.float.toast_width'))
  }
}


@Entry
@Component
struct MineEditSignaturePage {
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample(),
    openAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    closeAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    alignment: DialogAlignment.Bottom,
    offset: { dx: CommonConstants.ZERO, dy: $r('app.float.offset_dy') },
    customStyle: true,
    cornerRadius: $r('app.float.corner_radius'),
    isModal: false
  })
  dialogController2: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample2(),
    openAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    closeAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: CommonConstants.DELAY,
      playMode: PlayMode.Alternate
    },
    alignment: DialogAlignment.Bottom,
    offset: { dx: CommonConstants.ZERO, dy: $r('app.float.offset_dy') },
    customStyle: true,
    cornerRadius: $r('app.float.corner_radius'),
    isModal: false
  })

  @State signature: string = ''
  @State userInfo: UserInfoData[] = []
  private UserInfoTable = new UserInfoApi(() => {
  });

  // aboutToAppear(): void {
  //   this.UserInfoTable.getRdbStore(() => {
  //     this.UserInfoTable.query(1, (result: UserInfoData[]) => {
  //       this.userInfo = result;
  //       this.signature = this.userInfo[0].signature
  //     }, false);
  //   });
  // }

  private goBack() {
    router.back();
  }

  build() {
    Row() {
      Navigation() {
        Column() {
          TextInput({ placeholder: "请输入个性签名（最多50字）" , text: this.signature})
            .margin({
              top: $r('app.float.corner_radius'),
              left: $r('app.float.corner_radius'),
              right: $r('app.float.corner_radius')
            }).onChange((value: string) => {
            this.signature = value;
          }).enableKeyboardOnFocus(true)

          Button('保存')
            .width($r('app.float.default_120'))
            .height($r('app.float.default_40'))// Write the information and clear the content so that the text box is cleared after you click Save.
            .onClick(() => {
              const v = this.signature.trim();
              if(v === '' || v.length > 50){
                this.dialogController?.open();
                setTimeout(() => { this.dialogController?.close(); }, 1000);
                return;
              }
              // this.UserInfoTable.getRdbStore(() => {
              //   this.userInfo[0].signature = v;
              //   Logger.info('MineEditSignaturePage', `更新签名: ${v}`);
              //   this.UserInfoTable.updateData(this.userInfo[0], () => {});
              // });
              // 通知其他页面（可在监听处根据 eventId 更新 signature）
              this.UserInfoTable.getRdbStore(() => { // 获取数据库
                this.UserInfoTable.query(1, (result: UserInfoData[]) => { // 查询数据库中的用户
                  this.userInfo.push(result[0]);
                  this.userInfo[0].signature = this.signature
                  Logger.info('MineEditSignaturePage', `${this.signature}`);
                  this.UserInfoTable.updateData(this.userInfo[0], () => {
                  });
                  let event: emitter.InnerEvent =
                    { eventId: 2, priority: emitter.EventPriority.LOW };
                  let eventData: emitter.EventData =
                    { data: { content: v, id: 2, isEmpty: false } };
                  emitter.emit(event, eventData);
                  // 发送eventId为2的事件，事件内容为eventData
                }, false);
              });

              if (this.dialogController2 != null) {
                this.dialogController2.open();
                setTimeout(() => {
                  this.dialogController2?.close();
                }, 1000)
              }
              // 返回上一级
              router.back()
            }).margin({ top: 50 })
        }
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title('个性签名修改')
      .titleMode(NavigationTitleMode.Mini)
    }
    .height(Const.THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}