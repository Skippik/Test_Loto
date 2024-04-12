import {Button, Flex} from 'antd';
import classNames from 'classnames';
import {Dispatch, SetStateAction} from 'react';

interface FieldProps {
  fildLength: number;
  selectItems: number[];
  setSelectItem: Dispatch<SetStateAction<number[]>>;
  disabled: boolean;
}

const Field: React.FC<FieldProps> = ({
  fildLength,
  selectItems,
  setSelectItem,
  disabled = false,
}) => {
  //
  const fields = Array.from({length: fildLength}, (_, index) => index + 1);

  //
  return (
    <Flex className='desk-field__wrapper' wrap='wrap' gap={10}>
      {fields.map((item, key) => (
        <div className='desk-field__wrapper-item' key={key}>
          <Button
            disabled={selectItems.includes(item) ? false : disabled}
            onClick={() => {
              setSelectItem(props => {
                if (props.includes(item)) {
                  return props.filter(e => e !== item);
                }

                return [...props, item];
              });
            }}
            className={classNames('desk-field__wrapper-item-btn', {
              active: selectItems.includes(item),
            })}
            type='text'>
            {item}
          </Button>
        </div>
      ))}
    </Flex>
  );
};

export default Field;
