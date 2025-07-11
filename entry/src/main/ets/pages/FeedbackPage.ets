import { router } from '@kit.ArkUI';
import promptAction from '@ohos.promptAction';

@Entry
@Component
export struct FeedbackPage {
  @State private feedback: string = '';

  private goBack() {
    router.back();
  }

  private submit() {
    const content = this.feedback.trim();
    if (content.length === 0) {
      promptAction.showToast({ message: '请输入反馈内容', duration: 2000 });
      return;
    }
    if (content.length > 500) {
      promptAction.showToast({ message: '反馈内容不能超过 500 字', duration: 2000 });
      return;
    }

    // TODO：在此处调用网络接口把 content 发送到后台
    promptAction.showToast({ message: '感谢您的反馈！', duration: 2000 });

    // 清空输入框
    this.feedback = '';
  }

  build() {
    Column() {
      /* ---------- 头部 ---------- */
      Stack() {
        Image($r('app.media.ic_feedback_bg'))
          .width('100%')
          .height(350)
          .objectFit(ImageFit.Fill);

        Image($r('app.media.ic_back'))
          .width(40).height(40)
          .position({ x: 18, y: 18 })
          .onClick(() => this.goBack());
      }
      .width('100%');

      /* ---------- 反馈内容 + 提交按钮 ---------- */
      Column() {
        // 多行输入框
        /* ----------- 多行输入框 ----------- */
        TextArea({
          placeholder: '请在此输入您的反馈（最多 500 字）',
          text: this.feedback      // 初始内容
        })
          .width('100%')
          .height(160)
          .padding({ left: 12, right: 12, top: 8, bottom: 8 })
          .border({ width: 1, color: '#CCCCCC' })
          .backgroundColor('#FFFFFF')
          .margin({ bottom: 24 })
          .maxLength(500)                        // 避免超长输入
          .onChange((value: string) => {     // ← 事件回调放这里
            this.feedback = value;
          });
        // 提交按钮
        Button() {
          Text('提交')
            .fontSize(16)
            .fontColor('#FFFFFF');
        }
        .width('100%')
        .height(44)
        .backgroundColor('#0066CC')
        .enabled(this.feedback.trim().length > 0)   // 没输入时禁用
        .onClick(() => this.submit());
      }
      .padding({ left: 24, right: 24, top: 32 });
    }
    .backgroundColor('#F5F5F5');
  }
}
