import { View, Text } from '@tarojs/components'
import { useState } from 'react'
// import { ActionSheet, Checkbox, CheckboxGroup, Tab, Tabs } from '@doraemon-ui/taro-react'
import { Switch, Checkbox, CheckboxGroup } from '@doraemon-ui/taro-react'

export default function TreeShakingTestPage() {
  const [value, setValue] = useState<string[]>([])
  // const [sheetVisible, setSheetVisible] = useState(false)
  // const [tabValue, setTabValue] = useState('tab-a')

  const onChange = (e) => {
    const { value: newValue } = e.detail
    const index = value.indexOf(newValue)
    const current = index === -1 ? [...value, newValue] : value.filter((n) => n !== newValue)
    setValue(current)
    console.log('===checkbox发生change事件，携带value值为：', e.detail.value, 'current value: ', current)
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ display: 'block', marginBottom: 12, fontWeight: 600 }}>Tree Shaking Plugin Test</Text>

      <Text style={{ display: 'block', marginBottom: 8 }}>ActionSheet (deps: popup)</Text>
      {/* <ActionSheet
        visible={sheetVisible}
        controlled
        options={[
          { name: 'A', text: 'Option A' },
          { name: 'B', text: 'Option B' },
        ]}
        onClose={() => setSheetVisible(false)}
        onChoose={() => setSheetVisible(false)}
      />
      <View
        style={{ marginBottom: 16, color: '#1677ff' }}
        onClick={() => {
          setSheetVisible(true)
        }}
      >
        Open ActionSheet
      </View> */}

      <Text style={{ display: 'block', marginBottom: 8 }}>CheckboxGroup (deps: checkbox/list)</Text>
      <CheckboxGroup
        value={value}
        title="Fruits"
        // options={[
        //   { value: 'apple', title: 'Apple' },
        //   { value: 'orange', title: 'Orange' },
        // ]}
        onChange={onChange}
      >
        <Checkbox value="apple" title="Apple" />
        <Checkbox value="orange" title="Orange" />
      </CheckboxGroup>

      {/* <dora-checkbox-group value={value} title="Fruits" onChange={onChange}>
        <dora-checkbox value="apple" title="Apple" />
        <dora-checkbox value="orange" title="Orange" />
      </dora-checkbox-group> */}
      {/* <Text style={{ display: 'block', margin: '16px 0 8px' }}>Tabs Compound (deps: tab)</Text>
      <Tabs current={tabValue} controlled onChange={(e) => setTabValue(e.detail.key)}>
        <Tab key="tab-a" title="Tab A" />
        <Tab key="tab-b" title="Tab B" />
      </Tabs> */}
    </View>
  )
}
