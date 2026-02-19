import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className='index'>
      <demo-page darkmode='auto' title='Button' desc='按钮' clickable>
        <demo-block align='unset' title='Basic'>
          <dora-button expand='block' color='light'>
            light
          </dora-button>
          <dora-button expand='block' color='stable'>
            stable
          </dora-button>
          <dora-button expand='block' color='positive'>
            positive
          </dora-button>
          <dora-button expand='block' color='calm'>
            calm
          </dora-button>
          <dora-button expand='block' color='assertive'>
            assertive
          </dora-button>
          <dora-button expand='block' color='balanced'>
            balanced
          </dora-button>
          <dora-button expand='block' color='energized'>
            energized
          </dora-button>
          <dora-button expand='block' color='royal'>
            royal
          </dora-button>
          <dora-button expand='block' color='dark'>
            dark
          </dora-button>
        </demo-block>
        <demo-block align='unset' title='Fills'>
          <dora-button expand='block' fill='clear' color='light'>
            clear light
          </dora-button>
          <dora-button expand='block' fill='clear' color='stable'>
            clear stable
          </dora-button>
          <dora-button expand='block' fill='clear' color='positive'>
            clear positive
          </dora-button>
          <dora-button expand='block' fill='solid' color='calm'>
            solid calm
          </dora-button>
          <dora-button expand='block' fill='solid' color='assertive'>
            solid assertive
          </dora-button>
          <dora-button expand='block' fill='solid' color='balanced'>
            solid balanced
          </dora-button>
          <dora-button expand='block' fill='outline' color='energized'>
            outline energized
          </dora-button>
          <dora-button expand='block' fill='outline' color='royal'>
            outline royal
          </dora-button>
          <dora-button expand='block' fill='outline' color='dark'>
            outline dark
          </dora-button>
        </demo-block>
        <demo-block align='unset' title='Shapes'>
          <dora-button expand='block' color='light'>
            light
          </dora-button>
          <dora-button expand='block' color='stable'>
            stable
          </dora-button>
          <dora-button expand='block' color='positive'>
            positive
          </dora-button>
          <dora-button expand='block' shape='rounded' color='calm'>
            rounded calm
          </dora-button>
          <dora-button expand='block' shape='rounded' color='assertive'>
            rounded assertive
          </dora-button>
          <dora-button expand='block' shape='rounded' color='balanced'>
            rounded balanced
          </dora-button>
          <dora-button expand='block' shape='rectangular' color='energized'>
            rectangular energized
          </dora-button>
          <dora-button expand='block' shape='rectangular' color='royal'>
            rectangular royal
          </dora-button>
          <dora-button expand='block' shape='rectangular' color='dark'>
            rectangular dark
          </dora-button>
        </demo-block>
        <demo-block align='unset' title='Size'>
          <dora-button expand='block' size='small' color='light'>
            small light
          </dora-button>
          <dora-button expand='block' size='small' color='stable'>
            small stable
          </dora-button>
          <dora-button expand='block' size='small' color='positive'>
            small positive
          </dora-button>
          <dora-button expand='block' size='default' color='calm'>
            calm
          </dora-button>
          <dora-button expand='block' size='default' color='assertive'>
            assertive
          </dora-button>
          <dora-button expand='block' size='default' color='balanced'>
            balanced
          </dora-button>
          <dora-button expand='block' size='large' color='energized'>
            large energized
          </dora-button>
          <dora-button expand='block' size='large' color='royal'>
            large royal
          </dora-button>
          <dora-button expand='block' size='large' color='dark'>
            large dark
          </dora-button>
        </demo-block>
        <demo-block align='unset' title='More'>
          <dora-button expand='block' loading color='light'>
            loading light
          </dora-button>
          <dora-button expand='block' loading color='stable'>
            loading stable
          </dora-button>
          <dora-button expand='block' loading color='positive'>
            loading positive
          </dora-button>
          <dora-button expand='block' disabled color='calm'>
            disabled calm
          </dora-button>
          <dora-button expand='block' disabled color='assertive'>
            disabled assertive
          </dora-button>
          <dora-button expand='block' disabled color='balanced'>
            disabled balanced
          </dora-button>
          <dora-button expand='block' strong color='energized'>
            strong energized
          </dora-button>
          <dora-button expand='block' strong color='royal'>
            strong royal
          </dora-button>
          <dora-button expand='block' strong color='dark'>
            strong dark
          </dora-button>
        </demo-block>
      </demo-page>
    </View>
  );
}
