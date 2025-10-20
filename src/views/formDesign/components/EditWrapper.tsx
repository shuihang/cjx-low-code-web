import { defineComponent, toRefs } from 'vue'
import { useDrag } from 'vue3-dnd'
import { storeToRefs } from 'pinia';
import { ElCol, ElButton } from 'element-plus'
import type { FormColumnProps } from 'cjx-low-code'
import type { CustomSlotsType } from '@/utils/type'
import { stringType, numberType ,objectType } from '@/utils/type'
import useEditorStore from '@/store/modules/editor'
import './editWrapper.scss'

export default defineComponent({
  name: 'EditWrapper',
  props: {
    id: stringType(),
    index: numberType(),
    option: objectType<FormColumnProps>(),
  },
  slots: Object as CustomSlotsType<{
    default?: () => any
  }>,
  setup(props, { emit, slots }) {
    const { currentElement } = storeToRefs(useEditorStore())

    const { option, index } = toRefs(props)

    const [collect, dragRef] = useDrag({
      type: 'FORM_ITEM', // 定义拖拽类型，放置目标通过此类型识别
      item: { 
        type: 'FORM_ITEM',
        index: index,
        id: option.value.prop
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging() // 收集拖拽状态用于样式反馈
      })
    })

    const { isDragging } = collect.value

    const onSetActive = () => {
      emit('setActive', props.id)
    }
    
    return () => {
      return (
       
        <div
          ref={dragRef}
          class={['edit-wrapper drag-item w-100%', currentElement.value === props.id && 'active', isDragging && 'opacity-50' ]}
          onClick={onSetActive}
        >
          <div class='pointer-events-none'>
            { slots.default?.() }
          </div>

          {
            currentElement.value === props.id && <div class='edit-wrapper__border'>
              <div class="pos-absolute top--25px right-0">
                <ElButton size="small" type="primary" onClick={() => emit('copyItem')}>复制</ElButton>
                <ElButton size="small" type="danger" onClick={() => emit('deleteItem')}>删除</ElButton>
              </div>
            </div>
          }
        </div>
      
      )
    }
  }
})