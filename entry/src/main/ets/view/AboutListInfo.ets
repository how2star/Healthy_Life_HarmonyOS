import { AboutListData, InfoItem } from '../model/About';
import { router } from '@kit.ArkUI';

@Component
export struct AboutListInfo {
  build() {
    List() {
      ForEach(AboutListData, (item: InfoItem) => {
        ListItem() {
          Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
            Text(item.title).fontSize($r('app.float.default_16')).height($r('app.float.default_40'))
            if(item.id == '1')
            {
              Text("v1.0.0")                       // 例如 “v1.0.3”
                .fontSize(14)
                .fontColor('#666666');
            }
            else {
              Image($r('app.media.ic_right_grey'))
                .objectFit(ImageFit.Contain)
                .height($r('app.float.default_12'))
                .width($r('app.float.default_7'))
            }
          }
        }
        .backgroundColor($r('app.color.white'))
        .margin({
          left: $r('app.float.default_24'),
          right: $r('app.float.default_24')
        })
        .height($r('app.float.default_48'))
        .border({
          width: { bottom: $r('app.float.default_1') },
          color: $r('app.color.borderColor')
        })
        .onClick(() => {
          // 版本更新 *路由待修改*
          if(item.id == '2'){
            router.pushUrl({
              url: 'pages/CheckUpdatePage',
            })
          }
          // 功能介绍
          else if(item.id == '3'){
            router.pushUrl({
              url: 'pages/FunctionPage',
            })
          }
          else if(item.id == '4'){
            router.pushUrl({
              url: 'pages/FeedbackPage'
            })
          }
          else if(item.id == '5'){
            router.pushUrl({
              url:'pages/HelpPage'
            })
          }
        })

      }, (item: InfoItem) => JSON.stringify(item));
    }
    .border({
      radius: {
        topLeft: $r('app.float.default_24'),
        topRight: $r('app.float.default_24')
      }
    })
    .backgroundColor($r('app.color.white'))
    .margin({ top: $r('app.float.default_24') })
    .padding({ top: $r('app.float.default_16') })
    .flexGrow(1)
    .clip(true)
  }
}