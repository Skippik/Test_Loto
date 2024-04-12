import {Flex, Progress, Typography} from 'antd';

interface StepsProps {
  stepLength: number;
  selectItems: number[];
}

const Steps: React.FC<StepsProps> = ({stepLength, selectItems}) => {
  //
  const percentage = (selectItems.length / stepLength) * 100;

  //
  return (
    <Flex align='center' className='desk-step__wrapper'>
      <Typography.Title level={5} className='desk-step__title'>
        {'Поле 1'}
      </Typography.Title>
      {!selectItems.length ? (
        <span>
          {stepLength === 1 ? 'Отметьте 1 число' : 'Отметьте 8 чисел.'}
        </span>
      ) : (
        <Progress
          strokeColor='#ffd205'
          percent={percentage}
          steps={stepLength}
        />
      )}
    </Flex>
  );
};

export default Steps;
