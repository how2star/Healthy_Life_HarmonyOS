import FormExtensionAbility from "@ohos:app.form.FormExtensionAbility";
import formBindingData from "@ohos:app.form.formBindingData";
import type Want from "@ohos:app.ability.Want";
import type FormInfo from '../viewmodel/FormInfo';
import FormUtils from "@bundle:com.example.healthy_life/entry/ets/common/utils/FormUtils";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
/**
 * 管理卡片生命周期的函数
 */
export default class EntryFormAbility extends FormExtensionAbility {
    /**
     *onAddForm(want: Want)
     当用户将卡片添加到桌面或其他支持卡片的位置时触发。
     从 want 参数中提取卡片的关键信息（如 formId、formName、formDimension）。
     将这些信息封装为 FormInfo 对象，并通过 FormUtils 存入数据库。
     返回一个空的 FormBindingData 对象（用于初始化卡片数据）。
     */
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
    /**
     * onUpdateForm()
     当系统请求更新卡片内容时触发（如定时刷新）。
     调用 FormUtils.updateCards 更新所有卡片的数据，通常会从数据库获取最新信息并刷新 UI。
     */
    onUpdateForm() {
        FormUtils.updateCards(this.context);
    }
    /**
     * onRemoveForm(formId: string)
     当用户移除卡片时触发。
     通过 FormUtils.deleteFormData 从数据库中删除对应卡片的信息。
     * @param formId
     */
    onRemoveForm(formId: string) {
        FormUtils.deleteFormData(this.context, formId);
    }
}
