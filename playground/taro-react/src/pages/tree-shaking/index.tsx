import { View, Text } from '@tarojs/components'
// import { useState } from 'react'
// import { ActionSheet, Checkbox, CheckboxGroup, Tab, Tabs } from '@doraemon-ui/taro-react'
import { Switch, Checkbox, CheckboxGroup } from '@doraemon-ui/taro-react'

export default function TreeShakingTestPage() {
  // const [sheetVisible, setSheetVisible] = useState(false)
  // const [tabValue, setTabValue] = useState('tab-a')

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
      <CheckboxGroup value={['apple']} title="Fruits">
        <Checkbox value="apple" title="Apple" />
        <Checkbox value="orange" title="Orange" />
      </CheckboxGroup>

      {/* <Text style={{ display: 'block', margin: '16px 0 8px' }}>Tabs Compound (deps: tab)</Text>
      <Tabs current={tabValue} controlled onChange={(e) => setTabValue(e.detail.key)}>
        <Tab key="tab-a" title="Tab A" />
        <Tab key="tab-b" title="Tab B" />
      </Tabs> */}
    </View>
  )
}
