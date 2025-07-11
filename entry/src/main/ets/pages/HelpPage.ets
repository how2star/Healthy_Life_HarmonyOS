import { router } from '@kit.ArkUI';

@Entry
@Component
export struct HelpPage {
  private goBack() {
    router.back();
  }

  build() {
    Column() {
      /* ---------- 头部 ---------- */
      Stack() {
        // 可选：若无需背景图，删除下行即可
        Image($r('app.media.ic_help_bg'))
          .width('100%')
          .height(350)
          .objectFit(ImageFit.Fill);

        // 返回按钮
        Image($r('app.media.ic_back'))
          .width(40).height(40)
          .position({ x: 18, y: 18 })
          .onClick(() => this.goBack());

        // 标题
        Text('帮助中心')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor('#FFFFFF')
          .position({ x: 16, y: 120 });
      }
      .width('100%');

      /* ---------- 主体内容 ---------- */
      Column() {
        Text('如需任何帮助，请联系：')
          .fontSize(16)
          .fontColor('#333333');

        // 将 xxx 替换为你的联系方式
        Text('邮箱：support@example.com')
          .fontSize(16)
          .fontColor('#0066CC')
          .margin({ top: 8 });

        Text('客服电话：400-123-4567')
          .fontSize(16)
          .fontColor('#0066CC')
          .margin({ top: 4 });
      }
      .padding({ left: 24, right: 24, top: 32 });
    }
    .backgroundColor('#F5F5F5');
  }
}
