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

export interface InfoItem {
  id: string;
  title: string
  icon?: Resource;
}

export const AboutListData: InfoItem[] = [
  {
    id: "1",
    title: '当前版本'
  },
  {
    id: "2",
    title: '版本更新'
  },
  {
    id: "3",
    title: '功能介绍'
  },
  {
    id: "4",
    title: '反馈'
  },
  {
    id: "5",
    title: '帮助'
  }
];