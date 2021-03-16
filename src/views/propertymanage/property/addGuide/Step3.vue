<template>
    <div>
        <!-- <a-form-model ref="ruleForm" :model="form2" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
        <a-row class="header">
            楼层数量:
            <a-input style="width: 30px;padding: 0;text-align: center;" v-model="form2.floorNumber"
                     @blur="changeFloor"></a-input>
            开始房号:
            <!-- <a-form-model-item label="单元数量：" prop="region" class="units" :labelCol="labelCol" :wrapperCol="wrapperCol"> -->
            <a-select v-model="form2.startCell" @change="changeStartCell">
                <a-select-option v-for="count in 5" :value="count">{{ count }}</a-select-option>
            </a-select>
            结束房号:
            <!-- <a-form-model-item label="单元数量：" prop="region" class="units" :labelCol="labelCol" :wrapperCol="wrapperCol"> -->
            <a-select v-model="form2.stopCell" @change="changeStopCell">
                <a-select-option v-for="count in 5" :value="count">{{ count }}</a-select-option>
            </a-select>
            <!-- </a-form-model-item> -->
        </a-row>
        <a-row>
            <a-table :columns="columns" :dataSource="data" bordered align="center">
                <template
                    v-for="col in [
            'buildingCode',
            'unitCode',
            'unitName',
            'startFloor',
            'stopFloor',
            'startCellId',
            'stopCellId',
            'remark'
          ]"
                    :slot="col"
                    slot-scope="text, record"
                >
                    <div :key="col">
                        <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>{{ text }}</template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">保存</a>&nbsp;
              <a-popconfirm title="确认取消吗?" @confirm="() => cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
                        <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
            </span>
                    </div>
                </template>
            </a-table>
            <a-row>
                <a-button type="primary" @click="nextStep()">下一步</a-button>&nbsp;
                <a-button type="primary" @click="prevStep()">上一步</a-button>
            </a-row>
        </a-row>
    </div>
</template>

<script>
import {selectUnit, updateUnit} from "@/api/estate";

const QS = require('qs')
const columns = [
    {
        align: 'center',
        title: '楼宇编码',
        dataIndex: 'buildingCode',
        width: '6%',
        scopedSlots: {customRender: 'buildingCode'}
    },
    {
        align: 'center',
        title: '单元编码',
        dataIndex: 'unitCode',
        width: '6%',
        scopedSlots: {customRender: 'unitCode'}
    },
    {
        align: 'center',
        title: '单元名称',
        dataIndex: 'unitName',
        width: '6%',
        scopedSlots: {customRender: 'unitName'}
    },
    {
        align: 'center',
        title: '开始楼层',
        dataIndex: 'startFloor',
        width: '7%',
        scopedSlots: {customRender: 'startFloor'}
    },
    {
        align: 'center',
        title: '结束楼层',
        dataIndex: 'stopFloor',
        width: '7%',
        scopedSlots: {customRender: 'stopFloor'}
    },
    {
        align: 'center',
        title: '开始房号',
        dataIndex: 'startCellId',
        width: '7%',
        scopedSlots: {customRender: 'startCellId'}
    },
    {
        align: 'center',
        title: '结束房号',
        dataIndex: 'stopCellId',
        width: '7%',
        scopedSlots: {customRender: 'stopCellId'}
    },
    {
        align: 'center',
        title: '备注',
        dataIndex: 'remark',
        width: '18%',
        scopedSlots: {customRender: 'remark'}
    },
    {
        align: 'center',
        title: '编辑',
        width: '7%',
        dataIndex: 'operation',
        scopedSlots: {customRender: 'operation'}
    }
]

const data = []

export default {
    name: 'Step3',
    data() {
        return {
            labelCol: {span: 2},
            wrapperCol: {span: 1},
            form2: {
                name: '',
                region: undefined,
                floorNumber: '',
                startCell: '',
                stopCell: '',
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            data,
            columns,
            editingKey: ''
        }
    },
    created() {
        selectUnit(this.$store.state.twoStep.unitMessage).then(res => {
                const result = res.result
                result.map(value => {
                    data.push({
                        key: value.id,
                        buildingCode: value.buildingCode,
                        unitCode: value.unitCode,
                        unitName: value.unitName,
                        startFloor: value.startFloor,
                        stopFloor: value.stopFloor,
                        startCellId: value.startCellId,
                        stopCellId: value.stopCellId,
                        remark: value.remark
                    })
                })
                this.cacheData = data.map(item => ({...item}))//刷新页面缓存数据
                this.$notification.success({
                    message: '成功',
                    description: res.result
                })
            }
        ).catch(err => {
            this.$notification.error({
                message: '失败',
                description: err.result
            })
        })
    },
    methods: {
        changeFloor() {
            const floorNumber = this.form2.floorNumber
            data.map(value => {
                value.startFloor = 1
                value.stopFloor = floorNumber
            })
        },
        changeStartCell() {
            const startCell = this.form2.startCell
            data.map(value => {
                value.startCellId = startCell
            })
        },
        changeStopCell() {
            const stopCell = this.form2.stopCell
            data.map(value => {
                value.stopCellId = stopCell
            })
        },
        nextStep() {
            const dataArray = this.data
            var params = '['
            data.map((value, key) => {
                if (key !== data.length - 1)
                    params += '{"unitCode":"' + value.unitCode +
                        '","startFloor":' + value.startFloor +
                        ',"stopFloor":' + value.stopFloor +
                        ',"startCellId":' + value.startCellId +
                        ',"stopCellId":' + value.stopCellId + '},'
                else
                    params += '{"unitCode":"' + value.unitCode +
                        '","startFloor":' + value.startFloor +
                        ',"stopFloor":' + value.stopFloor +
                        ',"startCellId":' + value.startCellId +
                        ',"stopCellId":' + value.stopCellId + '}]'
            })
            this.$store.commit("SET_FC_UNIT", {
                cellMessage: params
            })
            this.$emit('nextStep')
        },
        prevStep() {
            this.$emit('prevStep')
        },
        handleChange(value, key, column) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            if (target) {
                target[column] = value
                this.data = newData
            }
        },
        edit(key) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = key
            if (target) {
                target.editable = true
                this.data = newData
            }
        },
        save(key) {
            const newData = [...this.data]
            const newCacheData = [...this.cacheData]
            const target = newData.filter(item => key === item.key)[0]
            const targetCache = newCacheData.filter(item => key === item.key)[0]
            if (target && targetCache) {
                delete target.editable
                this.data = newData
                Object.assign(targetCache, target)
                this.cacheData = newCacheData
                this.editingKey = ''
            }
            //获取key值
            target.id = target.key
            const param = QS.stringify(target)
            if (target.stopCellId < target.startCellId)
                this.$notification.error({
                    message: '失败',
                    description: "数据不符合规范"
                })
            else
                updateUnit(param).then(res => {
                        this.$notification.success({
                            message: '成功',
                            description: res.result
                        })
                    }
                ).catch(err => {
                    this.$notification.error({
                        message: '失败',
                        description: "1233"
                    })
                })
        },
        cancel(key) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = ''
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                delete target.editable
                this.data = newData
            }
        }
    }
}
</script>

<style lang="less" scoped>
.stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
        line-height: 22px;
    }
}
</style>
