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
/**
 * 定义了一个全局上下文管理类 GlobalContext，它是设计模式中单例模式的典型应用，
 * 主要用于在应用的不同组件、模块之间共享数据，实现跨组件的状态管理。
 * 封装 Map 实现了简单的键值对存储，并通过set get方法访问操作
 *
 */
export class GlobalContext {
    private constructor() {
    }
    private static instance: GlobalContext; //存储类的唯一实例
    //全局访问点，确保无论调用多少次，都只返回同一个实例（若实例不存在则创建，存在则直接返回）。
    private _objects = new Map<string, Object>();
    public static getContext(): GlobalContext {
        if (!GlobalContext.instance) {
            GlobalContext.instance = new GlobalContext();
        }
        return GlobalContext.instance;
    }
    getObject(value: string): Object | undefined {
        return this._objects.get(value);
    }
    setObject(key: string, objectClass: Object): void {
        this._objects.set(key, objectClass);
    }
}
