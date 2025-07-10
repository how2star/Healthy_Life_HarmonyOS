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

import { relationalStore } from '@kit.ArkData';
import UserInfoData from '../../../viewmodel/UserInfoData';
import { CommonConstants } from '../../constants/UserConstants';
import Rdb from '../rdb/UserRdbHelper';

export default class UserInfoApi {
  private accountTable = new Rdb(CommonConstants.USERINFO_TABLE.tableName, CommonConstants.USERINFO_TABLE.sqlCreate,
    CommonConstants.USERINFO_TABLE.columns);

  constructor(callback: Function = () => {
  }) {
    this.accountTable.getRdbStore(callback);
  }

  getRdbStore(callback: Function = () => {
  }) {
    this.accountTable.getRdbStore(callback);
  }

  insertData(account: UserInfoData, callback: Function) {
    const valueBucket: relationalStore.ValuesBucket = generateBucket(account);
    this.accountTable.insertData(valueBucket, callback);
  }

  deleteData(account: UserInfoData, callback: Function) {
    let predicates = new relationalStore.RdbPredicates(CommonConstants.USERINFO_TABLE.tableName);
    predicates.equalTo('id', account.id);
    this.accountTable.deleteData(predicates, callback);
  }

  updateData(account: UserInfoData, callback: Function) {
    const valueBucket: relationalStore.ValuesBucket = generateBucket(account);
    let predicates = new relationalStore.RdbPredicates(CommonConstants.USERINFO_TABLE.tableName);
    predicates.equalTo('id', account.id);
    this.accountTable.updateData(predicates, valueBucket, callback);
  }

  query(id: number, callback: Function, isAll: boolean = true) {
    let predicates = new relationalStore.RdbPredicates(CommonConstants.USERINFO_TABLE.tableName);
    if (!isAll) {
      predicates.equalTo('id', id);
    }
    this.accountTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
      let count: number = resultSet.rowCount;
      if (count === 0 || typeof count === 'string') {
        console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
        callback([]);
      } else {
        resultSet.goToFirstRow();
        const result: UserInfoData[] = [];
        for (let i = 0; i < count; i++) {
          let tmp: UserInfoData = {
            id: 0,
            username: '用户 001',
            year: '2000',
            mouth: '1',
            date: '1',
            gender: '保密',
            weight: '50',
            height: '160',
            icon: '',
          };
          tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
          tmp.username = resultSet.getString(resultSet.getColumnIndex('username'));
          tmp.year = resultSet.getString(resultSet.getColumnIndex('year'));
          tmp.mouth = resultSet.getString(resultSet.getColumnIndex('mouth'));
          tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
          tmp.gender = resultSet.getString(resultSet.getColumnIndex('gender'));
          tmp.weight = resultSet.getString(resultSet.getColumnIndex('weight'));
          tmp.height = resultSet.getString(resultSet.getColumnIndex('height'));
          tmp.icon = resultSet.getString(resultSet.getColumnIndex('icon'));
          result[i] = tmp;
          resultSet.goToNextRow();
        }
        callback(result);
      }
    });
  }
}

function generateBucket(account: UserInfoData): relationalStore.ValuesBucket {
  let obj: relationalStore.ValuesBucket = {};
  obj.username = account.username;
  obj.year = account.year;
  obj.mouth = account.mouth;
  obj.date = account.date;
  obj.gender = account.gender;
  obj.weight = account.weight;
  obj.height = account.height;
  obj.icon = account.icon;
  return obj;
}