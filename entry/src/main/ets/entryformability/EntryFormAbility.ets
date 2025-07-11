/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FormExtensionAbility } from '@kit.FormKit';
import { formBindingData } from '@kit.FormKit';
import { Want } from '@kit.AbilityKit';
import FormInfo from '../viewmodel/FormInfo';
import FormUtils from '../common/utils/FormUtils';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

// <<<<<<< HEAD
export default class EntryFormAbility extends FormExtensionAbility {
// =======
/**
 * 管理卡片生命周期的函数
 */
// export default class EntryFormAbility extends FormExtensionAbility {
//   /**
//    *onAddForm(want: Want)
//    当用户将卡片添加到桌面或其他支持卡片的位置时触发。
//    从 want 参数中提取卡片的关键信息（如 formId、formName、formDimension）。
//    将这些信息封装为 FormInfo 对象，并通过 FormUtils 存入数据库。
//    返回一个空的 FormBindingData 对象（用于初始化卡片数据）。
//    */
// >>>>>>> origin/cjh
  onAddForm(want: Want) {
    let parameters = want.parameters;
    if (parameters) {
      let formId: string = parameters[Const.FORM_PARAM_IDENTITY_KEY] as string;
      let formName: string = parameters[Const.FORM_PARAM_NAME_KEY] as string;
      let formDimension: number = parameters[Const.FORM_PARAM_DIMENSION_KEY] as number;
      let formInfo: FormInfo = {
        formId: formId,
        formName: formName,
        formDimension: formDimension
      };
      FormUtils.insertFormData(this.context, formInfo);
    }
    // Called to return a FormBindingData object.
    let formData = formBindingData.createFormBindingData('');
    return formData;
  }
// <<<<<<< HEAD
// =======
//   /**
//    * onUpdateForm()
//    当系统请求更新卡片内容时触发（如定时刷新）。
//    调用 FormUtils.updateCards 更新所有卡片的数据，通常会从数据库获取最新信息并刷新 UI。
//    */
// >>>>>>> origin/cjh

  onUpdateForm() {
    FormUtils.updateCards(this.context);
  }
// <<<<<<< HEAD
// =======
  /**
   * onRemoveForm(formId: string)
   当用户移除卡片时触发。
   通过 FormUtils.deleteFormData 从数据库中删除对应卡片的信息。
   * @param formId
   */
// >>>>>>> origin/cjh

  onRemoveForm(formId: string) {
    FormUtils.deleteFormData(this.context, formId);
  }
}