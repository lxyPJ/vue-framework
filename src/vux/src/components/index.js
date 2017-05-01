const vux = {}
/* only for building vux.css */
import Style from '../styles/index.vue'
import vuxArray2stringFilter from 'src/filters/array2String.js'

vux['vuxArray2stringFilter'] = vuxArray2stringFilter
import vuxFormatTimeFilter from 'src/filters/format-time.js'

vux['vuxFormatTimeFilter'] = vuxFormatTimeFilter
import vuxFriendlyTimeFilter from 'src/filters/friendly-time.js'

vux['vuxFriendlyTimeFilter'] = vuxFriendlyTimeFilter
import vuxName2valueFilter from 'src/filters/name2value.js'

vux['vuxName2valueFilter'] = vuxName2valueFilter
import vuxValue2nameFilter from 'src/filters/value2name.js'

vux['vuxValue2nameFilter'] = vuxValue2nameFilter
import vuxChinaAddressData from 'src/datas/china_address.json'

vux['vuxChinaAddressData'] = vuxChinaAddressData
import vuxVuxComponentListData from 'src/datas/vux_component_list.json'

vux['vuxVuxComponentListData'] = vuxVuxComponentListData
import vuxAjaxPlugin from 'src/plugins/ajax/index.js'

vux['vuxAjaxPlugin'] = vuxAjaxPlugin
import vuxAlertPlugin from 'src/plugins/alert/index.js'

vux['vuxAlertPlugin'] = vuxAlertPlugin
import vuxConfirmPlugin from 'src/plugins/confirm/index.js'

vux['vuxConfirmPlugin'] = vuxConfirmPlugin
import vuxDevicePlugin from 'src/plugins/device/index.js'

vux['vuxDevicePlugin'] = vuxDevicePlugin
import vuxLoadingPlugin from 'src/plugins/loading/index.js'

vux['vuxLoadingPlugin'] = vuxLoadingPlugin
import vuxTitlePlugin from 'src/plugins/title/index.js'

vux['vuxTitlePlugin'] = vuxTitlePlugin
import vuxToastPlugin from 'src/plugins/toast/index.js'

vux['vuxToastPlugin'] = vuxToastPlugin
import vuxWechatPlugin from 'src/plugins/wechat/index.js'

vux['vuxWechatPlugin'] = vuxWechatPlugin
import vuxBase64Tool from 'src/tools/base64/index.js'

vux['vuxBase64Tool'] = vuxBase64Tool
import vuxbase64 from 'src/tools/base64/index.js'

vux['vuxbase64'] = vuxbase64
import vuxCookieTool from 'src/tools/cookie/index.js'

vux['vuxCookieTool'] = vuxCookieTool
import vuxcookie from 'src/tools/cookie/index.js'

vux['vuxcookie'] = vuxcookie
import vuxMd5Tool from 'src/tools/md5/index.js'

vux['vuxMd5Tool'] = vuxMd5Tool
import vuxmd5 from 'src/tools/md5/index.js'

vux['vuxmd5'] = vuxmd5
import vuxClickOutsideDirective from 'src/directives/click-outside/index.js'

vux['vuxClickOutsideDirective'] = vuxClickOutsideDirective
import vuxInviewDirective from 'src/directives/inview/index.js'

vux['vuxInviewDirective'] = vuxInviewDirective
import vuxActionsheet from 'src/components/actionsheet/index.vue'

vux['vuxActionsheet'] = vuxActionsheet
import vuxAlert from 'src/components/alert/index.vue'

vux['vuxAlert'] = vuxAlert
import vuxBadge from 'src/components/badge/index.vue'

vux['vuxBadge'] = vuxBadge
import vuxBlur from 'src/components/blur/index.vue'

vux['vuxBlur'] = vuxBlur
import vuxBox from 'src/components/box/index.vue'

vux['vuxBox'] = vuxBox
import vuxButtonTabItem from 'src/components/button-tab/button-tab-item.vue'

vux['vuxButtonTabItem'] = vuxButtonTabItem
import vuxButtonTab from 'src/components/button-tab/button-tab.vue'

vux['vuxButtonTab'] = vuxButtonTab
import vuxCalendar from 'src/components/calendar/index.vue'

vux['vuxCalendar'] = vuxCalendar
import vuxCard from 'src/components/card/index.vue'

vux['vuxCard'] = vuxCard
import vuxCell from 'src/components/cell/index.vue'

vux['vuxCell'] = vuxCell
import vuxCheckIcon from 'src/components/check-icon/index.vue'

vux['vuxCheckIcon'] = vuxCheckIcon
import vuxCheckerItem from 'src/components/checker/checker-item.vue'

vux['vuxCheckerItem'] = vuxCheckerItem
import vuxChecker from 'src/components/checker/checker.vue'

vux['vuxChecker'] = vuxChecker
import vuxChecklist from 'src/components/checklist/index.vue'

vux['vuxChecklist'] = vuxChecklist
import vuxClocker from 'src/components/clocker/index.vue'

vux['vuxClocker'] = vuxClocker
import vuxColorPicker from 'src/components/color-picker/index.vue'

vux['vuxColorPicker'] = vuxColorPicker
import vuxConfirm from 'src/components/confirm/index.vue'

vux['vuxConfirm'] = vuxConfirm
import vuxCountdown from 'src/components/countdown/index.vue'

vux['vuxCountdown'] = vuxCountdown
import vuxCountup from 'src/components/countup/index.vue'

vux['vuxCountup'] = vuxCountup
import vuxDatetime from 'src/components/datetime/index.vue'

vux['vuxDatetime'] = vuxDatetime
import vuxDevTip from 'src/components/dev-tip/index.vue'

vux['vuxDevTip'] = vuxDevTip
import vuxDivider from 'src/components/divider/index.vue'

vux['vuxDivider'] = vuxDivider
import vuxFlexboxItem from 'src/components/flexbox/flexbox-item.vue'

vux['vuxFlexboxItem'] = vuxFlexboxItem
import vuxFlexbox from 'src/components/flexbox/flexbox.vue'

vux['vuxFlexbox'] = vuxFlexbox
import vuxFormPreview from 'src/components/form-preview/index.vue'

vux['vuxFormPreview'] = vuxFormPreview
import vuxDemobasic from 'src/components/fullpage/DemoBasic.vue'

vux['vuxDemobasic'] = vuxDemobasic
import vuxFullpage from 'src/components/fullpage/index.vue'

vux['vuxFullpage'] = vuxFullpage
import vuxGridItem from 'src/components/grid/grid-item.vue'

vux['vuxGridItem'] = vuxGridItem
import vuxGrid from 'src/components/grid/grid.vue'

vux['vuxGrid'] = vuxGrid
import vuxGroupTitle from 'src/components/group-title/index.vue'

vux['vuxGroupTitle'] = vuxGroupTitle
import vuxGroup from 'src/components/group/index.vue'

vux['vuxGroup'] = vuxGroup
import vuxIcon from 'src/components/icon/index.vue'

vux['vuxIcon'] = vuxIcon
import vuxInlineCalendar from 'src/components/inline-calendar/index.vue'

vux['vuxInlineCalendar'] = vuxInlineCalendar
import vuxInlineDesc from 'src/components/inline-desc/index.vue'

vux['vuxInlineDesc'] = vuxInlineDesc
import vuxInlineXNumber from 'src/components/inline-x-number/index.vue'

vux['vuxInlineXNumber'] = vuxInlineXNumber
import vuxLoadMore from 'src/components/load-more/index.vue'

vux['vuxLoadMore'] = vuxLoadMore
import vuxLoading from 'src/components/loading/index.vue'

vux['vuxLoading'] = vuxLoading
import vuxMasker from 'src/components/masker/index.vue'

vux['vuxMasker'] = vuxMasker
import vuxNumberRoller from 'src/components/number-roller/index.vue'

vux['vuxNumberRoller'] = vuxNumberRoller
import vuxPanel from 'src/components/panel/index.vue'

vux['vuxPanel'] = vuxPanel
import vuxPicker from 'src/components/picker/index.vue'

vux['vuxPicker'] = vuxPicker
import vuxDemoindex from 'src/components/popover/DemoIndex.vue'

vux['vuxDemoindex'] = vuxDemoindex
import vuxPopover from 'src/components/popover/index.vue'

vux['vuxPopover'] = vuxPopover
import vuxPopupPicker from 'src/components/popup-picker/index.vue'

vux['vuxPopupPicker'] = vuxPopupPicker
import vuxPopup from 'src/components/popup/index.vue'

vux['vuxPopup'] = vuxPopup
import vuxPreviewer from 'src/components/previewer/index.vue'

vux['vuxPreviewer'] = vuxPreviewer
import vuxQrcode from 'src/components/qrcode/index.vue'

vux['vuxQrcode'] = vuxQrcode
import vuxRadio from 'src/components/radio/index.vue'

vux['vuxRadio'] = vuxRadio
import vuxRange from 'src/components/range/index.vue'

vux['vuxRange'] = vuxRange
import vuxRater from 'src/components/rater/index.vue'

vux['vuxRater'] = vuxRater
import vuxScroller from 'src/components/scroller/index.vue'

vux['vuxScroller'] = vuxScroller
import vuxSearch from 'src/components/search/index.vue'

vux['vuxSearch'] = vuxSearch
import vuxSelector from 'src/components/selector/index.vue'

vux['vuxSelector'] = vuxSelector
import vuxShake from 'src/components/shake/index.vue'

vux['vuxShake'] = vuxShake
import vuxSpinner from 'src/components/spinner/index.vue'

vux['vuxSpinner'] = vuxSpinner
import vuxStepItem from 'src/components/step/step-item.vue'

vux['vuxStepItem'] = vuxStepItem
import vuxStep from 'src/components/step/step.vue'

vux['vuxStep'] = vuxStep
import vuxSticky from 'src/components/sticky/index.vue'

vux['vuxSticky'] = vuxSticky
import vuxSwipeoutButton from 'src/components/swipeout/swipeout-button.vue'

vux['vuxSwipeoutButton'] = vuxSwipeoutButton
import vuxSwipeoutItem from 'src/components/swipeout/swipeout-item.vue'

vux['vuxSwipeoutItem'] = vuxSwipeoutItem
import vuxSwipeout from 'src/components/swipeout/swipeout.vue'

vux['vuxSwipeout'] = vuxSwipeout
import vuxSwiperItem from 'src/components/swiper/swiper-item.vue'

vux['vuxSwiperItem'] = vuxSwiperItem
import vuxSwiper from 'src/components/swiper/swiper.vue'

vux['vuxSwiper'] = vuxSwiper
import vuxTabItem from 'src/components/tab/tab-item.vue'

vux['vuxTabItem'] = vuxTabItem
import vuxTab from 'src/components/tab/tab.vue'

vux['vuxTab'] = vuxTab
import vuxTabbarItem from 'src/components/tabbar/tabbar-item.vue'

vux['vuxTabbarItem'] = vuxTabbarItem
import vuxTabbar from 'src/components/tabbar/tabbar.vue'

vux['vuxTabbar'] = vuxTabbar
import vuxTimelineItem from 'src/components/timeline/timeline-item.vue'

vux['vuxTimelineItem'] = vuxTimelineItem
import vuxTimeline from 'src/components/timeline/timeline.vue'

vux['vuxTimeline'] = vuxTimeline
import vuxTip from 'src/components/tip/index.vue'

vux['vuxTip'] = vuxTip
import vuxToast from 'src/components/toast/index.vue'

vux['vuxToast'] = vuxToast
import vuxVideo from 'src/components/video/index.vue'

vux['vuxVideo'] = vuxVideo
import vuxViewBox from 'src/components/view-box/index.vue'

vux['vuxViewBox'] = vuxViewBox
import vuxWechatEmotion from 'src/components/wechat-emotion/index.vue'

vux['vuxWechatEmotion'] = vuxWechatEmotion
import vuxXAddress from 'src/components/x-address/index.vue'

vux['vuxXAddress'] = vuxXAddress
import vuxXButton from 'src/components/x-button/index.vue'

vux['vuxXButton'] = vuxXButton
import vuxXCircle from 'src/components/x-circle/index.vue'

vux['vuxXCircle'] = vuxXCircle
import vuxXDialog from 'src/components/x-dialog/index.vue'

vux['vuxXDialog'] = vuxXDialog
import vuxXHeader from 'src/components/x-header/index.vue'

vux['vuxXHeader'] = vuxXHeader
import vuxXImg from 'src/components/x-img/index.vue'

vux['vuxXImg'] = vuxXImg
import vuxXInput from 'src/components/x-input/index.vue'

vux['vuxXInput'] = vuxXInput
import vuxXNumber from 'src/components/x-number/index.vue'

vux['vuxXNumber'] = vuxXNumber
import vuxXProgress from 'src/components/x-progress/index.vue'

vux['vuxXProgress'] = vuxXProgress
import vuxXSwitch from 'src/components/x-switch/index.vue'

vux['vuxXSwitch'] = vuxXSwitch
import vuxXTextarea from 'src/components/x-textarea/index.vue'

vux['vuxXTextarea'] = vuxXTextarea

if (!!window) {
  for (let i in vux) {
    window[i] = vux[i]
  }
}
module.exports = vux