// import { router } from '@kit.ArkUI';
// import { CommonConstants as Const } from '../common/constants/CommonConstants';
//
// interface FeatureItem {
//   id: string;
//   title: string;
//   subtitle: string;   // 一句话概述
//   icon: Resource;     // 功能图标
// }
//
// // ★ 示例功能列表 —— 请替换成你的真实功能描述和资源 ★
// const FeatureList: FeatureItem[] = [
//   {
//     id: '1',
//     title: '个性化任务定制',
//     subtitle: '自定义任务进行完成',
//     icon: $r('app.media.ic_task')
//   },
//   {
//     id: '2',
//     title: 'AI 习惯养成',
//     subtitle: '行为分析 + 自适应提醒，帮你坚持好习惯',
//     icon: $r('app.media.ic_ai')
//   },
//   {
//     id: '3',
//     title: '云端数据同步',
//     subtitle: '跨设备无缝同步，保障数据安全',
//     icon: $r('app.media.ic_database')
//   },
// ];
//
// interface TaskItem {
//   id: string;
//   title: string;
// }
//
// const taskList: TaskItem[] = [
//   {
//     id: '1',
//     title: '早起',
//   },
//   {
//     id: '2',
//     title: '喝水',
//   },
//   {
//     id: '3',
//     title: '吃苹果',
//   },
//   {
//     id: '4',
//     title:'······'
//   }
// ];
//
// @Entry
// @Component
// export struct FunctionPage {
//   private goBack() {
//     router.back();
//   }
//
//   build() {
//     Column() {
//       /* ---------- 头部（背景 + 返回按钮 + 标题） ---------- */
//       Stack() {
//         Image($r('app.media.ic_header_bg'))
//           .width('100%')
//           .height(240)
//           .objectFit(ImageFit.Fill);
//
//         // 左上角返回
//         Image($r('app.media.ic_back'))
//           .width(32)
//           .height(32)
//           .position({ x: 16, y: 16 })
//           .onClick(() => this.goBack());
//
//         // 页面标题
//         Text('功能介绍')
//           .fontSize(20)
//           .fontWeight(FontWeight.Medium)
//           .fontColor('#FFFFFF')
//           .position({ x: 16, y: 140 });
//       }
//       .width('100%')
//       .height(200);
//
//       /* ---------- 功能列表 ---------- */
//       Scroll() {
//         Column() {
//           ForEach(FeatureList, (feature: FeatureItem) => {
//             Row() {
//               Image(feature.icon)
//                 .width(40)
//                 .height(40)
//                 .objectFit(ImageFit.Contain);
//
//               // 文案
//               Column() {
//                   Text(feature.title)
//                     .fontSize(16)
//                     .fontWeight(FontWeight.Medium)
//                     .fontColor('#333333');
//                   Text(feature.subtitle)
//                     .fontSize(13)
//                     .fontColor('#777777')
//                     .margin({ top: 5 });
//               }
//               .margin({ left: 12 });
//
//               Blank()  // 占位，将箭头推到最右
//                 .layoutWeight(1);
//             }
//             .padding({ left: 24, right: 24, top: 16, bottom: 16 })
//             .backgroundColor($r('app.color.white'))
//             .border({
//               width: { bottom: $r('app.float.default_1') },
//               color: $r('app.color.borderColor')
//             });
//             if (feature.id === '1') {
//               Column() {
//                 ForEach(taskList, (task: TaskItem) => {
//                   Text(task.title)
//                     .fontSize(15).fontColor('#555555')
//                     .padding({ top: 12, bottom: 12, left: 16 });
//                 }, (t: TaskItem) => t.id);
//               }
//               .backgroundColor('#F7F8FA')
//               .borderRadius(12)
//               .margin({ left: 64, right: 24, top: 0, bottom: 8 }) // 让卡片与主行错开
//               .border( {width: 1, color: '#E5E5E5'});
//           }, (f: FeatureItem) => f.id );
//         }
//       }
//       .margin({ top: 8 });
//     }
//     .height(Const.FULL_HEIGHT)
//     .backgroundColor($r('app.color.mineBgColor'));
//   }
// }
// }
import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { StartOptions } from '@kit.AbilityKit';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: Resource;
}

const FeatureList: FeatureItem[] = [
  { id: '1', title: '个性化任务定制', subtitle: '自定义任务进行完成(早起，喝水······)', icon: $r('app.media.ic_task') },
  { id: '2', title: 'AI习惯养成',   subtitle: '行为分析 + 自适应提醒，帮你坚持好习惯', icon: $r('app.media.ic_ai') },
  { id: '3', title: '云端数据同步',   subtitle: '跨设备无缝同步，保障数据安全', icon: $r('app.media.ic_database') },
  { id: '4', title: '更多功能敬请期待',   subtitle: '······', icon: $r('app.media.ic_more_function') },
];

interface TaskItem { id: string; title: string; }

const taskList: TaskItem[] = [
  { id: '1', title: '早起' }, { id: '2', title: '喝水' },
  { id: '3', title: '吃苹果' }, { id: '4', title: '······' }
];

@Entry
@Component
export struct FunctionPage {
  private goBack() {
    router.back();
  }

  build() {
    Column() {
      /* ---------- 头部 ---------- */
      Stack() {
        Image($r('app.media.ic_header_bg'))
          .width('100%')
          .height(280)
          .objectFit(ImageFit.Fill);

        Image($r('app.media.ic_back'))
          .width(40).height(40)
          .position({ x: 18, y: 18 })
          .onClick(() => this.goBack());


      }
      .width('100%');   // ← 仅保留 width，去掉多余的 height(200)

      /* ---------- 功能列表 ---------- */
      Scroll() {
        Column() {
          ForEach(FeatureList, (feature: FeatureItem) => {
            /* 主功能行 */
            Column() {
              Row() {
                Image(feature.icon)
                  .width(40).height(40)
                  .objectFit(ImageFit.Contain);
                Column() {
                  Text(feature.title)
                    .fontSize(18)
                    .fontWeight(FontWeight.Bold)
                    .textAlign(TextAlign.Center)
                    .fontColor('#333333');

                  Text(feature.subtitle)
                    .fontSize(13)
                    .fontColor('#777777')
                    .textAlign(TextAlign.Center)
                    .fontColor('#333333')
                    .margin({ top: 10 })

                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 40 });

                Blank().layoutWeight(1); // 把箭头推到右侧（如果将来加箭头）


              }
              .padding({
                left: 24,
                right: 24,
                top: 13,
                bottom: 13
              })
              .backgroundColor($r('app.color.white'))
              .border({
                width: { bottom: $r('app.float.default_1') },
                color: $r('app.color.borderColor'),
              });
              // if (feature.id === '1') {
              //   ForEach(taskList, (task: TaskItem) => {
              //     Row() {
              //       // 与功能行一致的文字风格
              //       Text(task.title)
              //         .fontSize(16)
              //         .fontWeight(FontWeight.Medium)
              //         .fontColor('#333333');
              //       Blank().layoutWeight(1); // 若将来想加箭头，可复用
              //     }
              //     // 与主功能行相同的内边距 / 背景 / 分割线
              //     .padding({
              //       left: 64,
              //       right: 24,
              //       top: 16,
              //       bottom: 16
              //     }) // 左侧缩进 40+12+12
              //     .backgroundColor($r('app.color.white'))
              //     .border({
              //       width: { bottom: $r('app.float.default_1') },
              //       color: $r('app.color.borderColor')
              //     });
              //   }, (t: TaskItem) => t.id);
              // }
            }

            /* 个性化任务定制的子项目 */
            // if (feature.id === '1') {
            //   ForEach(taskList, (task: TaskItem) => {
            //     Row() {
            //       // 与功能行一致的文字风格
            //       Text(task.title)
            //         .fontSize(16)
            //         .fontWeight(FontWeight.Medium)
            //         .fontColor('#333333');
            //       Blank().layoutWeight(1);   // 若将来想加箭头，可复用
            //     }
            //     // 与主功能行相同的内边距 / 背景 / 分割线
            //     .padding({ left: 64, right: 24, top: 16, bottom: 16 }) // 左侧缩进 40+12+12
            //     .backgroundColor($r('app.color.white'))
            //     .border({
            //       width: { bottom: $r('app.float.default_1') },
            //       color: $r('app.color.borderColor')
            //     });
            //   }, (t: TaskItem) => t.id);
            // }
          }, (f: FeatureItem) => f.id);
        }
      }
      .margin({ top: 0 });
    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'));
  }
}
