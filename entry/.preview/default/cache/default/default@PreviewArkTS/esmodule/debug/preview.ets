struct preview{build(){Column() {
      Text($r('app.string.target_progress'))
        .titleTextStyle()
        .opacity(Const.OPACITY_6)
        .padding({ left: $r('app.float.default_24') })
      Row() {
        HealthText({
          title: this.homeStore.getDonePercent(),
          fontSize: $r('app.float.default_72'),
          fontFamily: $r('app.string.HarmonyHeiTi_Bold'),
          fontWeight: Const.FONT_WEIGHT_700
        })
        Text('%')
          .titleTextStyle()
          .fontSize($r('app.float.default_40'))
          .margin({ top: $r('app.float.default_12'), left: $r('app.float.default_8') })
      }
      .width(Const.THOUSANDTH_1000)
      .padding({ left: $r('app.float.default_24') })

     // WeekCalendar({ homeStore: $homeStore })
     
    }
    .height(Const.THOUSANDTH_500)
    .backgroundImagePosition({ x: 0, y: 0 })
    .backgroundImage($r('app.media.ic_home_bg'))
    .backgroundImageSize({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_900 })
    .justifyContent(FlexAlign.End)}}