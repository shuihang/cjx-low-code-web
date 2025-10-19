import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import type { CustomSlotsType } from '@/utils/type'
import { stringType, objectType } from '@/utils/type'
import useEditorStore from '@/store/modules/editor'
import './editWrapper.scss'

export default defineComponent({
  name: 'EditWrapper',
  props: {
    id: stringType(),
    option: objectType(),
  },
  slots: Object as CustomSlotsType<{
    default?: () => any
  }>,
  setup(props, { emit, slots }) {
    const { currentElement } = storeToRefs(useEditorStore())

    const onSetActive = () => {
      emit('setActive', props.id)
    }
    
    return () => {
      return (
        <div class={['edit-wrapper', currentElement.value === props.id && 'active']} onClick={onSetActive}>
          <div class="pointer-events-none">
            { slots.default?.() }
          </div>
        </div>
      )
    }
  }
})