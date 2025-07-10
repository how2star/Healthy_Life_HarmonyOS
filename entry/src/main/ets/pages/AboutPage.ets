import { router } from '@kit.ArkUI';
import { AboutListInfo } from '../view/AboutListInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

@Entry
@Component
export struct AboutPage {
  private goBack() {
    router.back();
  }


  build() {
    // Stack(){
    //   Image($r('app.media.ic_home_bg'))
    //     .width('100%')
    //     .height(200)               // 头部高度，可自行调整
    //     .objectFit(ImageFit.Fill);
    //   // 返回按钮
    //   Image($r('app.media.ic_back'))
    //     .width(32)
    //     .height(32)
    //     .align(Alignment.TopStart)
    //     .margin({ left: 16, top: 16 })
    //     .onClick(() => this.goBack());
    // }
    // Column() {
    //     AboutListInfo()
    //       .align(Alignment.BottomEnd)
    //       .margin({ bottom: 24 });
    //     Column(){
    //       /*---------- 底部版权信息 ---------*/
    //     Text('服务协议 | 隐私政策 | 隐私政策摘要')
    //       .fontSize(12).fontColor('#0066CC').textAlign(TextAlign.Center);
    //     Text('客服电话 400-670-0700')
    //       .fontSize(12).fontColor('#999999').margin({ top: 4 });
    //
    //     Text('Copyright© 2025 Health Habit Team. All Rights Reserved')
    //       .fontSize(12).fontColor('#999999').margin({ top: 4 });
    //
    //     Text('ICP备案号：蜀ICP备88888888号')
    //       .fontSize(12).fontColor('#999999').margin({ top: 2 });
    //   }
    //     .height(Const.FULL_HEIGHT)
    //     .backgroundColor($r('app.color.mineBgColor'))
    // }
    //   .width('100%').height('100%')
    //   .backgroundColor('#F5F5F5');
    // }
    Column() {
      /* ---------- 头部：背景 + 返回按钮 ---------- */
      Stack() {
        // 背景图（可替换为你实际的资源名）
        Image($r('app.media.ic_home_bg'))
          .width('100%')
          .height(300)               // 头部高度，可自行调整
          .objectFit(ImageFit.Fill);

        // 返回按钮
        Image($r('app.media.ic_back'))
          .width(32)
          .height(32)
          .align(Alignment.TopStart)
          .position({ x: 16, y: 16 })
          .onClick(() => this.goBack());
      }

      /* ---------- 主体列表 ---------- */
      AboutListInfo()
        .align(Alignment.BottomEnd)
        .margin({ bottom: 24 });

      /* ---------- 底部版权信息 ---------- */
      Column() {
        Text('服务协议 | 隐私政策 | 隐私政策摘要')
          .fontSize(12)
          .fontColor('#0066CC')
          .textAlign(TextAlign.Center);

        Text('客服电话 400-670-0700')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 });

        Text('Copyright© 2025 Health Habit Team. All Rights Reserved')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 });

        Text('ICP备案号：蜀ICP备88888888号')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 2 });
      }
      .margin({ top: 32 })           // 让底部信息与列表保持视觉间距
    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
    .width('100%')
    .backgroundColor('#F5F5F5');
  }
}
